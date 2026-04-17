import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Package, ChevronLeft, ChevronRight } from 'lucide-react';
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
  imageUrls?: string[] | null;
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
  imageUrls,
  category,
  onAddToCart,
}: ProductCardProps) => {
  const { language } = useLanguage();

  // Combine all images: image_urls first, then fallback image_url
  const allImages = [
    ...(imageUrls || []),
    ...(imageUrl && !(imageUrls || []).includes(imageUrl) ? [imageUrl] : []),
  ].filter(Boolean);

  const [activeIndex, setActiveIndex] = useState(0);

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

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((i) => (i + 1) % allImages.length);
  };
  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((i) => (i - 1 + allImages.length) % allImages.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/50 transition-all duration-300"
    >
      {/* Image / Gallery */}
      <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 relative overflow-hidden">
        {allImages.length > 0 ? (
          <>
            <img
              src={allImages[activeIndex]}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/70 hover:bg-background text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/70 hover:bg-background text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {allImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveIndex(i);
                      }}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        i === activeIndex ? 'bg-primary w-4' : 'bg-background/70'
                      }`}
                      aria-label={`Image ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
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
