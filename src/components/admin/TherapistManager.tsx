import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit2, Trash2, Save, X, Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface Therapist {
  id: string;
  name_ar: string;
  name_en: string;
  gender: string;
  experience_years: number;
  specialties_ar: string[];
  specialties_en: string[];
  languages: string[];
  bio_ar: string | null;
  bio_en: string | null;
  photo_url: string | null;
  is_active: boolean;
}

const TherapistManager = () => {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Therapist>>({});
  const [uploading, setUploading] = useState(false);

  const { data: therapists, isLoading } = useQuery({
    queryKey: ['admin-all-therapists'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('therapists')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Therapist[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: Partial<Therapist>) => {
      const { error } = await supabase.from('therapists').insert({
        name_ar: data.name_ar!,
        name_en: data.name_en!,
        gender: data.gender!,
        experience_years: data.experience_years || 1,
        specialties_ar: data.specialties_ar || [],
        specialties_en: data.specialties_en || [],
        languages: data.languages || ['ar'],
        bio_ar: data.bio_ar,
        bio_en: data.bio_en,
        photo_url: data.photo_url,
        is_active: true,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-all-therapists'] });
      setIsAdding(false);
      setFormData({});
      toast.success('تم إضافة المعالج بنجاح');
    },
    onError: (error) => {
      toast.error('حدث خطأ: ' + error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Therapist> }) => {
      const { error } = await supabase.from('therapists').update(data).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-all-therapists'] });
      setEditingId(null);
      setFormData({});
      toast.success('تم تحديث المعالج بنجاح');
    },
    onError: (error) => {
      toast.error('حدث خطأ: ' + error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('therapists').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-all-therapists'] });
      toast.success('تم حذف المعالج بنجاح');
    },
    onError: (error) => {
      toast.error('حدث خطأ: ' + error.message);
    },
  });

  const handleUploadPhoto = async (file: File) => {
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `therapist-${Date.now()}.${fileExt}`;
      const filePath = `therapists/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      setFormData({ ...formData, photo_url: publicUrl });
      toast.success('تم رفع الصورة بنجاح');
    } catch (error: any) {
      toast.error('خطأ في رفع الصورة: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const startEdit = (therapist: Therapist) => {
    setEditingId(therapist.id);
    setFormData(therapist);
  };

  const startAdd = () => {
    setIsAdding(true);
    setFormData({
      name_ar: '',
      name_en: '',
      gender: 'male',
      experience_years: 1,
      specialties_ar: [],
      specialties_en: [],
      languages: ['ar'],
      bio_ar: '',
      bio_en: '',
      photo_url: '',
    });
  };

  if (isLoading) {
    return <div className="text-center py-8 text-muted-foreground">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-foreground">إدارة المعالجين</h2>
        <Button variant="gold" onClick={startAdd} disabled={isAdding}>
          <Plus className="w-4 h-4 me-2" />
          إضافة معالج
        </Button>
      </div>

      {(isAdding || editingId) && (
        <div className="p-6 rounded-xl bg-card border border-border space-y-4">
          <h3 className="font-semibold text-foreground">
            {isAdding ? 'إضافة معالج جديد' : 'تعديل المعالج'}
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
              <label className="text-sm text-muted-foreground mb-1 block">الجنس</label>
              <Select
                value={formData.gender || 'male'}
                onValueChange={(value) => setFormData({ ...formData, gender: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">ذكر</SelectItem>
                  <SelectItem value="female">أنثى</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">سنوات الخبرة</label>
              <Input
                type="number"
                min="1"
                value={formData.experience_years || 1}
                onChange={(e) => setFormData({ ...formData, experience_years: parseInt(e.target.value) })}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">التخصصات بالعربية (مفصولة بفاصلة)</label>
              <Input
                value={(formData.specialties_ar || []).join(', ')}
                onChange={(e) => setFormData({ ...formData, specialties_ar: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">التخصصات بالإنجليزية (مفصولة بفاصلة)</label>
              <Input
                value={(formData.specialties_en || []).join(', ')}
                onChange={(e) => setFormData({ ...formData, specialties_en: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-muted-foreground mb-1 block">صورة المعالج</label>
              <div className="flex items-center gap-4">
                {formData.photo_url && (
                  <img src={formData.photo_url} alt="Preview" className="w-16 h-16 rounded-lg object-cover" />
                )}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleUploadPhoto(e.target.files[0])}
                  disabled={uploading}
                />
                {uploading && <span className="text-sm text-muted-foreground">جاري الرفع...</span>}
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">نبذة بالعربية</label>
              <Textarea
                value={formData.bio_ar || ''}
                onChange={(e) => setFormData({ ...formData, bio_ar: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">نبذة بالإنجليزية</label>
              <Textarea
                value={formData.bio_en || ''}
                onChange={(e) => setFormData({ ...formData, bio_en: e.target.value })}
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
        {therapists?.map((therapist) => (
          <div
            key={therapist.id}
            className={`p-4 rounded-xl bg-card border ${therapist.is_active ? 'border-border' : 'border-destructive/30 opacity-60'}`}
          >
            <div className="flex items-start gap-4">
              {therapist.photo_url ? (
                <img src={therapist.photo_url} alt={therapist.name_ar} className="w-16 h-16 rounded-lg object-cover" />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {therapist.name_ar[0]}
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{therapist.name_ar}</h3>
                <p className="text-sm text-muted-foreground">{therapist.name_en}</p>
                <p className="text-xs text-primary mt-1">{therapist.experience_years} سنوات خبرة</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" onClick={() => startEdit(therapist)}>
                <Edit2 className="w-3 h-3 me-1" />
                تعديل
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive"
                onClick={() => {
                  if (confirm('هل أنت متأكد من الحذف؟')) {
                    deleteMutation.mutate(therapist.id);
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

      {therapists?.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          لا يوجد معالجين حالياً
        </div>
      )}
    </div>
  );
};

export default TherapistManager;
