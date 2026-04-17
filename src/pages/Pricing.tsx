import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { pricingConfig } from '@/lib/config';

const Pricing = () => {
  const { t, language } = useLanguage();

  const packages = [
    {
      name: language === 'ar' ? 'الأساسية' : 'Starter',
      price: pricingConfig.starter.price,
      currency: language === 'ar' ? 'ج.م' : 'EGP',
      description: language === 'ar' ? 'مثالية للبداية' : 'Perfect for getting started',
      features: language === 'ar' ? [
        'جلسة علاج طبيعي واحدة',
        'تقييم أولي',
        'خطة علاجية مبسطة',
        'متابعة هاتفية',
      ] : [
        'Single physiotherapy session',
        'Initial assessment',
        'Basic treatment plan',
        'Phone follow-up',
      ],
      popular: false,
    },
    {
      name: language === 'ar' ? 'المميزة' : 'Premium',
      price: pricingConfig.premium.price,
      currency: language === 'ar' ? 'ج.م' : 'EGP',
      description: language === 'ar' ? 'الأكثر طلباً' : 'Most Popular',
      features: language === 'ar' ? [
        '5 جلسات علاج طبيعي',
        'تقييم شامل',
        'خطة علاجية متكاملة',
        'جلسة مساج استرخائي',
        'متابعة مستمرة',
        'أولوية في الحجز',
      ] : [
        '5 physiotherapy sessions',
        'Comprehensive assessment',
        'Complete treatment plan',
        'Relaxation massage session',
        'Continuous follow-up',
        'Priority booking',
      ],
      popular: true,
    },
    {
      name: language === 'ar' ? 'النخبة + VIP' : 'Elite + VIP',
      price: pricingConfig.elite.price,
      currency: language === 'ar' ? 'ج.م' : 'EGP',
      description: language === 'ar' ? 'تجربة VIP كاملة' : 'Full VIP experience',
      features: language === 'ar' ? [
        '10 جلسات علاج طبيعي',
        'تقييم شامل ومتابعة VIP',
        'خطة علاجية مخصصة بالكامل',
        '3 جلسات مساج متنوعة',
        'وصول لصالة الألعاب',
        'غرفة استرخاء خاصة VIP',
      ] : [
        '10 physiotherapy sessions',
        'VIP assessment and follow-up',
        'Fully customized treatment plan',
        '3 varied massage sessions',
        'Games lounge access',
        'Private VIP relaxation room',
      ],
      popular: false,
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-card to-background" />
        <div className="luxury-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              <span className="gold-gradient-text">
                {t.pricing.title}
              </span>
            </h1>
            <div className="gold-divider my-8" />
            <p className="text-muted-foreground text-xl leading-relaxed">
              {t.pricing.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-padding bg-background">
        <div className="luxury-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative p-8 rounded-2xl border transition-all duration-300 hover-lift ${
                  pkg.popular
                    ? 'bg-gradient-to-b from-primary/10 to-card border-primary shadow-[0_0_30px_hsl(43_74%_49%_/_0.2)]'
                    : 'bg-card border-border hover:border-primary/30'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                      <Star className="w-4 h-4 fill-current" />
                      {t.pricing.mostPopular}
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    {pkg.description}
                  </p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="font-display text-5xl font-bold text-primary">
                      {pkg.price}
                    </span>
                    <span className="text-muted-foreground">
                      {pkg.currency}
                    </span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-foreground">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={pkg.popular ? 'gold' : 'gold-outline'}
                  className="w-full"
                  asChild
                >
                  <Link to="/booking">{t.nav.booking}</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
