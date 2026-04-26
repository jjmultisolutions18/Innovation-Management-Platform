import { motion } from 'motion/react';
import { StatCard } from './StatCard';
import { 
  Users, 
  Calendar, 
  Clock, 
  BarChart3, 
  MessageSquare,
  ChevronRight,
  PlusCircle,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { cn } from '../../lib/firebase';

interface MentorDashboardProps {
  user: any;
  profile: any;
}

export function MentorDashboard({ user, profile }: MentorDashboardProps) {
  const assignments = [
    { name: 'Sarah Johnson', project: 'Hydro-Smart Irrigation', stage: 'Stage 2', lastSession: '3 days ago', progress: 65 },
    { name: 'David Menara', project: 'EduConnect Platform', stage: 'Stage 4', lastSession: '1 week ago', progress: 82 },
    { name: 'Lebo Thabo', project: 'SolarMesh Grid', stage: 'Stage 1', lastSession: 'Yesterday', progress: 15 },
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Mentor Hub</h2>
          <p className="text-gray-500">Welcome back, Expert {profile.displayName.split(' ')[0]}. You have 3 active innovators.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all">
            <Calendar className="w-4 h-4 text-blue-600" />
            Sync Calendar
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
            <PlusCircle className="w-4 h-4" />
            Log Session
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Active Mentorships" 
          value="3" 
          icon={Users} 
          trend="Capacity: 5" 
          color="blue" 
        />
        <StatCard 
          label="Hours Logged" 
          value="112" 
          icon={Clock} 
          trend="+12h this month" 
          color="purple" 
        />
        <StatCard 
          label="Average TRL Lift" 
          value="+1.4" 
          icon={TrendingUp} 
          trend="Excellent impact" 
          color="green" 
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Your Assigned Innovators</h3>
              <Users className="w-4 h-4 text-gray-400" />
            </div>
            <div className="divide-y divide-gray-50">
              {assignments.map((inv, i) => (
                <div key={i} className="p-6 hover:bg-gray-50 transition-colors group cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                        {inv.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{inv.name}</h4>
                        <p className="text-xs text-gray-500">{inv.project}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                        {inv.stage}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>Total Progress</span>
                      <span className="font-bold">{inv.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{width: `${inv.progress}%`}} />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        Last Session: {inv.lastSession}
                      </div>
                      <button className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline">
                        View Portfolio <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6">Upcoming Sessions</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-2xl space-y-3 border border-blue-100 text-blue-900">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest">Today @ 14:00</span>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                </div>
                <p className="text-sm font-bold">Sarah Johnson</p>
                <p className="text-xs font-medium text-blue-700">Market Validation Strategy</p>
                <button className="w-full py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors">
                  Join Session
                </button>
              </div>
              
              <div className="p-4 border border-gray-100 rounded-2xl space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Oct 28</span>
                <p className="text-sm font-bold text-gray-700">David Menara</p>
                <p className="text-xs text-gray-500">Milestone Review</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-8 rounded-3xl text-white shadow-xl">
            <BarChart3 className="w-8 h-8 text-blue-400 mb-4" />
            <h4 className="text-lg font-bold mb-2">Mentor Impact Report</h4>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 italic">
              "Your guidance contributed to a 20% faster stage movement for your mentees this quarter."
            </p>
            <button className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 underline">
              View Detailed Metrics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
