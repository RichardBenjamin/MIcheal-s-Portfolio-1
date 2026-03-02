import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Zap, Lock, Cloud, Server, Code } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const philosophyItems = [
  {
    icon: Shield,
    title: 'Security-First Mindset',
    description: 'Every infrastructure decision prioritizes security posture, compliance, and threat mitigation from day one.',
  },
  {
    icon: Zap,
    title: 'Automation-Driven',
    description: 'Eliminating manual processes through Infrastructure as Code and CI/CD pipelines for consistent, repeatable deployments.',
  },
  {
    icon: Lock,
    title: 'Zero-Trust Architecture',
    description: 'Implementing least-privilege access, encrypted communications, and continuous verification across all systems.',
  },
];

const stats = [
  { label: 'Deployment Time Reduction', value: 75, suffix: '%', color: 'from-azure to-azure-light' },
  { label: 'Security Incident Reduction', value: 90, suffix: '%', color: 'from-terminal-green to-emerald-400' },
  { label: 'Infrastructure Cost Savings', value: 40, suffix: '%', color: 'from-yellow-500 to-orange-400' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content reveal animation
      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats animation
      const statBars = statsRef.current?.querySelectorAll('.stat-bar');
      statBars?.forEach((bar) => {
        const value = parseInt(bar.getAttribute('data-value') || '0');
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: `${value}%`,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Philosophy cards animation
      gsap.fromTo(
        '.philosophy-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.philosophy-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 right-0 w-1/2 h-full opacity-5"
          style={{
            background: 'radial-gradient(circle at 100% 50%, rgba(0, 120, 212, 0.5) 0%, transparent 50%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 glass rounded-full">
            <Server className="w-3 h-3 text-azure" />
            <span className="font-mono text-[10px] text-white/60 uppercase tracking-wider">System Overview</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Engineering Philosophy
          </h2>
          <p className="max-w-2xl mx-auto text-white/60">
            A security-first approach to cloud infrastructure, combining automation, 
            compliance, and scalability for enterprise-grade deployments.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Content */}
          <div ref={contentRef} className="space-y-8">
            {/* Main Description */}
            <div className="glass rounded-2xl p-6 lg:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-azure/20 flex items-center justify-center flex-shrink-0">
                  <Cloud className="w-6 h-6 text-azure" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-white mb-2">
                    Cloud Security Architect
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Well-qualified, dedicated, and innovative DevSecOps professional with expertise 
                    in AWS & Microsoft Azure. Specializing in constructing robust, secure cloud 
                    environments using Infrastructure as Code, Kubernetes, Terraform, and Jenkins CI/CD.
                  </p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-terminal-green/20 flex items-center justify-center flex-shrink-0">
                    <Code className="w-6 h-6 text-terminal-green" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-white mb-2">
                      Automation Expert
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Streamlining operations with Infrastructure as Code, fostering secure software 
                      development through continuous integration and deployment pipelines, and ensuring 
                      systems withstand the evolving landscape of cybersecurity threats.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Bars */}
            <div ref={statsRef} className="glass rounded-2xl p-6">
              <h4 className="font-mono text-sm text-white/70 mb-6 flex items-center gap-2">
                <span className="text-azure">➜</span> Performance Metrics
              </h4>
              <div className="space-y-5">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-mono text-xs text-white/60">{stat.label}</span>
                      <span className="font-mono text-xs text-azure">{stat.value}{stat.suffix}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`stat-bar h-full rounded-full bg-gradient-to-r ${stat.color}`}
                        data-value={stat.value}
                        style={{ width: '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Philosophy Cards */}
          <div className="philosophy-grid space-y-4">
            {philosophyItems.map((item, index) => (
              <div
                key={index}
                className="philosophy-card glass rounded-xl p-6 card-hover group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-azure/10 flex items-center justify-center flex-shrink-0 group-hover:bg-azure/20 transition-colors">
                    <item.icon className="w-5 h-5 text-azure" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-semibold text-white mb-2 group-hover:text-azure transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Additional Info Card */}
            <div className="philosophy-card glass rounded-xl p-6">
              <h4 className="font-mono text-sm text-white/70 mb-4 flex items-center gap-2">
                <span className="text-terminal-green">✓</span> Core Competencies
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'AWS & Azure',
                  'Terraform',
                  'Kubernetes',
                  'Docker',
                  'Jenkins',
                  'Python',
                  'CI/CD',
                  'IaC',
                  'Security',
                  'Monitoring',
                ].map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-mono bg-white/5 text-white/60 rounded-full border border-white/10 hover:border-azure/50 hover:text-azure transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
