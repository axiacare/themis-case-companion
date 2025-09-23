-- Fix security definer view warning
-- Remove security_barrier setting from teams_safe view and ensure proper access control

-- Drop the current teams_safe view and recreate without security_barrier
DROP VIEW IF EXISTS public.teams_safe;

-- Recreate teams_safe view without security_barrier 
-- The view will rely on the underlying table's RLS policies for security
CREATE VIEW public.teams_safe AS
SELECT 
  team_id,
  team_name,
  created_at
FROM public.teams
WHERE team_id = get_current_team_id()
  AND get_current_team_id() IS NOT NULL 
  AND get_current_team_id() != ''
  AND get_current_team_id() != 'UNKNOWN';

-- No security_barrier setting - rely on underlying table RLS policies for security