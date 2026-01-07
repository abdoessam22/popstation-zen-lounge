import { motion } from 'framer-motion';
import { Shield, FileText, Users, AlertCircle, Home } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';

const Policies = () => {
  const { t, language } = useLanguage();

  const policies = [
    {
      id: 'privacy',
      icon: <Shield className="w-5 h-5" />,
      title: t.policies.privacy,
      content: language === 'ar' ? `
        نحن في POP STATION نلتزم بحماية خصوصيتك. نجمع فقط المعلومات الضرورية لتقديم خدماتنا بأفضل شكل ممكن.

        **المعلومات التي نجمعها:**
        - الاسم ومعلومات الاتصال
        - التفضيلات والملاحظات الطبية ذات الصلة
        - سجل المواعيد والخدمات

        **كيف نستخدم معلوماتك:**
        - لتقديم الخدمات المطلوبة
        - للتواصل معك بخصوص مواعيدك
        - لتحسين خدماتنا

        **حماية البيانات:**
        - نستخدم أحدث تقنيات التشفير
        - لا نشارك بياناتك مع أطراف ثالثة
        - يمكنك طلب حذف بياناتك في أي وقت
      ` : `
        At POP STATION, we are committed to protecting your privacy. We only collect information necessary to provide our services in the best possible way.

        **Information We Collect:**
        - Name and contact information
        - Relevant preferences and medical notes
        - Appointment and service history

        **How We Use Your Information:**
        - To provide requested services
        - To communicate with you regarding your appointments
        - To improve our services

        **Data Protection:**
        - We use the latest encryption technologies
        - We do not share your data with third parties
        - You can request deletion of your data at any time
      `,
    },
    {
      id: 'terms',
      icon: <FileText className="w-5 h-5" />,
      title: t.policies.terms,
      content: language === 'ar' ? `
        باستخدام خدمات POP STATION، فإنك توافق على الشروط التالية:

        **الحجوزات:**
        - يجب تأكيد الحجز قبل 24 ساعة على الأقل
        - في حالة الإلغاء، يرجى إخطارنا قبل 12 ساعة
        - التأخر أكثر من 15 دقيقة قد يؤدي لإلغاء الموعد

        **الدفع:**
        - الدفع مطلوب عند تلقي الخدمة
        - نقبل النقد والبطاقات البنكية

        **المسؤولية:**
        - يجب إبلاغنا بأي حالات صحية قبل بدء الجلسة
        - نحن غير مسؤولين عن المتعلقات الشخصية
      ` : `
        By using POP STATION services, you agree to the following terms:

        **Bookings:**
        - Booking must be confirmed at least 24 hours in advance
        - For cancellations, please notify us 12 hours before
        - Being more than 15 minutes late may result in appointment cancellation

        **Payment:**
        - Payment is required upon receiving the service
        - We accept cash and bank cards

        **Liability:**
        - You must inform us of any health conditions before starting the session
        - We are not responsible for personal belongings
      `,
    },
    {
      id: 'age',
      icon: <AlertCircle className="w-5 h-5" />,
      title: t.policies.agePolicy,
      content: language === 'ar' ? `
        **سياسة العمر لخدمات +18:**

        بعض خدماتنا مخصصة للبالغين فقط (18 سنة فما فوق):
        - غرف الاسترخاء الخاصة
        - صالة الألعاب للكبار

        **متطلبات الدخول:**
        - يجب تقديم هوية سارية تثبت العمر
        - نحتفظ بحق رفض الدخول لمن لا يستوفي شروط العمر

        **ملاحظة:**
        - هذه المناطق مصممة لتوفير بيئة هادئة وراقية للبالغين
        - لا تحتوي على أي محتوى غير لائق
      ` : `
        **Age Policy for +18 Services:**

        Some of our services are exclusively for adults (18 years and above):
        - Private Relaxation Rooms
        - Adult Games Lounge

        **Entry Requirements:**
        - Valid ID proving age must be presented
        - We reserve the right to deny entry to those who do not meet age requirements

        **Note:**
        - These areas are designed to provide a quiet and upscale environment for adults
        - They do not contain any inappropriate content
      `,
    },
    {
      id: 'rules',
      icon: <Home className="w-5 h-5" />,
      title: t.policies.houseRules,
      content: language === 'ar' ? `
        **قواعد المنشأة:**

        لضمان تجربة مريحة للجميع، نرجو الالتزام بما يلي:

        ✓ احترام الهدوء والخصوصية
        ✓ ارتداء ملابس محتشمة في المناطق العامة
        ✓ الحفاظ على نظافة المرافق
        ✓ احترام جميع الزوار والموظفين

        ✗ التدخين داخل المنشأة ممنوع
        ✗ إحضار المشروبات الكحولية ممنوع
        ✗ القمار وألعاب الحظ ممنوعة
        ✗ السلوك غير اللائق غير مقبول

        **نحتفظ بحق إنهاء الخدمة لمن لا يلتزم بالقواعد**
      ` : `
        **House Rules:**

        To ensure a comfortable experience for everyone, please adhere to the following:

        ✓ Respect quietness and privacy
        ✓ Wear modest clothing in public areas
        ✓ Maintain cleanliness of facilities
        ✓ Respect all visitors and staff

        ✗ Smoking inside the facility is prohibited
        ✗ Bringing alcoholic beverages is prohibited
        ✗ Gambling and games of chance are prohibited
        ✗ Inappropriate behavior is not acceptable

        **We reserve the right to terminate service for those who do not comply with the rules**
      `,
    },
    {
      id: 'discrimination',
      icon: <Users className="w-5 h-5" />,
      title: t.policies.nonDiscrimination,
      content: language === 'ar' ? `
        **سياسة عدم التمييز:**

        في POP STATION، نرحب بالجميع ونؤمن بالمساواة في تقديم الخدمات.

        نحن لا نميز على أساس:
        - الجنس أو الجنسية
        - العرق أو اللون
        - الدين أو المذهب
        - الحالة الاجتماعية
        - أي عوامل أخرى غير ذات صلة بالخدمة

        نلتزم بتوفير بيئة آمنة ومرحبة لجميع عملائنا.
      ` : `
        **Non-Discrimination Policy:**

        At POP STATION, we welcome everyone and believe in equality in providing services.

        We do not discriminate based on:
        - Gender or nationality
        - Race or color
        - Religion or sect
        - Marital status
        - Any other factors unrelated to the service

        We are committed to providing a safe and welcoming environment for all our clients.
      `,
    },
  ];

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
              <span className="gold-gradient-text">{t.policies.title}</span>
            </h1>
            <div className="gold-divider my-8" />
          </motion.div>
        </div>
      </section>

      {/* Policies Accordion */}
      <section className="section-padding bg-background">
        <div className="luxury-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {policies.map((policy) => (
                <AccordionItem
                  key={policy.id}
                  value={policy.id}
                  className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/30"
                >
                  <AccordionTrigger className="hover:no-underline py-6">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {policy.icon}
                      </div>
                      <span className="font-display text-lg font-semibold text-foreground">
                        {policy.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <div className="prose prose-invert prose-sm max-w-none text-muted-foreground whitespace-pre-line">
                      {policy.content}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Policies;
