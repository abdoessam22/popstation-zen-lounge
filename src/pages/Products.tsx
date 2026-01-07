import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { ShoppingBag, Package, MessageCircle, X } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { siteConfig } from '@/lib/config';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  nameAr: string;
  nameEn: string;
  price: number;
  quantity: number;
}

const Products = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', categoryFilter],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select('*')
        .eq('is_active', true);
      
      if (categoryFilter !== 'all') {
        query = query.eq('category', categoryFilter);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const handleAddToCart = (productId: string) => {
    const product = products?.find(p => p.id === productId);
    if (!product) return;

    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        id: product.id,
        nameAr: product.name_ar,
        nameEn: product.name_en,
        price: Number(product.price),
        quantity: 1,
      }];
    });

    toast({
      title: language === 'ar' ? 'تمت الإضافة للسلة' : 'Added to Cart',
      description: language === 'ar' ? product.name_ar : product.name_en,
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleInquiry = () => {
    const itemsList = cart.map(item => {
      const name = language === 'ar' ? item.nameAr : item.nameEn;
      return `${name} (x${item.quantity})`;
    }).join('\n');
    
    const message = language === 'ar'
      ? `مرحباً، أود الاستفسار عن هذه المنتجات:\n\n${itemsList}\n\nالمجموع: ${cartTotal} ريال`
      : `Hello, I would like to inquire about these products:\n\n${itemsList}\n\nTotal: ${cartTotal} SAR`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${siteConfig.whatsapp}?text=${encodedMessage}`, '_blank');
  };

  const categoryLabels: Record<string, { ar: string; en: string }> = {
    all: { ar: 'الكل', en: 'All' },
    oils: { ar: 'زيوت', en: 'Oils' },
    candles: { ar: 'شموع', en: 'Candles' },
    kits: { ar: 'مجموعات', en: 'Kits' },
    creams: { ar: 'كريمات', en: 'Creams' },
    bath: { ar: 'حمام', en: 'Bath' },
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
              <Package className="w-8 h-8" />
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              <span className="gold-gradient-text">
                {language === 'ar' ? 'منتجاتنا' : 'Our Products'}
              </span>
            </h1>
            <div className="gold-divider my-8" />
            <p className="text-muted-foreground text-xl leading-relaxed">
              {language === 'ar'
                ? 'منتجات عافية فاخرة لتعزيز تجربة الاسترخاء في منزلك'
                : 'Premium wellness products to enhance your relaxation experience at home'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-card border-y border-border">
        <div className="luxury-container py-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={language === 'ar' ? 'الفئة' : 'Category'} />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label[language]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Cart Button */}
            <Button
              variant="gold-outline"
              onClick={() => setIsCartOpen(true)}
              className="relative"
            >
              <ShoppingBag className="w-5 h-5 me-2" />
              {language === 'ar' ? 'السلة' : 'Cart'}
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-background">
        <div className="luxury-container">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-card rounded-2xl mb-4" />
                  <div className="h-6 bg-card rounded w-3/4 mb-2" />
                  <div className="h-4 bg-card rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  nameAr={product.name_ar}
                  nameEn={product.name_en}
                  descriptionAr={product.description_ar}
                  descriptionEn={product.description_en}
                  price={Number(product.price)}
                  imageUrl={product.image_url}
                  category={product.category}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {language === 'ar' ? 'لا توجد منتجات متاحة حالياً' : 'No products available at the moment'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            initial={{ x: language === 'ar' ? -400 : 400 }}
            animate={{ x: 0 }}
            exit={{ x: language === 'ar' ? -400 : 400 }}
            className={`absolute top-0 ${language === 'ar' ? 'left-0' : 'right-0'} h-full w-full max-w-md bg-card border-s border-border shadow-2xl`}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="font-display text-xl font-bold text-foreground">
                  {language === 'ar' ? 'سلة التسوق' : 'Shopping Cart'}
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {language === 'ar' ? 'السلة فارغة' : 'Cart is empty'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border"
                      >
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">
                            {language === 'ar' ? item.nameAr : item.nameEn}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {item.price} {language === 'ar' ? 'ريال' : 'SAR'} × {item.quantity}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-border space-y-4">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>{language === 'ar' ? 'المجموع' : 'Total'}</span>
                    <span className="gold-gradient-text">
                      {cartTotal} {language === 'ar' ? 'ريال' : 'SAR'}
                    </span>
                  </div>
                  <Button
                    variant="whatsapp"
                    size="xl"
                    className="w-full"
                    onClick={handleInquiry}
                  >
                    <MessageCircle className="w-5 h-5 me-2" />
                    {language === 'ar' ? 'استفسار عبر واتساب' : 'Inquire via WhatsApp'}
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </Layout>
  );
};

export default Products;
