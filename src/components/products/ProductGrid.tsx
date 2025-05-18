
import { useState } from 'react';
import { Product } from '@/data/products';
import ProductCard from './ProductCard';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  title?: string;
  showFilters?: boolean;
  hotDeals?: boolean;
}

const ProductGrid = ({ products, title, showFilters = false, hotDeals = false }: ProductGridProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [displayedProducts, setDisplayedProducts] = useState(products);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setDisplayedProducts(filtered);
  };

  const handleSort = (value: string) => {
    setSortOption(value);
    
    const sorted = [...displayedProducts];
    switch (value) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Default sorting (keep original order)
        setDisplayedProducts(products);
        return;
    }
    
    setDisplayedProducts(sorted);
  };

  return (
    <div className="w-full">
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      
      {showFilters && (
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <form onSubmit={handleSearch} className="flex-1 flex">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
                <Button 
                  type="submit" 
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>
            
            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-2 text-gray-500" />
              <span className="mr-2 text-sm text-gray-500">Sort by:</span>
              <Select value={sortOption} onValueChange={handleSort}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}
      
      {displayedProducts.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-gray-50">
          <p className="text-lg text-gray-500">No products found.</p>
          <Button 
            variant="link" 
            onClick={() => {
              setSearchQuery('');
              setSortOption('default');
              setDisplayedProducts(products);
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} isHotDeal={hotDeals} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
