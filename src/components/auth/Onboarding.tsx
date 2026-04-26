import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Rocket, 
  Users, 
  Briefcase, 
  Search, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { cn, db, doc, updateDoc } from '../../lib/firebase';
import { UserRole } from '../../lib/firebase';
import { ROLE_LABELS } from '../../constants';

interface OnboardingProps {
  user: any;
  onComplete: () => void;
}

export function Onboarding({ user, onComplete }: OnboardingProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roles = [
    { 
      id: 'INNOVATOR', 
      label: 'Innovator', 
      icon: Rocket, 
      desc: 'Building the next breakthrough solution.',
      color: 'blue'
    },
    { 
      id: 'MENTOR', 
      label: 'Expert Mentor', 
      icon: Search, 
      desc: 'Guiding teams with industry expertise.',
      color: 'purple'
    },
    { 
      id: 'FUNDER', 
      label: 'Funder/Stakeholder', 
      icon: Briefcase, 
      desc: 'Investing in high-impact innovations.',
      color: 'green'
    },
    { 
      id: 'COORDINATOR', 
      label: 'Programme Coordinator', 
      icon: Users, 
      desc: 'Managing ecosystem programmes.',
      color: 'orange'
    }
  ];

  const handleFinish = async () => {
    if (!selectedRole) return;
    setIsSubmitting(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        role: selectedRole,
        isOnboarded: true
      });
      onComplete();
    } catch (error) {
      console.error("Failed to complete onboarding", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-6 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full space-y-12 py-12"
      >
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-100 rotate-12">
              <ShieldCheck className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Complete your profile
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Choose your primary role in the Innovate Bridge Ecosystem to customize your dashboard.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role) => (
            <motion.button
              key={role.id}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedRole(role.id as UserRole)}
              className={cn(
                "p-8 rounded-3xl border-2 text-left transition-all relative group",
                selectedRole === role.id 
                  ? `border-blue-600 bg-blue-50/30 ring-4 ring-blue-50` 
                  : "border-gray-100 hover:border-gray-200"
              )}
            >
              {selectedRole === role.id && (
                <div className="absolute top-4 right-4 text-blue-600">
                  <CheckCircle2 className="w-5 h-5 fill-current" />
                </div>
              )}
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center mb-6",
                selectedRole === role.id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400 group-hover:bg-white transition-colors"
              )}>
                <role.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">{role.label}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{role.desc}</p>
            </motion.button>
          ))}
        </div>

        <div className="flex flex-col items-center gap-6">
          <button
            onClick={handleFinish}
            disabled={!selectedRole || isSubmitting}
            className={cn(
              "px-12 py-4 rounded-2xl font-black text-lg transition-all flex items-center gap-3",
              selectedRole 
                ? "bg-gray-900 text-white hover:bg-black shadow-xl shadow-gray-200" 
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            )}
          >
            {isSubmitting ? "Finalizing..." : "Enter Workspace"}
            {!isSubmitting && <ArrowRight className="w-5 h-5" />}
          </button>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            You can modify your role later in settings
          </p>
        </div>
      </motion.div>
    </div>
  );
}
