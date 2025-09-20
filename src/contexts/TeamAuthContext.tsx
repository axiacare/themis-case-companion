import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

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

  // Load team data from sessionStorage on mount
  useEffect(() => {
    const loadStoredTeamData = () => {
      const storedTeamData = sessionStorage.getItem('teamData');
      if (storedTeamData) {
        try {
          const parsedData = JSON.parse(storedTeamData);
          setTeamData(parsedData);
        } catch (error) {
          console.error('Error parsing stored team data:', error);
          sessionStorage.removeItem('teamData');
        }
      }
      setIsLoading(false);
    };

    loadStoredTeamData();
  }, []);

  const login = async (teamId: string, password: string): Promise<boolean> => {
    try {
      // Set team context for RLS
      await supabase.rpc('set_team_context', { p_team_id: teamId });
      
      // Query team from Supabase
      const { data: team, error } = await supabase
        .from('teams')
        .select('team_id, team_name, password_hash, email, responsible_name')
        .eq('team_id', teamId)
        .single();

      if (error || !team) {
        console.error('Team not found:', error);
        return false;
      }

      // Simple password verification (in production, use proper hashing)
      // For now, doing simple comparison since we don't have bcrypt in frontend
      const isPasswordValid = team.password_hash === password || 
        team.password_hash.includes(password); // Temporary for transition

      if (!isPasswordValid) {
        console.error('Invalid password');
        return false;
      }

      const newTeamData: TeamData = {
        team_id: team.team_id,
        team_name: team.team_name,
        email: team.email || undefined,
        responsible_name: team.responsible_name || undefined,
      };

      setTeamData(newTeamData);
      sessionStorage.setItem('teamData', JSON.stringify(newTeamData));
      return true;

    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setTeamData(null);
    sessionStorage.removeItem('teamData');
  };

  const isAuthenticated = !!teamData;

  return (
    <TeamAuthContext.Provider value={{ teamData, login, logout, isAuthenticated, isLoading }}>
      {children}
    </TeamAuthContext.Provider>
  );
};