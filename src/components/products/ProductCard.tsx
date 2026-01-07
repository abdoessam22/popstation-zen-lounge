import { motion } from 'framer-motion';
import { ShoppingBag, Package } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr?: string | null;
  descriptionEn?: string | null;
  price: number;
  imageUrl?: string | null;
  category: string;
  onAddToCart?: (id: string) => void;
}

const ProductCard = ({
  id,
  nameAr,
  nameEn,
  descriptionAr,
  descriptionEn,
  price,
  imageUrl,
  category,
  onAddToCart,
}: ProductCardProps) => {
  const { language } = useLanguage();

  const name = language === 'ar' ? nameAr : nameEn;
  const description = language === 'ar' ? descriptionAr : descriptionEn;
  const currency = language === 'ar' ? 'ريال' : 'SAR';

  const categoryLabels: Record<string, { ar: string; en: string }> = {
    oils: { ar: 'زيوت', en: 'Oils' },
    candles: { ar: 'شموع', en: 'Candles' },
    kits: { ar: 'مجموعات', en: 'Kits' },
    creams: { ar: 'كريمات', en: 'Creams' },
    bath: { ar: 'حمام', en: 'Bath' },
    general: { ar: 'عام', en: 'General' },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/50 transition-all duration-300"
    >
      {/* Image */}
      <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 relative overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-16 h-16 text-primary/30" />
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
            {categoryLabels[category]?.[language] || category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-lg font-bold text-foreground mb-2 line-clamp-1">
          {name}
        </h3>

        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {description}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold gold-gradient-text">
            {price.toFixed(0)}
          </span>
          <span className="text-sm text-muted-foreground">
            {currency}
          </span>
        </div>

        {/* Add to Cart Button */}
        <Button
          variant="gold-outline"
          className="w-full"
          onClick={() => onAddToCart?.(id)}
        >
          <ShoppingBag className="w-4 h-4 me-2" />
          {language === 'ar' ? 'أضف للسلة' : 'Add to Cart'}
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
