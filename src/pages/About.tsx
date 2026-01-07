import { motion } from 'framer-motion';
import { Shield, Users, Award, Heart, Eye, Target, Star, Quote } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { siteConfig } from '@/lib/config';
import heroImage from '@/assets/hero-spa.jpg';

const About = () => {
  const { t, language } = useLanguage();

  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: t.about.privacy,
      description: language === 'ar' 
        ? 'نضمن خصوصيتك الكاملة في جميع خدماتنا'
        : 'We guarantee complete privacy in all our services',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: t.about.professionalism,
      description: language === 'ar'
        ? 'فريق متخصص ومحترف في جميع المجالات'
        : 'Specialized and professional team in all areas',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: t.about.excellence,
      description: language === 'ar'
        ? 'نسعى للتميز في كل تفصيلة'
        : 'We strive for excellence in every detail',
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: t.about.respect,
      description: language === 'ar'
        ? 'الاحترام المتبادل أساس تعاملنا'
        : 'Mutual respect is the foundation of our interaction',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="About POP STATION"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        </div>

        <div className="luxury-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              <span className="gold-gradient-text">{t.about.title}</span>
            </h1>
            <div className="gold-divider my-8" />
            <p className="text-muted-foreground text-xl leading-relaxed">
              {t.about.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Owner Section */}
      <section className="section-padding bg-card">
        <div className="luxury-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Star className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {language === 'ar' ? 'المؤسس والمالك' : 'Founder & Owner'}
                </span>
              </div>
              
              <h2 className="font-display text-4xl font-bold mb-4 text-foreground">
                {siteConfig.owner[language]}
              </h2>
              
              <p className="text-primary text-xl mb-6">
                {siteConfig.ownerNickname[language]}
              </p>
              
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {language === 'ar'
                  ? 'متخصص في العلاج الطبيعي والطب التكميلي، بخبرة تمتد لسنوات في مجال العافية والصحة. أسس بوب ستيشن ليقدم تجربة فريدة تجمع بين العلاج المتخصص والاسترخاء الفاخر في بيئة تحترم خصوصية الضيوف.'
                  : 'A specialist in physiotherapy and complementary medicine, with years of experience in wellness and health. He founded POP STATION to offer a unique experience that combines specialized treatment and luxury relaxation in an environment that respects guests\' privacy.'}
              </p>
              
              <div className="p-6 rounded-2xl bg-background border border-border">
                <Quote className="w-8 h-8 text-primary mb-4" />
                <p className="text-foreground italic text-lg leading-relaxed">
                  {t.about.statement}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 relative"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-5xl font-bold gold-gradient-text">Dr.</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    {language === 'ar' ? 'دكتور بوب' : 'Dr. Bob'}
                  </h3>
                  <p className="text-primary">
                    {language === 'ar' ? 'مؤسس بوب ستيشن' : 'Founder of POP STATION'}
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-background">
        <div className="luxury-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl font-bold mb-6 text-foreground">
                {t.about.mission}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {t.about.missionText}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'ar'
                  ? 'نؤمن بأن الراحة والعافية حق للجميع. لذلك نقدم خدماتنا بأعلى معايير الجودة والاحترافية، مع التركيز على تجربة فريدة تجمع بين الفخامة والخصوصية.'
                  : 'We believe that comfort and wellness are a right for everyone. Therefore, we provide our services with the highest standards of quality and professionalism, focusing on a unique experience that combines luxury and privacy.'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src={heroImage}
                  alt="Our Mission"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-card">
        <div className="luxury-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="gold-gradient-text">{t.about.values}</span>
            </h2>
            <div className="gold-divider my-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-2xl bg-background border border-border hover:border-primary/30 transition-all duration-300 hover-lift"
              >
                <div className="inline-flex p-4 rounded-xl bg-primary/10 text-primary mb-6">
                  {value.icon}
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
