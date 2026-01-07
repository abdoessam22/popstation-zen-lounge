import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const AGE_GATE_KEY = 'popstation_age_verified';

const AgeGateModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const isVerified = localStorage.getItem(AGE_GATE_KEY);
    if (!isVerified) {
      setIsOpen(true);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem(AGE_GATE_KEY, 'true');
    setIsOpen(false);
  };

  const handleDeny = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/95 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-lg p-8 md:p-12 rounded-3xl bg-card border border-border shadow-2xl"
          >
            <div className="text-center">
              {/* Logo */}
              <div className="inline-flex p-4 rounded-full bg-primary/10 mb-6">
                <ShieldCheck className="w-12 h-12 text-primary" />
              </div>

              {/* Title */}
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                <span className="gold-gradient-text">POP STATION</span>
              </h1>
              
              <p className="text-primary text-sm font-medium mb-6">
                {language === 'ar' 
                  ? 'مركز العافية والاسترخاء الفاخر' 
                  : 'Luxury Wellness & Relaxation Center'}
              </p>

              {/* Warning Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-500 mb-6">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-bold">+18</span>
              </div>

              {/* Message */}
              <p className="text-foreground text-lg mb-4 font-medium">
                {language === 'ar'
                  ? 'هذا الموقع للبالغين فقط (+18)'
                  : 'This website is for adults only (+18)'}
              </p>
              
              <p className="text-muted-foreground mb-8">
                {language === 'ar'
                  ? 'من خلال الدخول، فإنك تؤكد أن عمرك 18 عامًا أو أكثر'
                  : 'By entering, you confirm that you are 18 years of age or older'}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="hero"
                  size="xl"
                  onClick={handleConfirm}
                  className="min-w-[160px]"
                >
                  {language === 'ar' ? 'نعم، عمري +18' : 'Yes, I am 18+'}
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  onClick={handleDeny}
                  className="min-w-[160px]"
                >
                  {language === 'ar' ? 'لا، أنا أقل من 18' : 'No, I am under 18'}
                </Button>
              </div>

              {/* Policy note */}
              <p className="text-xs text-muted-foreground mt-8">
                {language === 'ar'
                  ? 'نحن ملتزمون بتوفير بيئة آمنة ومحترمة لجميع ضيوفنا البالغين'
                  : 'We are committed to providing a safe and respectful environment for all our adult guests'}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AgeGateModal;
