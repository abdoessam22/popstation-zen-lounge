import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { useLanguage } from '@/contexts/LanguageContext';

const WhatsAppButton = () => {
  const { language } = useLanguage();
  const message = encodeURIComponent(
    language === 'ar'
      ? 'مرحباً، أرغب في الاستفسار عن خدمات بوب ستيشن'
      : 'Hello, I would like to inquire about POP STATION services'
  );

  return (
    <motion.a
      href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 group"
      aria-label="WhatsApp"
    >
      {/* Pulse rings */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse opacity-20" />

      <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] shadow-2xl flex items-center justify-center text-white">
        <MessageCircle className="w-7 h-7 md:w-8 md:h-8 fill-white" strokeWidth={1.5} />
      </div>

      {/* Tooltip */}
      <span className="absolute right-full me-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-card border border-border text-sm text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg hidden md:block">
        {language === 'ar' ? 'تواصل معنا' : 'Chat with us'}
      </span>
    </motion.a>
  );
};

export default WhatsAppButton;
