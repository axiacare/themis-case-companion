import { useEffect } from 'react';

/**
 * Security Headers Component
 * Adds client-side security measures and CSP-like protections
 */
const SecurityHeaders = () => {
  useEffect(() => {
    // Add security meta tags dynamically
    const addSecurityMeta = () => {
      // Content Security Policy (basic client-side implementation)
      const csp = document.createElement('meta');
      csp.httpEquiv = 'Content-Security-Policy';
      csp.content = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://ugtpnxtlnzocwrlbxnux.supabase.co;";
      
      // X-Content-Type-Options
      const noSniff = document.createElement('meta');
      noSniff.httpEquiv = 'X-Content-Type-Options';
      noSniff.content = 'nosniff';
      
      // X-Frame-Options
      const frameOptions = document.createElement('meta');
      frameOptions.httpEquiv = 'X-Frame-Options';
      frameOptions.content = 'DENY';
      
      // X-XSS-Protection
      const xssProtection = document.createElement('meta');
      xssProtection.httpEquiv = 'X-XSS-Protection';
      xssProtection.content = '1; mode=block';
      
      // Referrer Policy
      const referrerPolicy = document.createElement('meta');
      referrerPolicy.name = 'referrer';
      referrerPolicy.content = 'strict-origin-when-cross-origin';
      
      // Only add if not already present
      if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
        document.head.appendChild(csp);
      }
      if (!document.querySelector('meta[http-equiv="X-Content-Type-Options"]')) {
        document.head.appendChild(noSniff);
      }
      if (!document.querySelector('meta[http-equiv="X-Frame-Options"]')) {
        document.head.appendChild(frameOptions);
      }
      if (!document.querySelector('meta[http-equiv="X-XSS-Protection"]')) {
        document.head.appendChild(xssProtection);
      }
      if (!document.querySelector('meta[name="referrer"]')) {
        document.head.appendChild(referrerPolicy);
      }
    };

    // Security event listeners
    const addSecurityListeners = () => {
      // Disable right-click context menu on production
      if (window.location.hostname !== 'localhost') {
        document.addEventListener('contextmenu', (e) => {
          e.preventDefault();
        });
      }

      // Disable common developer shortcuts on production
      if (window.location.hostname !== 'localhost') {
        document.addEventListener('keydown', (e) => {
          // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
          if (
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
            (e.ctrlKey && e.key === 'U')
          ) {
            e.preventDefault();
          }
        });
      }

      // Clear sensitive data on page unload
      window.addEventListener('beforeunload', () => {
        // Clear any sensitive form data
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
          const inputs = form.querySelectorAll('input[type="password"]');
          inputs.forEach((input: HTMLInputElement) => {
            input.value = '';
          });
        });
      });
    };

    addSecurityMeta();
    addSecurityListeners();

    // Cleanup function
    return () => {
      // Remove event listeners if needed
      document.removeEventListener('contextmenu', () => {});
      document.removeEventListener('keydown', () => {});
    };
  }, []);

  return null; // This component doesn't render anything
};

export default SecurityHeaders;