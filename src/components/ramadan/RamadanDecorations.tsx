import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Floating Ramadan decorations (stars, crescents) for background ambiance.
 * Use inside any section or as a global overlay.
 */
export const RamadanStars = ({ count = 8 }: { count?: number }) => (
  <>
    {[...Array(count)].map((_, i) => (
      <motion.div
        key={`star-${i}`}
        className="absolute pointer-events-none"
        style={{
          top: `${10 + Math.random() * 80}%`,
          left: `${5 + Math.random() * 90}%`,
        }}
        animate={{ opacity: [0.15, 0.5, 0.15], scale: [0.8, 1.1, 0.8] }}
        transition={{ duration: 2.5 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
      >
        <Star className="w-2.5 h-2.5 text-primary/40 fill-primary/25" />
      </motion.div>
    ))}
  </>
);

/**
 * Small crescent moon SVG
 */
export const CrescentMoon = ({ className = '', size = 20 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M36 24C36 13.5 28 6 18 6C20.5 3 25 1 30 1C40.5 1 47 10 47 24C47 38 40.5 47 30 47C25 47 20.5 45 18 42C28 42 36 34.5 36 24Z" fill="currentColor" />
  </svg>
);

/**
 * Ramadan announcement top bar
 */
export const RamadanTopBar = () => {
  const { language } = useLanguage();
  
  return (
    <div className="relative z-50 bg-gradient-to-r from-primary/25 via-primary/15 to-primary/25 border-b border-primary/30 overflow-hidden">
      {/* Shimmer effect */}
      <div className="absolute inset-0 gold-shimmer opacity-20" />
      <div className="luxury-container relative">
        <div className="flex items-center justify-center gap-3 py-2.5 text-sm">
          <CrescentMoon className="text-primary" size={16} />
          <motion.span
            className="text-primary font-bold tracking-wide"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {language === 'ar' 
              ? '🌙 رمضان كريم — جميع الجلسات مجاناً! احجز الآن 🌟'
              : '🌙 Ramadan Kareem — All sessions FREE! Book now 🌟'}
          </motion.span>
          <CrescentMoon className="text-primary" size={16} />
        </div>
      </div>
    </div>
  );
};

/**
 * Ramadan badge overlay for cards
 */
export const RamadanBadge = ({ small = false }: { small?: boolean }) => {
  const { language } = useLanguage();
  
  return (
    <div className={`absolute top-3 ${small ? 'right-3 rtl:right-auto rtl:left-3' : 'right-4 rtl:right-auto rtl:left-4'} z-10`}>
      <motion.div 
        className={`flex items-center gap-1 ${small ? 'px-2 py-0.5' : 'px-3 py-1'} rounded-full bg-primary/90 text-primary-foreground`}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className={`${small ? 'text-[10px]' : 'text-xs'} font-bold`}>
          {language === 'ar' ? '🌙 عرض رمضان' : '🌙 Ramadan'}
        </span>
      </motion.div>
    </div>
  );
};
