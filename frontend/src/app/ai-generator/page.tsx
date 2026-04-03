'use client';

import { Sparkles, Wand2 } from 'lucide-react';
import { useState } from 'react';

export default function AIGenerator() {
  const [keyword, setKeyword] = useState('');
  const [tone, setTone] = useState('Informational');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl shrink-0">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">AI Content Engine</h1>
          <p className="text-sm md:text-base text-slate-400">Generate high-converting blog posts and digital products.</p>
        </div>
      </div>

      <div className="glass-card p-6 md:p-8">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Target Keyword or Topic</label>
            <input 
              type="text" 
              placeholder="e.g. Best AI Tools for 2026"
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Content Tone</label>
              <select 
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
              >
                <option>Review</option>
                <option>Comparison</option>
                <option>Informational</option>
                <option>Sales / Copywriting</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Word Count</label>
              <select className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none">
                <option>1000 - 1500 words</option>
                <option>1500 - 2500 words (Recommended)</option>
                <option>2500+ words (Ultimate Guide)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 space-y-4">
            <h3 className="text-sm font-medium text-slate-300">Included Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'Structured Headings (H2, H3)',
                'FAQ Schema Markup',
                'Call-to-Action Sections',
                'Auto Internal Linking',
                'Affiliate Link Injection',
                'AI-Generated Thumbnail'
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                    <svg className="w-3 h-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-slate-400">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-700/50 flex justify-end gap-4">
            <button type="button" className="px-6 py-2.5 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors text-sm font-medium">
              Save Draft
            </button>
            <button type="submit" className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors text-sm font-medium flex items-center gap-2 shadow-lg shadow-blue-500/20">
              <Wand2 className="w-4 h-4" />
              Generate Content
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
