export type Language = 'ar' | 'en';

export const translations = {
  ar: {
    // Navigation
    nav: {
      home: 'الرئيسية',
      about: 'عن بوب ستيشن',
      services: 'خدماتنا',
      pricing: 'الأسعار',
      booking: 'احجز الآن',
      contact: 'تواصل معنا',
      policies: 'السياسات',
      therapists: 'اختر معالجك',
      staff: 'فريقنا',
      products: 'منتجاتنا',
      vip: 'تجربة VIP',
      videos: 'الفيديوهات',
    },
    // Hero
    hero: {
      tagline: 'مركز العافية والاسترخاء الفاخر (+18)',
      title: 'POP STATION',
      subtitle: 'حيث يلتقي الفخامة بالعافية',
      description: 'اكتشف تجربة استثنائية للعلاج الطبيعي والاسترخاء في أجواء راقية تجمع بين الخصوصية والرفاهية',
      bookNow: 'احجز موعدك',
      whatsapp: 'تواصل عبر واتساب',
    },
    // Services
    services: {
      title: 'خدماتنا',
      subtitle: 'رعاية شاملة لجسدك وعقلك',
      physiotherapy: {
        title: 'العلاج الطبيعي',
        description: 'علاج متخصص لإعادة التأهيل وإدارة الألم وتصحيح الوضعية والتعافي الرياضي',
      },
      massage: {
        title: 'المساج العلاجي',
        description: 'جلسات استرخاء عميقة تشمل الأحجار الساخنة والعلاج بالروائح العطرية',
      },
      relaxation: {
        title: 'غرف الاسترخاء الخاصة',
        badge: '+18',
        description: 'تجربة حسية فريدة مع الإضاءة الهادئة والروائح العطرية والموسيقى المريحة',
      },
      lounge: {
        title: 'صالة الألعاب للكبار',
        badge: '+18',
        description: 'صالة راقية للبالغين تضم البلياردو وألعاب الطاولة وألعاب الفيديو الرياضية',
      },
      vip: {
        title: 'تجربة VIP',
        description: 'غرف خاصة فاخرة مع أولوية الحجز وجلسات ممتدة ومشروبات مجانية',
      },
    },
    // Common
    common: {
      learnMore: 'اعرف المزيد',
      viewAll: 'عرض الكل',
      adults: 'للبالغين فقط',
      luxury: 'فاخر',
      private: 'خاص',
    },
    // About
    about: {
      title: 'عن بوب ستيشن',
      subtitle: 'رؤيتنا ورسالتنا',
      mission: 'مهمتنا',
      missionText: 'نسعى لتقديم أعلى مستويات الرعاية الصحية والاسترخاء في بيئة تحترم خصوصيتك وتلبي احتياجاتك',
      values: 'قيمنا',
      privacy: 'الخصوصية أولاً',
      professionalism: 'الاحترافية',
      excellence: 'التميز',
      respect: 'الاحترام',
      statement: 'نؤمن أن الاسترخاء الحقيقي يبدأ عندما يشعر كل ضيف بالأمان والاحترام والتحكم في تجربته',
    },
    // Pricing
    pricing: {
      title: 'باقاتنا',
      subtitle: 'اختر الباقة المناسبة لك',
      starter: 'الأساسية',
      premium: 'المميزة',
      elite: 'النخبة',
      perSession: 'للجلسة',
      mostPopular: 'الأكثر طلباً',
    },
    // Booking
    booking: {
      title: 'احجز موعدك',
      subtitle: 'نحن في انتظارك',
      name: 'الاسم الكامل',
      phone: 'رقم الهاتف',
      email: 'البريد الإلكتروني',
      date: 'التاريخ المفضل',
      time: 'الوقت المفضل',
      service: 'الخدمة المطلوبة',
      therapist: 'المعالج المفضل',
      notes: 'ملاحظات إضافية',
      submit: 'إرسال الطلب',
      success: 'تم إرسال طلبك بنجاح!',
      successMessage: 'سيتواصل معك فريقنا قريباً لتأكيد الموعد',
      noPreference: 'بدون تفضيل',
      chooseTherapist: 'اختر المعالج',
    },
    // Contact
    contact: {
      title: 'تواصل معنا',
      subtitle: 'نحن هنا لمساعدتك',
      address: 'العنوان',
      phone: 'الهاتف',
      hours: 'ساعات العمل',
      hoursValue: 'السبت - الخميس: 10 صباحاً - 10 مساءً',
    },
    // Footer
    footer: {
      rights: 'جميع الحقوق محفوظة',
      privacy: 'سياسة الخصوصية',
      terms: 'الشروط والأحكام',
    },
    // Testimonials
    testimonials: {
      title: 'آراء عملائنا',
      subtitle: 'ماذا يقولون عنا',
    },
    // Policies
    policies: {
      title: 'السياسات والشروط',
      privacy: 'سياسة الخصوصية',
      terms: 'الشروط والأحكام',
      agePolicy: 'سياسة العمر (+18)',
      houseRules: 'قواعد المنشأة',
      nonDiscrimination: 'سياسة عدم التمييز',
    },
    // Therapists
    therapists: {
      title: 'اختر معالجك',
      subtitle: 'للضيوف حرية اختيار المعالج الذي يشعرون معه بالراحة',
      filterByGender: 'الجنس',
      filterByExperience: 'الخبرة',
      all: 'الكل',
      male: 'ذكر',
      female: 'أنثى',
      yearsExperience: 'سنوات خبرة',
      select: 'اختيار المعالج',
      selected: 'تم الاختيار',
    },
    // Products
    products: {
      title: 'منتجاتنا',
      subtitle: 'منتجات عافية فاخرة لتعزيز تجربة الاسترخاء في منزلك',
      addToCart: 'أضف للسلة',
      cart: 'السلة',
      total: 'المجموع',
      inquireWhatsApp: 'استفسار عبر واتساب',
    },
    // VIP
    vip: {
      title: 'تجربة VIP',
      subtitle: 'انغمس في عالم من الفخامة والخصوصية المطلقة',
      requestAccess: 'طلب تجربة VIP',
    },
    // Videos
    videos: {
      title: 'مكتبة الفيديوهات',
      subtitle: 'شاهد شغلنا، كورساتنا، وتجارب عملائنا',
      categories: {
        all: 'الكل',
        work: 'من شغلنا',
        courses: 'كورسات',
        testimonials: 'تجارب العملاء',
        tips: 'نصائح',
      },
      watchNow: 'شاهد الآن',
      noVideos: 'لا توجد فيديوهات حالياً',
    },
    // Stats
    stats: {
      title: 'أرقامنا تتحدث',
      subtitle: 'سنوات من التميز في خدمة عملائنا',
      clients: 'عميل سعيد',
      sessions: 'جلسة ناجحة',
      experience: 'سنوات خبرة',
      therapists: 'معالج محترف',
    },
    // FAQ
    faq: {
      title: 'الأسئلة الشائعة',
      subtitle: 'إجابات على أكثر الأسئلة تكراراً',
      questions: [
        {
          q: 'هل المركز مرخص ومعتمد؟',
          a: 'نعم، بوب ستيشن مركز مرخص بالكامل ويعمل تحت إشراف د. عبدالرحمن السيد ناصف وفريق من المعالجين المحترفين المعتمدين.',
        },
        {
          q: 'هل يمكنني اختيار جنس المعالج؟',
          a: 'بالتأكيد، نوفر لك حرية اختيار المعالج (ذكر أو أنثى) من صفحة "اختر معالجك" قبل تأكيد الحجز.',
        },
        {
          q: 'ما هي طبيعة صالة الكبار (+18)؟',
          a: 'صالة راقية للبالغين فقط تضم البلياردو وألعاب الطاولة وألعاب الفيديو الرياضية في أجواء فاخرة. تجربة محترمة وغير جنسية بالكامل.',
        },
        {
          q: 'كيف يمكنني حجز موعد؟',
          a: 'يمكنك الحجز من خلال صفحة "احجز الآن" أو التواصل معنا مباشرة عبر واتساب وسيقوم فريقنا بتأكيد الموعد.',
        },
        {
          q: 'هل يوجد مواقف للسيارات؟',
          a: 'نعم، يتوفر مواقف خاصة للضيوف. يمكنك أيضاً طلب توصيل خاص ضمن باقات VIP.',
        },
        {
          q: 'ما الفرق بين تجربة VIP والجلسات العادية؟',
          a: 'تجربة VIP تشمل غرفاً خاصة فاخرة، أولوية في الحجز، جلسات ممتدة، ومشروبات مجانية، مع خدمة شخصية متميزة.',
        },
      ],
    },
    // Gallery
    gallery: {
      title: 'معرض المكان',
      subtitle: 'تجوّل في أجواء بوب ستيشن',
    },
  },
  en: {
    // Navigation
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      pricing: 'Pricing',
      booking: 'Book Now',
      contact: 'Contact',
      policies: 'Policies',
      therapists: 'Choose Therapist',
      staff: 'Our Team',
      products: 'Products',
      vip: 'VIP Experience',
      videos: 'Videos',
    },
    // Hero
    hero: {
      tagline: 'Luxury Wellness & Adult Relaxation (+18)',
      title: 'POP STATION',
      subtitle: 'Where Luxury Meets Wellness',
      description: 'Discover an exceptional experience of physiotherapy and relaxation in an elegant atmosphere that combines privacy and luxury',
      bookNow: 'Book Now',
      whatsapp: 'WhatsApp Us',
    },
    // Services
    services: {
      title: 'Our Services',
      subtitle: 'Complete care for your body and mind',
      physiotherapy: {
        title: 'Physiotherapy',
        description: 'Specialized treatment for rehabilitation, pain management, posture correction, and sports recovery',
      },
      massage: {
        title: 'Therapeutic Massage',
        description: 'Deep relaxation sessions including hot stones and aromatherapy treatments',
      },
      relaxation: {
        title: 'Private Relaxation Rooms',
        badge: '+18',
        description: 'Unique sensory experience with ambient lighting, aromatherapy, and soothing music',
      },
      lounge: {
        title: 'Adult Games Lounge',
        badge: '+18',
        description: 'Premium lounge for adults featuring billiards, board games, and sports video games',
      },
      vip: {
        title: 'VIP Experience',
        description: 'Private luxury rooms with priority booking, extended sessions, and complimentary drinks',
      },
    },
    // Common
    common: {
      learnMore: 'Learn More',
      viewAll: 'View All',
      adults: 'Adults Only',
      luxury: 'Luxury',
      private: 'Private',
    },
    // About
    about: {
      title: 'About POP STATION',
      subtitle: 'Our Vision & Mission',
      mission: 'Our Mission',
      missionText: 'We strive to provide the highest levels of healthcare and relaxation in an environment that respects your privacy and meets your needs',
      values: 'Our Values',
      privacy: 'Privacy First',
      professionalism: 'Professionalism',
      excellence: 'Excellence',
      respect: 'Respect',
      statement: 'We believe true relaxation starts when every guest feels safe, respected, and in control of their experience',
    },
    // Pricing
    pricing: {
      title: 'Our Packages',
      subtitle: 'Choose the right package for you',
      starter: 'Starter',
      premium: 'Premium',
      elite: 'Elite',
      perSession: 'per session',
      mostPopular: 'Most Popular',
    },
    // Booking
    booking: {
      title: 'Book Your Appointment',
      subtitle: 'We are waiting for you',
      name: 'Full Name',
      phone: 'Phone Number',
      email: 'Email Address',
      date: 'Preferred Date',
      time: 'Preferred Time',
      service: 'Requested Service',
      therapist: 'Preferred Therapist',
      notes: 'Additional Notes',
      submit: 'Submit Request',
      success: 'Request Submitted Successfully!',
      successMessage: 'Our team will contact you shortly to confirm your appointment',
      noPreference: 'No Preference',
      chooseTherapist: 'Choose Therapist',
    },
    // Contact
    contact: {
      title: 'Contact Us',
      subtitle: 'We are here to help',
      address: 'Address',
      phone: 'Phone',
      hours: 'Working Hours',
      hoursValue: 'Saturday - Thursday: 10 AM - 10 PM',
    },
    // Footer
    footer: {
      rights: 'All Rights Reserved',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
    },
    // Testimonials
    testimonials: {
      title: 'Testimonials',
      subtitle: 'What our clients say',
    },
    // Policies
    policies: {
      title: 'Policies & Terms',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
      agePolicy: 'Age Policy (+18)',
      houseRules: 'House Rules',
      nonDiscrimination: 'Non-Discrimination Policy',
    },
    // Therapists
    therapists: {
      title: 'Choose Your Therapist',
      subtitle: 'Clients are free to choose the therapist they feel most comfortable with',
      filterByGender: 'Gender',
      filterByExperience: 'Experience',
      all: 'All',
      male: 'Male',
      female: 'Female',
      yearsExperience: 'years experience',
      select: 'Select Therapist',
      selected: 'Selected',
    },
    // Products
    products: {
      title: 'Our Products',
      subtitle: 'Premium wellness products to enhance your relaxation experience at home',
      addToCart: 'Add to Cart',
      cart: 'Cart',
      total: 'Total',
      inquireWhatsApp: 'Inquire via WhatsApp',
    },
    // VIP
    vip: {
      title: 'VIP Experience',
      subtitle: 'Immerse yourself in a world of luxury and absolute privacy',
      requestAccess: 'Request VIP Access',
    },
    // Videos
    videos: {
      title: 'Video Library',
      subtitle: 'Watch our work, courses, and client experiences',
      categories: {
        all: 'All',
        work: 'Our Work',
        courses: 'Courses',
        testimonials: 'Client Stories',
        tips: 'Tips',
      },
      watchNow: 'Watch Now',
      noVideos: 'No videos available yet',
    },
    // Stats
    stats: {
      title: 'Our Numbers Speak',
      subtitle: 'Years of excellence serving our clients',
      clients: 'Happy Clients',
      sessions: 'Successful Sessions',
      experience: 'Years Experience',
      therapists: 'Pro Therapists',
    },
    // FAQ
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Answers to the most common questions',
      questions: [
        {
          q: 'Is the center licensed and certified?',
          a: 'Yes, POP STATION is fully licensed and operates under Dr. Abdulrahman El-Sayed Nasef and a team of certified professional therapists.',
        },
        {
          q: 'Can I choose my therapist\'s gender?',
          a: 'Absolutely. You can freely choose your therapist (male or female) from the "Choose Therapist" page before confirming your booking.',
        },
        {
          q: 'What is the adult lounge (+18) about?',
          a: 'A premium adults-only lounge featuring billiards, board games, and sports video games in a luxurious atmosphere. A respectful and entirely non-sexual experience.',
        },
        {
          q: 'How can I book an appointment?',
          a: 'You can book through the "Book Now" page or contact us directly via WhatsApp. Our team will confirm your appointment shortly.',
        },
        {
          q: 'Is parking available?',
          a: 'Yes, we provide private parking for guests. You can also request a private pickup as part of our VIP packages.',
        },
        {
          q: 'What\'s the difference between VIP and regular sessions?',
          a: 'VIP includes private luxury rooms, priority booking, extended sessions, complimentary drinks, and personalized premium service.',
        },
      ],
    },
    // Gallery
    gallery: {
      title: 'Place Gallery',
      subtitle: 'Take a tour of POP STATION',
    },
  },
};

export const useTranslation = (language: Language) => {
  return translations[language];
};
