import { Shield, Heart, Terminal, Github, Linkedin, Mail } from 'lucide-react';

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/michael-s-934551306', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:Mspenc7092@gmail.com', label: 'Email' },
];

export default function Footer() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative py-12 border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, transparent, rgba(0, 120, 212, 0.03))',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-azure/20 rounded-lg rotate-45" />
                <div className="absolute inset-0 border border-azure/50 rounded-lg" />
                <Shield className="w-5 h-5 text-azure relative z-10" />
              </div>
              <div>
                <span className="font-heading font-bold text-lg text-white">Michael S</span>
                <span className="block font-mono text-[10px] text-azure -mt-1">DevSecOps Engineer</span>
              </div>
            </div>
            <p className="text-white/40 text-sm max-w-xs">
              Architecting secure, scalable cloud infrastructure through automation and security-first practices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-xs text-white/50 uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-white/60 hover:text-azure transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-mono text-xs text-white/50 uppercase tracking-wider mb-4">
              Connect
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:border-azure/50 hover:text-azure transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-white/40 text-xs font-mono">
              <Terminal className="w-3 h-3" />
              <span>Built with React + TypeScript + Tailwind</span>
            </div>

            <div className="flex items-center gap-1 text-white/40 text-xs">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
              <span>for cloud security</span>
            </div>

            <div className="text-white/40 text-xs font-mono">
              <span className="text-azure">➜</span> {new Date().getFullYear()} Michael S. All rights reserved.
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-[10px] font-mono text-white/30">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse" />
            <span>System Operational</span>
          </div>
          <span>|</span>
          <span>TLS 1.3 Enabled</span>
          <span>|</span>
          <span>Last Deploy: {new Date().toLocaleDateString()}</span>
          <span>|</span>
          <span>v2.0.25</span>
        </div>
      </div>
    </footer>
  );
}
