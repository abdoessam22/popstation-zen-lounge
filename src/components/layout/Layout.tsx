import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { RamadanStars, RamadanTopBar } from '@/components/ramadan/RamadanDecorations';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <RamadanTopBar />
      <Navbar />
      <main className="flex-1 pt-20 relative overflow-hidden">
        <RamadanStars count={10} />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
