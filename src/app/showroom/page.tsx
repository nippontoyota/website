import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyWidgets from '@/components/StickyWidgets';

export const metadata = {
  title: 'Showroom | Nippon Toyota',
  description: 'Explore our premium showroom and discover your next Toyota.',
};

export default function ShowroomPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-[#050505]">
      <Header />
      <main className="flex-grow flex items-center justify-center relative overflow-hidden min-h-[75vh] py-32">
        {/* Subtle background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#eb0a1e]/10 blur-[120px] rounded-[100%] pointer-events-none mix-blend-screen" />
        <div className="absolute inset-0 w-full h-full bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
        
        <div className="text-center relative z-10 px-6 max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
            <p className="text-[#eb0a1e] font-bold text-[10px] tracking-[0.4em] uppercase">
              Coming Soon
            </p>
          </div>
          
          <h1 className="font-druk text-6xl md:text-8xl lg:text-9xl text-white tracking-tighter uppercase leading-[0.85] mb-8 drop-shadow-2xl">
            Showroom
          </h1>
          
          <p className="text-zinc-400 font-display font-light text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
            We are currently crafting a digital experience worthy of our vehicles. Please check back shortly.
          </p>
          
          <div className="w-px h-16 bg-gradient-to-b from-[#eb0a1e] to-transparent mt-12 opacity-50" />
        </div>
      </main>
      <Footer />
      <StickyWidgets />
    </div>
  );
}
