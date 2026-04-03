'use client';

import { Settings as SettingsIcon, Save, Key, Server, Webhook, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { fetchSettings, updateSettings } from '@/lib/api';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    openaiKey: '',
    wpUrl: '',
    wpUser: '',
    wpPass: '',
    telegramToken: '',
    twitterKey: '',
    pinterestToken: '',
    stripeSecret: '',
    autoPostEnabled: true,
    trafficAutomation: true
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const { settings } = await fetchSettings();
        setFormData({
          ...formData,
          ...settings,
          autoPostEnabled: settings.autoPostEnabled === 'true',
          trafficAutomation: settings.trafficAutomation === 'true'
        });
      } catch (error) {
        console.error("Failed to load settings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggle = (name: string) => {
    setFormData({ ...formData, [name]: !formData[name as keyof typeof formData] });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSettings({
        ...formData,
        autoPostEnabled: formData.autoPostEnabled.toString(),
        trafficAutomation: formData.trafficAutomation.toString()
      });
      alert('Settings saved successfully!');
    } catch (error) {
      alert('Failed to save settings. Check backend connection.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl shrink-0">
            <SettingsIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">System Settings</h1>
            <p className="text-sm md:text-base text-slate-400">Configure APIs, WordPress connection, and Automations.</p>
          </div>
        </div>
        <button 
          onClick={handleSave}
          disabled={isLoading || isSaving}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 w-full md:w-auto"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Settings
        </button>
      </div>

      <div className="flex gap-4 border-b border-slate-700/50 mb-6 overflow-x-auto whitespace-nowrap pb-2">
        {['General', 'API Keys', 'WordPress', 'Integrations'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === tab.toLowerCase()
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="glass-card p-6 md:p-8">
        <form className="space-y-6" onSubmit={handleSave}>
          
          {activeTab === 'general' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h3 className="text-lg font-semibold border-b border-slate-700 pb-2 flex items-center gap-2">
                <SettingsIcon className="w-5 h-5 text-blue-400" />
                Global Toggles
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-200">Auto-post enabled</p>
                    <p className="text-sm text-slate-400">Run the daily CRON job automatically</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={formData.autoPostEnabled} onChange={() => handleToggle('autoPostEnabled')} />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-200">Traffic Automation</p>
                    <p className="text-sm text-slate-400">Auto-post to social media (Twitter, Pinterest, Telegram)</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={formData.trafficAutomation} onChange={() => handleToggle('trafficAutomation')} />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'api keys' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h3 className="text-lg font-semibold border-b border-slate-700 pb-2 flex items-center gap-2">
                <Key className="w-5 h-5 text-blue-400" />
                Core API Keys
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">OpenAI API Key (GPT-4)</label>
                  <input type="password" name="openaiKey" value={formData.openaiKey} onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Stripe Secret Key (Memberships)</label>
                  <input type="password" name="stripeSecret" value={formData.stripeSecret} onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'wordpress' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h3 className="text-lg font-semibold border-b border-slate-700 pb-2 flex items-center gap-2">
                <Server className="w-5 h-5 text-blue-400" />
                WordPress Headless Connection
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">WP REST API URL</label>
                  <input type="url" name="wpUrl" value={formData.wpUrl} onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Admin Username</label>
                    <input type="text" name="wpUser" value={formData.wpUser} onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Application Password</label>
                    <input type="password" name="wpPass" value={formData.wpPass} onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h3 className="text-lg font-semibold border-b border-slate-700 pb-2 flex items-center gap-2">
                <Webhook className="w-5 h-5 text-blue-400" />
                Social Media Tokens
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Telegram Bot Token</label>
                  <input type="password" name="telegramToken" value={formData.telegramToken} onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Twitter/X API Key</label>
                  <input type="password" name="twitterKey" value={formData.twitterKey} onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Pinterest Access Token</label>
                  <input type="password" name="pinterestToken" value={formData.pinterestToken} onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                </div>
              </div>
            </div>
          )}

        </form>
      </div>
    </div>
  );
}
