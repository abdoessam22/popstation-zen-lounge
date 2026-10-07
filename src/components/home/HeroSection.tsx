import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, Calendar, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/config';
import Hero3DScene from '@/components/3d/Hero3DScene';

const HeroSection = () => {
  const { t, isRTL, language } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* 3D Background */}
      <Suspense fallback={
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />
      }>
        <Hero3DScene rtl={isRTL} />
      </Suspense>

      {/* Gradient Overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-background/95 via-background/80 to-background/40 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50 z-[1]" />

      {/* Content */}
      <div className="luxury-container relative z-10 py-20">
        <div className="max-w-2xl">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-primary font-medium text-sm">
              {language === 'ar' 
                ? 'مركز العافية والاسترخاء الفاخر (+18)' 
                : 'Luxury Wellness & Adult Relaxation (+18)'}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-6xl md:text-8xl lg:text-9xl font-bold mb-4 leading-[0.9]"
          >
            <motion.span 
              className="gold-gradient-text inline-block"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              POP
            </motion.span>
            <br />
            <motion.span 
              className="gold-gradient-text inline-block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
            >
              STATION
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-2xl md:text-3xl text-foreground/90 mb-6"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-muted-foreground text-lg leading-relaxed mb-4 max-w-xl"
          >
            {t.hero.description}
          </motion.p>

          {/* Owner Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm mb-10"
          >
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold text-sm">Dr.</span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {language === 'ar' ? 'د. عبدالرحمن السيد ناصف' : 'Dr. Abdulrahman El-Sayed Nasef'}
              </p>
              <p className="text-xs text-primary">
                {language === 'ar' ? 'دكتور بوب | دكتور جونسون' : 'Dr. Bob | Dr. Johnson'}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="hero" size="xl" asChild className="group">
              <Link to="/booking" className="flex items-center gap-2">
                <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {t.hero.bookNow}
              </Link>
            </Button>
            <Button variant="whatsapp" size="xl" asChild className="group">
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {t.hero.whatsapp}
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Animated scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1], y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
