
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Product, products as allProducts } from '@/data/products';
import ProductGrid from '@/components/products/ProductGrid';
import { Flame } from 'lucide-react';

const HotDeals = () => {
  const [hotDeals, setHotDeals] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call to get products with discounts
    // For now, we're randomly selecting products and applying a discount
    const randomDeals = [...allProducts]
      .sort(() => 0.5 - Math.random())
      .slice(0, 12)
      .map(product => ({
        ...product,
        price: parseFloat((product.price * 0.85).toFixed(2)), // 15% discount
        hotDeal: true
      }));
    
    setHotDeals(randomDeals);
    setIsLoading(false);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 bg-gray-100">
        <div className="flex items-center justify-center mb-8">
          <Flame className="h-8 w-8 text-red-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">Hot Deals</h1>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg mb-8 text-center">
          <p className="text-red-800">
            Limited time offers! Save up to 15% on these selected products.
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
              ))}
            </div>
          </div>
        ) : (
          <ProductGrid products={hotDeals} showFilters hotDeals={true} />
        )}
      </div>
    </Layout>
  );
};

export default HotDeals;
