import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  ChevronRight,
  Terminal,
  CheckCircle2,
  GitCommit
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  duration: string;
  description: string;
  achievements: string[];
  technologies: string[];
  color: string;
}

const experiences: Experience[] = [
  {
    id: 'sublimation',
    company: 'Sublimation Health',
    role: 'AWS/Azure Security Analyst',
    location: 'Remote',
    startDate: '2025-04',
    endDate: 'Present',
    duration: '11 months',
    description: 'Leading cloud security initiatives across AWS and Azure environments, implementing threat detection and compliance frameworks.',
    achievements: [
      'Implemented AWS GuardDuty and Azure Sentinel for real-time threat detection',
      'Reduced security incident response time by 60% through automated alerting',
      'Achieved HIPAA compliance for healthcare data infrastructure',
      'Deployed infrastructure as code using Terraform for 20+ environments',
    ],
    technologies: ['AWS', 'Azure', 'Terraform', 'Python', 'SIEM'],
    color: '#0078D4',
  },
  {
    id: 'boltteck',
    company: 'Boltteck Safety Consult',
    role: 'Cloud Security Architect',
    location: 'Remote',
    startDate: '2023-06',
    endDate: '2025-04',
    duration: '1 year 11 months',
    description: 'Designed and implemented secure cloud architectures for enterprise clients, focusing on AWS security best practices.',
    achievements: [
      'Built reusable Terraform modules reducing deployment time by 70%',
      'Architected multi-account AWS landing zone with centralized security',
      'Implemented CIS benchmarks across 50+ EC2 instances',
      'Led security audits resulting in zero critical findings',
    ],
    technologies: ['AWS', 'CloudFormation', 'Jenkins', 'Docker', 'Security Hub'],
    color: '#FF9900',
  },
  {
    id: 'atera',
    company: 'Atera',
    role: 'DevOps Engineer',
    location: 'Remote',
    startDate: '2021-12',
    endDate: '2023-05',
    duration: '1 year 6 months',
    description: 'Developed and maintained CI/CD pipelines and cloud infrastructure for SaaS platform serving thousands of customers.',
    achievements: [
      'Migrated legacy infrastructure to Kubernetes, improving scalability by 300%',
      'Built self-service platform reducing developer onboarding time by 80%',
      'Implemented comprehensive monitoring with Prometheus and Grafana',
      'Reduced infrastructure costs by 35% through resource optimization',
    ],
    technologies: ['Kubernetes', 'Terraform', 'Jenkins', 'Prometheus', 'Grafana'],
    color: '#00BCF2',
  },
  {
    id: 'caltech',
    company: 'Cal Tech Services Inc',
    role: 'Cloud Security Engineer',
    location: 'Houston, TX',
    startDate: '2019-08',
    endDate: '2021-12',
    duration: '2 years 5 months',
    description: 'First cloud engineering role, building foundational skills in cloud infrastructure, automation, and security.',
    achievements: [
      'Created private Kubernetes cluster supporting DEV, TEST, and PROD environments',
      'Implemented ELK stack for centralized logging across all systems',
      'Reduced system maintenance costs by 25% through resource optimization',
      'Established DevOps practices and CI/CD pipelines',
    ],
    technologies: ['Kubernetes', 'ELK Stack', 'Docker', 'Ansible', 'Linux'],
    color: '#00FF41',
  },
];

export default function ExperienceTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [expandedExp, setExpandedExp] = useState<string | null>('sublimation');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.timeline-header',
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

      // Timeline line animation
      gsap.fromTo(
        '.timeline-line-vertical',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Timeline items animation
      gsap.fromTo(
        '.timeline-item',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleExp = (id: string) => {
    setExpandedExp(expandedExp === id ? null : id);
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(180deg, rgba(0, 120, 212, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="timeline-header text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 glass rounded-full">
            <GitCommit className="w-3 h-3 text-azure" />
            <span className="font-mono text-[10px] text-white/60 uppercase tracking-wider">Git Log</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="max-w-2xl mx-auto text-white/60">
            A chronological journey through cloud security and DevOps roles, 
            building expertise across enterprise environments.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px timeline-line-vertical">
            <div 
              className="w-full h-full"
              style={{
                background: 'linear-gradient(180deg, #0078D4, #00BCF2, transparent)',
              }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-8">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="timeline-item relative pl-12 md:pl-20"
              >
                {/* Node */}
                <div 
                  className="absolute left-2 md:left-6 w-4 h-4 rounded-full border-2 border-void z-10"
                  style={{ 
                    backgroundColor: exp.color,
                    boxShadow: `0 0 15px ${exp.color}`,
                  }}
                />

                {/* Content Card */}
                <div className="glass rounded-xl overflow-hidden card-hover">
                  {/* Header */}
                  <div
                    className="p-5 cursor-pointer"
                    onClick={() => toggleExp(exp.id)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div className="flex items-start gap-4">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${exp.color}20` }}
                        >
                          <Briefcase className="w-5 h-5" style={{ color: exp.color }} />
                        </div>
                        <div>
                          <h3 className="font-heading text-lg font-semibold text-white">
                            {exp.role}
                          </h3>
                          <p className="text-azure text-sm">{exp.company}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-mono text-white/50">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{exp.location}</span>
                        </div>
                        <ChevronRight 
                          className={`w-4 h-4 transition-transform ${
                            expandedExp === exp.id ? 'rotate-90' : ''
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedExp === exp.id && (
                    <div className="border-t border-white/10 p-5 animate-fade-in">
                      <p className="text-white/60 text-sm mb-6">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <div className="mb-6">
                        <h4 className="font-mono text-sm text-white/70 mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-terminal-green" />
                          Key Achievements
                        </h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-white/50"
                            >
                              <span className="text-azure mt-1">➜</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="font-mono text-sm text-white/70 mb-3 flex items-center gap-2">
                          <Terminal className="w-4 h-4 text-azure" />
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 text-xs font-mono bg-white/5 text-white/60 rounded-full border border-white/10"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Timeline End */}
          <div className="relative pl-12 md:pl-20 mt-8">
            <div 
              className="absolute left-2 md:left-6 w-4 h-4 rounded-full border-2 border-dashed border-white/30"
            />
            <div className="glass rounded-xl p-4 text-center">
              <p className="font-mono text-sm text-white/40">
                <span className="text-azure">➜</span> Education: University of Houston — Healthcare Administration & Information Management
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
