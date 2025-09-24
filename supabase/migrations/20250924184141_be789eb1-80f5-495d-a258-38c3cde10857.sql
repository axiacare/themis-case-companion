-- Fix the verify_team_login function for consistency  
CREATE OR REPLACE FUNCTION public.verify_team_login(p_team_id text, p_password text)
 RETURNS TABLE(success boolean, team_data jsonb)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  team_record record;
  auth_record record;
  is_valid boolean := false;
  password_hash_to_check text;
BEGIN
  -- Calculate hash of provided password (using proper casting)
  password_hash_to_check := encode(digest(p_password::bytea, 'sha256'), 'base64');
  
  -- Get authentication data
  SELECT ta.team_id, ta.password_hash, ta.failed_login_attempts, ta.locked_until
  INTO auth_record
  FROM team_auth ta
  WHERE ta.team_id = p_team_id;
  
  -- Check if account is locked
  IF auth_record.locked_until IS NOT NULL AND auth_record.locked_until > now() THEN
    RETURN QUERY SELECT false as success, jsonb_build_object('error', 'account_locked') as team_data;
    RETURN;
  END IF;
  
  -- Get team general data
  SELECT t.team_id, t.team_name, t.email, t.responsible_name
  INTO team_record
  FROM teams t
  WHERE t.team_id = p_team_id;
  
  -- Verify credentials
  IF auth_record.team_id IS NOT NULL AND team_record.team_id IS NOT NULL THEN
    is_valid := (auth_record.password_hash = password_hash_to_check);
  END IF;
  
  IF is_valid THEN
    -- Reset failed attempts and update last login
    UPDATE team_auth SET 
      failed_login_attempts = 0,
      locked_until = NULL,
      last_login_at = now()
    WHERE team_id = p_team_id;
    
    -- Return team data without sensitive information
    RETURN QUERY SELECT 
      true as success,
      jsonb_build_object(
        'team_id', team_record.team_id,
        'team_name', team_record.team_name,
        'email', team_record.email,
        'responsible_name', team_record.responsible_name
      ) as team_data;
      
    -- Log successful login
    PERFORM log_sensitive_access(
      'LOGIN_SUCCESS', 
      'teams', 
      team_record.team_id, 
      ARRAY['team_id', 'team_name', 'email', 'responsible_name']
    );
  ELSE
    -- Increment failed attempts
    UPDATE team_auth SET 
      failed_login_attempts = COALESCE(failed_login_attempts, 0) + 1,
      locked_until = CASE 
        WHEN COALESCE(failed_login_attempts, 0) + 1 >= 5 
        THEN now() + interval '15 minutes'
        ELSE NULL
      END
    WHERE team_id = p_team_id;
    
    -- Log failed login attempt
    INSERT INTO audit_logs (
      team_id, 
      action, 
      target_table, 
      target_team_id, 
      accessed_fields
    ) VALUES (
      'UNKNOWN', 
      'LOGIN_FAILED', 
      'team_auth', 
      p_team_id, 
      ARRAY['password_attempt']
    );
    
    RETURN QUERY SELECT false as success, null::jsonb as team_data;
  END IF;
END;
$function$;