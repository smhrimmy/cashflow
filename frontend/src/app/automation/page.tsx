'use client';

import { Zap, PlayCircle, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { useState } from 'react';

export default function Automation() {
  const [isTriggering, setIsTriggering] = useState(false);

  const handleTrigger = async () => {
    setIsTriggering(true);
    // Normally this would be a real API call to the backend
    setTimeout(() => {
      setIsTriggering(false);
      alert('Automation flow triggered successfully!');
    }, 2000);
  };

  const steps = [
    { name: 'Fetch Trending Keyword', status: 'Success', time: '00:00:05' },
    { name: 'Generate AI Blog', status: 'Success', time: '00:01:20' },
    { name: 'Inject Affiliate Links', status: 'Success', time: '00:01:25' },
    { name: 'Publish to WordPress', status: 'Success', time: '00:01:45' },
    { name: 'Share to Telegram & Social', status: 'Success', time: '00:02:10' },
    { name: 'Generate Pinterest Pins', status: 'Success', time: '00:03:00' },
    { name: 'Send Email Campaign', status: 'Pending', time: '--:--:--' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Automation Engine</h1>
            <p className="text-sm md:text-base text-slate-400">Monitor your daily CRON jobs and background processes.</p>
          </div>
        </div>
        <button 
          onClick={handleTrigger}
          disabled={isTriggering}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 w-full md:w-auto"
        >
          {isTriggering ? (
            <Clock className="w-4 h-4 animate-spin" />
          ) : (
            <PlayCircle className="w-4 h-4" />
          )}
          Trigger Flow Manually
        </button>
      </div>

      <div className="glass-card p-6 md:p-8">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-700/50">
          <div>
            <h2 className="text-xl font-bold">Daily Automation Flow</h2>
            <p className="text-sm text-slate-400 mt-1">Scheduled for 00:00 UTC daily</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            System Active
          </div>
        </div>

        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className={clsx(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2",
                  step.status === 'Success' ? "bg-green-500/20 border-green-500 text-green-400" :
                  step.status === 'Failed' ? "bg-red-500/20 border-red-500 text-red-400" :
                  "bg-slate-800 border-slate-600 text-slate-400"
                )}>
                  {step.status === 'Success' ? <CheckCircle2 className="w-4 h-4" /> :
                   step.status === 'Failed' ? <AlertCircle className="w-4 h-4" /> :
                   <Clock className="w-4 h-4" />}
                </div>
                {index !== steps.length - 1 && (
                  <div className={clsx(
                    "w-0.5 h-12 my-2",
                    step.status === 'Success' ? "bg-green-500/50" : "bg-slate-700"
                  )}></div>
                )}
              </div>
              <div className="flex-1 pt-1 pb-4">
                <div className="glass-card p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-200">{step.name}</h4>
                    <p className="text-xs text-slate-400 mt-1">Status: {step.status}</p>
                  </div>
                  <div className="text-sm font-mono text-slate-500">
                    {step.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
