import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Sections
import BootSequence from './sections/BootSequence';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import SkillsConstellation from './sections/SkillsConstellation';
import Certifications from './sections/Certifications';
import ExperienceTimeline from './sections/ExperienceTimeline';
import DevSecOpsPipeline from './sections/DevSecOpsPipeline';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import NetworkBackground from './components/NetworkBackground';
import CustomCursor from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [bootComplete, setBootComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Handle boot sequence completion
  useEffect(() => {
    if (bootComplete) {
      // Small delay before showing main content
      setTimeout(() => {
        setShowContent(true);
      }, 500);
    }
  }, [bootComplete]);

  // Initialize GSAP animations after boot
  useEffect(() => {
    if (!showContent) return;

    // Refresh ScrollTrigger after content is visible
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [showContent]);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-void text-foreground overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Network Background - visible after boot */}
      {showContent && <NetworkBackground />}
      
      {/* Boot Sequence */}
      {!bootComplete && (
        <BootSequence onComplete={() => setBootComplete(true)} />
      )}
      
      {/* Main Content */}
      {showContent && (
        <div className="relative z-10">
          {/* Navigation */}
          <Navigation />
          
          {/* Hero Section */}
          <Hero />
          
          {/* About Section */}
          <About />
          
          {/* Skills Constellation */}
          <SkillsConstellation />
          
          {/* DevSecOps Pipeline */}
          <DevSecOpsPipeline />
          
          {/* Projects */}
          <Projects />
          
          {/* Certifications */}
          <Certifications />
          
          {/* Experience Timeline */}
          <ExperienceTimeline />
          
          {/* Contact */}
          <Contact />
          
          {/* Footer */}
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
