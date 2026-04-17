import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VideoItem } from './VideoCard';

interface Props {
  video: VideoItem | null;
  language: 'ar' | 'en';
  onClose: () => void;
}

// Convert any YouTube URL into an embeddable iframe URL
const getYouTubeEmbed = (url: string) => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^&\n?#]+)/);
  if (match) return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
  return url;
};

const getVimeoEmbed = (url: string) => {
  const match = url.match(/vimeo\.com\/(\d+)/);
  if (match) return `https://player.vimeo.com/video/${match[1]}?autoplay=1`;
  return url;
};

const VideoPlayerModal = ({ video, language, onClose }: Props) => {
  if (!video) return null;
  const title = language === 'ar' ? video.title_ar : video.title_en;
  const description = language === 'ar' ? video.description_ar : video.description_en;

  return (
    <Dialog open={!!video} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-4xl p-0 bg-card border-border overflow-hidden">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <div className="aspect-video w-full bg-black">
          {video.source_type === 'youtube' && (
            <iframe
              src={getYouTubeEmbed(video.video_url)}
              title={title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
          {video.source_type === 'vimeo' && (
            <iframe
              src={getVimeoEmbed(video.video_url)}
              title={title}
              className="w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          )}
          {video.source_type === 'upload' && (
            <video
              src={video.video_url}
              controls
              autoPlay
              className="w-full h-full"
            />
          )}
        </div>
        <div className="p-6">
          <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">{title}</h3>
          {description && (
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{description}</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayerModal;
