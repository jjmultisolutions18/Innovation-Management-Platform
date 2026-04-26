import { motion } from 'motion/react';
import { StatCard } from './StatCard';
import { 
  Users, 
  Rocket, 
  TrendingUp, 
  CheckCircle2, 
  BarChart3, 
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Target,
  Plus
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '../../lib/firebase';

interface CoordinatorDashboardProps {
  user: any;
  profile: any;
}

export function CoordinatorDashboard({ user, profile }: CoordinatorDashboardProps) {
  const metrics = [
    { label: 'Programme Innovators', value: 142, icon: Users, color: 'blue', trend: '+12% this month', trendType: 'up' },
    { label: 'Project pipeline', value: 89, icon: Rocket, color: 'purple', trend: 'Average age: 14d', trendType: 'neutral' },
    { label: 'Validation Stage', value: 34, icon: CheckCircle2, color: 'green', trend: '↑ Fast movement', trendType: 'up' },
    { label: 'High Readiness (FRL)', value: 12, icon: ShieldCheck, color: 'orange', trend: 'Ready for funding', trendType: 'neutral' },
  ];

  const pipelineData = [
    { name: 'Stage 0', value: 45 },
    { name: 'Stage 1', value: 32 },
    { name: 'Stage 2', value: 28 },
    { name: 'Stage 3', value: 18 },
    { name: 'Stage 4', value: 12 },
    { name: 'Stage 5', value: 5 },
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Programme Command</h2>
          <p className="text-gray-500">Coordinating across 4 active programmes.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            Export Status
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
            <Plus className="w-4 h-4" />
            Add Innovator
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => <StatCard key={i} {...(m as any)} />)}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Ecosystem Pipeline Movement</h3>
              <p className="text-xs text-gray-500 font-medium">Number of innovations per lifecycle stage.</p>
            </div>
            <Target className="w-6 h-6 text-red-500 opacity-20" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineData}>
                <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              Pending Approvals
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Sarah J.', info: 'Stage 2 Evidence Uploaded', time: '2h ago' },
                { name: 'Kofi A.', info: 'New Innovation Proposal', time: '5h ago' },
                { name: 'David M.', info: 'Budget Amendment Request', time: '1d ago' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0 group cursor-pointer">
                  <div>
                    <p className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{item.name}</p>
                    <p className="text-[10px] text-gray-500 font-medium">{item.info}</p>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400">{item.time}</span>
                </div>
              ))}
              <button className="w-full py-2.5 text-[11px] font-black uppercase tracking-widest text-blue-600 hover:bg-blue-50 rounded-xl transition-colors mt-2">
                Open Approval Center
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <h4 className="text-lg font-bold mb-2">Ecosystem Health</h4>
            <div className="space-y-4 mt-6">
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold opacity-80 uppercase tracking-widest">
                  <span>Mentorship Pairing</span>
                  <span>92%</span>
                </div>
                <div className="w-full h-1.5 bg-white/20 rounded-full"><div className="h-full bg-white rounded-full" style={{width: '92%'}} /></div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold opacity-80 uppercase tracking-widest">
                  <span>Data Reporting Rate</span>
                  <span>78%</span>
                </div>
                <div className="w-full h-1.5 bg-white/20 rounded-full"><div className="h-full bg-white rounded-full" style={{width: '78%'}} /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
