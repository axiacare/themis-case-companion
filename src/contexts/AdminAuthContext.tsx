import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminData {
  id: string;
  username: string;
  email?: string;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  adminData: AdminData | null;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    checkExistingSession();
  }, []);

  const checkExistingSession = async () => {
    try {
      const sessionToken = localStorage.getItem('admin_session_token');
      if (!sessionToken) {
        setIsLoading(false);
        return;
      }

      // Validate session with database
      const { data, error } = await supabase.rpc('admin_validate_session', {
        p_session_token: sessionToken
      });

      if (error) {
        console.error('Session validation error:', error);
        clearSession();
        return;
      }

      if (data && data.length > 0 && data[0].valid) {
        setIsAuthenticated(true);
        setAdminData(data[0].admin_data as unknown as AdminData);
      } else {
        clearSession();
      }
    } catch (error) {
      console.error('Error checking session:', error);
      clearSession();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);

      // Get client IP and user agent for security logging
      const userAgent = navigator.userAgent;
      
      const { data, error } = await supabase.rpc('admin_authenticate', {
        p_username: username,
        p_password: password,
        p_ip_address: null, // Will be null from client side
        p_user_agent: userAgent
      });

      if (error) {
        console.error('Authentication error:', error);
        return { success: false, error: 'Authentication failed' };
      }

      if (data && data.length > 0) {
        const authResult = data[0];
        
        if (authResult.success && authResult.session_token) {
          // Store session token securely
          localStorage.setItem('admin_session_token', authResult.session_token);
          setIsAuthenticated(true);
          setAdminData(authResult.admin_data as unknown as AdminData);
          return { success: true };
        } else {
          return { 
            success: false, 
            error: authResult.error_message || 'Invalid credentials' 
          };
        }
      }

      return { success: false, error: 'Authentication failed' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error occurred' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const sessionToken = localStorage.getItem('admin_session_token');
      
      if (sessionToken) {
        // Logout on server side
        await supabase.rpc('admin_logout', {
          p_session_token: sessionToken
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearSession();
    }
  };

  const clearSession = () => {
    localStorage.removeItem('admin_session_token');
    setIsAuthenticated(false);
    setAdminData(null);
  };

  return (
    <AdminAuthContext.Provider value={{ 
      isAuthenticated, 
      adminData,
      login, 
      logout, 
      isLoading 
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};