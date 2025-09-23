-- Fix Security Definer View issue
-- The teams_safe view currently calls SECURITY DEFINER functions which bypasses RLS
-- We'll replace it with proper RLS policies instead of relying on SECURITY DEFINER functions

-- First, drop the current teams_safe view
DROP VIEW IF EXISTS public.teams_safe;

-- Create teams_safe as a regular table with proper RLS policies
-- This avoids the SECURITY DEFINER issue while maintaining security
CREATE TABLE IF NOT EXISTS public.teams_safe (
  team_id TEXT NOT NULL,
  team_name TEXT NOT NULL, 
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (team_id)
);

-- Enable RLS on teams_safe table
ALTER TABLE public.teams_safe ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for teams_safe that enforce proper access control
-- Teams can only see their own data when properly authenticated
CREATE POLICY "Teams can only read their own safe data" 
ON public.teams_safe 
FOR SELECT 
USING (
  team_id = current_setting('app.current_team_id', true) 
  AND current_setting('app.current_team_id', true) IS NOT NULL 
  AND current_setting('app.current_team_id', true) != ''
  AND current_setting('app.current_team_id', true) != 'UNKNOWN'
);

-- Allow system admin to manage teams_safe data
CREATE POLICY "System admin can manage teams_safe data"
ON public.teams_safe
FOR ALL
USING (
  current_setting('role') = 'service_role'
)
WITH CHECK (
  current_setting('role') = 'service_role'
);

-- Create a trigger to automatically sync teams_safe with teams table
-- This ensures teams_safe stays in sync without needing SECURITY DEFINER functions
CREATE OR REPLACE FUNCTION public.sync_teams_safe()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.teams_safe (team_id, team_name, created_at)
    VALUES (NEW.team_id, NEW.team_name, NEW.created_at)
    ON CONFLICT (team_id) DO UPDATE SET
      team_name = NEW.team_name,
      created_at = NEW.created_at;
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    UPDATE public.teams_safe SET
      team_name = NEW.team_name,
      created_at = NEW.created_at
    WHERE team_id = OLD.team_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    DELETE FROM public.teams_safe WHERE team_id = OLD.team_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY INVOKER SET search_path = public;

-- Create triggers to keep teams_safe in sync
CREATE TRIGGER sync_teams_safe_on_insert
  AFTER INSERT ON public.teams
  FOR EACH ROW EXECUTE FUNCTION public.sync_teams_safe();

CREATE TRIGGER sync_teams_safe_on_update  
  AFTER UPDATE ON public.teams
  FOR EACH ROW EXECUTE FUNCTION public.sync_teams_safe();

CREATE TRIGGER sync_teams_safe_on_delete
  AFTER DELETE ON public.teams  
  FOR EACH ROW EXECUTE FUNCTION public.sync_teams_safe();

-- Populate teams_safe with existing data
INSERT INTO public.teams_safe (team_id, team_name, created_at)
SELECT team_id, team_name, created_at 
FROM public.teams
ON CONFLICT (team_id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  created_at = EXCLUDED.created_at;