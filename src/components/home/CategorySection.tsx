
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    name: 'Laptops',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
    path: '/category/laptops',
    description: 'Powerful laptops for work and play'
  },
  {
    name: 'Desktops',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45',
    path: '/category/desktops',
    description: 'High-performance desktop computers'
  },
  {
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1616071089875-d7981d42474e',
    path: '/category/accessories',
    description: 'Enhance your tech experience'
  },
  {
    name: 'Services',
    image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147',
    path: '/services',
    description: 'Expert tech support and repairs'
  }
];

const CategorySection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link to={category.path} key={index}>
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow group">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
