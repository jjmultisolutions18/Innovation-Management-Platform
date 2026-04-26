import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, addDoc, updateDoc, collection, query, where, onSnapshot, getDocFromServer, serverTimestamp, Timestamp } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// UI Utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const googleProvider = new GoogleAuthProvider();

export type UserRole = 'ADMIN' | 'COORDINATOR' | 'INNOVATOR' | 'MENTOR' | 'FUNDER' | 'MANAGER';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: UserRole;
  isOnboarded?: boolean;
  createdAt: any;
}

export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
    return false;
  }
}

export { signInWithPopup, signOut, onAuthStateChanged, doc, getDoc, setDoc, addDoc, updateDoc, collection, query, where, onSnapshot, serverTimestamp, Timestamp };
export type { User };
