import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, Package, Calendar, LogOut, Shield, Film } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import TherapistManager from '@/components/admin/TherapistManager';
import ProductManager from '@/components/admin/ProductManager';
import BookingManager from '@/components/admin/BookingManager';
import VideoManager from '@/components/admin/VideoManager';

const Admin = () => {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary">جاري التحميل...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md p-8 rounded-2xl bg-card border border-border"
        >
          <div className="inline-flex p-4 rounded-full bg-destructive/10 text-destructive mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            غير مصرح
          </h1>
          <p className="text-muted-foreground mb-6">
            ليس لديك صلاحيات الوصول للوحة الإدارة. تواصل مع المسؤول لمنحك الصلاحيات اللازمة.
          </p>
          <p className="text-xs text-muted-foreground mb-6">
            {user.email}
          </p>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 me-2" />
              تسجيل الخروج
            </Button>
            <Button variant="gold" onClick={() => navigate('/')}>
              العودة للموقع
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="luxury-container py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold text-foreground">لوحة الإدارة</h1>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate('/')}>
              العودة للموقع
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="luxury-container py-8">
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="bookings" className="gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">الحجوزات</span>
            </TabsTrigger>
            <TabsTrigger value="therapists" className="gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">المعالجين</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">المنتجات</span>
            </TabsTrigger>
            <TabsTrigger value="videos" className="gap-2">
              <Film className="w-4 h-4" />
              <span className="hidden sm:inline">الفيديوهات</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <BookingManager />
          </TabsContent>

          <TabsContent value="therapists">
            <TherapistManager />
          </TabsContent>

          <TabsContent value="products">
            <ProductManager />
          </TabsContent>

          <TabsContent value="videos">
            <VideoManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
