
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Product } from "@/data/products";
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  isHotDeal?: boolean;
}

const ProductCard = ({ product, isHotDeal = false }: ProductCardProps) => {
  const { addItem } = useCart();
  const { user } = useAuth();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  
  const inWishlist = isInWishlist(product.id);
  
  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      navigate('/login');
      return;
    }
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };
  
  const handleWishlistToggle = () => {
    if (!user) {
      toast.error("Please login to add items to wishlist");
      navigate('/login');
      return;
    }
    
    if (inWishlist) {
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
  
  const handleWhatsAppOrder = () => {
    if (!user) {
      toast.error("Please login to place an order");
      navigate('/login');
      return;
    }
    
    const message = `Hello, I'm interested in purchasing the ${product.name} (ID: ${product.id}) for $${product.price.toFixed(2)}`;
    // In production, this would use the actual WhatsApp number
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-lg relative bg-gray-50">
      {isHotDeal && (
        <span className="hot-deal-badge">Hot Deal!</span>
      )}
      <div className="absolute top-2 left-2 z-10">
        <Button
          variant="ghost"
          size="icon"
          className={`rounded-full ${inWishlist ? 'bg-red-100 text-red-500' : 'bg-white/80 text-gray-500 hover:text-red-500'}`}
          onClick={handleWishlistToggle}
        >
          <Heart className={`h-5 w-5 ${inWishlist ? 'fill-red-500' : ''}`} />
        </Button>
      </div>
      <Link to={`/product/${product.id}`} className="overflow-hidden">
        <div className="h-48 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>
      <CardHeader className="pb-2">
        <Link to={`/product/${product.id}`}>
          <CardTitle className="text-lg hover:text-gray-700 transition-colors">{product.name}</CardTitle>
        </Link>
        <CardDescription className="line-clamp-2 mt-1">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3 flex-grow">
        <div className="mt-1 text-sm text-gray-600">
          {product.category === 'laptops' && (
            <div>
              <p>{product.specs?.cpu}</p>
              <p>{product.specs?.ram} • {product.specs?.storage}</p>
            </div>
          )}
          {product.category === 'desktops' && (
            <div>
              <p>{product.specs?.cpu}</p>
              <p>{product.specs?.gpu}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 pt-0">
        <div className="text-xl font-bold text-gray-800 w-full">${product.price.toFixed(2)}</div>
        <div className="flex gap-2 w-full">
          <Button 
            onClick={handleAddToCart}
            variant="default"
            size="sm"
            className="flex items-center gap-1 flex-1 bg-gray-700 hover:bg-gray-800"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add to Cart
          </Button>
          <Button 
            onClick={handleWhatsAppOrder}
            variant="outline"
            size="sm"
            className="flex items-center gap-1 flex-1 border-green-500 text-green-600 hover:bg-green-50"
          >
            Order via WhatsApp
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
