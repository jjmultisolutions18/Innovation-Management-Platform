/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { auth, signInWithPopup, googleProvider, signOut, cn } from './lib/firebase';
import { Sidebar } from './components/layout/Sidebar';
import { StatCard } from './components/dashboard/StatCard';
import { seedInitialData } from './services/seedData';
import { InnovationsView } from './components/dashboard/InnovationsView';
import { MentorshipView } from './components/dashboard/MentorshipView';
import { 
  BarChart3, 
  Users, 
  Lightbulb, 
  Clock, 
  Plus, 
  Search, 
  Bell, 
  LayoutGrid, 
  List,
  Filter,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Rocket,
  ChevronRight,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { STAGES } from './constants';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function App() {
  const { user, profile, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    if (profile?.role === 'ADMIN') {
      seedInitialData();
    }
  }, [profile]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium animate-pulse">Synchronizing Ecosystem...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-8 rounded-3xl border border-gray-200 shadow-2xl space-y-8"
        >
          <div className="text-center space-y-3">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <Rocket className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Innovate Bridge</h1>
            <p className="text-gray-500 font-medium">Empowering Innovation Ecosystems from Idea to Impact.</p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={() => signInWithPopup(auth, googleProvider)}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gray-900 text-white rounded-2xl font-semibold hover:bg-black transition-all shadow-md group"
            >
              <img src="https://www.google.com/favicon.ico" className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Sign in with Google
            </button>
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-gray-400 font-medium tracking-widest text-[10px]">Secure Gateway</span></div>
            </div>
            <p className="text-center text-[11px] text-gray-400 leading-relaxed px-4">
              By signing in, you agree to the Innovation Ecosystem Terms of Engagement and Data Governance Policy.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  const renderDashboard = () => {
    // Mock metrics based on roles
    const metrics = [
      { label: 'Innovators Onboarded', value: 142, icon: Users, color: 'blue', trend: '+12% this month', trendType: 'up' },
      { label: 'Active Projects', value: 89, icon: Lightbulb, color: 'purple', trend: '+5 new ideas', trendType: 'up' },
      { label: 'Validation Stage', value: 34, icon: CheckCircle2, color: 'green', trend: '↑ Fast movement', trendType: 'up' },
      { label: 'Commercialisation', value: '14%', icon: BarChart3, color: 'orange', trend: 'Goal: 20%', trendType: 'neutral' },
    ];

    const chartData = [
      { name: 'Stage 0', value: 45 },
      { name: 'Stage 1', value: 30 },
      { name: 'Stage 2', value: 25 },
      { name: 'Stage 3', value: 15 },
      { name: 'Stage 4', value: 10 },
      { name: 'Stage 5', value: 5 },
    ];

    const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#6366f1'];

    return (
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Ecosystem Overview</h2>
            <p className="text-gray-500">Welcome back, {profile.displayName}. Here's what's happening today.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 shadow-sm transition-all italic font-serif">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              Download Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">
              <Plus className="w-4 h-4" />
              New Programme
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => <StatCard key={idx} {...(m as any)} />)}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Target className="w-4 h-4 text-red-500" />
                Innovation Pipeline Stages
              </h3>
              <select className="text-xs font-semibold bg-gray-50 border-none rounded-lg px-2 py-1 focus:ring-0">
                <option>All Programmes</option>
                <option>Agri-Tech</option>
              </select>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{fill: '#f9fafb'}}
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
            <h3 className="font-bold text-gray-900 mb-6">Sector Distribution</h3>
            <div className="flex-1 h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {chartData.slice(0, 3).map((d, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[i]}} />
                    <span className="text-gray-600 font-medium">{d.name}</span>
                  </div>
                  <span className="font-bold">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Recent Innovator Activity</h3>
            <button className="text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1 group">
              View All Pipeline <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Innovator</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Innovation Title</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Sector</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Current Stage</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { name: 'Sarah Johnson', title: 'Hydro-Smart Irrigation', sector: 'Agri-Tech', stage: 'Validation', status: 'In Review' },
                  { name: 'David Menara', title: 'EduConnect Platform', sector: 'Education', stage: 'POC', status: 'Active' },
                  { name: 'Lebo Thabo', title: 'SolarMesh Grid', sector: 'Green Energy', stage: 'Ideation', status: 'Needs Support' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors cursor-pointer group">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">
                        {row.name.charAt(0)}
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{row.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600 font-medium">{row.title}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] px-2 py-1 bg-gray-100 text-gray-600 rounded-md font-bold uppercase">{row.sector}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{width: '60%'}}></div>
                        </div>
                        <span className="text-xs text-gray-500 font-medium">{row.stage}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "text-[10px] px-2.5 py-1 rounded-full font-bold uppercase",
                        row.status === 'Active' ? 'bg-green-50 text-green-700' : 
                        row.status === 'In Review' ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-700'
                      )}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-white rounded-lg transition-all opacity-0 group-hover:opacity-100">
                        <ChevronRight className="w-4 h-4 text-gray-400" />
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
  };

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        role={profile.role} 
        user={user}
        onLogout={() => signOut(auth)}
      />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search innovators, programmes, or mentors..."
              className="w-full bg-gray-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500/10 placeholder:text-gray-400 transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="p-2 text-gray-400 hover:text-blue-600 relative cursor-pointer">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="h-6 w-[1px] bg-gray-100"></div>
            <div className="bg-blue-50 px-3 py-1.5 rounded-lg flex items-center gap-2 group cursor-pointer hover:bg-blue-100 transition-colors">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Live Updates</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                {activeTab === 'dashboard' ? renderDashboard() : 
                 activeTab === 'innovations' ? <InnovationsView role={profile.role} /> :
                 activeTab === 'mentorship' ? <MentorshipView /> :
                 (
                  <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                      <LayoutGrid className="w-10 h-10" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 capitalize">{activeTab} Module</h2>
                      <p className="text-gray-500 max-w-sm">This module is currently being synchronized with your ecosystem data. Check back shortly for real-time updates.</p>
                    </div>
                    <button 
                      onClick={() => setActiveTab('dashboard')}
                      className="px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md"
                    >
                      Return to Dashboard
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
