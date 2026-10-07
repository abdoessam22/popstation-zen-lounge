import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, Sparkles, Moon, Gamepad2, Crown, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ServiceCard from './ServiceCard';
import { Button } from '@/components/ui/button';
import physiotherapyImage from '@/assets/physiotherapy.jpg';
import loungeImage from '@/assets/lounge.jpg';
import relaxationImage from '@/assets/relaxation-room.jpg';
import massageImage from '@/assets/massage.jpg';

const ServicesSection = () => {
  const { t, language, isRTL } = useLanguage();

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
      image: massageImage,
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
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="luxury-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="font-display text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <span className="gold-gradient-text">{t.services.title}</span>
          </motion.h2>
          <div className="gold-divider my-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        {/* VIP Highlight Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative mt-12"
        >
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/20 via-card to-card border border-primary/30 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-start">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-4">
                  <Crown className="w-4 h-4" />
                  <span className="text-sm font-bold">VIP</span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {t.services.vip?.title || (language === 'ar' ? 'تجربة VIP' : 'VIP Experience')}
                </h3>
                <p className="text-muted-foreground text-lg max-w-xl">
                  {t.services.vip?.description || (language === 'ar' 
                    ? 'غرف خاصة فاخرة مع أولوية الحجز وجلسات ممتدة ومشروبات مجانية'
                    : 'Private luxury rooms with priority booking, extended sessions, and complimentary drinks')}
                </p>
              </div>
              <div className="flex-shrink-0">
                <Button variant="hero" size="xl" asChild className="group">
                  <Link to="/vip" className="flex items-center gap-2">
                    {language === 'ar' ? 'اكتشف المزيد' : 'Discover More'}
                    {isRTL ? (
                      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    ) : (
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    )}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
