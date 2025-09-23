-- Security Enhancement: Separate authentication data from general team data

-- Step 1: Create dedicated authentication table
CREATE TABLE public.team_auth (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  webhook_url TEXT,
  last_login_at TIMESTAMP WITH TIME ZONE,
  failed_login_attempts INTEGER DEFAULT 0,
  locked_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Step 2: Enable RLS on team_auth table
ALTER TABLE public.team_auth ENABLE ROW LEVEL SECURITY;

-- Step 3: Create strict RLS policies for team_auth
CREATE POLICY "Only system admin can access team_auth" 
ON public.team_auth 
FOR ALL 
USING (is_system_admin());

-- Step 4: Migrate existing authentication data
INSERT INTO public.team_auth (team_id, password_hash, webhook_url)
SELECT team_id, password_hash, webhook_url
FROM public.teams
WHERE password_hash IS NOT NULL;

-- Step 5: Remove sensitive columns from teams table
ALTER TABLE public.teams DROP COLUMN IF EXISTS password_hash;
ALTER TABLE public.teams DROP COLUMN IF EXISTS webhook_url;

-- Step 6: Add trigger for updated_at on team_auth
CREATE TRIGGER update_team_auth_updated_at
BEFORE UPDATE ON public.team_auth
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Step 7: Update verify_team_login function to use separated tables
CREATE OR REPLACE FUNCTION public.verify_team_login(p_team_id text, p_password text)
RETURNS TABLE(success boolean, team_data jsonb)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  team_record record;
  auth_record record;
  is_valid boolean := false;
  password_hash_to_check text;
BEGIN
  -- Calculate hash of provided password
  password_hash_to_check := encode(digest(p_password, 'sha256'), 'base64');
  
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
$$;

-- Step 8: Update admin_create_team function to use separated tables
CREATE OR REPLACE FUNCTION public.admin_create_team(
  p_team_id text, 
  p_team_name text, 
  p_password text, 
  p_cnpj text DEFAULT NULL::text, 
  p_responsible_name text DEFAULT NULL::text, 
  p_email text DEFAULT NULL::text, 
  p_phone text DEFAULT NULL::text, 
  p_terms_document_url text DEFAULT NULL::text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  new_team_uuid uuid;
BEGIN
  -- Verify admin access
  IF get_current_team_id() IS NOT NULL AND get_current_team_id() != '' THEN
    RAISE EXCEPTION 'Access denied: Admin function called from team context';
  END IF;
  
  -- Insert team general data
  INSERT INTO teams (
    team_id, team_name, cnpj, responsible_name, 
    email, phone, terms_document_url
  ) VALUES (
    p_team_id, p_team_name, p_cnpj, p_responsible_name, 
    p_email, p_phone, p_terms_document_url
  ) RETURNING id INTO new_team_uuid;
  
  -- Insert authentication data separately
  INSERT INTO team_auth (team_id, password_hash)
  VALUES (p_team_id, encode(digest(p_password, 'sha256'), 'base64'));
  
  RETURN new_team_uuid;
END;
$$;

-- Step 9: Update admin_update_team function
CREATE OR REPLACE FUNCTION public.admin_update_team(
  p_team_uuid uuid, 
  p_team_name text, 
  p_password text DEFAULT NULL::text, 
  p_cnpj text DEFAULT NULL::text, 
  p_responsible_name text DEFAULT NULL::text, 
  p_email text DEFAULT NULL::text, 
  p_phone text DEFAULT NULL::text, 
  p_terms_document_url text DEFAULT NULL::text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  target_team_id text;
BEGIN
  -- Verify admin access
  IF get_current_team_id() IS NOT NULL AND get_current_team_id() != '' THEN
    RAISE EXCEPTION 'Access denied: Admin function called from team context';
  END IF;
  
  -- Get team_id from UUID
  SELECT team_id INTO target_team_id FROM teams WHERE id = p_team_uuid;
  
  IF target_team_id IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- Update team general data
  UPDATE teams SET
    team_name = p_team_name,
    cnpj = p_cnpj,
    responsible_name = p_responsible_name,
    email = p_email,
    phone = p_phone,
    terms_document_url = p_terms_document_url,
    updated_at = now()
  WHERE id = p_team_uuid;
  
  -- Update password if provided
  IF p_password IS NOT NULL THEN
    UPDATE team_auth SET
      password_hash = encode(digest(p_password, 'sha256'), 'base64'),
      updated_at = now()
    WHERE team_id = target_team_id;
  END IF;
  
  RETURN FOUND;
END;
$$;

-- Step 10: Update admin_delete_team function
CREATE OR REPLACE FUNCTION public.admin_delete_team(p_team_uuid uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  target_team_id text;
BEGIN
  -- Verify admin access
  IF get_current_team_id() IS NOT NULL AND get_current_team_id() != '' THEN
    RAISE EXCEPTION 'Access denied: Admin function called from team context';
  END IF;
  
  -- Get team_id from UUID
  SELECT team_id INTO target_team_id FROM teams WHERE id = p_team_uuid;
  
  IF target_team_id IS NOT NULL THEN
    -- Delete authentication data first (due to foreign key constraints)
    DELETE FROM team_auth WHERE team_id = target_team_id;
    -- Delete team data
    DELETE FROM teams WHERE id = p_team_uuid;
    RETURN TRUE;
  END IF;
  
  RETURN FALSE;
END;
$$;