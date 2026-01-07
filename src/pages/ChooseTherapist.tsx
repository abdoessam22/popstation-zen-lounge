import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Filter, Users, ArrowLeft, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import TherapistCard from '@/components/therapists/TherapistCard';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';

const ChooseTherapist = () => {
  const { language, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [genderFilter, setGenderFilter] = useState<string>('all');
  const [experienceFilter, setExperienceFilter] = useState<string>('all');
  const [selectedTherapistId, setSelectedTherapistId] = useState<string | null>(null);

  const { data: therapists, isLoading } = useQuery({
    queryKey: ['therapists', genderFilter, experienceFilter],
    queryFn: async () => {
      let query = supabase
        .from('therapists')
        .select('*')
        .eq('is_active', true);
      
      if (genderFilter !== 'all') {
        query = query.eq('gender', genderFilter);
      }
      
      const { data, error } = await query.order('experience_years', { ascending: false });
      
      if (error) throw error;
      
      // Client-side filtering for experience
      if (experienceFilter !== 'all') {
        const minYears = parseInt(experienceFilter);
        return data.filter(t => t.experience_years >= minYears);
      }
      
      return data;
    },
  });

  const handleSelectTherapist = (id: string) => {
    setSelectedTherapistId(id === selectedTherapistId ? null : id);
  };

  const handleContinueToBooking = () => {
    if (selectedTherapistId) {
      navigate(`/booking?therapist=${selectedTherapistId}`);
    } else {
      navigate('/booking');
    }
  };

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
                {language === 'ar' ? 'اختر معالجك' : 'Choose Your Therapist'}
              </span>
            </h1>
            <div className="gold-divider my-8" />
            <p className="text-muted-foreground text-xl leading-relaxed mb-6">
              {language === 'ar'
                ? 'للضيوف حرية اختيار المعالج الذي يشعرون معه بالراحة'
                : 'Clients are free to choose the therapist they feel most comfortable with'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-card border-y border-border">
        <div className="luxury-container py-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">
                {language === 'ar' ? 'تصفية حسب:' : 'Filter by:'}
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Gender Filter */}
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={language === 'ar' ? 'الجنس' : 'Gender'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {language === 'ar' ? 'الكل' : 'All'}
                  </SelectItem>
                  <SelectItem value="male">
                    {language === 'ar' ? 'ذكر' : 'Male'}
                  </SelectItem>
                  <SelectItem value="female">
                    {language === 'ar' ? 'أنثى' : 'Female'}
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Experience Filter */}
              <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={language === 'ar' ? 'الخبرة' : 'Experience'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {language === 'ar' ? 'كل المستويات' : 'All Levels'}
                  </SelectItem>
                  <SelectItem value="3">
                    {language === 'ar' ? '+3 سنوات' : '3+ years'}
                  </SelectItem>
                  <SelectItem value="5">
                    {language === 'ar' ? '+5 سنوات' : '5+ years'}
                  </SelectItem>
                  <SelectItem value="8">
                    {language === 'ar' ? '+8 سنوات' : '8+ years'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Therapists Grid */}
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
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {therapists.map((therapist) => (
                  <TherapistCard
                    key={therapist.id}
                    id={therapist.id}
                    nameAr={therapist.name_ar}
                    nameEn={therapist.name_en}
                    gender={therapist.gender as 'male' | 'female'}
                    experienceYears={therapist.experience_years}
                    specialtiesAr={therapist.specialties_ar}
                    specialtiesEn={therapist.specialties_en}
                    bioAr={therapist.bio_ar}
                    bioEn={therapist.bio_en}
                    photoUrl={therapist.photo_url}
                    languages={therapist.languages}
                    onSelect={handleSelectTherapist}
                    isSelected={selectedTherapistId === therapist.id}
                  />
                ))}
              </div>

              {/* Continue Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 text-center"
              >
                <Button
                  variant="hero"
                  size="xl"
                  onClick={handleContinueToBooking}
                  className="min-w-[280px]"
                >
                  {selectedTherapistId 
                    ? (language === 'ar' ? 'متابعة مع المعالج المختار' : 'Continue with Selected Therapist')
                    : (language === 'ar' ? 'متابعة بدون اختيار معالج' : 'Continue without Selection')}
                  {isRTL ? (
                    <ArrowLeft className="w-5 h-5 ms-2" />
                  ) : (
                    <ArrowRight className="w-5 h-5 ms-2" />
                  )}
                </Button>
              </motion.div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {language === 'ar' ? 'لا يوجد معالجين متاحين حالياً' : 'No therapists available at the moment'}
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ChooseTherapist;
