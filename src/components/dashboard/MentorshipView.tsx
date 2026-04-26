import { motion } from 'motion/react';
import { 
  Plus, 
  Calendar, 
  Clock, 
  MessageSquare, 
  Video, 
  MoreVertical,
  CheckCircle,
  Users
} from 'lucide-react';
import { cn } from '../../lib/firebase';

export function MentorshipView() {
  const sessions = [
    { title: 'Market Validation Strategy', mentor: 'Dr. Alan Smith', innovator: 'Sarah Johnson', date: 'Oct 24, 2026', time: '14:00 - 15:30', status: 'Upcoming', type: 'Video call' },
    { title: 'FRL (Funding Readiness) Review', mentor: 'Prof. Martha M.', innovator: 'David Menara', date: 'Oct 22, 2026', time: '10:00 - 11:30', status: 'Completed', type: 'In-person' },
    { title: 'Intellectual Property Guidance', mentor: 'Barr. James Okon', innovator: 'Lindiwe T.', date: 'Oct 20, 2026', time: '16:00 - 17:00', status: 'Completed', type: 'Video call' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Mentorship Module</h2>
          <p className="text-gray-500 text-sm">Tracking 14 active mentorship pairings across your ecosystem.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
          <Calendar className="w-4 h-4" />
          Schedule Session
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            Recent & Upcoming Sessions
          </h3>
          <div className="space-y-4">
            {sessions.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex items-start gap-4"
              >
                <div className={cn(
                  "p-3 rounded-2xl shrink-0 transition-colors",
                  s.status === 'Upcoming' ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-600"
                )}>
                  {s.status === 'Upcoming' ? <Clock className="w-6 h-6" /> : <CheckCircle className="w-6 h-6" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-bold text-gray-900 truncate">{s.title}</h4>
                    <span className={cn(
                      "text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider",
                      s.status === 'Upcoming' ? "bg-blue-50 text-blue-700" : "bg-green-50 text-green-700"
                    )}>
                      {s.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Users className="w-3.5 h-3.5 text-gray-400" />
                      {s.mentor} (Mentor)
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <Users className="w-3.5 h-3.5 text-gray-400" />
                      {s.innovator} (Innovator)
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {s.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      {s.type === 'Video call' ? <Video className="w-3.5 h-3.5 text-gray-400" /> : <MessageSquare className="w-3.5 h-3.5 text-gray-400" />}
                      {s.time} • {s.type}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="text-xs font-bold text-blue-600 hover:underline">View Details</button>
                    <button className="text-xs font-bold text-gray-400 hover:text-gray-600">Join Room</button>
                  </div>
                </div>
                <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Mentorship Key Stats</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Total Mentors</p>
                  <p className="text-2xl font-black text-gray-900">42</p>
                </div>
                <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Hours Logged</p>
                  <p className="text-2xl font-black text-gray-900">1,240</p>
                </div>
                <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Impact Score</p>
                  <p className="text-2xl font-black text-gray-900">4.8/5</p>
                </div>
                <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
                  <CheckCircle className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 p-8 rounded-3xl text-white relative overflow-hidden shadow-xl shadow-blue-200">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <h4 className="text-lg font-bold mb-2">Need an Expert?</h4>
            <p className="text-sm text-blue-100 mb-6 font-medium leading-relaxed">
              We have a network of 200+ industry leaders ready to support your innovators.
            </p>
            <button className="w-full py-3 bg-white text-blue-600 rounded-2xl font-bold hover:bg-blue-50 transition-colors shadow-lg">
              Match Innovator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
