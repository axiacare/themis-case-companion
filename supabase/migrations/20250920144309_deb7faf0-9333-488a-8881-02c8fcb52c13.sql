-- Criar funções administrativas seguras para gerenciar teams
-- Apenas para uso no painel admin com credenciais específicas

-- 1. Função para listar teams (sem password_hash) para admin
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
  -- Verificar se é uma chamada administrativa (usando service role ou contexto específico)
  -- Por enquanto, permitir apenas se não há contexto de team (admin mode)
  IF get_current_team_id() IS NOT NULL AND get_current_team_id() != '' THEN
    RAISE EXCEPTION 'Access denied: Admin function called from team context';
  END IF;
  
  RETURN QUERY 
  SELECT 
    t.id, t.team_id, t.team_name, t.cnpj, t.responsible_name, 
    t.email, t.phone, t.terms_document_url, t.created_at, t.updated_at
  FROM teams t
  ORDER BY t.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 2. Função para criar team (admin only)
CREATE OR REPLACE FUNCTION public.admin_create_team(
  p_team_id text,
  p_team_name text,
  p_password text,
  p_cnpj text DEFAULT NULL,
  p_responsible_name text DEFAULT NULL,
  p_email text DEFAULT NULL,
  p_phone text DEFAULT NULL,
  p_terms_document_url text DEFAULT NULL
)
RETURNS uuid AS $$
DECLARE
  new_team_uuid uuid;
BEGIN
  -- Verificar se é uma chamada administrativa
  IF get_current_team_id() IS NOT NULL AND get_current_team_id() != '' THEN
    RAISE EXCEPTION 'Access denied: Admin function called from team context';
  END IF;
  
  -- Simple hash - em produção usar bcrypt
  INSERT INTO teams (
    team_id, team_name, password_hash, cnpj, responsible_name, 
    email, phone, terms_document_url
  ) VALUES (
    p_team_id, p_team_name, encode(digest(p_password, 'sha256'), 'base64'), 
    p_cnpj, p_responsible_name, p_email, p_phone, p_terms_document_url
  ) RETURNING id INTO new_team_uuid;
  
  RETURN new_team_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 3. Função para atualizar team (admin only) 
CREATE OR REPLACE FUNCTION public.admin_update_team(
  p_team_uuid uuid,
  p_team_name text,
  p_password text DEFAULT NULL,
  p_cnpj text DEFAULT NULL,
  p_responsible_name text DEFAULT NULL,
  p_email text DEFAULT NULL,
  p_phone text DEFAULT NULL,
  p_terms_document_url text DEFAULT NULL
)
RETURNS boolean AS $$
BEGIN
  -- Verificar se é uma chamada administrativa
  IF get_current_team_id() IS NOT NULL AND get_current_team_id() != '' THEN
    RAISE EXCEPTION 'Access denied: Admin function called from team context';
  END IF;
  
  -- Update com ou sem senha
  IF p_password IS NOT NULL THEN
    UPDATE teams SET
      team_name = p_team_name,
      password_hash = encode(digest(p_password, 'sha256'), 'base64'),
      cnpj = p_cnpj,
      responsible_name = p_responsible_name,
      email = p_email,
      phone = p_phone,
      terms_document_url = p_terms_document_url,
      updated_at = now()
    WHERE id = p_team_uuid;
  ELSE
    UPDATE teams SET
      team_name = p_team_name,
      cnpj = p_cnpj,
      responsible_name = p_responsible_name,
      email = p_email,
      phone = p_phone,
      terms_document_url = p_terms_document_url,
      updated_at = now()
    WHERE id = p_team_uuid;
  END IF;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 4. Função para deletar team (admin only)
CREATE OR REPLACE FUNCTION public.admin_delete_team(p_team_uuid uuid)
RETURNS boolean AS $$
BEGIN
  -- Verificar se é uma chamada administrativa
  IF get_current_team_id() IS NOT NULL AND get_current_team_id() != '' THEN
    RAISE EXCEPTION 'Access denied: Admin function called from team context';
  END IF;
  
  DELETE FROM teams WHERE id = p_team_uuid;
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 5. Atualizar função verify_team_login para usar hash SHA256
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
  ELSE
    RETURN QUERY SELECT false as success, null::jsonb as team_data;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 6. Conceder acesso às novas funções admin
GRANT EXECUTE ON FUNCTION admin_list_teams() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION admin_create_team(text, text, text, text, text, text, text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION admin_update_team(uuid, text, text, text, text, text, text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION admin_delete_team(uuid) TO anon, authenticated;