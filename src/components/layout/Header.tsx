
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { useAuth } from "@/contexts/AuthContext";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { items } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/products?search=${searchQuery}`);
  };

  const laptopCategories = [
    { name: "Gaming Laptops", path: "/category/laptops?type=gaming" },
    { name: "Business Laptops", path: "/category/laptops?type=business" },
    { name: "Ultrabooks", path: "/category/laptops?type=ultrabook" },
    { name: "Budget Laptops", path: "/category/laptops?type=budget" },
  ];

  const desktopCategories = [
    { name: "Gaming Desktops", path: "/category/desktops?type=gaming" },
    { name: "Workstations", path: "/category/desktops?type=workstation" },
    { name: "All-in-One PCs", path: "/category/desktops?type=allinone" },
    { name: "Custom Builds", path: "/category/desktops?type=custom" },
  ];

  const accessoryCategories = [
    { name: "Monitors", path: "/category/accessories?type=monitor" },
    { name: "Keyboards", path: "/category/accessories?type=keyboard" },
    { name: "Mice", path: "/category/accessories?type=mouse" },
    { name: "Headphones", path: "/category/accessories?type=headphone" },
    { name: "Storage", path: "/category/accessories?type=storage" },
  ];

  const serviceCategories = [
    { name: "Computer Repair", path: "/services#repair" },
    { name: "Data Recovery", path: "/services#data-recovery" },
    { name: "System Upgrade", path: "/services#upgrade" },
    { name: "Network Setup", path: "/services#network" },
    { name: "Consultation", path: "/services#consultation" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-brand">Tedd's Computers</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Laptops</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {laptopCategories.map((category) => (
                        <li key={category.name}>
                          <NavigationMenuLink asChild>
                            <Link
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              to={category.path}
                            >
                              <div className="text-sm font-medium leading-none">{category.name}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Desktops</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {desktopCategories.map((category) => (
                        <li key={category.name}>
                          <NavigationMenuLink asChild>
                            <Link
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              to={category.path}
                            >
                              <div className="text-sm font-medium leading-none">{category.name}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Accessories</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {accessoryCategories.map((category) => (
                        <li key={category.name}>
                          <NavigationMenuLink asChild>
                            <Link
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              to={category.path}
                            >
                              <div className="text-sm font-medium leading-none">{category.name}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {serviceCategories.map((category) => (
                        <li key={category.name}>
                          <NavigationMenuLink asChild>
                            <Link
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              to={category.path}
                            >
                              <div className="text-sm font-medium leading-none">{category.name}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-xs mx-4">
            <form onSubmit={handleSearch} className="relative">
              <Input 
                type="text" 
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
              <Button 
                type="submit"
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0 h-full"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/account">
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            
            {user && (
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
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {user && (
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
            )}
            
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
        <div className="md:hidden bg-background border-t border-gray-200 px-4 py-2 animate-fade-in">
          <div className="py-2">
            <form onSubmit={handleSearch} className="relative mb-4">
              <Input 
                type="text" 
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-8"
              />
              <Button 
                type="submit"
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0 h-full"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>

            <div className="space-y-2 pt-2">
              <div className="font-medium">Laptops</div>
              {laptopCategories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="block pl-4 py-1.5 text-sm text-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <div className="space-y-2 pt-4">
              <div className="font-medium">Desktops</div>
              {desktopCategories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="block pl-4 py-1.5 text-sm text-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <div className="space-y-2 pt-4">
              <div className="font-medium">Accessories</div>
              {accessoryCategories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="block pl-4 py-1.5 text-sm text-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <div className="space-y-2 pt-4">
              <div className="font-medium">Services</div>
              {serviceCategories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="block pl-4 py-1.5 text-sm text-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-200 mt-4">
              <Link
                to="/account"
                className="block py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                My Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
