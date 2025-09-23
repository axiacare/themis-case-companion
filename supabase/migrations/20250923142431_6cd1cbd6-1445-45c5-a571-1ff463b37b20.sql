-- Fix search path security warning for webhook validation function
CREATE OR REPLACE FUNCTION public.validate_webhook_url(p_url text)
RETURNS boolean
LANGUAGE plpgsql
IMMUTABLE
SECURITY DEFINER
SET search_path = public
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