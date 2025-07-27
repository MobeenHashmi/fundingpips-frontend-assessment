import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Stock, User, Trade } from './types';
import { fetchStocks, mockStocks } from './mockData';

interface StoreState {
  stocks: Stock[];
  user: User | null;
  trades: Trade[];
  watchlist: Stock[];
  isConnected: boolean;

  updateStocks: (stocks: Stock[]) => void;
  setUser: (user: User | null) => void;
  addTrade: (trade: Trade) => void;
  setConnectionStatus: (status: boolean) => void;
  addToWatchlist: (stock: Stock) => void;
  removeFromWatchlist: (symbol: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      stocks: mockStocks,
      user: null,
      trades: [],
      watchlist: [],
      isConnected: true,

      updateStocks: (stocks) => set({ stocks }),

      setUser: (user) => set({ user }),

      addTrade: (trade) =>
        set((state) => ({ trades: [...state.trades, trade] })),

      setConnectionStatus: (status) => set({ isConnected: status }),

      addToWatchlist: (stock) => {
        const exists = get().watchlist.find((s) => s.symbol === stock.symbol);
        if (!exists) {
          set((state) => ({
            watchlist: [...state.watchlist, stock],
          }));
        }
      },

      removeFromWatchlist: (symbol) =>
        set((state) => ({
          watchlist: state.watchlist.filter((s) => s.symbol !== symbol),
        })),
    }),
    {
      name: 'fundingPips',
      partialize: (state) => ({
        user: state.user,
        trades: state.trades,
        watchlist: state.watchlist,
      }),
    }
  )
);

export async function initializeStocks() {
  const stocks = await fetchStocks();
  useStore.getState().updateStocks(stocks);
}
