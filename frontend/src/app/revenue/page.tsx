'use client';

import { DollarSign, CreditCard, ShoppingBag, Gift, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const data = [
  { name: 'Mon', amazon: 120, clickbank: 240, adsense: 40, digital: 100 },
  { name: 'Tue', amazon: 150, clickbank: 180, adsense: 45, digital: 150 },
  { name: 'Wed', amazon: 180, clickbank: 320, adsense: 50, digital: 200 },
  { name: 'Thu', amazon: 140, clickbank: 280, adsense: 35, digital: 180 },
  { name: 'Fri', amazon: 190, clickbank: 400, adsense: 55, digital: 250 },
  { name: 'Sat', amazon: 250, clickbank: 350, adsense: 60, digital: 300 },
  { name: 'Sun', amazon: 300, clickbank: 450, adsense: 70, digital: 400 },
];

export default function Revenue() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Multi-Income Monetization</h1>
            <p className="text-sm md:text-base text-slate-400">Track and optimize all your automated revenue streams.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Affiliate Marketing', value: '$5,240', icon: ShoppingBag, color: 'text-blue-400' },
          { title: 'Google AdSense', value: '$840', icon: CreditCard, color: 'text-yellow-400' },
          { title: 'Digital Products', value: '$3,100', icon: Gift, color: 'text-purple-400' },
          { title: 'Premium Memberships', value: '$1,420', icon: DollarSign, color: 'text-green-400' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <div className="flex items-center text-sm font-medium text-green-400">
                +12% <ArrowUpRight className="w-4 h-4 ml-1" />
              </div>
            </div>
            <h4 className="text-slate-400 text-sm font-medium mb-1">{stat.title}</h4>
            <h2 className="text-2xl font-bold">{stat.value}</h2>
          </div>
        ))}
      </div>

      <div className="glass-card p-6 h-[400px]">
        <h3 className="text-lg font-semibold mb-6">Revenue Breakdown</h3>
        <ResponsiveContainer width="100%" height="100%" minHeight={300} minWidth={0}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value: number) => '$' + value} />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="amazon" name="Amazon Associates" stackId="a" fill="#3b82f6" />
            <Bar dataKey="clickbank" name="ClickBank" stackId="a" fill="#ef4444" />
            <Bar dataKey="digital" name="Digital Products" stackId="a" fill="#a855f7" />
            <Bar dataKey="adsense" name="AdSense" stackId="a" fill="#eab308" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
