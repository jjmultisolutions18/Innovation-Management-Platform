import { motion } from 'motion/react';
import { cn } from '../../lib/firebase';
import { NAV_ITEMS, ROLE_LABELS } from '../../constants';
import { UserRole, updateDoc, doc, db } from '../../lib/firebase';
import { LogOut, Cloud, ChevronRight, Settings } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  role: UserRole;
  onLogout: () => void;
  user: any;
}

export function Sidebar({ activeTab, setActiveTab, role, onLogout, user }: SidebarProps) {
  const filteredNav = NAV_ITEMS.filter(item => item.roles.includes(role));

  const handleRoleChange = async (newRole: UserRole) => {
    try {
      await updateDoc(doc(db, 'users', user.uid), { role: newRole });
    } catch (error) {
      console.error("Failed to change role", error);
    }
  };

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:flex flex-col border-r border-gray-200 bg-white h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Cloud className="white w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-lg tracking-tight">IBG Growth</span>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        {filteredNav.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                isActive 
                  ? "bg-blue-50 text-blue-600" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn("w-4 h-4", isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600")} />
                {item.label}
              </div>
              {isActive && <motion.div layoutId="activeNav" className="w-1 h-4 bg-blue-600 rounded-full" />}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100 space-y-4">
        <div className="px-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">Simulate Role</p>
          <div className="grid grid-cols-2 gap-1.5">
            {Object.keys(ROLE_LABELS).map((r) => (
              <button
                key={r}
                onClick={() => handleRoleChange(r as UserRole)}
                className={cn(
                  "p-1.5 text-[9px] font-bold rounded-lg transition-all border text-center whitespace-nowrap",
                  role === r 
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm" 
                    : "bg-gray-50 text-gray-500 border-gray-100 hover:border-gray-200"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-2xl flex items-center gap-3 group cursor-default">
          <img 
            src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} 
            alt="User" 
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">{user.displayName}</p>
            <p className="text-[10px] font-medium text-blue-600 uppercase tracking-wider">{ROLE_LABELS[role]}</p>
          </div>
        </div>

        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
