-- Corrigir warnings de segurança - Function Search Path

-- Corrigir função is_system_admin
CREATE OR REPLACE FUNCTION public.is_system_admin()
RETURNS boolean AS $$
BEGIN
  -- Apenas permite acesso de admin através de service role key
  -- Nunca através da API pública
  RETURN current_setting('role') = 'service_role';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

-- Corrigir função verify_team_login  
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
BEGIN
  -- Buscar team com password_hash
  SELECT t.team_id, t.team_name, t.password_hash, t.email, t.responsible_name
  INTO team_record
  FROM teams t
  WHERE t.team_id = p_team_id;
  
  -- Verificar se existe e senha confere
  IF team_record.team_id IS NOT NULL THEN
    -- Comparação simples de senha (em produção usar hash apropriado)
    is_valid := (team_record.password_hash = p_password);
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