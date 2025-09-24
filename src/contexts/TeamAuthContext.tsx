import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { setSecureTeamData, getSecureTeamData, clearSecureTeamData } from '@/utils/security';

interface TeamData {
  team_id: string;
  team_name: string;
  email?: string;
  responsible_name?: string;
}

interface TeamAuthContextType {
  teamData: TeamData | null;
  login: (teamId: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const TeamAuthContext = createContext<TeamAuthContextType | undefined>(undefined);

export const useTeamAuth = () => {
  const context = useContext(TeamAuthContext);
  if (!context) {
    throw new Error('useTeamAuth must be used within a TeamAuthProvider');
  }
  return context;
};

interface TeamAuthProviderProps {
  children: ReactNode;
}

export const TeamAuthProvider: React.FC<TeamAuthProviderProps> = ({ children }) => {
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load team data from secure sessionStorage on mount
  useEffect(() => {
    const loadStoredTeamData = () => {
      const storedTeamData = getSecureTeamData();
      if (storedTeamData) {
        setTeamData(storedTeamData);
      }
      setIsLoading(false);
    };

    loadStoredTeamData();
  }, []);

  const login = async (teamId: string, password: string): Promise<boolean> => {
    try {
      // Use secure login function instead of direct table access
      const { data: loginResult, error } = await supabase.rpc('verify_team_login', {
        p_team_id: teamId,
        p_password: password
      });

      if (error) {
        console.error('Login function error:', error);
        return false;
      }

      // Check if login was successful
      const result = loginResult?.[0];
      if (!result?.success || !result?.team_data) {
        console.error('Invalid credentials');
        return false;
      }

      // Set team context for RLS after successful verification
      await supabase.rpc('set_team_context', { p_team_id: teamId });

      // Type assertion for team_data object
      const teamDataObj = result.team_data as {
        team_id: string;
        team_name: string;
        email?: string;
        responsible_name?: string;
      };

      const newTeamData: TeamData = {
        team_id: teamDataObj.team_id,
        team_name: teamDataObj.team_name,
        email: teamDataObj.email || undefined,
        responsible_name: teamDataObj.responsible_name || undefined,
      };

      setTeamData(newTeamData);
      // Store encrypted team data with session timeout
      setSecureTeamData(newTeamData);
      
      // Redirect to team dashboard after successful login
      window.location.href = '/central-equipe';
      return true;

    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setTeamData(null);
    clearSecureTeamData();
  };

  const isAuthenticated = !!teamData;

  return (
    <TeamAuthContext.Provider value={{ teamData, login, logout, isAuthenticated, isLoading }}>
      {children}
    </TeamAuthContext.Provider>
  );
};