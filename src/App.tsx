import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { SiteProvider } from './context/SiteContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Appointment from './components/Appointment';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    
    // Intercept link clicks to handle internal routing
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.getAttribute('href')?.startsWith('/')) {
        const href = anchor.getAttribute('href')!;
        if (href === '/admin' || href === '/') {
          e.preventDefault();
          window.history.pushState({}, '', href);
          setPath(href);
        }
      }
    };
    document.addEventListener('click', handleLinkClick);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  return (
    <SiteProvider>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="antialiased"
      >
        {path === '/admin' ? (
          <Dashboard />
        ) : (
          <>
            <Navbar />
            <main>
              <Hero />
              <About />
              <Services />
              <Appointment />
              <Team />
              <Testimonials />
              <FAQ />
              <Contact />
            </main>
            <Footer />
          </>
        )}
      </motion.div>
    </SiteProvider>
  );
}
