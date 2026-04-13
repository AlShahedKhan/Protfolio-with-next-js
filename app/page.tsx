import Header from '@/components/Header';
import { RevealOnScroll } from '@/components/animations';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main id="top" className="bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <Header />
      <Hero />
      <RevealOnScroll delay={40}>
        <About />
      </RevealOnScroll>
      <RevealOnScroll delay={120}>
        <Projects />
      </RevealOnScroll>
      <RevealOnScroll delay={180}>
        <Experience />
      </RevealOnScroll>
      <RevealOnScroll delay={220}>
        <Contact />
      </RevealOnScroll>
      <Footer />
    </main>
  );
}
