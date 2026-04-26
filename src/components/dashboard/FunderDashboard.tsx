import { motion } from 'motion/react';
import { StatCard } from './StatCard';
import { 
  BarChart3, 
  Globe, 
  Briefcase, 
  TrendingUp, 
  PieChart as PieIcon, 
  MapPin,
  Download,
  Filter,
  Users
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

interface FunderDashboardProps {
  user: any;
  profile: any;
}

export function FunderDashboard({ user, profile }: FunderDashboardProps) {
  const impactStats = [
    { label: 'Innovations Funded', value: 42, icon: Briefcase, color: 'blue', trend: 'Budget Cap: $2.4M' },
    { label: 'Jobs Created', value: 842, icon: Globe, color: 'green', trend: '+14% YoY', trendType: 'up' },
    { label: 'Follow-on Funding', value: '$12.4M', icon: TrendingUp, color: 'purple', trend: 'v/s $8M target', trendType: 'up' },
    { label: 'Survival Rate', value: '78%', icon: BarChart3, color: 'orange', trend: 'High Impact', trendType: 'neutral' },
  ];

  const sectorData = [
    { name: 'Agri-Tech', value: 35 },
    { name: 'FinTech', value: 20 },
    { name: 'Health', value: 15 },
    { name: 'Energy', value: 20 },
    { name: 'Edu', value: 10 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#6366f1'];

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Stakeholder Dashboard</h2>
          <p className="text-gray-500">Impact report for Innovate Bridge Growth Ecosystem.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
            <Download className="w-4 h-4" />
            Export Impact PDF
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {impactStats.map((stat, i) => (
          <StatCard key={i} {...(stat as any)} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-900 text-lg">Portfolio Growth Tracking</h3>
            <div className="flex items-center gap-2 text-xs font-bold">
              <Filter className="w-3 h-3 text-gray-400" />
              <span className="text-gray-400">Quarterly View</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">Aggregate movement of innovations across all funded programmes currently active in the ecosystem.</p>
          <div className="h-[300px] mt-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorData}>
                <XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} tick={{fill: '#94a3b8'}} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={50}>
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
            <h3 className="font-bold text-gray-900 mb-2">Impact Distribution</h3>
            <p className="text-xs text-gray-500 mb-6">Percentage allocation by sector.</p>
            <div className="flex-1 h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorData}
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 mt-4">
              {sectorData.map((d, i) => (
                <div key={i} className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: COLORS[i]}} />
                    <span className="text-gray-600 font-bold">{d.name}</span>
                  </div>
                  <span className="text-gray-900 font-black">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white rounded-xl text-blue-600 shadow-sm">
                <MapPin className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-blue-900">Regional Footprint</h4>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-blue-800/70 font-medium">Rural Ecosystems</span>
                <span className="text-blue-900 font-bold">64%</span>
              </div>
              <div className="w-full h-1.5 bg-blue-100 rounded-full">
                <div className="h-full bg-blue-600 rounded-full" style={{width: '64%'}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
