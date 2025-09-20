-- Corrigir warnings de segurança: definir search_path nas funções
DROP FUNCTION IF EXISTS public.get_current_team_id();
DROP FUNCTION IF EXISTS public.set_team_context(TEXT);
DROP FUNCTION IF EXISTS public.update_updated_at_column();

-- Recriar função para obter team_id com search_path seguro
CREATE OR REPLACE FUNCTION public.get_current_team_id()
RETURNS TEXT 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  RETURN current_setting('app.current_team_id', true);
END;
$$;

-- Recriar função para definir contexto da equipe com search_path seguro  
CREATE OR REPLACE FUNCTION public.set_team_context(p_team_id TEXT)
RETURNS void 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  PERFORM set_config('app.current_team_id', p_team_id, true);
END;
$$;

-- Recriar função de trigger com search_path seguro
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;