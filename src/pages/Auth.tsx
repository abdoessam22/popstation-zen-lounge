import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, User, ArrowRight, KeyRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

const emailSchema = z.string().email('البريد الإلكتروني غير صالح');
const passwordSchema = z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');

const Auth = () => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user, signIn, signUp, isLoading } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user && !isLoading) {
      navigate('/admin');
    }
  }, [user, isLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    // Validate email
    try {
      emailSchema.parse(email);
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        setError(validationError.errors[0].message);
        setIsSubmitting(false);
        return;
      }
    }

    // Handle forgot password
    if (mode === 'forgot') {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth`,
        });
        if (error) {
          setError(error.message);
        } else {
          setSuccess(language === 'ar' 
            ? 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني' 
            : 'Password reset link has been sent to your email');
        }
      } catch (err) {
        setError(language === 'ar' ? 'حدث خطأ، يرجى المحاولة مرة أخرى' : 'An error occurred, please try again');
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // Validate password for login/signup
    try {
      passwordSchema.parse(password);
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        setError(validationError.errors[0].message);
        setIsSubmitting(false);
        return;
      }
    }

    try {
      if (mode === 'login') {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            setError(language === 'ar' ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة' : 'Invalid email or password');
          } else {
            setError(error.message);
          }
        } else {
          navigate('/admin');
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          if (error.message.includes('already registered')) {
            setError(language === 'ar' ? 'هذا البريد الإلكتروني مسجل بالفعل' : 'This email is already registered');
          } else {
            setError(error.message);
          }
        } else {
          setError('');
          // Auto-login after signup since auto-confirm is enabled
          const { error: signInError } = await signIn(email, password);
          if (!signInError) {
            navigate('/admin');
          }
        }
      }
    } catch (err) {
      setError(language === 'ar' ? 'حدث خطأ، يرجى المحاولة مرة أخرى' : 'An error occurred, please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md p-8 rounded-2xl bg-card border border-border"
      >
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4">
            {mode === 'forgot' ? <KeyRound className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            {mode === 'forgot' 
              ? (language === 'ar' ? 'استعادة كلمة المرور' : 'Reset Password')
              : (language === 'ar' ? 'لوحة الإدارة' : 'Admin Panel')}
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            {mode === 'forgot'
              ? (language === 'ar' ? 'أدخل بريدك الإلكتروني لاستعادة كلمة المرور' : 'Enter your email to reset your password')
              : mode === 'login' 
                ? (language === 'ar' ? 'تسجيل الدخول للوصول للوحة التحكم' : 'Sign in to access admin dashboard')
                : (language === 'ar' ? 'إنشاء حساب جديد' : 'Create a new account')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder={language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 rtl:pl-3 rtl:pr-10"
              required
            />
          </div>

          {mode !== 'forgot' && (
            <div className="relative">
              <Lock className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder={language === 'ar' ? 'كلمة المرور' : 'Password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 rtl:pl-10 rtl:pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          )}

          {error && (
            <p className="text-destructive text-sm text-center">{error}</p>
          )}

          {success && (
            <p className="text-green-600 text-sm text-center">{success}</p>
          )}

          <Button type="submit" variant="gold" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              language === 'ar' ? 'جاري التحميل...' : 'Loading...'
            ) : mode === 'forgot' ? (
              <>
                {language === 'ar' ? 'إرسال رابط الاستعادة' : 'Send Reset Link'}
                <Mail className="w-4 h-4 ms-2" />
              </>
            ) : mode === 'login' ? (
              <>
                {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
                <ArrowRight className="w-4 h-4 ms-2" />
              </>
            ) : (
              <>
                {language === 'ar' ? 'إنشاء حساب' : 'Sign Up'}
                <User className="w-4 h-4 ms-2" />
              </>
            )}
          </Button>

          {mode === 'login' && (
            <button
              type="button"
              onClick={() => {
                setMode('forgot');
                setError('');
                setSuccess('');
              }}
              className="w-full text-sm text-muted-foreground hover:text-primary"
            >
              {language === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
            </button>
          )}
        </form>

        <div className="mt-6 text-center">
          {mode === 'forgot' ? (
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError('');
                setSuccess('');
              }}
              className="text-sm text-primary hover:underline"
            >
              {language === 'ar' ? '← العودة لتسجيل الدخول' : '← Back to login'}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setError('');
                setSuccess('');
              }}
              className="text-sm text-primary hover:underline"
            >
              {mode === 'login'
                ? (language === 'ar' ? 'ليس لديك حساب؟ سجل الآن' : "Don't have an account? Sign up")
                : (language === 'ar' ? 'لديك حساب بالفعل؟ تسجيل الدخول' : 'Already have an account? Sign in')}
            </button>
          )}
        </div>

        <div className="mt-4 text-center">
          <a
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {language === 'ar' ? '← العودة للموقع' : '← Back to website'}
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
