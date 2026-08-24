import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutContent from './AboutContent';

export const metadata = {
  title: 'About Us | Nippon Toyota',
  description: 'Learn more about Nippon Toyota, our dealer mission, and our leadership team.',
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <AboutContent />
      </main>
      <Footer />
    </div>
  );
}
