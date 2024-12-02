import create from 'zustand';
import { StockEntry } from '../lib/db/stockService';

interface StockState {
  stocks: StockEntry[];
  loading: boolean;
  error: string | null;
  setStocks: (stocks: StockEntry[]) => void;
  addStock: (stock: StockEntry) => void;
  updateStock: (id: string, data: Partial<StockEntry>) => void;
  removeStock: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useStockStore = create<StockState>((set) => ({
  stocks: [],
  loading: false,
  error: null,
  setStocks: (stocks) => set({ stocks }),
  addStock: (stock) => set((state) => ({ 
    stocks: [stock, ...state.stocks] 
  })),
  updateStock: (id, data) => set((state) => ({
    stocks: state.stocks.map((stock) =>
      stock.id === id ? { ...stock, ...data } : stock
    ),
  })),
  removeStock: (id) => set((state) => ({
    stocks: state.stocks.filter((stock) => stock.id !== id),
  })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));