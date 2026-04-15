import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import Solution from '@/components/Solution';
import ValueProposition from '@/components/ValueProposition';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <ValueProposition />
      <Footer />
    </main>
  );
}
