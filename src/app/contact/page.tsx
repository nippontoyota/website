import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyWidgets from '@/components/StickyWidgets';
import ContactContent from './ContactContent';

export const metadata = {
  title: 'Contact Us | Nippon Toyota',
  description: 'Get in touch with Nippon Toyota. Find our showroom locations, contact numbers, and working hours.',
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <ContactContent />
      </main>
      <Footer />
      <StickyWidgets />
    </div>
  );
}
