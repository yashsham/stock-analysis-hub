import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where,
  updateDoc,
  deleteDoc,
  orderBy,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../firebase';

export interface StockEntry {
  id: string;
  symbol: string;
  purchasePrice: number;
  quantity: number;
  purchaseDate: Date;
  notes?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Initialize stocks collection for a new user
export const initializeStocksCollection = async (userId: string) => {
  try {
    const userStocksRef = doc(db, `users/${userId}/portfolio/stocks`);
    await setDoc(userStocksRef, {
      initialized: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error initializing stocks collection:', error);
    throw error;
  }
};

// Add a new stock to user's portfolio
export const addStock = async (stockData: Omit<StockEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const stocksRef = collection(db, `users/${stockData.userId}/portfolio/stocks/entries`);
    const docRef = doc(stocksRef);
    
    const timestamp = serverTimestamp();
    const newStock = {
      ...stockData,
      id: docRef.id,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    
    await setDoc(docRef, newStock);
    
    return {
      ...newStock,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  } catch (error) {
    console.error('Error adding stock:', error);
    throw error;
  }
};

// Get all stocks for a user
export const getUserStocks = async (userId: string): Promise<StockEntry[]> => {
  try {
    // First, ensure the portfolio is initialized
    const portfolioRef = doc(db, `users/${userId}/portfolio/stocks`);
    const portfolioDoc = await getDoc(portfolioRef);
    
    if (!portfolioDoc.exists()) {
      await initializeStocksCollection(userId);
    }
    
    // Then get all stock entries
    const stocksRef = collection(db, `users/${userId}/portfolio/stocks/entries`);
    const q = query(stocksRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        purchaseDate: data.purchaseDate.toDate(),
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate()
      } as StockEntry;
    });
  } catch (error) {
    console.error('Error getting user stocks:', error);
    throw error;
  }
};

// Update an existing stock
export const updateStock = async (userId: string, stockId: string, data: Partial<StockEntry>) => {
  try {
    const stockRef = doc(db, `users/${userId}/portfolio/stocks/entries/${stockId}`);
    await updateDoc(stockRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating stock:', error);
    throw error;
  }
};

// Delete a stock
export const deleteStock = async (userId: string, stockId: string) => {
  try {
    const stockRef = doc(db, `users/${userId}/portfolio/stocks/entries/${stockId}`);
    await deleteDoc(stockRef);
  } catch (error) {
    console.error('Error deleting stock:', error);
    throw error;
  }
};