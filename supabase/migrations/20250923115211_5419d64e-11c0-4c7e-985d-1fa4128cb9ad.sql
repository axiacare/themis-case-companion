-- Fix critical security vulnerability: Team credentials exposed to public

-- First, ensure the teams table has bulletproof RLS policies
-- Drop existing policies to recreate them more securely
DROP POLICY IF EXISTS "Teams can read own basic data" ON public.teams;
DROP POLICY IF EXISTS "Teams can update own data" ON public.teams;

-- Create ultra-restrictive SELECT policy for teams table
-- This policy ensures ONLY the team that owns the data can see it
-- and BLOCKS all access when there's no valid team context
CREATE POLICY "Teams can only read their own data with valid context" 
ON public.teams 
FOR SELECT 
USING (
  team_id = get_current_team_id() 
  AND get_current_team_id() IS NOT NULL 
  AND get_current_team_id() != ''
  AND get_current_team_id() != 'UNKNOWN'
);

-- Create ultra-restrictive UPDATE policy for teams table
CREATE POLICY "Teams can only update their own data with valid context" 
ON public.teams 
FOR UPDATE 
USING (
  team_id = get_current_team_id() 
  AND get_current_team_id() IS NOT NULL 
  AND get_current_team_id() != ''
  AND get_current_team_id() != 'UNKNOWN'
);

-- CRITICAL FIX: teams_safe table currently has no RLS policies!
-- Enable RLS on teams_safe table
ALTER TABLE public.teams_safe ENABLE ROW LEVEL SECURITY;

-- Add policy to teams_safe table to require valid team context
CREATE POLICY "Teams safe data requires valid team context" 
ON public.teams_safe 
FOR SELECT 
USING (
  get_current_team_id() IS NOT NULL 
  AND get_current_team_id() != ''
  AND get_current_team_id() != 'UNKNOWN'
);

-- Strengthen audit_logs RLS policies
DROP POLICY IF EXISTS "Teams can only see their audit logs" ON public.audit_logs;

CREATE POLICY "Teams can only see their own audit logs" 
ON public.audit_logs 
FOR SELECT 
USING (
  team_id = get_current_team_id() 
  AND get_current_team_id() IS NOT NULL 
  AND get_current_team_id() != ''
  AND get_current_team_id() != 'UNKNOWN'
);

-- Add INSERT policy for audit logs
CREATE POLICY "Teams can create their own audit logs" 
ON public.audit_logs 
FOR INSERT 
WITH CHECK (
  team_id = get_current_team_id() 
  AND get_current_team_id() IS NOT NULL 
  AND get_current_team_id() != ''
  AND get_current_team_id() != 'UNKNOWN'
);

-- Create secure function to replace direct teams_safe access
-- This function includes proper access logging and validation
CREATE OR REPLACE FUNCTION public.get_teams_safe_secure()
RETURNS TABLE(team_id text, team_name text, created_at timestamp with time zone)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Ensure there's a valid team context
  IF get_current_team_id() IS NULL OR get_current_team_id() = '' OR get_current_team_id() = 'UNKNOWN' THEN
    -- Log unauthorized access attempt
    INSERT INTO audit_logs (
      team_id, 
      action, 
      target_table, 
      accessed_fields
    ) VALUES (
      'UNAUTHORIZED', 
      'BLOCKED_ACCESS_TEAMS_SAFE', 
      'teams_safe', 
      ARRAY['attempted_unauthorized_access']
    );
    
    -- Return empty result
    RETURN;
  END IF;
  
  -- Return only basic team information (no sensitive data)
  RETURN QUERY 
  SELECT 
    t.team_id,
    t.team_name,
    t.created_at
  FROM teams t
  WHERE t.team_id = get_current_team_id()
  ORDER BY t.created_at DESC;
  
  -- Log authorized access
  PERFORM log_sensitive_access(
    'VIEW_TEAMS_SAFE_AUTHORIZED', 
    'teams', 
    get_current_team_id(), 
    ARRAY['team_id', 'team_name', 'created_at']
  );
END;
$$;

-- Create a completely safe public view that excludes ALL sensitive fields
CREATE OR REPLACE VIEW public.teams_public_info AS
SELECT 
  team_id,
  team_name,
  created_at
FROM public.teams
WHERE team_id = get_current_team_id()
  AND get_current_team_id() IS NOT NULL 
  AND get_current_team_id() != ''
  AND get_current_team_id() != 'UNKNOWN';

-- Enable security barrier on the view
ALTER VIEW public.teams_public_info SET (security_barrier = on);