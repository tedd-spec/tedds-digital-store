
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const services = [
  { 
    icon: "🛠️",
    title: "Computer Repair",
    description: "Fast and reliable computer repair services for all brands and models."
  },
  { 
    icon: "🔒",
    title: "Security Services",
    description: "Protect your data and privacy with our comprehensive security solutions."
  },
  { 
    icon: "🔄",
    title: "System Upgrades",
    description: "Boost your computer's performance with our professional upgrade services."
  }
];

const ServicesBanner = () => {
  return (
    <section className="py-16 bg-brand text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Professional IT Services</h2>
          <p className="text-xl max-w-2xl mx-auto">
            We offer expert IT services and solutions to keep your technology running smoothly
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white bg-opacity-10 p-8 rounded-lg hover:bg-opacity-15 transition-colors"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="mb-4 text-white text-opacity-80">{service.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            asChild
            size="lg"
            className="bg-white text-brand hover:bg-gray-100"
          >
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesBanner;
