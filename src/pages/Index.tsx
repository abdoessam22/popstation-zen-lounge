import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import RamadanBanner from '@/components/home/RamadanBanner';
import ServicesSection from '@/components/home/ServicesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <RamadanBanner />
      <ServicesSection />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
