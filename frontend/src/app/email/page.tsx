'use client';

import { Mail, Users, Send, Edit3, ArrowUpRight } from 'lucide-react';
import { clsx } from 'clsx';

export default function Email() {
  const campaigns = [
    { name: 'Welcome Sequence (AI Tools)', sent: 1240, open: '42%', click: '12%', status: 'Active' },
    { name: 'Daily Deal: Best Hosting 2026', sent: 5800, open: '28%', click: '5.2%', status: 'Sent' },
    { name: 'Weekly Roundup: Passive Income', sent: 6100, open: '31%', click: '8.4%', status: 'Sent' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl shrink-0">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Email Money System</h1>
            <p className="text-sm md:text-base text-slate-400">Automated lead capture and AI-generated email sequences.</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 w-full md:w-auto">
          <Edit3 className="w-4 h-4" />
          New Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-400 text-sm font-medium">Total Subscribers</h3>
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-3xl font-bold">12,450</p>
          <div className="flex items-center text-sm font-medium text-green-400 mt-2">
            +420 this week <ArrowUpRight className="w-4 h-4 ml-1" />
          </div>
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-400 text-sm font-medium">Avg. Open Rate</h3>
            <Send className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-3xl font-bold">34.2%</p>
          <div className="flex items-center text-sm font-medium text-green-400 mt-2">
            +2.1% this week <ArrowUpRight className="w-4 h-4 ml-1" />
          </div>
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-400 text-sm font-medium">Email Revenue</h3>
            <Mail className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold">$2,840</p>
          <div className="flex items-center text-sm font-medium text-green-400 mt-2">
            +12.4% this week <ArrowUpRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-6">Recent AI Email Campaigns</h3>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="pb-4 text-sm font-medium text-slate-400">Campaign Name</th>
              <th className="pb-4 text-sm font-medium text-slate-400">Status</th>
              <th className="pb-4 text-sm font-medium text-slate-400 text-right">Sent</th>
              <th className="pb-4 text-sm font-medium text-slate-400 text-right">Open Rate</th>
              <th className="pb-4 text-sm font-medium text-slate-400 text-right">Click Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {campaigns.map((camp, i) => (
              <tr key={i} className="hover:bg-slate-800/20 transition-colors">
                <td className="py-4 font-medium text-slate-200">{camp.name}</td>
                <td className="py-4 text-sm">
                  <span className={clsx(
                    "px-2 py-1 rounded-full text-xs font-medium border",
                    camp.status === 'Active' ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-slate-700/50 text-slate-300 border-slate-600"
                  )}>
                    {camp.status}
                  </span>
                </td>
                <td className="py-4 text-sm text-slate-400 text-right">{camp.sent.toLocaleString()}</td>
                <td className="py-4 text-sm text-slate-400 text-right">{camp.open}</td>
                <td className="py-4 text-sm text-slate-400 text-right">{camp.click}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
