import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SiteSettings {
  site_name: string;
  logo_text: string;
  logo_url: string;
  hero_title: string;
  hero_subtitle: string;
  hero_image: string;
  about_title: string;
  about_description: string;
  about_image: string;
  ceo_name: string;
  ceo_role: string;
  ceo_image: string;
  contact_phone: string;
  contact_email: string;
  contact_address: string;
  team_members: string; // JSON string
}

interface SiteContextType {
  settings: SiteSettings | null;
  loading: boolean;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
  refreshSettings: () => Promise<void>;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    if (!settings) return;
    const updated = { ...settings, ...newSettings };
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (response.ok) {
        setSettings(updated);
      }
    } catch (error) {
      console.error('Failed to update settings:', error);
    }
  };

  return (
    <SiteContext.Provider value={{ settings, loading, updateSettings, refreshSettings: fetchSettings }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
}
