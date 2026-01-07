import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/config';

const CTASection = () => {
  const { t, language } = useLanguage();

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--primary) / 0.15) 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} />

      <div className="luxury-container relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {language === 'ar' ? (
              <>
                <span className="text-foreground">ابدأ رحلتك نحو </span>
                <span className="gold-gradient-text">الاسترخاء</span>
              </>
            ) : (
              <>
                <span className="text-foreground">Begin Your Journey to </span>
                <span className="gold-gradient-text">Relaxation</span>
              </>
            )}
          </h2>
          
          <p className="text-muted-foreground text-xl mb-10 leading-relaxed">
            {language === 'ar'
              ? 'احجز موعدك اليوم واستمتع بتجربة فريدة من الراحة والعافية في أجواء فاخرة'
              : 'Book your appointment today and enjoy a unique experience of comfort and wellness in a luxurious atmosphere'}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link to="/booking" className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {t.hero.bookNow}
              </Link>
            </Button>
            <Button variant="gold-outline" size="xl" asChild>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                {t.hero.whatsapp}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
