import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Cloud, 
  Database, 
  Shield, 
  Terminal, 
  GitBranch,
  Container,
  Activity,
  Code2,
  Settings,
  Network
} from 'lucide-react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

// Icon wrapper component to handle type issues
function IconComponent({ icon: Icon, className }: { icon: any; className?: string }) {
  return <Icon className={className} />;
}

interface Skill {
  name: string;
  icon: React.ElementType;
  level: number;
  category: string;
  colorClass: string;
  bgClass: string;
  barColor: string;
}

const skills: Skill[] = [
  { name: 'AWS', icon: Cloud, level: 95, category: 'Cloud', colorClass: 'text-orange-400', bgClass: 'bg-orange-400/20', barColor: '#f97316' },
  { name: 'Azure', icon: Cloud, level: 90, category: 'Cloud', colorClass: 'text-azure', bgClass: 'bg-azure/20', barColor: '#0078D4' },
  { name: 'Terraform', icon: Settings, level: 92, category: 'IaC', colorClass: 'text-purple-400', bgClass: 'bg-purple-400/20', barColor: '#a855f7' },
  { name: 'Kubernetes', icon: Container, level: 88, category: 'Orchestration', colorClass: 'text-blue-500', bgClass: 'bg-blue-500/20', barColor: '#3b82f6' },
  { name: 'Docker', icon: Container, level: 90, category: 'Containers', colorClass: 'text-blue-400', bgClass: 'bg-blue-400/20', barColor: '#60a5fa' },
  { name: 'Jenkins', icon: GitBranch, level: 85, category: 'CI/CD', colorClass: 'text-red-400', bgClass: 'bg-red-400/20', barColor: '#f87171' },
  { name: 'Python', icon: Code2, level: 82, category: 'Scripting', colorClass: 'text-yellow-400', bgClass: 'bg-yellow-400/20', barColor: '#facc15' },
  { name: 'Security', icon: Shield, level: 88, category: 'Security', colorClass: 'text-terminal-green', bgClass: 'bg-terminal-green/20', barColor: '#22c55e' },
  { name: 'Monitoring', icon: Activity, level: 85, category: 'Observability', colorClass: 'text-orange-500', bgClass: 'bg-orange-500/20', barColor: '#f97316' },
  { name: 'Networking', icon: Network, level: 80, category: 'Network', colorClass: 'text-azure-light', bgClass: 'bg-azure-light/20', barColor: '#00BCF2' },
  { name: 'Linux', icon: Terminal, level: 88, category: 'OS', colorClass: 'text-yellow-300', bgClass: 'bg-yellow-300/20', barColor: '#fde047' },
  { name: 'Databases', icon: Database, level: 78, category: 'Data', colorClass: 'text-blue-300', bgClass: 'bg-blue-300/20', barColor: '#93c5fd' },
];

const categories = ['All', 'Cloud', 'IaC', 'Security', 'CI/CD', 'Containers'];

export default function SkillsConstellation() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [barsAnimated, setBarsAnimated] = useState(false);
  const constellationRef = useRef<HTMLDivElement>(null);

  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skills-header',
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
        '.skill-card',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: {
            amount: 0.8,
            from: 'center',
          },
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: constellationRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
            onEnter: () => setBarsAnimated(true),
            onLeaveBack: () => setBarsAnimated(false),
          },
        }
      );

      gsap.fromTo(
        '.connection-line',
        { strokeDashoffset: 100 },
        {
          strokeDashoffset: 0,
          duration: 2,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: constellationRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    setBarsAnimated(false);
    gsap.fromTo(
      '.skill-card',
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out',
        onComplete: () => setBarsAnimated(true) }
    );
  }, [activeCategory]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(0, 120, 212, 0.15) 0%, transparent 40%),
              radial-gradient(circle at 80% 70%, rgba(0, 188, 242, 0.1) 0%, transparent 40%)
            `,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="skills-header text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 glass rounded-full">
            <Network className="w-3 h-3 text-azure" />
            <span className="font-mono text-[10px] text-white/60 uppercase tracking-wider">Network Topology</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Technical <span className="gradient-text">Constellation</span>
          </h2>
          <p className="max-w-2xl mx-auto text-white/60">
            A interconnected ecosystem of cloud technologies, security tools, and automation frameworks 
            that power modern infrastructure deployments.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 font-mono text-xs rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-azure text-white shadow-glow'
                  : 'glass text-white/60 hover:text-white hover:border-azure/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div ref={constellationRef} className="relative">
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0078D4" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#00BCF2" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {filteredSkills.slice(0, 6).map((_, i) => (
              <line
                key={i}
                className="connection-line"
                x1="50%"
                y1="50%"
                x2={`${20 + (i % 3) * 30}%`}
                y2={`${20 + Math.floor(i / 3) * 60}%`}
                stroke="url(#lineGradient)"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
            ))}
          </svg>

          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {filteredSkills.map((skill, index) => (
              <div
                key={skill.name}
                className={`skill-card glass rounded-xl p-5 card-hover cursor-pointer transition-all duration-300 ${
                  hoveredSkill === skill.name ? 'scale-105 z-20' : ''
                }`}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${skill.bgClass}`}
                  >
                    <IconComponent icon={skill.icon} className={cn('w-5 h-5', skill.colorClass)} />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-white text-sm">
                      {skill.name}
                    </h4>
                    <span className="font-mono text-[10px] text-white/40">
                      {skill.category}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[10px] text-white/40">Proficiency</span>
                    <span className={`font-mono text-xs font-semibold ${skill.colorClass}`}>
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ 
                        width: barsAnimated ? `${skill.level}%` : '0%',
                        backgroundColor: skill.barColor,
                        transition: `width 1s ease ${index * 0.07}s`,
                      }}
                    />
                  </div>
                </div>

                {hoveredSkill === skill.name && (
                  <div className="mt-4 pt-4 border-t border-white/10 animate-fade-in">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse" />
                      <span className="font-mono text-[10px] text-terminal-green">
                        Active • Production Ready
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Cloud Platforms', value: '2+', icon: Cloud },
            { label: 'IaC Tools', value: '5+', icon: Settings },
            { label: 'CI/CD Pipelines', value: '50+', icon: GitBranch },
            { label: 'Containers Managed', value: '1000+', icon: Container },
          ].map((stat, index) => (
            <div key={index} className="glass rounded-xl p-4 text-center card-hover">
              <stat.icon className="w-5 h-5 text-azure mx-auto mb-2" />
              <div className="font-heading text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="font-mono text-[10px] text-white/40">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
