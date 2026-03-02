import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Mail, 
  Linkedin, 
  Github, 
  Send, 
  Shield,
  CheckCircle2,
  Terminal,
  Download,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.contact-header',
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

      // Form animation
      gsap.fromTo(
        '.contact-form',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Info cards animation
      gsap.fromTo(
        '.contact-info-card',
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(0, 120, 212, 0.1) 0%, transparent 50%)
            `,
          }}
        />
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 120, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 120, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="contact-header text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 glass rounded-full">
            <Terminal className="w-3 h-3 text-azure" />
            <span className="font-mono text-[10px] text-white/60 uppercase tracking-wider">Handshake</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Establish <span className="gradient-text">Connection</span>
          </h2>
          <p className="max-w-2xl mx-auto text-white/60">
            Ready to architect secure, scalable cloud infrastructure? 
            Let's discuss how I can contribute to your team's success.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="contact-form glass-strong rounded-2xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-azure/20 flex items-center justify-center">
                  <Send className="w-5 h-5 text-azure" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-white">
                    Transmit Message
                  </h3>
                  <p className="font-mono text-xs text-white/50">
                    Encrypted transmission via TLS 1.3
                  </p>
                </div>
              </div>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-terminal-green/20 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-terminal-green" />
                  </div>
                  <h4 className="font-heading text-xl font-semibold text-white mb-2">
                    Message Transmitted
                  </h4>
                  <p className="text-white/50 text-sm">
                    Thank you for reaching out. I'll respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-mono text-xs text-white/50 mb-2">
                        <span className="text-azure">➜</span> Name
                      </label>
                      <Input
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-azure focus:ring-azure/20"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs text-white/50 mb-2">
                        <span className="text-azure">➜</span> Email
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-azure focus:ring-azure/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-white/50 mb-2">
                      <span className="text-azure">➜</span> Subject
                    </label>
                    <Input
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-azure focus:ring-azure/20"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-white/50 mb-2">
                      <span className="text-azure">➜</span> Message
                    </label>
                    <Textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or opportunity..."
                      required
                      rows={5}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-azure focus:ring-azure/20 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary-cyber rounded-lg py-6 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span className="font-mono">Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span className="font-mono">Transmit Message</span>
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            {/* Quick Contact */}
            <div className="contact-info-card glass rounded-xl p-5">
              <h4 className="font-mono text-sm text-white/70 mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-azure" />
                Direct Channels
              </h4>
              
              <div className="space-y-3">
                <a
                  href="mailto:Mspenc7092@gmail.com"
                  className="flex items-center gap-3 p-3 glass rounded-lg hover:border-azure/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-azure/20 flex items-center justify-center group-hover:bg-azure/30 transition-colors">
                    <Mail className="w-5 h-5 text-azure" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-white/50">Email</p>
                    <p className="text-white text-sm">Mspenc7092@gmail.com</p>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/michael-s-934551306"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 glass rounded-lg hover:border-azure/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-azure/20 flex items-center justify-center group-hover:bg-azure/30 transition-colors">
                    <Linkedin className="w-5 h-5 text-azure" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-white/50">LinkedIn</p>
                    <p className="text-white text-sm">Michael S</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/30 ml-auto" />
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 glass rounded-lg hover:border-azure/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-azure/20 flex items-center justify-center group-hover:bg-azure/30 transition-colors">
                    <Github className="w-5 h-5 text-azure" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-white/50">GitHub</p>
                    <p className="text-white text-sm">@mspenc7092</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/30 ml-auto" />
                </a>
              </div>
            </div>

            {/* Resume Download */}
            <div className="contact-info-card glass rounded-xl p-5">
              <h4 className="font-mono text-sm text-white/70 mb-4 flex items-center gap-2">
                <Download className="w-4 h-4 text-azure" />
                Documentation
              </h4>
              
              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-3 p-3 glass rounded-lg hover:border-azure/50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-terminal-green/20 flex items-center justify-center group-hover:bg-terminal-green/30 transition-colors">
                  <Download className="w-5 h-5 text-terminal-green" />
                </div>
                <div>
                  <p className="text-white text-sm">Download Resume</p>
                  <p className="font-mono text-[10px] text-white/50">PDF • 245 KB</p>
                </div>
              </a>
            </div>

            {/* Availability */}
            <div className="contact-info-card glass rounded-xl p-5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-terminal-green" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-terminal-green animate-ping" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Available for Opportunities</p>
                  <p className="font-mono text-[10px] text-white/50">
                    Open to DevSecOps & Cloud Security roles
                  </p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="contact-info-card glass rounded-xl p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <span className="text-lg">📍</span>
                </div>
                <div>
                  <p className="text-white text-sm">Henderson, Nevada</p>
                  <p className="font-mono text-[10px] text-white/50">
                    Remote • Hybrid • On-site
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
