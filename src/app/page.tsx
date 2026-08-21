import Header from '@/components/Header';
import BannerSlider from '@/components/BannerSlider';
import QuickLinks from '@/components/QuickLinks';
import Vehicles from '@/components/Vehicles';
import Services from '@/components/Services';
import PressRelease from '@/components/PressRelease';
import Footer from '@/components/Footer';
import StickyWidgets from '@/components/StickyWidgets';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      
      <main className="flex-grow">
        <BannerSlider />
        <QuickLinks />
        <Vehicles />
        <Services />
        <PressRelease />
      </main>

      <Footer />
      <StickyWidgets />
    </div>
  );
}
