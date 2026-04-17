import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface Product {
  id: string;
  name_ar: string;
  name_en: string;
  description_ar: string | null;
  description_en: string | null;
  price: number;
  category: string;
  image_url: string | null;
  image_urls: string[] | null;
  is_active: boolean;
}

const ProductManager = () => {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [uploading, setUploading] = useState(false);

  const { data: products, isLoading } = useQuery({
    queryKey: ['admin-all-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Product[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: Partial<Product>) => {
      const imageUrls = data.image_urls || [];
      const { error } = await supabase.from('products').insert({
        name_ar: data.name_ar!,
        name_en: data.name_en!,
        description_ar: data.description_ar,
        description_en: data.description_en,
        price: data.price || 0,
        category: data.category || 'general',
        image_url: imageUrls[0] || data.image_url || null,
        image_urls: imageUrls,
        is_active: true,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-all-products'] });
      setIsAdding(false);
      setFormData({});
      toast.success('تم إضافة المنتج بنجاح');
    },
    onError: (error) => {
      toast.error('حدث خطأ: ' + error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Product> }) => {
      const updateData: any = { ...data };
      if (data.image_urls) {
        updateData.image_url = data.image_urls[0] || null;
      }
      const { error } = await supabase.from('products').update(updateData).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-all-products'] });
      setEditingId(null);
      setFormData({});
      toast.success('تم تحديث المنتج بنجاح');
    },
    onError: (error) => {
      toast.error('حدث خطأ: ' + error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-all-products'] });
      toast.success('تم حذف المنتج بنجاح');
    },
    onError: (error) => {
      toast.error('حدث خطأ: ' + error.message);
    },
  });

  const handleUploadImages = async (files: FileList) => {
    setUploading(true);
    try {
      const uploadedUrls: string[] = [];
      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop();
        const fileName = `product-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('media')
          .getPublicUrl(filePath);

        uploadedUrls.push(publicUrl);
      }

      const existing = formData.image_urls || [];
      setFormData({ ...formData, image_urls: [...existing, ...uploadedUrls] });
      toast.success(`تم رفع ${uploadedUrls.length} صورة بنجاح`);
    } catch (error: any) {
      toast.error('خطأ في رفع الصورة: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const existing = formData.image_urls || [];
    setFormData({ ...formData, image_urls: existing.filter((_, i) => i !== index) });
  };

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData(product);
  };

  const startAdd = () => {
    setIsAdding(true);
    setFormData({
      name_ar: '',
      name_en: '',
      description_ar: '',
      description_en: '',
      price: 0,
      category: 'general',
      image_url: '',
      image_urls: [],
    });
  };

  const categories = [
    { value: 'oils', label: 'زيوت التدليك' },
    { value: 'aromatherapy', label: 'العلاج بالروائح' },
    { value: 'candles', label: 'شموع الاسترخاء' },
    { value: 'kits', label: 'مجموعات العافية' },
    { value: 'general', label: 'عام' },
  ];

  if (isLoading) {
    return <div className="text-center py-8 text-muted-foreground">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-foreground">إدارة المنتجات</h2>
        <Button variant="gold" onClick={startAdd} disabled={isAdding}>
          <Plus className="w-4 h-4 me-2" />
          إضافة منتج
        </Button>
      </div>

      {(isAdding || editingId) && (
        <div className="p-6 rounded-xl bg-card border border-border space-y-4">
          <h3 className="font-semibold text-foreground">
            {isAdding ? 'إضافة منتج جديد' : 'تعديل المنتج'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">الاسم بالعربية</label>
              <Input
                value={formData.name_ar || ''}
                onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">الاسم بالإنجليزية</label>
              <Input
                value={formData.name_en || ''}
                onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">السعر (جنيه)</label>
              <Input
                type="number"
                min="0"
                value={formData.price || 0}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">الفئة</label>
              <Select
                value={formData.category || 'general'}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-muted-foreground mb-1 block">
                صور المنتج (يمكن إضافة أكثر من صورة)
              </label>

              {/* Existing images preview */}
              {formData.image_urls && formData.image_urls.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-3">
                  {formData.image_urls.map((url, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={url}
                        alt={`Preview ${idx + 1}`}
                        className="w-20 h-20 rounded-lg object-cover border border-border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="حذف الصورة"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      {idx === 0 && (
                        <span className="absolute bottom-0 left-0 right-0 text-[10px] bg-primary text-primary-foreground text-center rounded-b-lg py-0.5">
                          رئيسية
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => e.target.files && e.target.files.length > 0 && handleUploadImages(e.target.files)}
                  disabled={uploading}
                />
                {uploading && <span className="text-sm text-muted-foreground">جاري الرفع...</span>}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                الصورة الأولى هي الصورة الرئيسية. اختر عدة صور دفعة واحدة بالضغط على Ctrl/Cmd.
              </p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">الوصف بالعربية</label>
              <Textarea
                value={formData.description_ar || ''}
                onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">الوصف بالإنجليزية</label>
              <Textarea
                value={formData.description_en || ''}
                onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="gold"
              onClick={() => {
                if (isAdding) {
                  createMutation.mutate(formData);
                } else if (editingId) {
                  updateMutation.mutate({ id: editingId, data: formData });
                }
              }}
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              <Save className="w-4 h-4 me-2" />
              حفظ
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
                setFormData({});
              }}
            >
              <X className="w-4 h-4 me-2" />
              إلغاء
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.map((product) => (
          <div
            key={product.id}
            className={`p-4 rounded-xl bg-card border ${product.is_active ? 'border-border' : 'border-destructive/30 opacity-60'}`}
          >
            <div className="flex items-start gap-4">
              {product.image_url ? (
                <img src={product.image_url} alt={product.name_ar} className="w-16 h-16 rounded-lg object-cover" />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {product.name_ar[0]}
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{product.name_ar}</h3>
                <p className="text-sm text-muted-foreground">{product.name_en}</p>
                <p className="text-sm text-primary mt-1 font-bold">{product.price} ج.م</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" onClick={() => startEdit(product)}>
                <Edit2 className="w-3 h-3 me-1" />
                تعديل
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive"
                onClick={() => {
                  if (confirm('هل أنت متأكد من الحذف؟')) {
                    deleteMutation.mutate(product.id);
                  }
                }}
              >
                <Trash2 className="w-3 h-3 me-1" />
                حذف
              </Button>
            </div>
          </div>
        ))}
      </div>

      {products?.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          لا يوجد منتجات حالياً
        </div>
      )}
    </div>
  );
};

export default ProductManager;
