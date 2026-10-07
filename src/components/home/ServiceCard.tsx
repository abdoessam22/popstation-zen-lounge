import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  image?: string;
  badge?: string;
  href?: string;
  delay?: number;
}

const ServiceCard = ({
  title,
  description,
  icon,
  image,
  badge,
  href = '/services',
  delay = 0,
}: ServiceCardProps) => {
  const { t, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-3xl bg-card/60 backdrop-blur-sm border border-border/60 hover:border-primary/50 transition-all duration-500 hover-lift"
    >
      {/* Image */}
      {image && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        </div>
      )}

      {/* Badge */}
      {badge && (
        <div className="absolute top-4 left-4 right-4 flex justify-end">
          <span className="px-3 py-1 text-xs font-bold bg-primary text-primary-foreground rounded-full">
            {badge}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {description}
            </p>
            <Link
              to={href}
              className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all"
            >
              {t.common.learnMore}
              <Arrow className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
