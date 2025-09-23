-- Create secure admin authentication system
CREATE TABLE public.admin_users (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  email text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  last_login_at timestamp with time zone,
  failed_login_attempts integer DEFAULT 0,
  locked_until timestamp with time zone,
  is_active boolean DEFAULT true
);

-- Admin sessions table for secure session management
CREATE TABLE public.admin_sessions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_user_id uuid NOT NULL REFERENCES public.admin_users(id) ON DELETE CASCADE,
  session_token text NOT NULL UNIQUE,
  expires_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  ip_address text,
  user_agent text,
  is_active boolean DEFAULT true
);

-- Webhook settings table (moving from localStorage to database)
CREATE TABLE public.webhook_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id text NOT NULL,
  auth_webhook_url text,
  team_webhook_url text,
  case_webhook_url text,
  webhook_secret text, -- for webhook signature verification
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(team_id)
);

-- Enable RLS on new tables
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin_users - only system admin can access
CREATE POLICY "Only system admin can manage admin users"
ON public.admin_users
FOR ALL
USING (is_system_admin());

-- RLS Policies for admin_sessions - only system admin can access
CREATE POLICY "Only system admin can manage admin sessions"
ON public.admin_sessions
FOR ALL
USING (is_system_admin());

-- RLS Policies for webhook_settings - teams can only access their own settings
CREATE POLICY "Teams can manage their own webhook settings"
ON public.webhook_settings
FOR ALL
USING (team_id = get_current_team_id() AND get_current_team_id() IS NOT NULL AND get_current_team_id() != '');

CREATE POLICY "Allow admin access to webhook settings when no team context"
ON public.webhook_settings
FOR ALL
USING ((get_current_team_id() IS NULL) OR (get_current_team_id() = ''));

-- Triggers for updated_at columns
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON public.admin_users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_webhook_settings_updated_at
  BEFORE UPDATE ON public.webhook_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Secure admin authentication function
CREATE OR REPLACE FUNCTION public.admin_authenticate(
  p_username text,
  p_password text,
  p_ip_address text DEFAULT NULL,
  p_user_agent text DEFAULT NULL
)
RETURNS TABLE(success boolean, session_token text, admin_data jsonb, error_message text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_record record;
  new_session_token text;
  session_expires_at timestamp with time zone;
  password_hash_to_check text;
BEGIN
  -- Calculate hash of provided password (using same method as team auth)
  password_hash_to_check := encode(digest(p_password, 'sha256'), 'base64');
  
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
$$;

-- Admin session validation function
CREATE OR REPLACE FUNCTION public.admin_validate_session(p_session_token text)
RETURNS TABLE(valid boolean, admin_data jsonb)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  session_record record;
  admin_record record;
BEGIN
  -- Get session and admin data
  SELECT s.id, s.admin_user_id, s.expires_at, s.is_active,
         u.id as admin_id, u.username, u.email, u.is_active as user_active
  INTO session_record
  FROM admin_sessions s
  JOIN admin_users u ON s.admin_user_id = u.id
  WHERE s.session_token = p_session_token
    AND s.is_active = true
    AND u.is_active = true
    AND s.expires_at > now();
  
  IF session_record.id IS NOT NULL THEN
    -- Update session last activity (extend session if needed)
    UPDATE admin_sessions SET expires_at = now() + interval '8 hours'
    WHERE id = session_record.id;
    
    RETURN QUERY SELECT 
      true,
      jsonb_build_object(
        'id', session_record.admin_id,
        'username', session_record.username,
        'email', session_record.email
      );
  ELSE
    RETURN QUERY SELECT false, null::jsonb;
  END IF;
END;
$$;

-- Admin logout function
CREATE OR REPLACE FUNCTION public.admin_logout(p_session_token text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Deactivate session
  UPDATE admin_sessions 
  SET is_active = false 
  WHERE session_token = p_session_token;
  
  -- Log logout
  INSERT INTO audit_logs (team_id, action, target_table, accessed_fields)
  VALUES ('ADMIN_LOGOUT', 'ADMIN_LOGOUT', 'admin_sessions', ARRAY['session_deactivated']);
  
  RETURN FOUND;
END;
$$;

-- Function to create admin user (for initial setup)
CREATE OR REPLACE FUNCTION public.admin_create_user(
  p_username text,
  p_password text,
  p_email text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_admin_id uuid;
  password_hash text;
BEGIN
  -- Only allow system admin to create admin users
  IF NOT is_system_admin() THEN
    RAISE EXCEPTION 'Access denied: Only system admin can create admin users';
  END IF;
  
  -- Hash password
  password_hash := encode(digest(p_password, 'sha256'), 'base64');
  
  -- Insert new admin user
  INSERT INTO admin_users (username, password_hash, email)
  VALUES (p_username, password_hash, p_email)
  RETURNING id INTO new_admin_id;
  
  -- Log admin user creation
  INSERT INTO audit_logs (team_id, action, target_table, target_team_id, accessed_fields)
  VALUES ('ADMIN_SYSTEM', 'ADMIN_USER_CREATED', 'admin_users', new_admin_id::text, ARRAY['username', 'email']);
  
  RETURN new_admin_id;
END;
$$;

-- Webhook URL validation function
CREATE OR REPLACE FUNCTION public.validate_webhook_url(p_url text)
RETURNS boolean
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
  -- Basic URL validation
  IF p_url IS NULL OR p_url = '' THEN
    RETURN false;
  END IF;
  
  -- Must start with https:// for security
  IF NOT p_url ~ '^https://[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(/.*)?$' THEN
    RETURN false;
  END IF;
  
  -- Block localhost, 127.0.0.1, and private IP ranges for security
  IF p_url ~ 'localhost|127\.0\.0\.1|192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[01])\.' THEN
    RETURN false;
  END IF;
  
  -- Block httpbin.org and other test URLs
  IF p_url ~ 'httpbin\.org|example\.com|test\.com' THEN
    RETURN false;
  END IF;
  
  RETURN true;
END;
$$;

-- Function to update webhook settings
CREATE OR REPLACE FUNCTION public.update_webhook_settings(
  p_team_id text,
  p_auth_webhook_url text DEFAULT NULL,
  p_team_webhook_url text DEFAULT NULL,
  p_case_webhook_url text DEFAULT NULL,
  p_webhook_secret text DEFAULT NULL
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Validate team context or admin access
  IF (get_current_team_id() IS NULL OR get_current_team_id() = '') AND p_team_id != get_current_team_id() THEN
    -- Admin access allowed when no team context
    IF get_current_team_id() IS NOT NULL AND get_current_team_id() != '' THEN
      RAISE EXCEPTION 'Access denied: Cannot update webhook settings for other teams';
    END IF;
  END IF;
  
  -- Validate webhook URLs
  IF p_auth_webhook_url IS NOT NULL AND NOT validate_webhook_url(p_auth_webhook_url) THEN
    RAISE EXCEPTION 'Invalid auth webhook URL: Must be HTTPS and not a test/localhost URL';
  END IF;
  
  IF p_team_webhook_url IS NOT NULL AND NOT validate_webhook_url(p_team_webhook_url) THEN
    RAISE EXCEPTION 'Invalid team webhook URL: Must be HTTPS and not a test/localhost URL';
  END IF;
  
  IF p_case_webhook_url IS NOT NULL AND NOT validate_webhook_url(p_case_webhook_url) THEN
    RAISE EXCEPTION 'Invalid case webhook URL: Must be HTTPS and not a test/localhost URL';
  END IF;
  
  -- Insert or update webhook settings
  INSERT INTO webhook_settings (team_id, auth_webhook_url, team_webhook_url, case_webhook_url, webhook_secret)
  VALUES (p_team_id, p_auth_webhook_url, p_team_webhook_url, p_case_webhook_url, p_webhook_secret)
  ON CONFLICT (team_id) DO UPDATE SET
    auth_webhook_url = COALESCE(EXCLUDED.auth_webhook_url, webhook_settings.auth_webhook_url),
    team_webhook_url = COALESCE(EXCLUDED.team_webhook_url, webhook_settings.team_webhook_url),
    case_webhook_url = COALESCE(EXCLUDED.case_webhook_url, webhook_settings.case_webhook_url),
    webhook_secret = COALESCE(EXCLUDED.webhook_secret, webhook_settings.webhook_secret),
    updated_at = now();
  
  -- Log webhook settings update
  INSERT INTO audit_logs (
    team_id, action, target_table, target_team_id, accessed_fields
  ) VALUES (
    COALESCE(get_current_team_id(), 'ADMIN'), 
    'WEBHOOK_SETTINGS_UPDATED', 
    'webhook_settings', 
    p_team_id, 
    ARRAY['webhook_urls_updated']
  );
  
  RETURN true;
END;
$$;

-- Create indexes for performance
CREATE INDEX idx_admin_sessions_token ON public.admin_sessions(session_token);
CREATE INDEX idx_admin_sessions_expires ON public.admin_sessions(expires_at);
CREATE INDEX idx_admin_users_username ON public.admin_users(username);
CREATE INDEX idx_webhook_settings_team_id ON public.webhook_settings(team_id);