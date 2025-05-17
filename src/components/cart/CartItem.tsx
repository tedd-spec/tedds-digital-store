
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash } from 'lucide-react';
import { useCart, CartItem as CartItemType } from '@/contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCart();
  const [quantity, setQuantity] = useState(item.quantity);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0 && newQuantity <= 99) {
      setQuantity(newQuantity);
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b py-4">
      <div className="flex items-center">
        <div className="w-20 h-20 flex-shrink-0">
          <Link to={`/product/${item.id}`}>
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover rounded"
            />
          </Link>
        </div>
        <div className="ml-4">
          <Link to={`/product/${item.id}`} className="text-lg font-medium hover:text-brand-accent">
            {item.name}
          </Link>
        </div>
      </div>
      
      <div className="flex items-center mt-4 sm:mt-0">
        <div className="w-24">
          <Input
            type="number"
            min="1"
            max="99"
            value={quantity}
            onChange={handleQuantityChange}
            className="text-center"
          />
        </div>
        <div className="w-24 text-right mx-6">
          ${(item.price * item.quantity).toFixed(2)}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeItem(item.id)}
          className="text-red-500"
          aria-label="Remove item"
        >
          <Trash className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
