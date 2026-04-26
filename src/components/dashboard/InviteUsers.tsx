import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UserPlus, 
  Mail, 
  Shield, 
  Send, 
  CheckCircle2, 
  X, 
  Clock,
  MoreVertical,
  Trash2
} from 'lucide-react';
import { db, collection, addDoc, onSnapshot, query, where, serverTimestamp, cn } from '../../lib/firebase';
import { UserRole } from '../../lib/firebase';
import { ROLE_LABELS } from '../../constants';

export function InviteUsers() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('INNOVATOR');
  const [invites, setInvites] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'invitations'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInvites(docs);
    });
    return () => unsubscribe();
  }, []);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'invitations'), {
        email: email.toLowerCase(),
        role,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      setEmail('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Invite failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <header>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Ecosystem Invitations</h2>
        <p className="text-gray-500 font-medium">Invite ecosystem partners and pre-assign their roles.</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6 sticky top-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <UserPlus className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900">Send Invite</h3>
            </div>

            <form onSubmit={handleInvite} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="partner@example.com"
                    className="w-full bg-gray-50 border-none rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500/10 transition-all font-medium"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Assigned Role</label>
                <div className="grid grid-cols-1 gap-2">
                  {(['INNOVATOR', 'MENTOR', 'FUNDER', 'COORDINATOR'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl border text-sm font-bold transition-all",
                        role === r 
                          ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100" 
                          : "bg-gray-50 text-gray-600 border-gray-100 hover:border-gray-200"
                      )}
                    >
                      <Shield className={cn("w-4 h-4", role === r ? "text-blue-100" : "text-gray-400")} />
                      {ROLE_LABELS[r]}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm hover:bg-black transition-all shadow-xl shadow-gray-100 disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Invitation"}
                <Send className="w-4 h-4" />
              </button>
            </form>
            
            <AnimatePresence>
              {showSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 bg-green-50 text-green-700 rounded-xl text-xs font-bold flex items-center gap-2 border border-green-100"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Invitation sent successfully!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Recent Invites</h3>
              <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">{invites.length} Total</span>
            </div>
            
            <div className="divide-y divide-gray-50">
              {invites.length === 0 ? (
                <div className="p-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                    <UserPlus className="w-8 h-8" />
                  </div>
                  <p className="text-gray-400 font-medium tracking-tight">No pending invitations found.</p>
                </div>
              ) : (
                invites.map((invite) => (
                  <div key={invite.id} className="p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold">
                        {invite.email.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{invite.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded-sm">
                            {invite.role}
                          </span>
                          <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {invite.createdAt?.toDate ? invite.createdAt.toDate().toLocaleDateString() : 'Just now'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-1 rounded-full uppercase",
                        invite.status === 'pending' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                      )}>
                        {invite.status}
                      </span>
                      <button className="p-2 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
