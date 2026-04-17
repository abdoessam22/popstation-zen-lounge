CREATE TABLE public.videos (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  title_ar text NOT NULL,
  title_en text NOT NULL,
  description_ar text,
  description_en text,
  category text NOT NULL DEFAULT 'work',
  source_type text NOT NULL DEFAULT 'youtube',
  video_url text NOT NULL,
  thumbnail_url text,
  duration text,
  is_active boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0
);

ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active videos"
  ON public.videos FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can insert videos"
  ON public.videos FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update videos"
  ON public.videos FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete videos"
  ON public.videos FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));