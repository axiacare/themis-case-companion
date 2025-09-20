-- PROTEÇÃO ADICIONAL PARA DADOS COMERCIAIS SENSÍVEIS
-- Implementar mascaramento e controles de acesso granulares

-- 1. Criar função para mascarar dados sensíveis conforme nível de acesso
CREATE OR REPLACE FUNCTION public.mask_sensitive_data(
  data_value text,
  data_type text,
  viewer_team_id text,
  owner_team_id text
)
RETURNS text AS $$
BEGIN
  -- Se é a própria equipe, mostrar dados completos
  IF viewer_team_id = owner_team_id THEN
    RETURN data_value;
  END IF;
  
  -- Caso contrário, mascarar dados conforme tipo
  CASE data_type
    WHEN 'email' THEN
      -- Mascarar email: joao@empresa.com -> j***@empresa.com
      IF data_value IS NOT NULL AND length(data_value) > 0 THEN
        RETURN substring(data_value, 1, 1) || '***@' || split_part(data_value, '@', 2);
      END IF;
      
    WHEN 'phone' THEN
      -- Mascarar telefone: (11) 99999-9999 -> (11) ****-***9
      IF data_value IS NOT NULL AND length(data_value) > 4 THEN
        RETURN substring(data_value, 1, 5) || '****-***' || right(data_value, 1);
      END IF;
      
    WHEN 'cnpj' THEN
      -- Mascarar CNPJ: 12.345.678/0001-90 -> **.***.***/****-**
      IF data_value IS NOT NULL AND length(data_value) > 4 THEN
        RETURN '**.***.***/****-' || right(data_value, 2);
      END IF;
      
    WHEN 'name' THEN
      -- Mascarar nome: João Silva -> J*** S***
      IF data_value IS NOT NULL AND length(data_value) > 0 THEN
        RETURN substring(split_part(data_value, ' ', 1), 1, 1) || '*** ' || 
               CASE 
                 WHEN split_part(data_value, ' ', 2) != '' THEN
                   substring(split_part(data_value, ' ', 2), 1, 1) || '***'
                 ELSE ''
               END;
      END IF;
  END CASE;
  
  -- Default: mascarar completamente
  RETURN '***CONFIDENCIAL***';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 2. Criar view segura para teams com dados mascarados
CREATE OR REPLACE VIEW public.teams_public_safe AS
SELECT 
    team_id,
    team_name,
    -- Mascarar dados sensíveis se não for a própria equipe
    mask_sensitive_data(email, 'email', get_current_team_id(), team_id) as email,
    mask_sensitive_data(phone, 'phone', get_current_team_id(), team_id) as phone,
    mask_sensitive_data(cnpj, 'cnpj', get_current_team_id(), team_id) as cnpj,
    mask_sensitive_data(responsible_name, 'name', get_current_team_id(), team_id) as responsible_name,
    created_at
FROM teams
WHERE 
  -- Mostrar apenas se há contexto de equipe válido
  get_current_team_id() IS NOT NULL 
  AND get_current_team_id() != '';

-- 3. Criar função de auditoria para acesso a dados sensíveis
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id text NOT NULL,
    action text NOT NULL,
    target_table text,
    target_team_id text,
    accessed_fields text[],
    timestamp timestamp with time zone DEFAULT now(),
    user_agent text,
    ip_address text
);

-- Habilitar RLS na tabela de auditoria
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Policy para auditoria - apenas própria equipe pode ver seus logs
CREATE POLICY "Teams can only see their audit logs" ON public.audit_logs
FOR ALL
USING (team_id = get_current_team_id());

-- 4. Função para registrar acesso a dados sensíveis
CREATE OR REPLACE FUNCTION public.log_sensitive_access(
  p_action text,
  p_target_table text,
  p_target_team_id text,
  p_accessed_fields text[]
)
RETURNS void AS $$
BEGIN
  -- Registrar acesso apenas se houver contexto de equipe
  IF get_current_team_id() IS NOT NULL AND get_current_team_id() != '' THEN
    INSERT INTO audit_logs (
      team_id, 
      action, 
      target_table, 
      target_team_id, 
      accessed_fields
    ) VALUES (
      get_current_team_id(), 
      p_action, 
      p_target_table, 
      p_target_team_id, 
      p_accessed_fields
    );
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 5. Atualizar função verify_team_login para registrar auditoria
CREATE OR REPLACE FUNCTION public.verify_team_login(
  p_team_id text,
  p_password text
)
RETURNS TABLE(
  success boolean,
  team_data jsonb
) AS $$
DECLARE
  team_record record;
  is_valid boolean := false;
  password_hash_to_check text;
BEGIN
  -- Calcular hash da senha fornecida
  password_hash_to_check := encode(digest(p_password, 'sha256'), 'base64');
  
  -- Buscar team com password_hash
  SELECT t.team_id, t.team_name, t.password_hash, t.email, t.responsible_name
  INTO team_record
  FROM teams t
  WHERE t.team_id = p_team_id;
  
  -- Verificar se existe e senha confere
  IF team_record.team_id IS NOT NULL THEN
    is_valid := (team_record.password_hash = password_hash_to_check);
  END IF;
  
  IF is_valid THEN
    -- Retornar dados SEM password_hash
    RETURN QUERY SELECT 
      true as success,
      jsonb_build_object(
        'team_id', team_record.team_id,
        'team_name', team_record.team_name,
        'email', team_record.email,
        'responsible_name', team_record.responsible_name
      ) as team_data;
      
    -- Registrar login bem-sucedido na auditoria
    PERFORM log_sensitive_access(
      'LOGIN_SUCCESS', 
      'teams', 
      team_record.team_id, 
      ARRAY['team_id', 'team_name', 'email', 'responsible_name']
    );
  ELSE
    -- Registrar tentativa de login falhada
    INSERT INTO audit_logs (
      team_id, 
      action, 
      target_table, 
      target_team_id, 
      accessed_fields
    ) VALUES (
      'UNKNOWN', 
      'LOGIN_FAILED', 
      'teams', 
      p_team_id, 
      ARRAY['password_attempt']
    );
    
    RETURN QUERY SELECT false as success, null::jsonb as team_data;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 6. Atualizar funções admin para registrar auditoria
CREATE OR REPLACE FUNCTION public.admin_list_teams()
RETURNS TABLE(
    id uuid,
    team_id text,
    team_name text,
    cnpj text,
    responsible_name text,
    email text,
    phone text,
    terms_document_url text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
) AS $$
BEGIN
  -- Verificar se é uma chamada administrativa
  IF get_current_team_id() IS NOT NULL AND get_current_team_id() != '' THEN
    RAISE EXCEPTION 'Access denied: Admin function called from team context';
  END IF;
  
  -- Registrar acesso administrativo
  INSERT INTO audit_logs (
    team_id, 
    action, 
    target_table, 
    accessed_fields
  ) VALUES (
    'ADMIN', 
    'ADMIN_LIST_TEAMS', 
    'teams', 
    ARRAY['all_fields_except_password']
  );
  
  RETURN QUERY 
  SELECT 
    t.id, t.team_id, t.team_name, t.cnpj, t.responsible_name, 
    t.email, t.phone, t.terms_document_url, t.created_at, t.updated_at
  FROM teams t
  ORDER BY t.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 7. Conceder permissões às novas funcionalidades
GRANT SELECT ON teams_public_safe TO anon, authenticated;
GRANT SELECT ON audit_logs TO authenticated;
GRANT EXECUTE ON FUNCTION mask_sensitive_data(text, text, text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION log_sensitive_access(text, text, text, text[]) TO authenticated;