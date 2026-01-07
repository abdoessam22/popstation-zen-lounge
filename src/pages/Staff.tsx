import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Users, Award, Languages } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { User } from 'lucide-react';

const Staff = () => {
  const { language } = useLanguage();

  const { data: therapists, isLoading } = useQuery({
    queryKey: ['staff-therapists'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('therapists')
        .select('*')
        .eq('is_active', true)
        .order('experience_years', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

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
            <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-6">
              <Users className="w-8 h-8" />
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              <span className="gold-gradient-text">
                {language === 'ar' ? 'فريقنا المتميز' : 'Our Expert Team'}
              </span>
            </h1>
            <div className="gold-divider my-8" />
            <p className="text-muted-foreground text-xl leading-relaxed">
              {language === 'ar'
                ? 'نفخر بفريق من المتخصصين المحترفين الذين يسعون لتقديم أفضل تجربة لضيوفنا'
                : 'We are proud of our team of professional specialists dedicated to providing the best experience for our guests'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Staff Grid */}
      <section className="section-padding bg-background">
        <div className="luxury-container">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/5] bg-card rounded-2xl mb-4" />
                  <div className="h-6 bg-card rounded w-3/4 mb-2" />
                  <div className="h-4 bg-card rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : therapists && therapists.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {therapists.map((therapist, index) => (
                <motion.div
                  key={therapist.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/50 transition-all duration-300"
                >
                  {/* Photo */}
                  <div className="aspect-[4/5] bg-gradient-to-br from-primary/20 to-primary/5 relative overflow-hidden">
                    {therapist.photo_url ? (
                      <img
                        src={therapist.photo_url}
                        alt={language === 'ar' ? therapist.name_ar : therapist.name_en}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-24 h-24 text-primary/30" />
                      </div>
                    )}
                    
                    {/* Role Badge */}
                    <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                        {language === 'ar' ? 'معالج متخصص' : 'Specialist'}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      {language === 'ar' ? therapist.name_ar : therapist.name_en}
                    </h3>

                    {/* Experience */}
                    <div className="flex items-center gap-2 text-sm text-primary mb-3">
                      <Award className="w-4 h-4" />
                      <span>
                        {language === 'ar' 
                          ? `${therapist.experience_years} سنوات خبرة` 
                          : `${therapist.experience_years} years experience`}
                      </span>
                    </div>

                    {/* Languages */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Languages className="w-4 h-4" />
                      <span>
                        {therapist.languages.map((lang: string) => 
                          lang === 'ar' ? 'العربية' : 'English'
                        ).join(' • ')}
                      </span>
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2">
                      {(language === 'ar' ? therapist.specialties_ar : therapist.specialties_en)
                        .slice(0, 3)
                        .map((specialty: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary"
                          >
                            {specialty}
                          </span>
                        ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {language === 'ar' ? 'لا يوجد أعضاء فريق حالياً' : 'No team members available'}
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Staff;
