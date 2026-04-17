import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Film } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import VideoCard, { VideoItem } from '@/components/videos/VideoCard';
import VideoPlayerModal from '@/components/videos/VideoPlayerModal';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const Videos = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const { data: videos, isLoading } = useQuery({
    queryKey: ['public-videos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as VideoItem[];
    },
  });

  const categories = [
    { value: 'all', label: t.videos.categories.all },
    { value: 'work', label: t.videos.categories.work },
    { value: 'courses', label: t.videos.categories.courses },
    { value: 'testimonials', label: t.videos.categories.testimonials },
    { value: 'tips', label: t.videos.categories.tips },
  ];

  const filtered = videos?.filter((v) => activeCategory === 'all' || v.category === activeCategory) ?? [];

  return (
    <Layout>
      <section className="section-padding">
        <div className="luxury-container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Film className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium">
                {language === 'ar' ? 'مكتبة الفيديوهات' : 'Video Library'}
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
              <span className="gold-gradient-text">{t.videos.title}</span>
            </h1>
            <div className="gold-divider my-6" />
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              {t.videos.subtitle}
            </p>
          </motion.div>

          {/* Category filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  'px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border',
                  activeCategory === cat.value
                    ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30'
                    : 'bg-card/50 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
                )}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden bg-card border border-border/50">
                  <Skeleton className="aspect-video w-full" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((video, idx) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  language={language}
                  index={idx}
                  onPlay={setActiveVideo}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Film className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">{t.videos.noVideos}</p>
            </div>
          )}
        </div>
      </section>

      <VideoPlayerModal
        video={activeVideo}
        language={language}
        onClose={() => setActiveVideo(null)}
      />
    </Layout>
  );
};

export default Videos;
