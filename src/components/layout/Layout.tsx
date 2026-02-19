import { ReactNode, Suspense, lazy } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { RamadanTopBar } from '@/components/ramadan/RamadanDecorations';

const Ramadan3DScene = lazy(() => import('@/components/3d/Ramadan3DScene'));

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* 3D Ramadan Background */}
      <Suspense fallback={null}>
        <Ramadan3DScene />
      </Suspense>
      
      <RamadanTopBar />
      <Navbar />
      <main className="flex-1 pt-20 relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
