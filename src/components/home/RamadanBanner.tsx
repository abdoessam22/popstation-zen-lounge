import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Gift, Crown, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const RamadanLantern = ({ className = '', delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    className={`absolute ${className}`}
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay }}
  >
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay }}
      className="text-primary/60"
    >
      <svg width="32" height="48" viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0L16 8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 8H20L22 14C22 14 24 20 24 28C24 36 20 40 16 40C12 40 8 36 8 28C8 20 10 14 10 14L12 8Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 40H18L17 48H15L14 40Z" fill="currentColor" fillOpacity="0.3" />
        <circle cx="16" cy="24" r="3" fill="currentColor" fillOpacity="0.4" />
      </svg>
    </motion.div>
  </motion.div>
);

const RamadanBanner = () => {
  const { language, isRTL } = useLanguage();

  const offers = [
    {
      icon: <Gift className="w-6 h-6" />,
      title: language === 'ar' ? 'جميع الجلسات مجاناً' : 'All Sessions FREE',
      description: language === 'ar' ? 'جلسات العلاج الطبيعي والمساج مجاناً طوال رمضان' : 'Physiotherapy & massage sessions free all Ramadan',
    },
    {
      icon: <Crown className="w-6 h-6" />,
      title: language === 'ar' ? 'VIP بسعر المجاني' : 'VIP at FREE Price',
      description: language === 'ar' ? 'استمتع بتجربة VIP الفاخرة مجاناً' : 'Enjoy the luxury VIP experience for free',
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: language === 'ar' ? 'باقة رمضان الخاصة' : 'Special Ramadan Package',
      description: language === 'ar' ? 'خصم 50% على جميع الباقات والمنتجات' : '50% off all packages and products',
    },
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Ramadan-themed background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
      
      {/* Stars decoration */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${Math.random() * 60 + 5}%`,
            left: `${Math.random() * 90 + 5}%`,
          }}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
        >
          <Star className="w-3 h-3 text-primary/40 fill-primary/30" />
        </motion.div>
      ))}

      {/* Lanterns */}
      <RamadanLantern className="top-4 left-[10%] hidden md:block" delay={0} />
      <RamadanLantern className="top-8 right-[12%] hidden md:block" delay={0.3} />
      <RamadanLantern className="top-2 left-[45%] hidden lg:block" delay={0.6} />

      {/* Crescent moon */}
      <motion.div
        className="absolute top-8 right-[5%] md:right-[8%] text-primary/30"
        animate={{ rotate: [0, 5, 0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M36 24C36 13.5 28 6 18 6C20.5 3 25 1 30 1C40.5 1 47 10 47 24C47 38 40.5 47 30 47C25 47 20.5 45 18 42C28 42 36 34.5 36 24Z" fill="currentColor" />
        </svg>
      </motion.div>

      <div className="luxury-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/15 text-primary mb-6 border border-primary/20"
            animate={{ boxShadow: ['0 0 15px hsl(43 74% 49% / 0.1)', '0 0 30px hsl(43 74% 49% / 0.3)', '0 0 15px hsl(43 74% 49% / 0.1)'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-bold">
              {language === 'ar' ? '🌙 عروض رمضان المباركة 🌙' : '🌙 Blessed Ramadan Offers 🌙'}
            </span>
            <Star className="w-4 h-4 fill-current" />
          </motion.div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gold-gradient-text">
              {language === 'ar' ? 'عروض رمضان' : 'Ramadan Offers'}
            </span>
          </h2>
          <div className="gold-divider my-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {language === 'ar'
              ? 'بمناسبة الشهر الكريم، نقدم لكم عروض استثنائية على جميع خدماتنا. رمضان كريم! 🌟'
              : 'In celebration of the holy month, we offer exceptional deals on all our services. Ramadan Kareem! 🌟'}
          </p>
        </motion.div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-2xl bg-card border border-primary/20 hover:border-primary/50 transition-all duration-300 overflow-hidden"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  {offer.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {offer.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {offer.description}
                </p>
              </div>

              {/* Corner decoration */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/5 rounded-full" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button variant="hero" size="xl" asChild className="group">
            <Link to="/booking" className="flex items-center gap-2">
              {language === 'ar' ? 'احجز عرض رمضان الآن' : 'Book Ramadan Offer Now'}
              {isRTL ? (
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              ) : (
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              )}
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default RamadanBanner;
