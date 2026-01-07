import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Crown, Star, Clock, Coffee, Sparkles, Lock, MessageCircle, Calendar } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { siteConfig } from '@/lib/config';
import relaxationImage from '@/assets/relaxation-room.jpg';

const VIP = () => {
  const { language } = useLanguage();

  const vipFeatures = [
    {
      icon: <Lock className="w-8 h-8" />,
      title: language === 'ar' ? 'غرف VIP خاصة' : 'Private VIP Rooms',
      description: language === 'ar'
        ? 'غرف فاخرة معزولة تماماً مع كامل الخصوصية والراحة'
        : 'Fully isolated luxury rooms with complete privacy and comfort',
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: language === 'ar' ? 'جلسات ممتدة' : 'Extended Sessions',
      description: language === 'ar'
        ? 'استمتع بوقت إضافي بدون أي رسوم إضافية'
        : 'Enjoy extra time without any additional charges',
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: language === 'ar' ? 'أولوية الحجز' : 'Priority Booking',
      description: language === 'ar'
        ? 'أولوية في جدولة المواعيد واختيار المعالجين'
        : 'Priority in scheduling appointments and choosing therapists',
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: language === 'ar' ? 'أجواء مخصصة' : 'Personalized Ambiance',
      description: language === 'ar'
        ? 'إضاءة وموسيقى وروائح عطرية حسب رغبتك'
        : 'Lighting, music, and aromatherapy tailored to your preferences',
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      title: language === 'ar' ? 'مشروبات مجانية' : 'Complimentary Drinks',
      description: language === 'ar'
        ? 'مشروبات عشبية وقهوة متخصصة مجاناً'
        : 'Herbal drinks and specialty coffee at no extra cost',
    },
    {
      icon: <Crown className="w-8 h-8" />,
      title: language === 'ar' ? 'معاملة خاصة' : 'Special Treatment',
      description: language === 'ar'
        ? 'خدمة شخصية واهتمام خاص بكل التفاصيل'
        : 'Personal service and special attention to every detail',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={relaxationImage}
            alt="VIP Experience"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
        </div>

        <div className="luxury-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Crown className="w-5 h-5" />
              <span className="text-sm font-bold">VIP</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
              <span className="gold-gradient-text">
                {language === 'ar' ? 'تجربة VIP' : 'VIP Experience'}
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {language === 'ar'
                ? 'انغمس في عالم من الفخامة والخصوصية المطلقة. تجربة استثنائية مصممة خصيصاً لمن يبحثون عن أعلى مستويات الراحة والاهتمام الشخصي.'
                : 'Immerse yourself in a world of luxury and absolute privacy. An exceptional experience designed specifically for those seeking the highest levels of comfort and personal attention.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" asChild>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                    language === 'ar'
                      ? 'مرحباً، أود الاستفسار عن تجربة VIP'
                      : 'Hello, I would like to inquire about the VIP Experience'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  {language === 'ar' ? 'طلب تجربة VIP' : 'Request VIP Access'}
                </a>
              </Button>
              <Button variant="gold-outline" size="xl" asChild>
                <Link to="/booking" className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {language === 'ar' ? 'حجز عادي' : 'Regular Booking'}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-padding bg-card">
        <div className="luxury-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold mb-4 text-foreground">
              {language === 'ar' ? 'مميزات VIP' : 'VIP Benefits'}
            </h2>
            <div className="gold-divider my-6" />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {language === 'ar'
                ? 'استمتع بمجموعة حصرية من المميزات المصممة لتوفير أفضل تجربة ممكنة'
                : 'Enjoy an exclusive set of benefits designed to provide the best possible experience'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vipFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all duration-300"
              >
                <div className="inline-flex p-4 rounded-xl bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusive Statement */}
      <section className="section-padding bg-background">
        <div className="luxury-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <Crown className="w-16 h-16 text-primary mx-auto mb-8" />
            <blockquote className="font-display text-3xl md:text-4xl font-bold text-foreground leading-relaxed mb-8">
              {language === 'ar'
                ? '"الفخامة الحقيقية تكمن في الاهتمام بأدق التفاصيل وتوفير تجربة لا تُنسى"'
                : '"True luxury lies in attention to the finest details and providing an unforgettable experience"'}
            </blockquote>
            <div className="gold-divider my-8" />
            <p className="text-xl text-muted-foreground mb-8">
              {language === 'ar'
                ? 'انضم إلى نخبة ضيوفنا واستمتع بتجربة استثنائية تفوق كل التوقعات'
                : 'Join our elite guests and enjoy an exceptional experience that exceeds all expectations'}
            </p>
            <Button variant="hero" size="xl" asChild>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                  language === 'ar'
                    ? 'مرحباً، أود الاستفسار عن تجربة VIP'
                    : 'Hello, I would like to inquire about the VIP Experience'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Crown className="w-5 h-5" />
                {language === 'ar' ? 'تواصل معنا الآن' : 'Contact Us Now'}
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default VIP;
