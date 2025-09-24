-- Create secure data masking functions for teams data
CREATE OR REPLACE FUNCTION public.mask_email(email_value text, viewer_team_id text, owner_team_id text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- If viewing own team data, return full email
  IF viewer_team_id = owner_team_id THEN
    RETURN email_value;
  END IF;
  
  -- Otherwise, mask the email
  IF email_value IS NOT NULL AND length(email_value) > 0 THEN
    RETURN substring(email_value, 1, 1) || '***@' || split_part(email_value, '@', 2);
  END IF;
  
  RETURN '***@***.***';
END;
$function$;

CREATE OR REPLACE FUNCTION public.mask_phone(phone_value text, viewer_team_id text, owner_team_id text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- If viewing own team data, return full phone
  IF viewer_team_id = owner_team_id THEN
    RETURN phone_value;
  END IF;
  
  -- Otherwise, mask the phone
  IF phone_value IS NOT NULL AND length(phone_value) > 4 THEN
    RETURN left(phone_value, 4) || '****' || right(phone_value, 2);
  END IF;
  
  RETURN '****-****';
END;
$function$;

CREATE OR REPLACE FUNCTION public.mask_cnpj(cnpj_value text, viewer_team_id text, owner_team_id text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- If viewing own team data, return full CNPJ
  IF viewer_team_id = owner_team_id THEN
    RETURN cnpj_value;
  END IF;
  
  -- Otherwise, mask the CNPJ
  RETURN '**.***.***/****-**';
END;
$function$;

CREATE OR REPLACE FUNCTION public.mask_responsible_name(name_value text, viewer_team_id text, owner_team_id text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- If viewing own team data, return full name
  IF viewer_team_id = owner_team_id THEN
    RETURN name_value;
  END IF;
  
  -- Otherwise, mask the name
  IF name_value IS NOT NULL AND length(name_value) > 0 THEN
    RETURN substring(name_value, 1, 1) || '*** ***';
  END IF;
  
  RETURN '*** ***';
END;
$function$;