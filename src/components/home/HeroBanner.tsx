
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const HeroBanner = () => {
  return (
    <div className="relative w-full">
      <div className="hero-gradient absolute inset-0 z-10"></div>
      
      <img 
        src="https://images.unsplash.com/photo-1537498425277-c283d32ef9db" 
        alt="Latest technology" 
        className="w-full h-[600px] object-cover"
      />
      
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-12 lg:px-24">
        <div className="max-w-xl text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            Technology Solutions for Modern Life
          </h1>
          <p className="text-lg sm:text-xl opacity-90 mb-6">
            Discover the latest laptops, desktops, and accessories at Tedd's Computers - your trusted technology partner.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              asChild
              size="lg" 
              className="bg-white text-brand-dark hover:bg-gray-100"
            >
              <Link to="/products">
                Shop Now
              </Link>
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-brand-dark"
            >
              <Link to="/services">
                Our Services
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
