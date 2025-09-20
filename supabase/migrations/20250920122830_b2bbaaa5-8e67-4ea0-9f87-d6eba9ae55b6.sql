-- Atualizar funções existentes com search_path seguro (sem DROP)
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