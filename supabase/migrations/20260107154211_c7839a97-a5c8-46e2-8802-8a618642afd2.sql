-- Create therapists table
CREATE TABLE public.therapists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female')),
  experience_years INTEGER NOT NULL DEFAULT 1,
  specialties_ar TEXT[] NOT NULL DEFAULT '{}',
  specialties_en TEXT[] NOT NULL DEFAULT '{}',
  bio_ar TEXT,
  bio_en TEXT,
  photo_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  languages TEXT[] NOT NULL DEFAULT ARRAY['ar']
);

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_ar TEXT,
  description_en TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Add therapist_id to booking_requests (optional, nullable)
ALTER TABLE public.booking_requests
ADD COLUMN therapist_id UUID REFERENCES public.therapists(id);

-- Enable RLS on therapists
ALTER TABLE public.therapists ENABLE ROW LEVEL SECURITY;

-- Enable RLS on products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Public can view active therapists
CREATE POLICY "Anyone can view active therapists"
ON public.therapists
FOR SELECT
USING (is_active = true);

-- Public can view active products
CREATE POLICY "Anyone can view active products"
ON public.products
FOR SELECT
USING (is_active = true);

-- Insert sample therapists
INSERT INTO public.therapists (name_ar, name_en, gender, experience_years, specialties_ar, specialties_en, bio_ar, bio_en, languages) VALUES
('أحمد محمد', 'Ahmed Mohammed', 'male', 8, ARRAY['العلاج الطبيعي', 'إعادة التأهيل'], ARRAY['Physiotherapy', 'Rehabilitation'], 'متخصص في العلاج الطبيعي وإعادة التأهيل مع خبرة 8 سنوات', 'Specialist in physiotherapy and rehabilitation with 8 years of experience', ARRAY['ar', 'en']),
('سارة أحمد', 'Sara Ahmed', 'female', 6, ARRAY['المساج العلاجي', 'العلاج بالروائح'], ARRAY['Therapeutic Massage', 'Aromatherapy'], 'خبيرة في المساج العلاجي والعلاج بالروائح العطرية', 'Expert in therapeutic massage and aromatherapy', ARRAY['ar', 'en']),
('محمد علي', 'Mohammed Ali', 'male', 10, ARRAY['العلاج الطبيعي الرياضي', 'إدارة الألم'], ARRAY['Sports Physiotherapy', 'Pain Management'], 'أخصائي علاج طبيعي رياضي متمرس', 'Experienced sports physiotherapy specialist', ARRAY['ar']),
('نورة سعد', 'Noura Saad', 'female', 5, ARRAY['المساج الاسترخائي', 'الأحجار الساخنة'], ARRAY['Relaxation Massage', 'Hot Stones'], 'متخصصة في جلسات الاسترخاء والمساج العميق', 'Specialized in relaxation sessions and deep massage', ARRAY['ar', 'en']),
('خالد عبدالله', 'Khalid Abdullah', 'male', 7, ARRAY['تصحيح الوضعية', 'العلاج اليدوي'], ARRAY['Posture Correction', 'Manual Therapy'], 'خبير في تصحيح الوضعية والعلاج اليدوي', 'Expert in posture correction and manual therapy', ARRAY['ar', 'en']),
('هند محمود', 'Hind Mahmoud', 'female', 4, ARRAY['المساج العلاجي', 'الاسترخاء'], ARRAY['Therapeutic Massage', 'Relaxation'], 'متخصصة في المساج العلاجي وتقنيات الاسترخاء', 'Specialized in therapeutic massage and relaxation techniques', ARRAY['ar']);

-- Insert sample products
INSERT INTO public.products (name_ar, name_en, description_ar, description_en, price, category) VALUES
('زيت المساج الفاخر', 'Premium Massage Oil', 'زيت مساج طبيعي بخلاصة اللافندر للاسترخاء العميق', 'Natural massage oil with lavender extract for deep relaxation', 150.00, 'oils'),
('شمعة الاسترخاء العطرية', 'Aromatic Relaxation Candle', 'شمعة عطرية فاخرة بروائح الياسمين والورد', 'Luxury aromatic candle with jasmine and rose scents', 85.00, 'candles'),
('مجموعة العلاج العطري', 'Aromatherapy Kit', 'مجموعة كاملة من الزيوت العطرية الطبيعية', 'Complete set of natural essential oils', 320.00, 'kits'),
('كريم الاسترخاء العضلي', 'Muscle Relaxation Cream', 'كريم طبيعي لتخفيف آلام العضلات', 'Natural cream for muscle pain relief', 120.00, 'creams'),
('ملح الاستحمام الفاخر', 'Luxury Bath Salt', 'ملح استحمام طبيعي بخلاصة البحر الميت', 'Natural bath salt with Dead Sea extract', 95.00, 'bath'),
('مجموعة العناية الشاملة', 'Complete Care Kit', 'مجموعة شاملة للعناية بالجسم والاسترخاء', 'Complete body care and relaxation kit', 450.00, 'kits');