-- Fix team_settings RLS policy gap to prevent unauthorized business data access
DROP POLICY IF EXISTS "Allow admin access to team_settings when no team context" ON public.team_settings;
DROP POLICY IF EXISTS "Team settings are completely isolated by team" ON public.team_settings;

-- Create proper RLS policies for team_settings
CREATE POLICY "Teams can only access their own settings"
ON public.team_settings
FOR ALL
USING (
  team_id = get_current_team_id() 
  AND get_current_team_id() IS NOT NULL 
  AND get_current_team_id() != '' 
  AND get_current_team_id() != 'UNKNOWN'
)
WITH CHECK (
  team_id = get_current_team_id() 
  AND get_current_team_id() IS NOT NULL 
  AND get_current_team_id() != '' 
  AND get_current_team_id() != 'UNKNOWN'
);

-- Admin access only through service role (not through public API)
CREATE POLICY "Only system admin can manage team settings"
ON public.team_settings
FOR ALL
USING (is_system_admin())
WITH CHECK (is_system_admin());