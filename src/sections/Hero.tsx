import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Download, FolderGit2, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headlineRef.current,
        { y: 60, opacity: 0, filter: 'blur(10px)' },
        { 
          y: 0, 
          opacity: 1, 
          filter: 'blur(0px)',
          duration: 1.2, 
          delay: 0.3,
          ease: 'power3.out' 
        }
      );

      // Subhead animation
      gsap.fromTo(
        subheadRef.current,
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          delay: 0.6,
          ease: 'power3.out' 
        }
      );

      // CTA buttons animation
      gsap.fromTo(
        ctaRef.current?.children || [],
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.1,
          delay: 0.9,
          ease: 'power3.out' 
        }
      );

      // Stats animation
      gsap.fromTo(
        statsRef.current?.children || [],
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.15,
          delay: 1.2,
          ease: 'power3.out' 
        }
      );

      // Parallax on scroll - move entire content together to prevent overlap
      gsap.to('.hero-content', {
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-bg opacity-30" />
        
        {/* Glowing orbs */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(0, 120, 212, 0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(0, 188, 242, 0.3) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
        
        {/* Corner decorations */}
        <div className="absolute top-32 left-8 w-20 h-px bg-gradient-to-r from-azure to-transparent" />
        <div className="absolute top-32 left-8 w-px h-20 bg-gradient-to-b from-azure to-transparent" />
        <div className="absolute bottom-32 right-8 w-20 h-px bg-gradient-to-l from-azure to-transparent" />
        <div className="absolute bottom-32 right-8 w-px h-20 bg-gradient-to-t from-azure to-transparent" />
      </div>

      <div className="hero-content relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 glass rounded-full animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
          <span className="font-mono text-xs text-white/70">Available for Opportunities</span>
        </div>

        {/* Main Headline */}
        <h1
          ref={headlineRef}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
        >
          Architecting{' '}
          <span className="gradient-text">Secure,</span>
          <br />
          <span className="gradient-text">Scalable</span> Cloud
          <br />
          Infrastructure
        </h1>

        {/* Subheadline */}
        <p
          ref={subheadRef}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-white/60 mb-10 leading-relaxed"
        >
          Senior-level <span className="text-azure">DevSecOps Engineer</span> specializing in{' '}
          <span className="text-azure-light">AWS & Azure</span> security architecture,{' '}
          Infrastructure as Code, and enterprise CI/CD automation.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#projects"
            onClick={(e) => handleScroll(e, '#projects')}
            className="btn-primary-cyber rounded-lg flex items-center gap-2 group"
          >
            <FolderGit2 className="w-4 h-4" />
            <span>View Cloud Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a
            href="/resume.pdf"
            download
            className="btn-cyber rounded-lg flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Resume</span>
          </a>
          
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, '#contact')}
            className="btn-cyber rounded-lg flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <span>Contact</span>
          </a>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: '5+', label: 'Years Experience', icon: '⏱' },
            { value: '99.9%', label: 'Uptime Achieved', icon: '●' },
            { value: '50+', label: 'Projects Deployed', icon: '◆' },
            { value: '2', label: 'Azure Certs', icon: '✓' },
          ].map((stat, index) => (
            <div
              key={index}
              className="glass rounded-xl p-4 card-hover"
            >
              <div className="font-heading text-2xl sm:text-3xl font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="font-mono text-xs text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-azure to-transparent" />
        </div>
      </div>
    </section>
  );
}
