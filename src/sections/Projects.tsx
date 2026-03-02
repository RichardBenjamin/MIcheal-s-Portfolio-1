import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ExternalLink, 
  Github, 
  Shield, 
  Server, 
  Database, 
  Lock,
  ChevronDown,
  ChevronUp,
  Cloud,
  Container,
  Activity
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  tools: string[];
  security: string[];
  architecture: {
    components: string[];
    connections: string[];
  };
  github?: string;
  demo?: string;
  color: string;
}

const projects: Project[] = [
  {
    id: 'aws-secure-vpc',
    title: 'AWS Secure VPC Architecture',
    description: 'Enterprise-grade VPC with multi-tier security, private subnets, and automated compliance monitoring.',
    problem: 'Client needed a secure, scalable network infrastructure with strict compliance requirements and zero-trust architecture.',
    solution: 'Designed and implemented a multi-AZ VPC with public/private subnet separation, NAT gateways, and VPC endpoints for secure AWS service access.',
    impact: 'Achieved 99.99% uptime, reduced security incidents by 85%, and passed SOC 2 compliance audit on first attempt.',
    tools: ['Terraform', 'AWS VPC', 'CloudFormation', 'Security Groups', 'NACLs'],
    security: ['VPC Flow Logs', 'AWS GuardDuty', 'AWS Config', 'IAM Policies'],
    architecture: {
      components: ['Internet Gateway', 'Public Subnet', 'Private Subnet', 'NAT Gateway', 'Bastion Host'],
      connections: ['IGW → ALB → Public', 'Public → Private (filtered)', 'Private → NAT → Internet'],
    },
    color: '#FF9900',
  },
  {
    id: 'k8s-hardened',
    title: 'Hardened Kubernetes Cluster',
    description: 'Production-ready K8s cluster with Pod Security Standards, network policies, and automated vulnerability scanning.',
    problem: 'Containerized workloads lacked proper security controls, leading to potential privilege escalation and lateral movement risks.',
    solution: 'Implemented Pod Security Admission, Network Policies, Falco runtime security, and integrated Trivy for image scanning.',
    impact: 'Eliminated critical vulnerabilities, reduced container attack surface by 70%, and achieved CIS Kubernetes Benchmark compliance.',
    tools: ['Kubernetes', 'Helm', 'Falco', 'Trivy', 'Calico'],
    security: ['Pod Security', 'Network Policies', 'RBAC', 'Secrets Encryption'],
    architecture: {
      components: ['Control Plane', 'Worker Nodes', 'Pod Security', 'Network Policy', 'Falco DaemonSet'],
      connections: ['API Server → etcd', 'Scheduler → Nodes', 'Falco → Alert Manager'],
    },
    color: '#326CE5',
  },
  {
    id: 'cicd-secure',
    title: 'Secure CI/CD Pipeline',
    description: 'End-to-end automated pipeline with SAST, DAST, dependency scanning, and signed artifact promotion.',
    problem: 'Manual deployment processes were error-prone and lacked security gates, leading to vulnerabilities in production.',
    solution: 'Built a Jenkins-based pipeline with SonarQube, Snyk, and Aqua Security integration for comprehensive security scanning.',
    impact: 'Reduced deployment time by 75%, caught 95% of vulnerabilities pre-production, and achieved 100% deployment traceability.',
    tools: ['Jenkins', 'SonarQube', 'Snyk', 'Aqua', 'ArgoCD'],
    security: ['SAST', 'DAST', 'SCA', 'Container Scanning', 'Signed Artifacts'],
    architecture: {
      components: ['Git Repo', 'Jenkins', 'Security Scan', 'Artifact Registry', 'ArgoCD'],
      connections: ['Git → Build → Test', 'Test → Security Scan', 'Scan → Deploy'],
    },
    color: '#D24939',
  },
  {
    id: 'azure-landing-zone',
    title: 'Azure Landing Zone',
    description: 'Multi-subscription Azure environment with centralized logging, policy enforcement, and cost governance.',
    problem: 'Organization needed a standardized, secure foundation for Azure workloads with proper governance and cost controls.',
    solution: 'Deployed Azure Landing Zone with Management Groups, Azure Policy, Sentinel SIEM, and Cost Management integration.',
    impact: 'Standardized 15+ subscriptions, reduced cloud spend by 40%, and established centralized security monitoring.',
    tools: ['Azure Policy', 'Terraform', 'Sentinel', 'Cost Management', 'Azure AD'],
    security: ['Azure Security Center', 'Sentinel', 'Key Vault', 'Private Link'],
    architecture: {
      components: ['Management Group', 'Subscriptions', 'Resource Groups', 'Azure Policy', 'Sentinel'],
      connections: ['MG → Sub → RG', 'Policy → All Resources', 'Logs → Sentinel'],
    },
    color: '#0078D4',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.projects-header',
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

      // Project cards animation
      gsap.fromTo(
        '.project-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleProject = (id: string) => {
    setExpandedProject(expandedProject === id ? null : id);
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 20%, rgba(0, 120, 212, 0.15) 0%, transparent 40%),
              radial-gradient(circle at 70% 80%, rgba(0, 188, 242, 0.1) 0%, transparent 40%)
            `,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="projects-header text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 glass rounded-full">
            <Container className="w-3 h-3 text-azure" />
            <span className="font-mono text-[10px] text-white/60 uppercase tracking-wider">Deployments</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Cloud <span className="gradient-text">Projects</span>
          </h2>
          <p className="max-w-2xl mx-auto text-white/60">
            Real-world infrastructure deployments showcasing security-first architecture, 
            automation, and enterprise-grade cloud solutions.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid space-y-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card glass rounded-2xl overflow-hidden card-hover"
            >
              {/* Card Header */}
              <div
                className="p-6 cursor-pointer"
                onClick={() => toggleProject(project.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${project.color}20` }}
                    >
                      <Cloud className="w-7 h-7" style={{ color: project.color }} />
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="font-heading text-xl font-semibold text-white mb-1 group-hover:text-azure transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-white/50 text-sm max-w-xl">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.tools.slice(0, 4).map((tool, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-[10px] font-mono bg-white/5 text-white/50 rounded border border-white/10"
                          >
                            {tool}
                          </span>
                        ))}
                        {project.tools.length > 4 && (
                          <span className="px-2 py-1 text-[10px] font-mono text-white/40">
                            +{project.tools.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expand Button */}
                  <button
                    className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    {expandedProject === project.id ? (
                      <ChevronUp className="w-5 h-5 text-white/60" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/60" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedProject === project.id && (
                <div className="border-t border-white/10 animate-fade-in">
                  <div className="p-6 grid lg:grid-cols-2 gap-8">
                    {/* Left Column - Details */}
                    <div className="space-y-6">
                      {/* Problem */}
                      <div>
                        <h4 className="font-mono text-sm text-white/70 mb-2 flex items-center gap-2">
                          <span className="text-red-400">!</span> Challenge
                        </h4>
                        <p className="text-white/50 text-sm">{project.problem}</p>
                      </div>

                      {/* Solution */}
                      <div>
                        <h4 className="font-mono text-sm text-white/70 mb-2 flex items-center gap-2">
                          <span className="text-azure">➜</span> Solution
                        </h4>
                        <p className="text-white/50 text-sm">{project.solution}</p>
                      </div>

                      {/* Impact */}
                      <div className="glass rounded-xl p-4">
                        <h4 className="font-mono text-sm text-terminal-green mb-2 flex items-center gap-2">
                          <Activity className="w-4 h-4" /> Impact
                        </h4>
                        <p className="text-white/70 text-sm">{project.impact}</p>
                      </div>
                    </div>

                    {/* Right Column - Architecture & Security */}
                    <div className="space-y-6">
                      {/* Architecture Diagram */}
                      <div>
                        <h4 className="font-mono text-sm text-white/70 mb-3 flex items-center gap-2">
                          <Server className="w-4 h-4" /> Architecture
                        </h4>
                        <div className="glass rounded-xl p-4">
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.architecture.components.map((comp, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg"
                              >
                                <Database className="w-3 h-3 text-azure" />
                                <span className="font-mono text-xs text-white/70">{comp}</span>
                              </div>
                            ))}
                          </div>
                          <div className="space-y-1">
                            {project.architecture.connections.map((conn, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 text-xs font-mono text-white/40"
                              >
                                <span className="w-4 h-px bg-azure/50" />
                                {conn}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Security Measures */}
                      <div>
                        <h4 className="font-mono text-sm text-white/70 mb-3 flex items-center gap-2">
                          <Lock className="w-4 h-4" /> Security Measures
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {project.security.map((sec, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 p-2 glass rounded-lg"
                            >
                              <Shield className="w-3 h-3 text-terminal-green" />
                              <span className="font-mono text-[10px] text-white/60">{sec}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 btn-cyber rounded-lg flex items-center justify-center gap-2 py-2"
                          >
                            <Github className="w-4 h-4" />
                            <span className="font-mono text-xs">View Code</span>
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 btn-primary-cyber rounded-lg flex items-center justify-center gap-2 py-2"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span className="font-mono text-xs">Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
