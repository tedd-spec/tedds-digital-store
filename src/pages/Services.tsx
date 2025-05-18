
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PhoneCall, Clock, Calendar, Tool } from 'lucide-react';

interface ServiceProps {
  title: string;
  description: string;
  price: string;
  icon: JSX.Element;
}

const ServiceCard = ({ title, description, price, icon }: ServiceProps) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="w-12 h-12 mb-4 rounded-full bg-blue-100 flex items-center justify-center">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600">
          Starting from <span className="text-lg font-bold text-brand">{price}</span>
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="default" className="w-full">
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

const Services = () => {
  const services = [
    {
      title: "Computer Repair",
      description: "Complete diagnostic and repair for desktop computers and laptops of all brands",
      price: "$49.99",
      icon: <Tool className="h-6 w-6 text-blue-600" />
    },
    {
      title: "Virus Removal",
      description: "Complete virus, malware, adware removal and system optimization",
      price: "$39.99",
      icon: <Tool className="h-6 w-6 text-blue-600" />
    },
    {
      title: "Data Recovery",
      description: "Professional data recovery from damaged or corrupted storage devices",
      price: "$79.99",
      icon: <Tool className="h-6 w-6 text-blue-600" />
    },
    {
      title: "System Upgrade",
      description: "Hardware and software upgrades to improve your system performance",
      price: "$59.99",
      icon: <Tool className="h-6 w-6 text-blue-600" />
    },
    {
      title: "Network Setup",
      description: "Home or office network installation and troubleshooting",
      price: "$69.99",
      icon: <Tool className="h-6 w-6 text-blue-600" />
    },
    {
      title: "IT Consultation",
      description: "Professional IT advice and planning for businesses and individuals",
      price: "$89.99/hr",
      icon: <Clock className="h-6 w-6 text-blue-600" />
    },
    {
      title: "Cloud Services",
      description: "Setup and management of cloud storage and backup solutions",
      price: "$49.99",
      icon: <Calendar className="h-6 w-6 text-blue-600" />
    },
    {
      title: "Remote Support",
      description: "Remote technical assistance and troubleshooting",
      price: "$29.99/hr",
      icon: <PhoneCall className="h-6 w-6 text-blue-600" />
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-center mb-4">IT Services</h1>
          <p className="text-center text-gray-600 max-w-3xl mx-auto">
            Our experienced technicians provide comprehensive computer repair services 
            and IT solutions for both individuals and businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              price={service.price}
              icon={service.icon}
            />
          ))}
        </div>

        <div className="mt-16 bg-brand rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Need Custom IT Solutions?</h2>
          <p className="mb-6">
            We offer tailored IT services for businesses of all sizes. 
            Contact us to discuss your specific needs and get a customized quote.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="bg-white text-brand hover:bg-gray-100">
              Contact Us
            </Button>
            <Button variant="secondary">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;
