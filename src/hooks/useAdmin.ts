import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface TeamStats {
  totalTeams: number;
  newThisMonth: number;
  totalCases: number;
}

export interface TeamWithStats {
  id: string;
  team_id: string;
  team_name: string;
  cnpj?: string;
  responsible_name?: string;
  email?: string;
  phone?: string;
  terms_document_url?: string;
  created_at: string;
  updated_at: string;
  cases_count?: number;
}

export const useAdmin = () => {
  const [teams, setTeams] = useState<TeamWithStats[]>([]);
  const [stats, setStats] = useState<TeamStats>({
    totalTeams: 0,
    newThisMonth: 0,
    totalCases: 0,
  });
  const [loading, setLoading] = useState(false);

  const loadTeams = async () => {
    try {
      setLoading(true);
      
      // Load teams using secure admin function
      const { data: teamsData, error: teamsError } = await supabase
        .rpc('admin_list_teams');

      if (teamsError) throw teamsError;

      // Load case counts per team
      const { data: casesData, error: casesError } = await supabase
        .from('cases')
        .select('team_id')
        .order('created_at', { ascending: false });

      if (casesError) {
        console.warn('Could not load cases data:', casesError);
      }

      // Count cases per team
      const caseCounts: Record<string, number> = {};
      if (casesData) {
        casesData.forEach(caseItem => {
          caseCounts[caseItem.team_id] = (caseCounts[caseItem.team_id] || 0) + 1;
        });
      }

      // Combine teams with case counts
      const teamsWithStats: TeamWithStats[] = (teamsData || []).map(team => ({
        ...team,
        cases_count: caseCounts[team.team_id] || 0,
      }));

      setTeams(teamsWithStats);

      // Calculate stats
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      const newThisMonth = teamsWithStats.filter(team => {
        const createdDate = new Date(team.created_at);
        return createdDate.getMonth() === currentMonth && 
               createdDate.getFullYear() === currentYear;
      }).length;

      const totalCases = Object.values(caseCounts).reduce((sum, count) => sum + count, 0);

      setStats({
        totalTeams: teamsWithStats.length,
        newThisMonth,
        totalCases,
      });

    } catch (error) {
      console.error('Error loading admin data:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createTeam = async (teamData: { 
    team_id: string; 
    team_name: string; 
    password: string;
    cnpj?: string;
    responsible_name?: string;
    email?: string;
    phone?: string;
    terms_document_url?: string;
  }) => {
    try {
      // Use secure admin function to create team
      const { data: teamId, error } = await supabase
        .rpc('admin_create_team', {
          p_team_id: teamData.team_id,
          p_team_name: teamData.team_name,
          p_password: teamData.password,
          p_cnpj: teamData.cnpj || null,
          p_responsible_name: teamData.responsible_name || null,
          p_email: teamData.email || null,
          p_phone: teamData.phone || null,
          p_terms_document_url: teamData.terms_document_url || null,
        });

      if (error) throw error;

      // Reload teams after creation
      await loadTeams();
      return true;
    } catch (error) {
      console.error('Error creating team:', error);
      throw error;
    }
  };

  const updateTeam = async (
    teamId: string, 
    updateData: { 
      team_name: string; 
      password?: string;
      cnpj?: string;
      responsible_name?: string;
      email?: string;
      phone?: string;
      terms_document_url?: string;
    }
  ) => {
    try {
      // Use secure admin function to update team
      const { data: success, error } = await supabase
        .rpc('admin_update_team', {
          p_team_uuid: teamId,
          p_team_name: updateData.team_name,
          p_password: updateData.password || null,
          p_cnpj: updateData.cnpj || null,
          p_responsible_name: updateData.responsible_name || null,
          p_email: updateData.email || null,
          p_phone: updateData.phone || null,
          p_terms_document_url: updateData.terms_document_url || null,
        });

      if (error) throw error;

      // Reload teams after update
      await loadTeams();
      return true;
    } catch (error) {
      console.error('Error updating team:', error);
      throw error;
    }
  };

  const deleteTeam = async (teamId: string) => {
    try {
      // Use secure admin function to delete team
      const { data: success, error } = await supabase
        .rpc('admin_delete_team', {
          p_team_uuid: teamId
        });

      if (error) throw error;

      // Reload teams after deletion
      await loadTeams();
      return true;
    } catch (error) {
      console.error('Error deleting team:', error);
      throw error;
    }
  };

  // Load data on mount
  useEffect(() => {
    loadTeams();
  }, []);

  return {
    teams,
    stats,
    loading,
    loadTeams,
    createTeam,
    updateTeam,
    deleteTeam,
  };
};