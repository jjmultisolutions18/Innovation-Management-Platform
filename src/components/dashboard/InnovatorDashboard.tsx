import { motion } from 'motion/react';
import { StatCard } from './StatCard';
import { 
  Rocket, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  Calendar,
  FileText,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { STAGES } from '../../constants';

interface InnovatorDashboardProps {
  user: any;
  profile: any;
}

export function InnovatorDashboard({ user, profile }: InnovatorDashboardProps) {
  const project = {
    title: 'Hydro-Smart Irrigation',
    stage: 2,
    progress: 65,
    mentor: 'Dr. Alan Smith',
    nextMilestone: 'Pilot Test Deployment',
    dueDate: 'Nov 12, 2026'
  };

  const tasks = [
    { title: 'Upload IP Documentation', icon: FileText, status: 'pending' },
    { title: 'Review Market Analysis', icon: CheckCircle2, status: 'completed' },
    { title: 'Update Pitch Deck', icon: Rocket, status: 'pending' },
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Innovation Portal</h2>
          <p className="text-gray-500">Welcome back, {profile.displayName}. Your innovation is moving forward.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
          <Rocket className="w-4 h-4" />
          Update Progress
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Current Stage" 
          value={STAGES[project.stage].name.split(':')[1]} 
          icon={TrendingUp} 
          trend="Next: Stage 3" 
          color="blue" 
        />
        <StatCard 
          label="Milestones Completed" 
          value="8/12" 
          icon={CheckCircle2} 
          trend="Keep going!" 
          color="green" 
        />
        <StatCard 
          label="Support Hours" 
          value="24.5" 
          icon={Clock} 
          trend="12 sessions" 
          color="purple" 
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Rocket className="w-5 h-5 text-blue-600" />
            Project Health: {project.title}
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">Overall Progress</span>
              <span className="text-sm font-bold text-blue-600">{project.progress}%</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                className="h-full bg-blue-600 rounded-full"
              />
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl text-blue-600 shadow-sm">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">Next Milestone</p>
              <p className="text-sm font-bold text-gray-900">{project.nextMilestone}</p>
              <p className="text-xs text-blue-500 font-medium">{project.dueDate}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button className="py-3 px-4 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-colors">
              Submit Stage Evidence
            </button>
            <button className="py-3 px-4 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors">
              Download Certificate
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-600" />
              Mentor Feedback
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-sm text-gray-600 italic leading-relaxed mb-3">
                  "The new business model looks solid. Focus the next few weeks on customer validation in the rural sector..."
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">AS</div>
                  <span className="text-xs font-bold text-gray-900">{project.mentor}</span>
                  <span className="text-[10px] text-gray-400 font-medium ml-auto">2 days ago</span>
                </div>
              </div>
              <button className="w-full py-2.5 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                Book Session with {project.mentor.split(' ')[0]}
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              Action Items
            </h3>
            <div className="space-y-3">
              {tasks.map((task, i) => (
                <div key={i} className="flex items-center gap-3 group cursor-pointer">
                  <div className={cn(
                    "p-2 rounded-lg",
                    task.status === 'completed' ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600"
                  )}>
                    <task.icon className="w-4 h-4" />
                  </div>
                  <span className={cn(
                    "text-sm font-medium",
                    task.status === 'completed' ? "text-gray-400 line-through" : "text-gray-700"
                  )}>
                    {task.title}
                  </span>
                  <ArrowRight className="w-3 h-3 ml-auto text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { cn } from '../../lib/firebase';
