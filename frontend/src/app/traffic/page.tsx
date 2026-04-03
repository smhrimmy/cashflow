'use client';

import { Globe, Hash, Share2, MessageCircle, BarChart3, TrendingUp } from 'lucide-react';
import { clsx } from 'clsx';

export default function Traffic() {
  const sources = [
    { name: 'SEO (Organic)', icon: Globe, color: 'text-blue-400', bg: 'bg-blue-500/20', traffic: '28.5k', status: 'Optimized' },
    { name: 'Pinterest Pins', icon: Share2, color: 'text-red-400', bg: 'bg-red-500/20', traffic: '12.4k', status: 'Auto-Pinning' },
    { name: 'Twitter/X Bot', icon: Hash, color: 'text-sky-400', bg: 'bg-sky-500/20', traffic: '4.2k', status: 'Auto-Tweeting' },
    { name: 'Telegram Channel', icon: MessageCircle, color: 'text-indigo-400', bg: 'bg-indigo-500/20', traffic: '3.1k', status: 'Auto-Posting' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl shrink-0">
          <Globe className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Traffic Automation Engine</h1>
          <p className="text-sm md:text-base text-slate-400">Distribute your content across multiple platforms automatically.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {sources.map((source, i) => (
          <div key={i} className="glass-card p-6 flex flex-col items-start gap-4 hover:border-slate-600 transition-colors cursor-pointer group">
            <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center", source.bg)}>
              <source.icon className={clsx("w-6 h-6", source.color)} />
            </div>
            <div className="w-full">
              <h3 className="text-lg font-semibold text-slate-200">{source.name}</h3>
              <p className="text-2xl font-bold mt-2">{source.traffic}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-slate-400 font-medium">Monthly Visitors</span>
                <span className="text-xs font-bold text-green-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  {source.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold">SEO Performance</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-slate-800/50 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Indexed Pages</p>
                <p className="text-xl font-bold">1,240</p>
              </div>
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Avg. Position</p>
                <p className="text-xl font-bold">14.2</p>
              </div>
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <Share2 className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-semibold">Pinterest Auto Pin Generator</h3>
          </div>
          <div className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-slate-300">Status</span>
              <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded text-xs font-bold border border-green-500/20">Active</span>
            </div>
            <p className="text-sm text-slate-400 mb-4">
              Automatically creates 3 pins per generated blog post using AI-generated images and text overlays, and schedules them.
            </p>
            <button className="w-full py-2 bg-slate-700 hover:bg-slate-600 rounded-md text-sm font-medium transition-colors text-slate-200">
              Configure Pin Templates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
