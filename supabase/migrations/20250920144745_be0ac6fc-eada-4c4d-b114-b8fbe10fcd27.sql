-- Corrigir warning de Security Definer View
-- Remover a view e substituir por função segura

-- 1. Remover a view problemática
DROP VIEW IF EXISTS public.teams_public_safe;

-- 2. Criar função segura para listar dados mascarados de teams
CREATE OR REPLACE FUNCTION public.get_teams_safe()
RETURNS TABLE(
    team_id text,
    team_name text,
    email text,
    phone text,
    cnpj text,
    responsible_name text,
    created_at timestamp with time zone
) AS $$
BEGIN
  -- Verificar se há contexto de equipe válido
  IF get_current_team_id() IS NULL OR get_current_team_id() = '' THEN
    -- Se não há contexto, retornar vazio
    RETURN;
  END IF;
  
  -- Retornar dados mascarados
  RETURN QUERY 
  SELECT 
      t.team_id,
      t.team_name,
      -- Mascarar dados sensíveis se não for a própria equipe
      mask_sensitive_data(t.email, 'email', get_current_team_id(), t.team_id) as email,
      mask_sensitive_data(t.phone, 'phone', get_current_team_id(), t.team_id) as phone,
      mask_sensitive_data(t.cnpj, 'cnpj', get_current_team_id(), t.team_id) as cnpj,
      mask_sensitive_data(t.responsible_name, 'name', get_current_team_id(), t.team_id) as responsible_name,
      t.created_at
  FROM teams t
  ORDER BY t.created_at DESC;
  
  -- Registrar acesso aos dados
  PERFORM log_sensitive_access(
    'VIEW_TEAMS_SAFE', 
    'teams', 
    get_current_team_id(), 
    ARRAY['team_list_with_masking']
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 3. Conceder permissão à nova função
GRANT EXECUTE ON FUNCTION get_teams_safe() TO anon, authenticated;