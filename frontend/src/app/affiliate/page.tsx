'use client';

import { Link as LinkIcon, Plus, Search, DollarSign } from 'lucide-react';
import { useState } from 'react';

export default function Affiliate() {
  const [links] = useState([
    { id: 1, keyword: 'AI tools', network: 'ShareASale', link: 'https://shrsl.com/ai-tools', clicks: 1450, earnings: '$345.20' },
    { id: 2, keyword: 'ClickBank', network: 'ClickBank', link: 'https://hop.clickbank.net/?affiliate=...', clicks: 890, earnings: '$120.50' },
    { id: 3, keyword: 'passive income', network: 'Amazon', link: 'https://amzn.to/passive-book', clicks: 2300, earnings: '$45.80' },
  ]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl shrink-0">
            <LinkIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Affiliate Automation</h1>
            <p className="text-sm md:text-base text-slate-400">Map keywords to affiliate links for auto-injection.</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 w-full md:w-auto">
          <Plus className="w-4 h-4" />
          Add Mapping
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-400 text-sm font-medium">Total Affiliate Clicks</h3>
            <LinkIcon className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-3xl font-bold">4,640</p>
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-400 text-sm font-medium">Total Conversions</h3>
            <DollarSign className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold">128</p>
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-400 text-sm font-medium">Est. Affiliate Earnings</h3>
            <DollarSign className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold">$511.50</p>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-slate-700/50 flex items-center gap-4 bg-slate-800/30">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input 
            type="text" 
            placeholder="Search keywords or networks..." 
            className="bg-transparent border-none outline-none text-sm w-full text-slate-200 placeholder:text-slate-500"
          />
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-slate-800/50 border-b border-slate-700/50">
              <th className="p-4 text-sm font-medium text-slate-400">Target Keyword</th>
              <th className="p-4 text-sm font-medium text-slate-400">Network</th>
              <th className="p-4 text-sm font-medium text-slate-400">Cloaked Link</th>
              <th className="p-4 text-sm font-medium text-slate-400 text-right">Clicks</th>
              <th className="p-4 text-sm font-medium text-slate-400 text-right">Earnings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {links.map((link) => (
              <tr key={link.id} className="hover:bg-slate-800/20 transition-colors">
                <td className="p-4 font-medium text-slate-200">{link.keyword}</td>
                <td className="p-4 text-sm">
                  <span className="px-2 py-1 bg-slate-700/50 rounded-md text-xs font-medium text-slate-300">
                    {link.network}
                  </span>
                </td>
                <td className="p-4 text-sm text-blue-400 truncate max-w-[200px]">{link.link}</td>
                <td className="p-4 text-sm text-slate-400 text-right">{link.clicks.toLocaleString()}</td>
                <td className="p-4 text-sm text-green-400 font-bold text-right">{link.earnings}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
