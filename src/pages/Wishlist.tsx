
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash, Heart } from 'lucide-react';
import { toast } from 'sonner';

const Wishlist = () => {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("Please login to view your wishlist");
      navigate('/login');
    }
  }, [user, navigate]);

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    });
  };

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 bg-gray-100">
        <div className="flex items-center justify-center mb-8">
          <Heart className="h-8 w-8 text-red-500 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
        </div>

        {items.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-gray-700">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">
              Browse our products and add your favorites to your wishlist!
            </p>
            <Button asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-700">
                {items.length} {items.length === 1 ? 'Item' : 'Items'} in your Wishlist
              </h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {items.map(item => (
                <div key={item.id} className="flex flex-col md:flex-row p-4 gap-4">
                  <div className="w-full md:w-24 h-24">
                    <Link to={`/product/${item.id}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </Link>
                  </div>
                  
                  <div className="flex-grow">
                    <Link 
                      to={`/product/${item.id}`} 
                      className="text-lg font-medium hover:text-blue-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="text-gray-600 font-bold mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex flex-row md:flex-col gap-2 mt-4 md:mt-0">
                    <Button
                      onClick={() => handleAddToCart(item)}
                      variant="default"
                      className="flex items-center gap-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Add to Cart</span>
                    </Button>
                    
                    <Button
                      onClick={() => removeItem(item.id)}
                      variant="outline"
                      className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Trash className="h-4 w-4" />
                      <span>Remove</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Wishlist;
