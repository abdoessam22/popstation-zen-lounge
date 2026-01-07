import { motion } from 'framer-motion';
import { User, Award, Languages } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TherapistCardProps {
  id: string;
  nameAr: string;
  nameEn: string;
  gender: 'male' | 'female';
  experienceYears: number;
  specialtiesAr: string[];
  specialtiesEn: string[];
  bioAr?: string | null;
  bioEn?: string | null;
  photoUrl?: string | null;
  languages: string[];
  onSelect?: (id: string) => void;
  isSelected?: boolean;
  showSelectButton?: boolean;
}

const TherapistCard = ({
  id,
  nameAr,
  nameEn,
  gender,
  experienceYears,
  specialtiesAr,
  specialtiesEn,
  bioAr,
  bioEn,
  photoUrl,
  languages,
  onSelect,
  isSelected,
  showSelectButton = true,
}: TherapistCardProps) => {
  const { language } = useLanguage();

  const name = language === 'ar' ? nameAr : nameEn;
  const specialties = language === 'ar' ? specialtiesAr : specialtiesEn;
  const bio = language === 'ar' ? bioAr : bioEn;

  const genderLabel = language === 'ar'
    ? (gender === 'male' ? 'ذكر' : 'أنثى')
    : (gender === 'male' ? 'Male' : 'Female');

  const experienceLabel = language === 'ar'
    ? `${experienceYears} سنوات خبرة`
    : `${experienceYears} years experience`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={cn(
        "group relative rounded-2xl bg-card border overflow-hidden transition-all duration-300",
        isSelected 
          ? "border-primary shadow-lg shadow-primary/20" 
          : "border-border hover:border-primary/50"
      )}
    >
      {/* Photo */}
      <div className="aspect-[4/5] bg-gradient-to-br from-primary/20 to-primary/5 relative overflow-hidden">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <User className="w-24 h-24 text-primary/30" />
          </div>
        )}
        
        {/* Gender Badge */}
        <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4">
          <span className={cn(
            "px-3 py-1 rounded-full text-xs font-medium",
            gender === 'female' 
              ? "bg-pink-500/20 text-pink-400" 
              : "bg-blue-500/20 text-blue-400"
          )}>
            {genderLabel}
          </span>
        </div>

        {/* Selected indicator */}
        {isSelected && (
          <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-foreground mb-2">
          {name}
        </h3>

        {/* Experience */}
        <div className="flex items-center gap-2 text-sm text-primary mb-3">
          <Award className="w-4 h-4" />
          <span>{experienceLabel}</span>
        </div>

        {/* Languages */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Languages className="w-4 h-4" />
          <span>
            {languages.map(lang => lang === 'ar' ? 'العربية' : 'English').join(' • ')}
          </span>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-2 mb-4">
          {specialties.slice(0, 3).map((specialty, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary"
            >
              {specialty}
            </span>
          ))}
        </div>

        {/* Bio */}
        {bio && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {bio}
          </p>
        )}

        {/* Select Button */}
        {showSelectButton && onSelect && (
          <Button
            variant={isSelected ? "gold" : "gold-outline"}
            className="w-full"
            onClick={() => onSelect(id)}
          >
            {isSelected 
              ? (language === 'ar' ? 'تم الاختيار' : 'Selected')
              : (language === 'ar' ? 'اختيار المعالج' : 'Select Therapist')}
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default TherapistCard;
