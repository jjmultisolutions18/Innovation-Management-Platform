import { motion } from 'motion/react';
import { cn } from '../../lib/firebase';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendType?: 'up' | 'down' | 'neutral';
  color?: string;
}

export function StatCard({ label, value, icon: Icon, trend, trendType = 'neutral', color = 'blue' }: StatCardProps) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
    red: 'bg-red-50 text-red-600',
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
          <h3 className="text-2xl font-bold tracking-tight text-gray-900">{value}</h3>
          {trend && (
            <p className={cn(
              "text-xs mt-2 font-medium flex items-center gap-1",
              trendType === 'up' ? 'text-green-600' : trendType === 'down' ? 'text-red-600' : 'text-gray-500'
            )}>
              {trend} 
            </p>
          )}
        </div>
        <div className={cn("p-3 rounded-xl transition-transform group-hover:scale-110", colors[color as keyof typeof colors])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
}
