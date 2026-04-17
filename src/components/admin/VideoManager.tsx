import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit2, Trash2, Save, X, Play } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface Video {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string | null;
  description_en: string | null;
  category: string;
  source_type: string;
  video_url: string;
  thumbnail_url: string | null;
  duration: string | null;
  is_active: boolean;
  display_order: number;
}

const VideoManager = () => {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Video>>({});
  const [uploading, setUploading] = useState(false);

  const { data: videos, isLoading } = useQuery({
    queryKey: ['admin-all-videos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Video[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: Partial<Video>) => {
      const { error } = await supabase.from('videos').insert({
        title_ar: data.title_ar!,
        title_en: data.title_en!,
        description_ar: data.description_ar,
        description_en: data.description_en,
        category: data.category || 'work',
        source_type: data.source_type || 'youtube',
        video_url: data.video_url!,
        thumbnail_url: data.thumbnail_url,
        duration: data.duration,
        is_active: true,
        display_order: data.display_order || 0,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-all-videos'] });
      setIsAdding(false);
      setFormData({});
      toast.success('تم إضافة الفيديو بنجاح');
    },
    onError: (error) => toast.error('حدث خطأ: ' + error.message),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Video> }) => {
      const { error } = await supabase.from('videos').update(data).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-all-videos'] });
      setEditingId(null);
      setFormData({});
      toast.success('تم تحديث الفيديو بنجاح');
    },
    onError: (error) => toast.error('حدث خطأ: ' + error.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('videos').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-all-videos'] });
      toast.success('تم حذف الفيديو بنجاح');
    },
    onError: (error) => toast.error('حدث خطأ: ' + error.message),
  });

  const handleUploadVideo = async (file: File) => {
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `video-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${fileExt}`;
      const filePath = `videos/${fileName}`;
      const { error: uploadError } = await supabase.storage.from('media').upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(filePath);
      setFormData({ ...formData, video_url: publicUrl, source_type: 'upload' });
      toast.success('تم رفع الفيديو بنجاح');
    } catch (error: any) {
      toast.error('خطأ في الرفع: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleUploadThumb = async (file: File) => {
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `thumb-${Date.now()}.${fileExt}`;
      const filePath = `videos/thumbs/${fileName}`;
      const { error } = await supabase.storage.from('media').upload(filePath, file);
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(filePath);
      setFormData({ ...formData, thumbnail_url: publicUrl });
      toast.success('تم رفع الصورة المصغرة');
    } catch (error: any) {
      toast.error('خطأ في الرفع: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const startEdit = (v: Video) => {
    setEditingId(v.id);
    setFormData(v);
    setIsAdding(false);
  };

  const startAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      title_ar: '',
      title_en: '',
      category: 'work',
      source_type: 'youtube',
      video_url: '',
      display_order: 0,
    });
  };

  const categories = [
    { value: 'work', label: 'من شغلنا' },
    { value: 'courses', label: 'كورسات' },
    { value: 'testimonials', label: 'تجارب العملاء' },
    { value: 'tips', label: 'نصائح' },
  ];

  if (isLoading) return <div className="text-center py-8 text-muted-foreground">جاري التحميل...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-foreground">إدارة الفيديوهات</h2>
        <Button variant="gold" onClick={startAdd} disabled={isAdding}>
          <Plus className="w-4 h-4 me-2" />
          إضافة فيديو
        </Button>
      </div>

      {(isAdding || editingId) && (
        <div className="p-6 rounded-xl bg-card border border-border space-y-4">
          <h3 className="font-semibold text-foreground">
            {isAdding ? 'إضافة فيديو جديد' : 'تعديل الفيديو'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">العنوان بالعربية</label>
              <Input
                value={formData.title_ar || ''}
                onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">العنوان بالإنجليزية</label>
              <Input
                value={formData.title_en || ''}
                onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">الفئة</label>
              <Select
                value={formData.category || 'work'}
                onValueChange={(v) => setFormData({ ...formData, category: v })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {categories.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">المصدر</label>
              <Select
                value={formData.source_type || 'youtube'}
                onValueChange={(v) => setFormData({ ...formData, source_type: v })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="vimeo">Vimeo</SelectItem>
                  <SelectItem value="upload">رفع مباشر</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-muted-foreground mb-1 block">
                {formData.source_type === 'upload' ? 'رابط الفيديو (يتم ملؤه تلقائياً بعد الرفع)' : 'رابط الفيديو'}
              </label>
              <Input
                placeholder={formData.source_type === 'youtube' ? 'https://youtube.com/watch?v=...' : formData.source_type === 'vimeo' ? 'https://vimeo.com/...' : ''}
                value={formData.video_url || ''}
                onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                dir="ltr"
              />
              {formData.source_type === 'upload' && (
                <div className="mt-2">
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={(e) => e.target.files?.[0] && handleUploadVideo(e.target.files[0])}
                    disabled={uploading}
                  />
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-muted-foreground mb-1 block">الصورة المصغرة (اختياري — يُستخدم thumbnail يوتيوب تلقائياً)</label>
              {formData.thumbnail_url && (
                <img src={formData.thumbnail_url} alt="thumb" className="w-32 h-20 rounded-lg object-cover mb-2 border border-border" />
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleUploadThumb(e.target.files[0])}
                disabled={uploading}
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1 block">المدة (مثال: 5:30)</label>
              <Input
                value={formData.duration || ''}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">الترتيب (الأرقام الأصغر تظهر أولاً)</label>
              <Input
                type="number"
                value={formData.display_order || 0}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
              />
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
                if (!formData.title_ar || !formData.title_en || !formData.video_url) {
                  toast.error('من فضلك املأ العنوان والرابط');
                  return;
                }
                if (isAdding) createMutation.mutate(formData);
                else if (editingId) updateMutation.mutate({ id: editingId, data: formData });
              }}
              disabled={createMutation.isPending || updateMutation.isPending || uploading}
            >
              <Save className="w-4 h-4 me-2" />
              حفظ
            </Button>
            <Button variant="outline" onClick={() => { setIsAdding(false); setEditingId(null); setFormData({}); }}>
              <X className="w-4 h-4 me-2" />
              إلغاء
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos?.map((v) => (
          <div
            key={v.id}
            className={`p-4 rounded-xl bg-card border ${v.is_active ? 'border-border' : 'border-destructive/30 opacity-60'}`}
          >
            <div className="flex items-start gap-3">
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <Play className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{v.title_ar}</h3>
                <p className="text-xs text-muted-foreground truncate">{v.title_en}</p>
                <p className="text-xs text-primary mt-1">{v.category} · {v.source_type}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm" onClick={() => startEdit(v)}>
                <Edit2 className="w-3 h-3 me-1" />تعديل
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive"
                onClick={() => { if (confirm('هل أنت متأكد من الحذف؟')) deleteMutation.mutate(v.id); }}
              >
                <Trash2 className="w-3 h-3 me-1" />حذف
              </Button>
            </div>
          </div>
        ))}
      </div>

      {videos?.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">لا يوجد فيديوهات حالياً</div>
      )}
    </div>
  );
};

export default VideoManager;
