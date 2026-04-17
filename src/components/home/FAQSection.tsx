import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQSection = () => {
  const { t } = useLanguage();

  return (
    <section className="section-padding relative">
      <div className="luxury-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">FAQ</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="gold-gradient-text">{t.faq.title}</span>
          </h2>
          <div className="gold-divider my-6" />
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            {t.faq.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {t.faq.questions.map((item, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="border border-border/60 rounded-xl bg-card/40 backdrop-blur-sm px-5 hover:border-primary/40 transition-colors data-[state=open]:border-primary/50 data-[state=open]:bg-card"
              >
                <AccordionTrigger className="text-start font-medium hover:no-underline py-5 hover:text-primary transition-colors text-base md:text-lg">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
