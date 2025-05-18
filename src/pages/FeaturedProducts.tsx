
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Product, products as allProducts } from '@/data/products';
import ProductGrid from '@/components/products/ProductGrid';
import { Star } from 'lucide-react';

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call to get featured products
    // For now, we're selecting products with highest ratings
    const featured = [...allProducts]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 8);
    
    setFeaturedProducts(featured);
    setIsLoading(false);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 bg-gray-100">
        <div className="flex items-center justify-center mb-8">
          <Star className="h-8 w-8 text-yellow-500 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">Featured Products</h1>
        </div>
        
        <div className="bg-gray-200 p-4 rounded-lg mb-8 text-center">
          <p className="text-gray-700">
            Our hand-picked selection of top-rated products with excellent performance and value.
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
              ))}
            </div>
          </div>
        ) : (
          <ProductGrid products={featuredProducts} showFilters={false} />
        )}
      </div>
    </Layout>
  );
};

export default FeaturedProducts;
