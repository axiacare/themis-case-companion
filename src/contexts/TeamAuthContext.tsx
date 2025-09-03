import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TeamData {
  team_id: string;
  team_name: string;
}

interface TeamAuthContextType {
  teamData: TeamData | null;
  login: (teamId: string, password: string, webhookUrl: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
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

  // Load team data from sessionStorage on mount
  useEffect(() => {
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
  }, []);

  const login = async (teamId: string, password: string, webhookUrl: string): Promise<boolean> => {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          team_id: teamId,
          team_password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.ok && data.team_name) {
          const newTeamData = {
            team_id: teamId,
            team_name: data.team_name,
          };
          setTeamData(newTeamData);
          sessionStorage.setItem('teamData', JSON.stringify(newTeamData));
          return true;
        }
      }
      return false;
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
    <TeamAuthContext.Provider value={{ teamData, login, logout, isAuthenticated }}>
      {children}
    </TeamAuthContext.Provider>
  );
};