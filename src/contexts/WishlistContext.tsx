
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: number) => void;
  isInWishlist: (id: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const { user } = useAuth();

  // Load wishlist items from localStorage when the component mounts
  useEffect(() => {
    if (user) {
      const savedItems = localStorage.getItem(`wishlist-${user.id}`);
      if (savedItems) {
        setItems(JSON.parse(savedItems));
      }
    } else {
      setItems([]);
    }
  }, [user]);

  // Save wishlist items to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`wishlist-${user.id}`, JSON.stringify(items));
    }
  }, [items, user]);

  const addItem = (item: WishlistItem) => {
    if (!user) {
      toast.error("Please login to add items to your wishlist");
      return;
    }

    setItems(prev => {
      if (prev.some(i => i.id === item.id)) {
        return prev;
      }
      toast.success(`${item.name} added to wishlist`);
      return [...prev, item];
    });
  };

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
    toast("Item removed from wishlist");
  };

  const isInWishlist = (id: number) => {
    return items.some(item => item.id === id);
  };

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
