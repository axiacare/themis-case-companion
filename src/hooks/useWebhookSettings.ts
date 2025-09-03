import { useState, useEffect } from 'react';

export interface WebhookSettings {
  authWebhookUrl: string;
  teamWebhookUrl: string;
  caseWebhookUrl: string;
}

const DEFAULT_SETTINGS: WebhookSettings = {
  authWebhookUrl: '',
  teamWebhookUrl: '',
  caseWebhookUrl: ''
};

export const useWebhookSettings = () => {
  const [settings, setSettings] = useState<WebhookSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const stored = localStorage.getItem('webhookSettings');
    if (stored) {
      try {
        setSettings(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing webhook settings:', error);
      }
    }
  }, []);

  const updateSettings = (newSettings: WebhookSettings) => {
    setSettings(newSettings);
    localStorage.setItem('webhookSettings', JSON.stringify(newSettings));
  };

  return { settings, updateSettings };
};