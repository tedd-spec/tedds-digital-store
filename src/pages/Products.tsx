
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import { Product, products as allProducts } from '@/data/products';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    setProducts(allProducts);
    setIsLoading(false);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">All Products</h1>
        
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
              ))}
            </div>
          </div>
        ) : (
          <ProductGrid products={products} showFilters />
        )}
      </div>
    </Layout>
  );
};

export default Products;
