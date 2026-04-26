import { motion } from 'motion/react';
import { cn } from '../../lib/firebase';
import { STAGES } from '../../constants';
import { 
  Search, 
  Plus, 
  Filter, 
  LayoutGrid, 
  List as ListIcon, 
  MapPin, 
  Clock, 
  Target,
  ArrowRight
} from 'lucide-react';

interface InnovationsViewProps {
  role: string;
}

export function InnovationsView({ role }: InnovationsViewProps) {
  const innovations = [
    { id: '1', title: 'SolarMesh Rural Grid', innovator: 'Sarah M.', sector: 'Green Energy', stage: 3, progress: 65, location: 'Mpumalanga', status: 'Expanding' },
    { id: '2', title: 'AgriSense IoT', innovator: 'Kofi A.', sector: 'Agri-Tech', stage: 1, progress: 20, location: 'Limpopo', status: 'Under Review' },
    { id: '3', title: 'PayPoint Digital', innovator: 'Lindiwe T.', sector: 'FinTech', stage: 5, progress: 95, location: 'Gauteng', status: 'Commercialised' },
    { id: '4', title: 'EcoPackaging Solutions', innovator: 'John D.', sector: 'Manufacturing', stage: 2, progress: 40, location: 'Cape Town', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Innovation Portfolio</h2>
          <p className="text-gray-500 text-sm">Managing {innovations.length} active innovation projects across the ecosystem.</p>
        </div>
        <div className="flex items-center gap-2">
          {role !== 'FUNDER' && (
            <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
              <Plus className="w-4 h-4" />
              Register Innovation
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by title, innovator or sector..."
            className="w-full bg-gray-50 border-transparent rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2.5 text-gray-500 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100">
            <Filter className="w-4 h-4" />
          </button>
          <div className="h-6 w-[1px] bg-gray-100"></div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
            Stage: All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {innovations.map((inv, idx) => (
          <motion.div 
            key={inv.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col"
          >
            <div className="p-6 flex-1">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  {inv.sector}
                </span>
                <span className="text-[10px] font-bold text-gray-400">
                  ID: {inv.id}102
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">{inv.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mb-6">
                Leading the movement in {inv.sector} through highly scalable innovation strategies.
              </p>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-gray-500 font-medium">{STAGES[inv.stage].name}</span>
                    <span className="font-bold text-gray-900">{inv.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${inv.progress}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" 
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs py-3 border-t border-gray-50">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <MapPin className="w-3.5 h-3.5" />
                    {inv.location}
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <Target className="w-3.5 h-3.5" />
                    TRL 级 {inv.stage + 2}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[10px] font-bold">
                  {inv.innovator.charAt(0)}
                </div>
                <span className="text-[11px] font-bold text-gray-700">{inv.innovator}</span>
              </div>
              <button className="p-2 bg-white border border-gray-200 rounded-xl hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
