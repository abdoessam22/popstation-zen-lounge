import { motion } from 'framer-motion';
import { Play, Clock } from 'lucide-react';

export interface VideoItem {
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
}

interface VideoCardProps {
  video: VideoItem;
  language: 'ar' | 'en';
  onPlay: (video: VideoItem) => void;
  index: number;
}

// Extract YouTube/Vimeo thumbnail when no custom thumb provided
const getFallbackThumb = (video: VideoItem): string | null => {
  if (video.thumbnail_url) return video.thumbnail_url;
  if (video.source_type === 'youtube') {
    const match = video.video_url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^&\n?#]+)/);
    if (match) return `https://i.ytimg.com/vi/${match[1]}/hqdefault.jpg`;
  }
  return null;
};

const VideoCard = ({ video, language, onPlay, index }: VideoCardProps) => {
  const title = language === 'ar' ? video.title_ar : video.title_en;
  const description = language === 'ar' ? video.description_ar : video.description_en;
  const thumb = getFallbackThumb(video);

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4), ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -6 }}
      onClick={() => onPlay(video)}
      className="group relative text-start rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-secondary">
        {thumb ? (
          <img
            src={thumb}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 via-card to-card flex items-center justify-center">
            <Play className="w-16 h-16 text-primary/40" />
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-16 h-16 rounded-full bg-primary/95 backdrop-blur-sm flex items-center justify-center shadow-2xl shadow-primary/40 group-hover:bg-primary transition-colors"
          >
            <Play className="w-7 h-7 text-primary-foreground fill-current ms-1" />
          </motion.div>
        </div>

        {/* Duration badge */}
        {video.duration && (
          <div className="absolute bottom-3 end-3 flex items-center gap-1 px-2 py-1 rounded-md bg-background/80 backdrop-blur-sm border border-border/50">
            <Clock className="w-3 h-3 text-primary" />
            <span className="text-xs font-medium text-foreground">{video.duration}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </motion.button>
  );
};

export default VideoCard;
