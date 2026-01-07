import { motion } from 'framer-motion';
import { Activity, Sparkles, Moon, Gamepad2, Check, Dumbbell, Heart, Wind, Flame, Users } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import physiotherapyImage from '@/assets/physiotherapy.jpg';
import loungeImage from '@/assets/lounge.jpg';
import relaxationImage from '@/assets/relaxation-room.jpg';
import heroImage from '@/assets/hero-spa.jpg';

const Services = () => {
  const { language } = useLanguage();

  const services = [
    {
      id: 'physiotherapy',
      title: language === 'ar' ? 'العلاج الطبيعي' : 'Physiotherapy',
      description: language === 'ar'
        ? 'خدمات علاج طبيعي متكاملة تحت إشراف متخصصين لمساعدتك في التعافي وتحسين جودة حياتك'
        : 'Comprehensive physiotherapy services under specialized supervision to help you recover and improve your quality of life',
      image: physiotherapyImage,
      icon: <Activity className="w-8 h-8" />,
      features: language === 'ar' ? [
        'إعادة التأهيل بعد الإصابات والعمليات',
        'إدارة الألم المزمن',
        'تصحيح الوضعية والعمود الفقري',
        'التعافي الرياضي',
        'العلاج اليدوي المتخصص',
      ] : [
        'Rehabilitation after injuries and surgeries',
        'Chronic pain management',
        'Posture and spine correction',
        'Sports recovery',
        'Specialized manual therapy',
      ],
    },
    {
      id: 'massage',
      title: language === 'ar' ? 'المساج العلاجي' : 'Therapeutic Massage',
      description: language === 'ar'
        ? 'جلسات مساج متنوعة تجمع بين الاسترخاء العميق والفوائد العلاجية'
        : 'Diverse massage sessions combining deep relaxation with therapeutic benefits',
      image: heroImage,
      icon: <Sparkles className="w-8 h-8" />,
      features: language === 'ar' ? [
        'مساج استرخائي شامل',
        'مساج الأنسجة العميقة',
        'العلاج بالأحجار الساخنة',
        'العلاج العطري والروائح',
        'مساج الرأس والكتفين',
      ] : [
        'Full body relaxation massage',
        'Deep tissue massage',
        'Hot stone therapy',
        'Aromatherapy treatment',
        'Head and shoulder massage',
      ],
    },
    {
      id: 'relaxation',
      title: language === 'ar' ? 'غرف الاسترخاء الخاصة' : 'Private Relaxation Rooms',
      badge: '+18',
      description: language === 'ar'
        ? 'تجربة حسية فريدة في غرف خاصة مصممة لتوفير أقصى درجات الاسترخاء والهدوء'
        : 'A unique sensory experience in private rooms designed to provide maximum relaxation and tranquility',
      image: relaxationImage,
      icon: <Moon className="w-8 h-8" />,
      features: language === 'ar' ? [
        'إضاءة محيطية هادئة قابلة للتحكم',
        'نظام صوتي للموسيقى المريحة',
        'ناشر روائح عطرية طبيعية',
        'تمارين التنفس الموجهة',
        'خيار الاسترخاء للأزواج',
      ] : [
        'Adjustable ambient lighting',
        'Sound system for relaxing music',
        'Natural aromatherapy diffuser',
        'Guided breathing exercises',
        'Couples relaxation option',
      ],
    },
    {
      id: 'lounge',
      title: language === 'ar' ? 'صالة الألعاب للكبار' : 'Adult Games Lounge',
      badge: '+18',
      description: language === 'ar'
        ? 'صالة راقية وهادئة للبالغين تضم مجموعة متنوعة من الألعاب والأنشطة الترفيهية'
        : 'An upscale and quiet lounge for adults featuring a variety of games and entertainment activities',
      image: loungeImage,
      icon: <Gamepad2 className="w-8 h-8" />,
      features: language === 'ar' ? [
        'طاولة بلياردو احترافية',
        'ألعاب طاولة كلاسيكية وحديثة',
        'ألعاب فيديو رياضية وسباقات',
        'منطقة جلوس مريحة',
        'أجواء خاصة وهادئة',
      ] : [
        'Professional billiards table',
        'Classic and modern board games',
        'Sports and racing video games',
        'Comfortable seating area',
        'Private and quiet atmosphere',
      ],
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
                {language === 'ar' ? 'خدماتنا' : 'Our Services'}
              </span>
            </h1>
            <div className="gold-divider my-8" />
            <p className="text-muted-foreground text-xl leading-relaxed">
              {language === 'ar'
                ? 'نقدم مجموعة شاملة من الخدمات المصممة لتلبية احتياجاتك الصحية والاسترخائية'
                : 'We offer a comprehensive range of services designed to meet your health and relaxation needs'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail Sections */}
      {services.map((service, index) => (
        <section
          key={service.id}
          className={`section-padding ${index % 2 === 0 ? 'bg-background' : 'bg-card'}`}
        >
          <div className="luxury-container">
            <div className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={index % 2 === 1 ? 'lg:order-2' : ''}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    {service.icon}
                  </div>
                  {service.badge && (
                    <span className="px-3 py-1 text-xs font-bold bg-primary text-primary-foreground rounded-full">
                      {service.badge}
                    </span>
                  )}
                </div>
                <h2 className="font-display text-4xl font-bold mb-6 text-foreground">
                  {service.title}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  {service.description}
                </p>
                <ul className="space-y-4">
                  {service.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 text-foreground"
                    >
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
              </motion.div>
            </div>
          </div>
        </section>
      ))}
    </Layout>
  );
};

export default Services;
