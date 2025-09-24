-- Fix the admin_authenticate function to use proper casting
CREATE OR REPLACE FUNCTION public.admin_authenticate(p_username text, p_password text, p_ip_address text DEFAULT NULL::text, p_user_agent text DEFAULT NULL::text)
 RETURNS TABLE(success boolean, session_token text, admin_data jsonb, error_message text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  admin_record record;
  new_session_token text;
  session_expires_at timestamp with time zone;
  password_hash_to_check text;
BEGIN
  -- Calculate hash of provided password (using proper casting)
  password_hash_to_check := encode(digest(p_password::bytea, 'sha256'), 'base64');
  
  -- Get admin user data
  SELECT au.id, au.username, au.password_hash, au.email, au.failed_login_attempts, 
         au.locked_until, au.is_active
  INTO admin_record
  FROM admin_users au
  WHERE au.username = p_username AND au.is_active = true;
  
  -- Check if account exists
  IF admin_record.id IS NULL THEN
    -- Log failed login attempt
    INSERT INTO audit_logs (team_id, action, target_table, accessed_fields, ip_address, user_agent)
    VALUES ('ADMIN_UNKNOWN', 'ADMIN_LOGIN_FAILED_USER_NOT_FOUND', 'admin_users', ARRAY[p_username], p_ip_address, p_user_agent);
    
    RETURN QUERY SELECT false, null::text, null::jsonb, 'Invalid credentials'::text;
    RETURN;
  END IF;
  
  -- Check if account is locked
  IF admin_record.locked_until IS NOT NULL AND admin_record.locked_until > now() THEN
    -- Log locked account attempt
    INSERT INTO audit_logs (team_id, action, target_table, target_team_id, accessed_fields, ip_address, user_agent)
    VALUES ('ADMIN_LOCKED', 'ADMIN_LOGIN_BLOCKED_LOCKED', 'admin_users', admin_record.id::text, ARRAY['locked_until'], p_ip_address, p_user_agent);
    
    RETURN QUERY SELECT false, null::text, null::jsonb, 'Account temporarily locked due to failed login attempts'::text;
    RETURN;
  END IF;
  
  -- Verify password
  IF admin_record.password_hash = password_hash_to_check THEN
    -- Generate secure session token
    new_session_token := encode(gen_random_bytes(32), 'base64');
    session_expires_at := now() + interval '8 hours'; -- 8-hour session
    
    -- Create admin session
    INSERT INTO admin_sessions (admin_user_id, session_token, expires_at, ip_address, user_agent)
    VALUES (admin_record.id, new_session_token, session_expires_at, p_ip_address, p_user_agent);
    
    -- Reset failed attempts and update last login
    UPDATE admin_users SET 
      failed_login_attempts = 0,
      locked_until = NULL,
      last_login_at = now()
    WHERE id = admin_record.id;
    
    -- Log successful login
    INSERT INTO audit_logs (team_id, action, target_table, target_team_id, accessed_fields, ip_address, user_agent)
    VALUES ('ADMIN_SUCCESS', 'ADMIN_LOGIN_SUCCESS', 'admin_users', admin_record.id::text, ARRAY['session_created'], p_ip_address, p_user_agent);
    
    -- Return success with session token and admin data
    RETURN QUERY SELECT 
      true,
      new_session_token,
      jsonb_build_object(
        'id', admin_record.id,
        'username', admin_record.username,
        'email', admin_record.email
      ),
      null::text;
  ELSE
    -- Increment failed attempts
    UPDATE admin_users SET 
      failed_login_attempts = COALESCE(failed_login_attempts, 0) + 1,
      locked_until = CASE 
        WHEN COALESCE(failed_login_attempts, 0) + 1 >= 5 
        THEN now() + interval '15 minutes'
        ELSE NULL
      END
    WHERE id = admin_record.id;
    
    -- Log failed login
    INSERT INTO audit_logs (team_id, action, target_table, target_team_id, accessed_fields, ip_address, user_agent)
    VALUES ('ADMIN_FAILED', 'ADMIN_LOGIN_FAILED_INVALID_PASSWORD', 'admin_users', admin_record.id::text, ARRAY['password_attempt'], p_ip_address, p_user_agent);
    
    RETURN QUERY SELECT false, null::text, null::jsonb, 'Invalid credentials'::text;
  END IF;
END;
$function$;