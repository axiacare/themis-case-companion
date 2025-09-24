-- Fix the admin_create_user function to properly hash passwords
CREATE OR REPLACE FUNCTION public.admin_create_user(p_username text, p_password text, p_email text DEFAULT NULL::text)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  new_admin_id uuid;
  password_hash text;
BEGIN
  -- Only allow system admin to create admin users
  IF NOT is_system_admin() THEN
    RAISE EXCEPTION 'Access denied: Only system admin can create admin users';
  END IF;
  
  -- Hash password using proper casting
  password_hash := encode(digest(p_password::bytea, 'sha256'), 'base64');
  
  -- Insert new admin user
  INSERT INTO admin_users (username, password_hash, email)
  VALUES (p_username, password_hash, p_email)
  RETURNING id INTO new_admin_id;
  
  -- Log admin user creation
  INSERT INTO audit_logs (team_id, action, target_table, target_team_id, accessed_fields)
  VALUES ('ADMIN_SYSTEM', 'ADMIN_USER_CREATED', 'admin_users', new_admin_id::text, ARRAY['username', 'email']);
  
  RETURN new_admin_id;
END;
$function$;