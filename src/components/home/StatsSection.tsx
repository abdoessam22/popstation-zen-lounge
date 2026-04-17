import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Sparkles, Award, UserCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const useCountUp = (target: number, inView: boolean, duration = 2000) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, inView, duration]);

  return value;
};

interface StatProps {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  label: string;
  inView: boolean;
  delay: number;
}

const Stat = ({ icon, value, suffix = '+', label, inView, delay }: StatProps) => {
  const count = useCountUp(value, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="text-center group"
    >
      <div className="relative inline-flex items-center justify-center mb-4">
        <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>
      <div className="font-display text-4xl md:text-5xl font-bold gold-gradient-text mb-2 tabular-nums">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm md:text-base text-muted-foreground font-medium">{label}</div>
    </motion.div>
  );
};

const StatsSection = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { icon: <Users className="w-7 h-7" />, value: 1500, label: t.stats.clients },
    { icon: <Sparkles className="w-7 h-7" />, value: 5000, label: t.stats.sessions },
    { icon: <Award className="w-7 h-7" />, value: 8, label: t.stats.experience },
    { icon: <UserCheck className="w-7 h-7" />, value: 12, label: t.stats.therapists },
  ];

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="luxury-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="gold-gradient-text">{t.stats.title}</span>
          </h2>
          <div className="gold-divider my-6" />
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            {t.stats.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <Stat key={idx} {...stat} inView={inView} delay={idx * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
