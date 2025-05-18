
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
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  isHotDeal?: boolean;
}

const ProductCard = ({ product, isHotDeal = false }: ProductCardProps) => {
  const { addItem } = useCart();
  const { user } = useAuth();
  
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-lg relative">
      {isHotDeal && (
        <span className="hot-deal-badge">Hot Deal!</span>
      )}
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
          <CardTitle className="text-lg hover:text-brand-accent transition-colors">{product.name}</CardTitle>
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
        <div className="text-xl font-bold text-brand w-full">${product.price.toFixed(2)}</div>
        <div className="flex gap-2 w-full">
          <Button 
            onClick={handleAddToCart}
            variant="default"
            size="sm"
            className="flex items-center gap-1 flex-1"
            disabled={!user}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add to Cart
          </Button>
          <Button 
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
