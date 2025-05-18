
import { useEffect, useState } from 'react';
import { Product } from '@/data/products';
import ProductGrid from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface HotDealsProps {
  products: Product[];
}

const HotDeals = ({ products }: HotDealsProps) => {
  const [hotDeals, setHotDeals] = useState<Product[]>([]);

  useEffect(() => {
    // In a real app, this would be filtered by hot deals flag or special price
    const randomDeals = [...products]
      .sort(() => 0.5 - Math.random())
      .slice(0, 4)
      .map(product => ({
        ...product,
        price: parseFloat((product.price * 0.85).toFixed(2)) // 15% discount
      }));
    
    setHotDeals(randomDeals);
  }, [products]);

  return (
    <section className="py-12 bg-red-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-red-600">🔥 Hot Deals</h2>
          <Button asChild variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
            <Link to="/hot-deals">View All Deals</Link>
          </Button>
        </div>
        
        <ProductGrid 
          products={hotDeals} 
          showFilters={false}
          hotDeals={true}
        />
      </div>
    </section>
  );
};

export default HotDeals;
