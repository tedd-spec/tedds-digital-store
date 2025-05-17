
import { useEffect, useState } from 'react';
import { Product, getFeaturedProducts } from '@/data/products';
import ProductGrid from '@/components/products/ProductGrid';

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    setProducts(getFeaturedProducts());
  }, []);

  return (
    <section className="py-16 container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
      <ProductGrid products={products} />
    </section>
  );
};

export default FeaturedProducts;
