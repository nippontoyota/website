import Header from '@/components/Header';
import BannerSlider from '@/components/BannerSlider';
import Vehicles from '@/components/Vehicles';
import Services from '@/components/Services';
// import PressRelease from '@/components/PressRelease';
import LeadForm from '@/components/LeadForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      
      <main className="flex-grow">
        <BannerSlider />
        <Vehicles />
        <Services />
        {/* <PressRelease /> */}
        <LeadForm />
      </main>

      <Footer />
    </div>
  );
}
