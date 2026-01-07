import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Twitter, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { siteConfig } from '@/lib/config';

const Footer = () => {
  const { language, t, isRTL } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="luxury-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Owner */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold gold-gradient-text">
              POP STATION
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {language === 'ar' 
                ? 'مركز العافية والاسترخاء الفاخر. نقدم أعلى مستويات الرعاية في بيئة تحترم خصوصيتك.'
                : 'Premium Wellness & Relaxation Center. Providing the highest levels of care in an environment that respects your privacy.'}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {siteConfig.owner[language]}
                </p>
                <p className="text-xs text-primary">
                  {siteConfig.ownerNickname[language]}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold text-foreground">
              {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <nav className="flex flex-col gap-2">
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                {t.nav.about}
              </Link>
              <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                {t.nav.services}
              </Link>
              <Link to="/choose-therapist" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                {t.nav.therapists}
              </Link>
              <Link to="/vip" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                {t.nav.vip}
              </Link>
              <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                {t.nav.products}
              </Link>
              <Link to="/booking" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                {t.nav.booking}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold text-foreground">
              {t.contact.title}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm" dir="ltr">{siteConfig.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm">{siteConfig.email}</span>
              </div>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">{siteConfig.address[language]}</span>
              </div>
            </div>
          </div>

          {/* Hours & Social */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold text-foreground">
              {t.contact.hours}
            </h4>
            <p className="text-muted-foreground text-sm">
              {siteConfig.workingHours[language]}
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} POP STATION. {t.footer.rights}
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/policies" className="text-muted-foreground hover:text-primary transition-colors">
              {t.footer.privacy}
            </Link>
            <Link to="/policies" className="text-muted-foreground hover:text-primary transition-colors">
              {t.footer.terms}
            </Link>
            <Link to="/staff" className="text-muted-foreground hover:text-primary transition-colors">
              {t.nav.staff}
            </Link>
          </div>
        </div>

        {/* Developer Credit */}
        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-xs">
            {language === 'ar' ? 'التطوير والبرمجة:' : 'Development & Programming:'}{' '}
            <span className="text-primary font-medium">محمود ظريف | Mahmoud Zarif</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
