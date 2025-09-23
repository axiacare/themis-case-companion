import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useTeamAuth } from '@/contexts/TeamAuthContext';

export interface WebhookSettings {
  authWebhookUrl: string;
  teamWebhookUrl: string;
  caseWebhookUrl: string;
  webhookSecret?: string;
}

const EMPTY_SETTINGS: WebhookSettings = {
  authWebhookUrl: '',
  teamWebhookUrl: '',
  caseWebhookUrl: ''
};

export const useWebhookSettings = () => {
  const [settings, setSettings] = useState<WebhookSettings>(EMPTY_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { teamData } = useTeamAuth();

  useEffect(() => {
    if (teamData?.team_id) {
      loadWebhookSettings();
    } else {
      setIsLoading(false);
    }
  }, [teamData]);

  const loadWebhookSettings = async () => {
    if (!teamData?.team_id) return;
    
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('webhook_settings')
        .select('auth_webhook_url, team_webhook_url, case_webhook_url, webhook_secret')
        .eq('team_id', teamData.team_id)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw fetchError;
      }

      if (data) {
        setSettings({
          authWebhookUrl: data.auth_webhook_url || '',
          teamWebhookUrl: data.team_webhook_url || '',
          caseWebhookUrl: data.case_webhook_url || '',
          webhookSecret: data.webhook_secret || ''
        });
      } else {
        setSettings(EMPTY_SETTINGS);
      }
    } catch (err) {
      console.error('Error loading webhook settings:', err);
      setError('Failed to load webhook settings');
      setSettings(EMPTY_SETTINGS);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSettings = async (newSettings: WebhookSettings): Promise<{ success: boolean; error?: string }> => {
    if (!teamData?.team_id) {
      return { success: false, error: 'No team context available' };
    }

    try {
      setError(null);

      const { data, error: updateError } = await supabase.rpc('update_webhook_settings', {
        p_team_id: teamData.team_id,
        p_auth_webhook_url: newSettings.authWebhookUrl || null,
        p_team_webhook_url: newSettings.teamWebhookUrl || null,
        p_case_webhook_url: newSettings.caseWebhookUrl || null,
        p_webhook_secret: newSettings.webhookSecret || null
      });

      if (updateError) {
        throw updateError;
      }

      // Update local state on successful save
      setSettings(newSettings);
      return { success: true };
    } catch (err) {
      console.error('Error updating webhook settings:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to update webhook settings';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const validateWebhookUrl = (url: string): boolean => {
    if (!url) return true; // Empty URLs are allowed
    
    // Must be HTTPS
    if (!url.startsWith('https://')) return false;
    
    // Basic URL validation
    try {
      new URL(url);
    } catch {
      return false;
    }
    
    // Block test URLs
    const blockedPatterns = [
      'httpbin.org',
      'example.com',
      'test.com',
      'localhost',
      '127.0.0.1',
      '192.168.',
      '10.',
      '172.'
    ];
    
    return !blockedPatterns.some(pattern => url.includes(pattern));
  };

  return { 
    settings, 
    updateSettings, 
    isLoading, 
    error,
    validateWebhookUrl,
    refreshSettings: loadWebhookSettings
  };
};