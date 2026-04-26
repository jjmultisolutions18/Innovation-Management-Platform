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
import { InnovatorDashboard } from './components/dashboard/InnovatorDashboard';
import { MentorDashboard } from './components/dashboard/MentorDashboard';
import { FunderDashboard } from './components/dashboard/FunderDashboard';
import { CoordinatorDashboard } from './components/dashboard/CoordinatorDashboard';

export default function App() {
  const { user, profile, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

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
    switch (profile.role) {
      case 'INNOVATOR':
        return <InnovatorDashboard user={user} profile={profile} />;
      case 'MENTOR':
        return <MentorDashboard user={user} profile={profile} />;
      case 'FUNDER':
        return <FunderDashboard user={user} profile={profile} />;
      case 'ADMIN':
      case 'COORDINATOR':
      case 'MANAGER':
      default:
        return <CoordinatorDashboard user={user} profile={profile} />;
    }
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
