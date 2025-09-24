-- Create secure admin function that masks sensitive data
CREATE OR REPLACE FUNCTION public.admin_list_teams_secure()
RETURNS TABLE(
  id uuid, 
  team_id text, 
  team_name text, 
  cnpj_masked text, 
  responsible_name_masked text, 
  email_masked text, 
  phone_masked text, 
  terms_document_url text, 
  created_at timestamp with time zone, 
  updated_at timestamp with time zone,
  total_cases bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Verify this is called by system admin only
  IF NOT is_system_admin() THEN
    RAISE EXCEPTION 'Access denied: Only system admin can list teams';
  END IF;
  
  -- Log administrative access to sensitive data
  INSERT INTO audit_logs (
    team_id, 
    action, 
    target_table, 
    accessed_fields
  ) VALUES (
    'ADMIN_SECURE', 
    'ADMIN_LIST_TEAMS_SECURE_MASKED', 
    'teams', 
    ARRAY['masked_sensitive_fields']
  );
  
  RETURN QUERY 
  SELECT 
    t.id,
    t.team_id,
    t.team_name,
    -- Mask sensitive data for admin view
    '**.***.***/****-**' as cnpj_masked,
    substring(t.responsible_name, 1, 1) || '*** ***' as responsible_name_masked,
    CASE 
      WHEN t.email IS NOT NULL THEN 
        substring(t.email, 1, 1) || '***@' || split_part(t.email, '@', 2)
      ELSE '***@***.***'
    END as email_masked,
    CASE 
      WHEN t.phone IS NOT NULL THEN 
        left(t.phone, 4) || '****' || right(t.phone, 2)
      ELSE '****-****'
    END as phone_masked,
    t.terms_document_url,
    t.created_at,
    t.updated_at,
    COALESCE(case_counts.total_cases, 0) as total_cases
  FROM teams t
  LEFT JOIN (
    SELECT team_id, COUNT(*) as total_cases
    FROM cases
    GROUP BY team_id
  ) case_counts ON t.team_id = case_counts.team_id
  ORDER BY t.created_at DESC;
END;
$function$;

-- Deprecate the original admin_list_teams function for security
CREATE OR REPLACE FUNCTION public.admin_list_teams()
RETURNS TABLE(id uuid, team_id text, team_name text, cnpj text, responsible_name text, email text, phone text, terms_document_url text, created_at timestamp with time zone, updated_at timestamp with time zone)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- SECURITY: This function is deprecated due to data exposure risks
  -- Use admin_list_teams_secure() instead
  RAISE EXCEPTION 'SECURITY: This function has been deprecated. Use admin_list_teams_secure() for masked data access.';
END;
$function$;