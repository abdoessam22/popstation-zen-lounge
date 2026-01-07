import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle2, Users } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useLanguage } from '@/contexts/LanguageContext';
import { servicesConfig } from '@/lib/config';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(9, 'Valid phone number is required'),
  email: z.string().email('Valid email is required').optional().or(z.literal('')),
  preferredDate: z.string().min(1, 'Date is required'),
  preferredTime: z.string().min(1, 'Time is required'),
  service: z.string().min(1, 'Service is required'),
  therapistId: z.string().optional(),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const Booking = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const preselectedTherapistId = searchParams.get('therapist');

  const { data: therapists } = useQuery({
    queryKey: ['booking-therapists'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('therapists')
        .select('id, name_ar, name_en')
        .eq('is_active', true)
        .order('name_en');
      
      if (error) throw error;
      return data;
    },
  });

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      preferredDate: '',
      preferredTime: '',
      service: '',
      therapistId: preselectedTherapistId || '',
      notes: '',
    },
  });

  useEffect(() => {
    if (preselectedTherapistId) {
      form.setValue('therapistId', preselectedTherapistId);
    }
  }, [preselectedTherapistId, form]);

  const onSubmit = async (data: BookingFormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.from('booking_requests').insert({
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        preferred_date: data.preferredDate,
        preferred_time: data.preferredTime,
        service: data.service,
        therapist_id: data.therapistId || null,
        notes: data.notes || null,
        language: language,
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: t.booking.success,
        description: t.booking.successMessage,
      });
    } catch (error) {
      toast({
        title: language === 'ar' ? 'حدث خطأ' : 'Error occurred',
        description: language === 'ar' ? 'يرجى المحاولة مرة أخرى' : 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const timeSlots = [
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00',
  ];

  if (isSubmitted) {
    return (
      <Layout>
        <section className="section-padding bg-background min-h-[70vh] flex items-center">
          <div className="luxury-container">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-lg mx-auto text-center"
            >
              <div className="inline-flex p-6 rounded-full bg-primary/10 text-primary mb-8">
                <CheckCircle2 className="w-16 h-16" />
              </div>
              <h1 className="font-display text-4xl font-bold mb-4 text-foreground">
                {t.booking.success}
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                {t.booking.successMessage}
              </p>
              <Button variant="gold" onClick={() => setIsSubmitted(false)}>
                {language === 'ar' ? 'حجز موعد آخر' : 'Book Another Appointment'}
              </Button>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

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
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              <span className="gold-gradient-text">{t.booking.title}</span>
            </h1>
            <div className="gold-divider my-8" />
            <p className="text-muted-foreground text-xl leading-relaxed">
              {t.booking.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Choose Therapist CTA */}
      <section className="bg-card border-y border-border">
        <div className="luxury-container py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-foreground">
                {language === 'ar' 
                  ? 'هل تريد اختيار معالج محدد؟' 
                  : 'Want to choose a specific therapist?'}
              </span>
            </div>
            <Button variant="gold-outline" asChild>
              <Link to="/choose-therapist">
                {language === 'ar' ? 'اختر معالجك' : 'Choose Your Therapist'}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section-padding bg-background">
        <div className="luxury-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="p-8 md:p-12 rounded-2xl bg-card border border-border">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.booking.name}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.booking.phone}</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="+966 XX XXX XXXX"
                              dir="ltr"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.booking.email}</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="email@example.com"
                            dir="ltr"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.booking.service}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={language === 'ar' ? 'اختر الخدمة' : 'Select a service'}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {servicesConfig[language].map((service, index) => (
                              <SelectItem key={index} value={service}>
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="therapistId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.booking.therapist}</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={t.booking.noPreference}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="none">
                              {t.booking.noPreference}
                            </SelectItem>
                            {therapists?.map((therapist) => (
                              <SelectItem key={therapist.id} value={therapist.id}>
                                {language === 'ar' ? therapist.name_ar : therapist.name_en}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="preferredDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {t.booking.date}
                          </FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="preferredTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {t.booking.time}
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={language === 'ar' ? 'اختر الوقت' : 'Select time'}
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.booking.notes}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={
                              language === 'ar'
                                ? 'أي ملاحظات إضافية تود مشاركتها...'
                                : 'Any additional notes you would like to share...'
                            }
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    variant="hero"
                    size="xl"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? (language === 'ar' ? 'جاري الإرسال...' : 'Submitting...')
                      : t.booking.submit}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Booking;
