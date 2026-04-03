'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  FileText, 
  Link as LinkIcon, 
  Globe, 
  Mail, 
  DollarSign, 
  Settings, 
  Zap, 
  Menu, 
  X 
} from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'AI Generator', href: '/ai-generator', icon: Sparkles },
  { name: 'Posts', href: '/posts', icon: FileText },
  { name: 'Affiliate', href: '/affiliate', icon: LinkIcon },
  { name: 'Traffic', href: '/traffic', icon: Globe },
  { name: 'Email', href: '/email', icon: Mail },
  { name: 'Revenue', href: '/revenue', icon: DollarSign },
  { name: 'Automation', href: '/automation', icon: Zap },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on navigation on mobile
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 glass-card border-x-0 border-t-0 rounded-none z-50 relative bg-slate-900/90">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            AutoWealth
          </h1>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-300 hover:text-white">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-40 md:hidden" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* Sidebar Content */}
      <div className={clsx(
        "fixed md:static inset-y-0 left-0 z-50 w-64 glass-card rounded-none border-y-0 border-l-0 flex flex-col p-4 transition-transform duration-300 ease-in-out md:translate-x-0 bg-slate-900/95 md:bg-transparent",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="hidden md:flex items-center gap-3 mb-8 px-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            AutoWealth OS
          </h1>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                  isActive 
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-4 border-t border-slate-700/50">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold">Admin</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">System Status</span>
              <span className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400"></span> Online
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}