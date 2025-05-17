
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ShoppingCart, 
  User, 
  Search, 
  Menu, 
  X 
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { items } = useCart();
  
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  
  const categories = [
    { name: "Laptops", path: "/category/laptops" },
    { name: "Desktops", path: "/category/desktops" },
    { name: "Accessories", path: "/category/accessories" },
    { name: "Services", path: "/services" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-brand">Tedd's Computers</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to={category.path} 
                className="text-gray-700 hover:text-brand-accent font-medium"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {!isSearchOpen ? (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleSearch}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>
            ) : (
              <div className="flex items-center">
                <Input 
                  type="text" 
                  placeholder="Search products..."
                  className="w-64"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleSearch}
                  aria-label="Close search"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            )}
            
            <Link to="/account">
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu} 
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-2 animate-fade-in">
          <div className="py-2 space-y-1">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to={category.path} 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-brand-accent rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            <Link 
              to="/account"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-brand-accent rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Account
            </Link>
          </div>
          <div className="pt-2 pb-3 border-t border-gray-200">
            <div className="flex items-center px-3">
              <Input 
                type="text" 
                placeholder="Search products..."
                className="w-full"
              />
              <Button variant="ghost" size="icon" className="ml-2">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
