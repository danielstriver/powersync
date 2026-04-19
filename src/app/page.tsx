import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import Solution from '@/components/Solution';
import HowItWorks from '@/components/HowItWorks';
import ValueProposition from '@/components/ValueProposition';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex min-h-screen flex-col">
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <ValueProposition />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
