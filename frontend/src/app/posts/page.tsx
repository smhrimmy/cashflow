'use client';

import { FileText, ExternalLink, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';

export default function Posts() {
  const [posts] = useState([
    { id: 1, title: 'Best AI Tools for 2026', keyword: 'AI tools', wordCount: 2150, status: 'Published', date: '2026-04-03' },
    { id: 2, title: 'Automated SaaS Guide', keyword: 'SaaS guide', wordCount: 1840, status: 'Published', date: '2026-04-02' },
    { id: 3, title: 'Passive Income Strategies', keyword: 'passive income', wordCount: 2400, status: 'Draft', date: '2026-04-01' },
    { id: 4, title: 'ClickBank Review 2026', keyword: 'clickbank review', wordCount: 1560, status: 'Published', date: '2026-03-30' },
  ]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Generated Posts</h1>
            <p className="text-sm md:text-base text-slate-400">Manage your AI-generated blog posts.</p>
          </div>
        </div>
        <button className="glass-card px-4 py-2 flex items-center justify-center gap-2 text-sm hover:bg-slate-800 transition-colors w-full md:w-auto">
          <RefreshCw className="w-4 h-4" />
          Sync with WordPress
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-800/50 border-b border-slate-700/50">
              <th className="p-4 text-sm font-medium text-slate-400">Title</th>
              <th className="p-4 text-sm font-medium text-slate-400">Keyword</th>
              <th className="p-4 text-sm font-medium text-slate-400">Words</th>
              <th className="p-4 text-sm font-medium text-slate-400">Status</th>
              <th className="p-4 text-sm font-medium text-slate-400">Date</th>
              <th className="p-4 text-sm font-medium text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-slate-800/20 transition-colors">
                <td className="p-4 font-medium text-slate-200">{post.title}</td>
                <td className="p-4 text-sm text-slate-400">{post.keyword}</td>
                <td className="p-4 text-sm text-slate-400">{post.wordCount}</td>
                <td className="p-4 text-sm">
                  <span className={clsx(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    post.status === 'Published' ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                  )}>
                    {post.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-slate-400">{post.date}</td>
                <td className="p-4 text-right">
                  <button className="p-2 text-slate-400 hover:text-blue-400 transition-colors" title="View in WordPress">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
