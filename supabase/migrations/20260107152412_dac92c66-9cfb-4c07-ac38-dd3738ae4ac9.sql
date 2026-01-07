-- Create booking_requests table for appointment submissions
CREATE TABLE public.booking_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  service TEXT NOT NULL,
  notes TEXT,
  language TEXT NOT NULL DEFAULT 'ar',
  status TEXT NOT NULL DEFAULT 'pending'
);

-- Enable Row Level Security
ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert booking requests (public form)
CREATE POLICY "Anyone can create booking requests" 
ON public.booking_requests 
FOR INSERT 
WITH CHECK (true);

-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  quote_ar TEXT NOT NULL,
  quote_en TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Enable RLS for testimonials
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active testimonials
CREATE POLICY "Anyone can view active testimonials" 
ON public.testimonials 
FOR SELECT 
USING (is_active = true);

-- Insert sample testimonials
INSERT INTO public.testimonials (name_ar, name_en, quote_ar, quote_en, rating) VALUES
('أحمد م.', 'Ahmed M.', 'تجربة استثنائية! المكان راقي والخدمة ممتازة. أنصح به بشدة', 'Exceptional experience! The place is luxurious and the service is excellent. Highly recommended', 5),
('سارة ك.', 'Sarah K.', 'أفضل مركز علاج طبيعي زرته. الفريق محترف جداً', 'The best physiotherapy center I have visited. The team is very professional', 5),
('محمد ع.', 'Mohammed A.', 'صالة الألعاب رائعة والأجواء هادئة ومريحة', 'The games lounge is wonderful and the atmosphere is calm and comfortable', 4);