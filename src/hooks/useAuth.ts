import { useState, useEffect } from 'react';
import { auth, db, doc, onSnapshot, User, setDoc, UserProfile, UserRole, serverTimestamp, collection, query, where, getDocs, updateDoc } from '../lib/firebase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        const userRef = doc(db, 'users', firebaseUser.uid);
        const unsubscribeProfile = onSnapshot(userRef, async (snapshot) => {
          if (snapshot.exists()) {
            setProfile(snapshot.data() as UserProfile);
            setLoading(false);
          } else {
            // Check for invitations matching the email
            let assignedRole: UserRole = 'INNOVATOR';
            let isOnboarded = false;
            
            try {
              const inviteQuery = query(
                collection(db, 'invitations'), 
                where('email', '==', firebaseUser.email?.toLowerCase()),
                where('status', '==', 'pending')
              );
              const inviteSnap = await getDocs(inviteQuery);
              
              if (!inviteSnap.empty) {
                const inviteDoc = inviteSnap.docs[0];
                assignedRole = inviteDoc.data().role as UserRole;
                isOnboarded = true; // Skip onboarding since role was pre-assigned
                
                // Mark invite as accepted
                await updateDoc(doc(db, 'invitations', inviteDoc.id), {
                  status: 'accepted',
                  acceptedAt: serverTimestamp(),
                  uid: firebaseUser.uid
                });
              }
            } catch (err) {
              console.error("Error checking invitations:", err);
            }

            const newProfile: UserProfile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || 'New Explorer',
              photoURL: firebaseUser.photoURL || '',
              role: assignedRole,
              isOnboarded: isOnboarded,
              createdAt: serverTimestamp(),
            };
            await setDoc(userRef, newProfile);
            setProfile(newProfile);
            setLoading(false);
          }
        });
        
        return () => unsubscribeProfile();
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return { user, profile, loading };
}
