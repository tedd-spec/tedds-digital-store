
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { Product, getProductById } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useWishlist } from '@/contexts/WishlistContext';
import ProductReviews from '@/components/products/ProductReviews';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { addItem } = useCart();
  const { user } = useAuth();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    if (id) {
      // In a real app, this would be an API call
      const productId = parseInt(id);
      const foundProduct = getProductById(productId);
      
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        toast.error("Product not found");
        navigate('/products');
      }
      
      setIsLoading(false);
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (product && user) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity
      });
    } else if (!user) {
      toast.error("Please login to add items to cart");
      navigate('/login');
    }
  };

  const handleOrderViaWhatsApp = () => {
    if (product && user) {
      const message = `Hello, I'm interested in purchasing the ${product.name} (ID: ${product.id}) for $${product.price.toFixed(2)}. Quantity: ${quantity}`;
      // In production, this would use the actual WhatsApp number
      const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } else if (!user) {
      toast.error("Please login to place an order");
      navigate('/login');
    }
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    
    if (!user) {
      toast.error("Please login to add items to wishlist");
      navigate('/login');
      return;
    }
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };
  
  const handleBuyNow = () => {
    if (product && user) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity
      });
      navigate('/checkout');
    } else if (!user) {
      toast.error("Please login to proceed to checkout");
      navigate('/login');
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 bg-gray-100">
          <div className="flex justify-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
              <div className="h-64 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 bg-gray-100">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Product not found</h1>
            <Button 
              onClick={() => navigate('/products')} 
              className="mt-4"
            >
              Return to Products
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const inWishlist = isInWishlist(product.id);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 bg-gray-100">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Product Details */}
            <div>
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold mb-2 text-gray-800">{product.name}</h1>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full ${inWishlist ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                  onClick={handleWishlistToggle}
                >
                  <Heart className={`h-6 w-6 ${inWishlist ? 'fill-red-500' : ''}`} />
                </Button>
              </div>
              
              <div className="text-2xl font-semibold text-gray-800 mb-4">
                ${product.price.toFixed(2)}
              </div>
              
              <div className="mb-6">
                <p className="text-gray-700">{product.description}</p>
              </div>
              
              {/* Stock Status */}
              <div className="mb-6">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
              </div>
              
              {/* Quantity Selector */}
              {product.stock > 0 && (
                <div className="mb-6 flex items-center">
                  <label htmlFor="quantity" className="mr-4 font-medium">Quantity:</label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-16 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    {[...Array(Math.min(10, product.stock))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              {/* Payment Options */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Payment Options</h3>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="cod"
                    name="payment"
                    value="cod"
                    checked
                    readOnly
                    className="mr-2"
                  />
                  <label htmlFor="cod" className="text-sm">Cash On Delivery</label>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Button
                  onClick={handleAddToCart}
                  disabled={!user || product.stock === 0}
                  className="flex-1 flex items-center justify-center bg-gray-700 hover:bg-gray-800"
                  size="lg"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  disabled={!user || product.stock === 0}
                  variant="default"
                  className="flex-1 bg-gray-800 hover:bg-gray-900"
                  size="lg"
                >
                  Buy Now
                </Button>
                <Button
                  onClick={handleOrderViaWhatsApp}
                  disabled={!user || product.stock === 0}
                  variant="outline"
                  className="flex-1 border-green-500 text-green-600 hover:bg-green-50"
                  size="lg"
                >
                  Order via WhatsApp
                </Button>
              </div>
              
              {/* Product Specifications */}
              {product.specs && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Specifications</h2>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <table className="w-full">
                      <tbody>
                        {Object.entries(product.specs).map(([key, value]) => (
                          <tr key={key} className="border-b last:border-0">
                            <td className="py-2 font-medium capitalize text-gray-600">{key}</td>
                            <td className="py-2">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Product Reviews */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <ProductReviews 
            productId={product.id} 
            initialReviews={[]}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
