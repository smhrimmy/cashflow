'use client';

import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight,
  Loader2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { clsx } from 'clsx';
import { useState, useEffect } from 'react';
import { fetchDashboardStats } from '@/lib/api';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const { stats, chartData, topPosts } = await fetchDashboardStats();
        setData({ stats, chartData, topPosts });
      } catch (error) {
        console.error('Failed to load dashboard stats:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadStats();
  }, []);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!data) return <div className="text-center text-slate-400 mt-10">Failed to load data. Is the backend running?</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1">Overview</h1>
          <p className="text-sm md:text-base text-slate-400">Welcome back! Here's your automated income summary.</p>
        </div>
        <div className="flex gap-3">
          <button className="glass-card px-4 py-2 flex items-center justify-center gap-2 text-sm hover:bg-slate-800 transition-colors w-full md:w-auto">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Automation Active
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Earnings" 
          value={data.stats.totalEarnings} 
          trend={data.stats.earningsTrend} 
          isPositive={data.stats.earningsTrend.startsWith('+')}
          icon={<DollarSign className="w-5 h-5 text-green-400" />}
        />
        <StatCard 
          title="Monthly Traffic" 
          value={data.stats.monthlyTraffic} 
          trend={data.stats.trafficTrend} 
          isPositive={data.stats.trafficTrend.startsWith('+')}
          icon={<Users className="w-5 h-5 text-blue-400" />}
        />
        <StatCard 
          title="Conversion Rate" 
          value={data.stats.conversionRate} 
          trend={data.stats.conversionTrend} 
          isPositive={data.stats.conversionTrend.startsWith('+')}
          icon={<Activity className="w-5 h-5 text-purple-400" />}
        />
        <StatCard 
          title="Active Posts" 
          value={data.stats.activePosts} 
          trend={data.stats.postsTrend} 
          isPositive={data.stats.postsTrend.startsWith('+')}
          icon={<TrendingUp className="w-5 h-5 text-orange-400" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="text-lg font-semibold mb-6">Revenue & Traffic Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%" minHeight={300} minWidth={0}>
              <AreaChart data={data.chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value: number) => '$' + value} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Performing Posts */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-6">Top Performing Posts</h3>
          <div className="space-y-4">
            {data.topPosts.map((post: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-700">
                <div className="overflow-hidden">
                  <p className="text-sm font-medium truncate w-32 md:w-40">{post.title}</p>
                  <p className="text-xs text-slate-400">{post.clicks} clicks</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-400">{post.earnings}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, isPositive, icon }: { title: string, value: string, trend: string, isPositive: boolean, icon: React.ReactNode }) {
  return (
    <div className="glass-card p-6 relative overflow-hidden group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
          {icon}
        </div>
        <div className={clsx("flex items-center text-sm font-medium", isPositive ? "text-green-400" : "text-red-400")}>
          {trend}
          {isPositive ? <ArrowUpRight className="w-4 h-4 ml-1" /> : <ArrowDownRight className="w-4 h-4 ml-1" />}
        </div>
      </div>
      <div>
        <h4 className="text-slate-400 text-sm font-medium mb-1">{title}</h4>
        <h2 className="text-3xl font-bold">{value}</h2>
      </div>
      
      {/* Decorative gradient */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-transparent to-slate-700/30 rounded-full blur-xl group-hover:bg-blue-500/10 transition-colors"></div>
    </div>
  );
}
