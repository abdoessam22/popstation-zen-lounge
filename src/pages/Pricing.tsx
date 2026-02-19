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
      name: language === 'ar' ? '🌙 الأساسية' : '🌙 Starter',
      price: language === 'ar' ? 'مجاناً' : 'FREE',
      currency: '',
      description: language === 'ar'
        ? '🎁 عرض رمضان - مجاناً بالكامل!'
        : '🎁 Ramadan Offer - Completely FREE!',
      features: language === 'ar' ? [
        'جلسة علاج طبيعي واحدة مجاناً',
        'تقييم أولي مجاني',
        'خطة علاجية مبسطة',
        'متابعة هاتفية',
        '🌟 عرض رمضان حصري',
      ] : [
        'Single physiotherapy session FREE',
        'Free initial assessment',
        'Basic treatment plan',
        'Phone follow-up',
        '🌟 Exclusive Ramadan offer',
      ],
      popular: false,
    },
    {
      name: language === 'ar' ? '🌙 المميزة' : '🌙 Premium',
      price: language === 'ar' ? 'مجاناً' : 'FREE',
      currency: '',
      description: language === 'ar'
        ? '⭐ عرض رمضان - الأكثر طلباً!'
        : '⭐ Ramadan Offer - Most Popular!',
      features: language === 'ar' ? [
        '5 جلسات علاج طبيعي مجاناً',
        'تقييم شامل مجاني',
        'خطة علاجية متكاملة',
        'جلسة مساج استرخائي مجاناً',
        'متابعة مستمرة',
        'أولوية في الحجز',
        '🌟 عرض رمضان حصري',
      ] : [
        '5 physiotherapy sessions FREE',
        'Free comprehensive assessment',
        'Complete treatment plan',
        'Relaxation massage session FREE',
        'Continuous follow-up',
        'Priority booking',
        '🌟 Exclusive Ramadan offer',
      ],
      popular: true,
    },
    {
      name: language === 'ar' ? '🌙 النخبة + VIP' : '🌙 Elite + VIP',
      price: language === 'ar' ? 'مجاناً' : 'FREE',
      currency: '',
      description: language === 'ar'
        ? '👑 عرض رمضان - VIP مجاناً!'
        : '👑 Ramadan Offer - VIP for FREE!',
      features: language === 'ar' ? [
        '10 جلسات علاج طبيعي مجاناً',
        'تقييم شامل ومتابعة VIP مجاناً',
        'خطة علاجية مخصصة بالكامل',
        '3 جلسات مساج متنوعة مجاناً',
        'وصول لصالة الألعاب',
        'غرفة استرخاء خاصة VIP',
        'تجربة VIP كاملة مجاناً',
        '🌟 عرض رمضان الحصري',
      ] : [
        '10 physiotherapy sessions FREE',
        'VIP assessment and follow-up FREE',
        'Fully customized treatment plan',
        '3 varied massage sessions FREE',
        'Games lounge access',
        'Private VIP relaxation room',
        'Full VIP experience FREE',
        '🌟 Exclusive Ramadan offer',
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
                {language === 'ar' ? '🌙 عروض رمضان المباركة' : '🌙 Ramadan Special Offers'}
              </span>
            </h1>
            <div className="gold-divider my-8" />
            <p className="text-muted-foreground text-xl leading-relaxed">
              {language === 'ar' ? 'بمناسبة شهر رمضان الكريم، جميع خدماتنا مجاناً! رمضان كريم 🌟' : 'In celebration of Ramadan, all our services are FREE! Ramadan Kareem 🌟'}
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

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center text-muted-foreground mt-12"
          >
            {language === 'ar'
              ? '* عروض رمضان سارية طوال الشهر الكريم. احجز الآن واستمتع بالعروض! 🌙'
              : '* Ramadan offers are valid throughout the holy month. Book now and enjoy! 🌙'}
          </motion.p>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
