
import Layout from '@/components/layout/Layout';
import HeroBanner from '@/components/home/HeroBanner';
import CategorySection from '@/components/home/CategorySection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import ServicesBanner from '@/components/home/ServicesBanner';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';

const Index = () => {
  return (
    <Layout>
      <HeroBanner />
      <CategorySection />
      <FeaturedProducts />
      <ServicesBanner />
      <Testimonials />
      <Newsletter />
    </Layout>
  );
};

export default Index;
