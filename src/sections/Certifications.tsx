import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Award, 
  CheckCircle2, 
  Calendar, 
  ExternalLink,
  Shield,
  Cloud,
  Network
} from 'lucide-react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

function IconComponent({ icon: Icon, className }: { icon: any; className?: string }) {
  return <Icon className={className} />;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiry: string;
  credential: string;
  description: string;
  skills: string[];
  colorClass: string;
  bgClass: string;
  icon: React.ElementType;
  verified: boolean;
}

const certifications: Certification[] = [
  {
    id: 'az-204',
    name: 'Azure Developer Associate',
    issuer: 'Microsoft',
    date: '2024',
    expiry: '2026',
    credential: 'AZ-204',
    description: 'Demonstrates expertise in designing, building, testing, and maintaining cloud applications and services on Microsoft Azure.',
    skills: ['Azure Compute', 'Azure Storage', 'Azure Security', 'App Services', 'Functions'],
    colorClass: 'text-azure',
    bgClass: 'bg-azure/20',
    icon: Cloud,
    verified: true,
  },
  {
    id: 'az-700',
    name: 'Azure Network Engineer Associate',
    issuer: 'Microsoft',
    date: '2024',
    expiry: '2026',
    credential: 'AZ-700',
    description: 'Validates skills in planning, implementing, and managing Azure networking solutions, including hybrid connectivity.',
    skills: ['VNet', 'Load Balancing', 'VPN Gateway', 'ExpressRoute', 'Network Security'],
    colorClass: 'text-azure-light',
    bgClass: 'bg-azure-light/20',
    icon: Network,
    verified: true,
  },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.certs-header',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.cert-card',
        { y: 60, opacity: 0, rotateY: -15 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.certs-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleFlip = (id: string) => {
    setFlippedCard(flippedCard === id ? null : id);
  };

  return (
    <section
      ref={sectionRef}
      id="certs"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 80%, rgba(0, 120, 212, 0.1) 0%, transparent 40%),
              radial-gradient(circle at 80% 20%, rgba(0, 188, 242, 0.08) 0%, transparent 40%)
            `,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="certs-header text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 glass rounded-full">
            <Award className="w-3 h-3 text-azure" />
            <span className="font-mono text-[10px] text-white/60 uppercase tracking-wider">Credentials</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            <span className="gradient-text">Certifications</span> & Credentials
          </h2>
          <p className="max-w-2xl mx-auto text-white/60">
            Industry-recognized certifications validating expertise in cloud architecture, 
            security, and DevOps practices.
          </p>
        </div>

        <div className="certs-grid grid md:grid-cols-2 gap-8 max-w-4xl mx-auto" style={{ perspective: '1000px' }}>
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="cert-card relative h-[420px] cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
              onClick={() => handleFlip(cert.id)}
            >
              <div
                className={`absolute inset-0 glass-strong rounded-2xl p-6 backface-hidden transition-all duration-500 ${
                  flippedCard === cert.id ? 'opacity-0 rotate-y-180' : 'opacity-100'
                }`}
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${cert.bgClass}`}>
                    <IconComponent icon={cert.icon} className={cn('w-8 h-8', cert.colorClass)} />
                  </div>
                  {cert.verified && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-terminal-green/20 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-terminal-green" />
                      <span className="font-mono text-[10px] text-terminal-green">Verified</span>
                    </div>
                  )}
                </div>

                <h3 className="font-heading text-xl font-semibold text-white mb-2">
                  {cert.name}
                </h3>
                <p className="font-mono text-sm text-azure mb-4">{cert.credential}</p>

                <div className="flex items-center gap-2 mb-6">
                  <Shield className="w-4 h-4 text-white/40" />
                  <span className="text-white/60 text-sm">{cert.issuer}</span>
                </div>

                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  {cert.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {cert.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-[10px] font-mono bg-white/5 text-white/50 rounded border border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-white/40">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Issued: {cert.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>Expires: {cert.expiry}</span>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 text-white/30 text-xs font-mono">
                  Click to flip →
                </div>
              </div>

              <div
                className={`absolute inset-0 glass-strong rounded-2xl p-6 backface-hidden transition-all duration-500 ${
                  flippedCard === cert.id ? 'opacity-100' : 'opacity-0 rotate-y-180'
                }`}
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <div 
                    className="absolute w-full h-px bg-gradient-to-r from-transparent via-azure to-transparent"
                    style={{ animation: 'scan 3s linear infinite' }}
                  />
                </div>

                <div className="flex flex-col items-center justify-center h-full">
                  <div className={`w-32 h-32 rounded-xl mb-6 flex items-center justify-center ${cert.bgClass} border border-azure/40`}>
                    <div className="grid grid-cols-5 gap-1 p-2">
                      {Array.from({ length: 25 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-4 h-4 rounded-sm ${i % 3 === 0 ? 'bg-azure' : 'bg-azure/30'}`}
                        />
                      ))}
                    </div>
                  </div>

                  <h4 className="font-mono text-sm text-white/70 mb-2">
                    Credential ID
                  </h4>
                  <p className={`font-mono text-lg mb-6 ${cert.colorClass}`}>
                    {cert.credential}-XXXX-XXXX
                  </p>

                  <a
                    href={`https://learn.microsoft.com/en-us/users/me/credentials/${cert.credential}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cyber rounded-lg flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="font-mono text-xs">Verify Credential</span>
                  </a>

                  <p className="mt-6 text-center text-white/40 text-xs font-mono">
                    Click to flip back
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 glass rounded-full px-6 py-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
              <span className="font-mono text-xs text-white/60">Active Certifications</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-white/60">Next Target:</span>
              <span className="font-mono text-xs text-azure">AWS Solutions Architect</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
}
