
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'sonner';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addItem = (item: CartItem) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(i => i.id === item.id);
      
      if (existingItem) {
        toast.success(`${item.name} quantity updated in cart`);
        return currentItems.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        toast.success(`${item.name} added to cart`);
        return [...currentItems, item];
      }
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    setItems(currentItems => 
      currentItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    const itemName = items.find(i => i.id === id)?.name;
    setItems(currentItems => currentItems.filter(item => item.id !== id));
    if (itemName) toast(`${itemName} removed from cart`);
  };

  const clearCart = () => {
    setItems([]);
    toast("Cart cleared");
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      addItem, 
      updateQuantity, 
      removeItem, 
      clearCart, 
      total 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
