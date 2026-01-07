import { motion } from 'framer-motion';
import { Activity, Sparkles, Moon, Gamepad2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ServiceCard from './ServiceCard';
import physiotherapyImage from '@/assets/physiotherapy.jpg';
import loungeImage from '@/assets/lounge.jpg';
import relaxationImage from '@/assets/relaxation-room.jpg';

const ServicesSection = () => {
  const { t, language } = useLanguage();

  const services = [
    {
      title: t.services.physiotherapy.title,
      description: t.services.physiotherapy.description,
      icon: <Activity className="w-6 h-6" />,
      image: physiotherapyImage,
      delay: 0,
    },
    {
      title: t.services.massage.title,
      description: t.services.massage.description,
      icon: <Sparkles className="w-6 h-6" />,
      delay: 0.1,
    },
    {
      title: t.services.relaxation.title,
      description: t.services.relaxation.description,
      icon: <Moon className="w-6 h-6" />,
      image: relaxationImage,
      badge: t.services.relaxation.badge,
      delay: 0.2,
    },
    {
      title: t.services.lounge.title,
      description: t.services.lounge.description,
      icon: <Gamepad2 className="w-6 h-6" />,
      image: loungeImage,
      badge: t.services.lounge.badge,
      delay: 0.3,
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="luxury-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="gold-gradient-text">{t.services.title}</span>
          </h2>
          <div className="gold-divider my-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
