import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code, 
  Hammer, 
  TestTube, 
  ShieldCheck, 
  Rocket, 
  Activity,
  Lock,
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

function IconComponent({ icon: Icon, className }: { icon: any; className?: string }) {
  return <Icon className={className} />;
}

interface PipelineStage {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  tools: string[];
  status: 'active' | 'pending' | 'complete';
  securityGate: boolean;
}

const pipelineStages: PipelineStage[] = [
  {
    id: 'code',
    name: 'Code',
    icon: Code,
    description: 'Secure coding practices with pre-commit hooks',
    tools: ['Git', 'VS Code', 'Pre-commit'],
    status: 'complete',
    securityGate: false,
  },
  {
    id: 'build',
    name: 'Build',
    icon: Hammer,
    description: 'Automated build processes with dependency scanning',
    tools: ['Jenkins', 'GitHub Actions', 'Maven'],
    status: 'complete',
    securityGate: false,
  },
  {
    id: 'test',
    name: 'Test',
    icon: TestTube,
    description: 'Unit, integration, and security testing',
    tools: ['JUnit', 'Selenium', 'Snyk'],
    status: 'active',
    securityGate: false,
  },
  {
    id: 'scan',
    name: 'Scan',
    icon: ShieldCheck,
    description: 'Vulnerability scanning and compliance checks',
    tools: ['Trivy', 'SonarQube', 'Checkmarx'],
    status: 'pending',
    securityGate: true,
  },
  {
    id: 'deploy',
    name: 'Deploy',
    icon: Rocket,
    description: 'Infrastructure as Code deployment',
    tools: ['Terraform', 'Ansible', 'ArgoCD'],
    status: 'pending',
    securityGate: false,
  },
  {
    id: 'monitor',
    name: 'Monitor',
    icon: Activity,
    description: 'Continuous monitoring and alerting',
    tools: ['Prometheus', 'Grafana', 'ELK Stack'],
    status: 'pending',
    securityGate: false,
  },
  {
    id: 'secure',
    name: 'Secure',
    icon: Lock,
    description: 'Runtime security and threat detection',
    tools: ['Falco', 'Wazuh', 'AWS GuardDuty'],
    status: 'pending',
    securityGate: true,
  },
];

export default function DevSecOpsPipeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const pipelineRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState<string | null>('test');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pipeline-header',
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
        '.pipeline-stage',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: pipelineRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.flow-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: pipelineRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isAnimating) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        setActiveStage(pipelineStages[currentIndex].id);
        currentIndex = (currentIndex + 1) % pipelineStages.length;
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isAnimating]);

  const activeStageData = pipelineStages.find(s => s.id === activeStage);
  const ActiveIcon = activeStageData?.icon || Code;

  return (
    <section
      ref={sectionRef}
      id="pipeline"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(90deg, rgba(0, 120, 212, 0.03) 1px, transparent 1px),
              linear-gradient(rgba(0, 120, 212, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pipeline-header text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 glass rounded-full">
            <Activity className="w-3 h-3 text-azure" />
            <span className="font-mono text-[10px] text-white/60 uppercase tracking-wider">CI/CD Pipeline</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            DevSecOps <span className="gradient-text">Pipeline</span>
          </h2>
          <p className="max-w-2xl mx-auto text-white/60">
            An integrated approach to security, automation, and continuous delivery 
            that ensures every code change is built, tested, scanned, and deployed securely.
          </p>
        </div>

        <div ref={pipelineRef} className="mb-12">
          <div className="flex flex-wrap justify-center gap-2 lg:gap-4 mb-8">
            {pipelineStages.map((stage, index) => {
              const StageIcon = stage.icon;
              return (
                <div key={stage.id} className="flex items-center">
                  <button
                    onClick={() => setActiveStage(stage.id)}
                    className={`pipeline-stage relative group ${
                      activeStage === stage.id ? 'z-10' : ''
                    }`}
                  >
                    <div
                      className={`relative flex flex-col items-center p-4 rounded-xl transition-all duration-300 ${
                        activeStage === stage.id
                          ? 'glass-strong border-azure/50 shadow-glow'
                          : 'glass hover:border-white/20'
                      }`}
                    >
                      <div className="absolute -top-1 -right-1">
                        {stage.status === 'complete' && (
                          <CheckCircle2 className="w-4 h-4 text-terminal-green" />
                        )}
                        {stage.status === 'active' && (
                          <div className="w-4 h-4 rounded-full bg-azure animate-pulse" />
                        )}
                        {stage.securityGate && (
                          <div className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-yellow-500 flex items-center justify-center">
                            <Lock className="w-2 h-2 text-black" />
                          </div>
                        )}
                      </div>

                      <div
                        className={cn(
                          'w-12 h-12 rounded-lg flex items-center justify-center mb-2 transition-colors',
                          activeStage === stage.id
                            ? 'bg-azure/30'
                            : 'bg-white/5 group-hover:bg-white/10'
                        )}
                      >
                        <IconComponent
                          icon={StageIcon}
                          className={cn(
                            'w-6 h-6 transition-colors',
                            activeStage === stage.id ? 'text-azure' : 'text-white/60'
                          )}
                        />
                      </div>

                      <span
                        className={`font-mono text-xs transition-colors ${
                          activeStage === stage.id ? 'text-white' : 'text-white/50'
                        }`}
                      >
                        {stage.name}
                      </span>

                      {stage.securityGate && (
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-yellow-500/20 border border-yellow-500/50 rounded-full">
                          <span className="font-mono text-[8px] text-yellow-400">SEC</span>
                        </div>
                      )}
                    </div>
                  </button>

                  {index < pipelineStages.length - 1 && (
                    <div className="hidden lg:flex items-center px-2">
                      <div className="flow-line w-8 h-px bg-gradient-to-r from-azure/50 to-azure-light/50" />
                      <ChevronRight className="w-4 h-4 text-azure/50 -ml-1" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mb-8">
            <button
              onClick={() => setIsAnimating(!isAnimating)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs transition-all ${
                isAnimating
                  ? 'bg-azure text-white shadow-glow'
                  : 'glass text-white/60 hover:text-white'
              }`}
            >
              <Activity className={`w-4 h-4 ${isAnimating ? 'animate-pulse' : ''}`} />
              {isAnimating ? 'Pipeline Running' : 'Simulate Pipeline'}
            </button>
          </div>
        </div>

        {activeStageData && (
          <div className="glass-strong rounded-2xl p-6 lg:p-8 animate-fade-in">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-azure/20 flex items-center justify-center">
                    <IconComponent icon={ActiveIcon} className="w-6 h-6 text-azure" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-white">
                      {activeStageData.name} Stage
                    </h3>
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          activeStageData.status === 'complete'
                            ? 'bg-terminal-green'
                            : activeStageData.status === 'active'
                            ? 'bg-azure animate-pulse'
                            : 'bg-white/30'
                        }`}
                      />
                      <span className="font-mono text-xs text-white/50 capitalize">
                        {activeStageData.status}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-white/60 mb-6">{activeStageData.description}</p>

                {activeStageData.securityGate && (
                  <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-mono text-sm text-yellow-400 mb-1">
                        Security Gate
                      </h4>
                      <p className="text-xs text-white/50">
                        This stage includes mandatory security checks that must pass 
                        before proceeding to the next phase.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-mono text-sm text-white/70 mb-4 flex items-center gap-2">
                  <span className="text-azure">➜</span> Tools & Technologies
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {activeStageData.tools.map((tool, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-3 glass rounded-lg hover:border-azure/30 transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-azure" />
                      <span className="font-mono text-xs text-white/70">{tool}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <h4 className="font-mono text-sm text-white/70 mb-4">Stage Metrics</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'Avg Time', value: '~3m' },
                      { label: 'Success Rate', value: '99.2%' },
                      { label: 'Last Run', value: '2h ago' },
                    ].map((metric, i) => (
                      <div key={i} className="text-center">
                        <div className="font-heading text-lg font-semibold text-azure">
                          {metric.value}
                        </div>
                        <div className="font-mono text-[10px] text-white/40">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
