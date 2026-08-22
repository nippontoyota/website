import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyWidgets from '@/components/StickyWidgets';

export const metadata = {
  title: 'Virtual Showroom | Nippon Toyota',
  description: 'Experience our vehicles from the comfort of your home with our 360-degree virtual showroom.',
};

export default function VirtualShowroomPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-[#050505] relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(235,10,30,0.05),transparent_70%)] pointer-events-none mix-blend-screen" />
        
        <div className="text-center relative z-10 px-6">
          <p className="text-[#eb0a1e] font-bold text-[10px] tracking-[0.4em] uppercase mb-4">
            Interactive Experience
          </p>
          <h1 className="font-druk text-5xl md:text-7xl lg:text-8xl text-white tracking-tighter uppercase leading-none">
            Virtual Showroom
          </h1>
          <p className="text-zinc-500 font-display font-light text-base md:text-lg max-w-md mx-auto mt-6">
            The immersive 360-degree virtual experience is currently under construction.
          </p>
        </div>
      </main>
      <Footer />
      <StickyWidgets />
    </div>
  );
}
