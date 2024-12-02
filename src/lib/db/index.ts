import { 
  doc, 
  setDoc, 
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import { initializeStocksCollection } from './stockService';

// Create user profile with initial data
export const createUserProfile = async (userId: string, data: any) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      settings: {
        theme: 'light',
        notifications: true
      }
    });
    
    // Initialize stocks collection for new user
    await initializeStocksCollection(userId);
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (userId: string, data: any) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};