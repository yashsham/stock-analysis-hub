import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from './firebase';

export const createUserProfile = async (userId: string, data: any) => {
  try {
    await setDoc(doc(db, 'users', userId), {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId: string, data: any) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...data,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const addStockToPortfolio = async (userId: string, stockData: any) => {
  try {
    const portfolioRef = doc(db, 'portfolios', userId);
    const portfolioDoc = await getDoc(portfolioRef);
    
    if (!portfolioDoc.exists()) {
      await setDoc(portfolioRef, {
        stocks: [stockData],
        updatedAt: new Date().toISOString()
      });
    } else {
      const currentStocks = portfolioDoc.data().stocks || [];
      await updateDoc(portfolioRef, {
        stocks: [...currentStocks, stockData],
        updatedAt: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Error adding stock to portfolio:', error);
    throw error;
  }
};

export const getPortfolio = async (userId: string) => {
  try {
    const portfolioRef = doc(db, 'portfolios', userId);
    const portfolioDoc = await getDoc(portfolioRef);
    return portfolioDoc.exists() ? portfolioDoc.data() : null;
  } catch (error) {
    console.error('Error getting portfolio:', error);
    throw error;
  }
};