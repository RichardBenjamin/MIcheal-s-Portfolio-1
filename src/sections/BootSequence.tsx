import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface BootSequenceProps {
  onComplete: () => void;
}

const bootLines = [
  { text: 'Initializing Secure Cloud Environment...', status: 'OK', delay: 0 },
  { text: 'Loading AWS Infrastructure Modules...', status: 'OK', delay: 0.4 },
  { text: 'Loading Azure Resource Providers...', status: 'OK', delay: 0.7 },
  { text: 'Configuring Terraform State Backend...', status: 'OK', delay: 1.0 },
  { text: 'Initializing Kubernetes Cluster...', status: 'OK', delay: 1.3 },
  { text: 'Threat Detection: Active', status: 'SECURE', delay: 1.6 },
  { text: 'Infrastructure State: Optimized', status: 'OPTIMAL', delay: 1.9 },
  { text: 'DevSecOps Mode: Enabled', status: 'READY', delay: 2.2 },
];

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();

    // Type out each line
    bootLines.forEach((line, index) => {
      tl.add(() => {
        setVisibleLines(index + 1);
      }, line.delay);
    });

    // Wait a moment then exit
    tl.add(() => {
      setIsExiting(true);
    }, 3.5);

    tl.to(terminalRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        onComplete();
      },
    }, 3.5);

    // Pulse wave animation
    tl.fromTo(
      '.pulse-wave',
      { scale: 0, opacity: 1 },
      { scale: 3, opacity: 0, duration: 1.5, ease: 'power2.out' },
      3.2
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  // Blink cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-void"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      {/* Pulse Wave */}
      <div className="pulse-wave absolute w-96 h-96 rounded-full border-2 border-azure/50 pointer-events-none" />
      
      {/* Terminal Window */}
      <div
        ref={terminalRef}
        className={`relative w-full max-w-2xl mx-4 transition-all duration-500 ${
          isExiting ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] rounded-t-lg border border-white/10">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 text-center">
            <span className="font-mono text-xs text-white/50">devsecops-terminal — -zsh</span>
          </div>
          <div className="w-16" />
        </div>
        
        {/* Terminal Body */}
        <div className="bg-[#0d0d0d] rounded-b-lg border border-t-0 border-white/10 p-6 min-h-[320px]">
          {/* Boot Header */}
          <div className="mb-4">
            <pre className="font-mono text-xs" style={{ color: '#0089DB' }}>
{`
  ____              _____            _____           _       _   
 |  _ \\  ___ _ __ | ____|_  ___ __ | ____|_ __ ___ | |__   | |  
 | | | |/ _ \\ '_ \\|  _| \\ \\/ / '_ \\|  _| | '_ \\ _ \\| '_ \\  | |  
 | |_| |  __/ |_) | |___ >  <| |_) | |___| | | | | | |_) | |_|  
 |____/ \\___| .__/|_____/_/\\_\\ .__/|_____|_| |_| |_|_.__/  (_)  
            |_|               |_|                                 
`}
            </pre>
          </div>
          
          {/* Boot Lines */}
          <div className="space-y-2">
            {bootLines.slice(0, visibleLines).map((line, index) => (
              <div
                key={index}
                className="flex items-center justify-between font-mono text-sm animate-slide-up"
              >
                <span className="terminal-text flex items-center gap-2" style={{ color: '#575757' }}>
                  <span style={{ color: '#0089DB' }}>[{String(index + 1).padStart(2, '0')}]</span>
                  {line.text}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded`}
                  style={
                    line.status === 'OK' || line.status === 'OPTIMAL' || line.status === 'READY'
                      ? { backgroundColor: 'rgba(87,87,87,0.2)', color: '#575757' }
                      : line.status === 'SECURE'
                      ? { backgroundColor: 'rgba(0,137,219,0.2)', color: '#0089DB' }
                      : { backgroundColor: 'rgba(234,179,8,0.2)', color: '#eab308' }
                  }
                >
                  [{line.status}]
                </span>
              </div>
            ))}
            
            {/* Cursor Line */}
            {visibleLines < bootLines.length && (
              <div className="flex items-center gap-2 font-mono text-sm">
                <span style={{ color: '#0089DB' }}>[{String(visibleLines + 1).padStart(2, '0')}]</span>
                <span style={{ color: '#575757' }}>_</span>
                <span
                  className={`w-2.5 h-5 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                  style={{ backgroundColor: '#575757' }}
                />
              </div>
            )}
            
            {/* Final Ready State */}
            {visibleLines === bootLines.length && (
              <div className="mt-6 pt-4 border-t border-white/10 animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#575757' }} />
                  <span className="font-mono" style={{ color: '#575757' }}>
                    System Ready. Loading Portfolio Interface...
                  </span>
                </div>
                <div className="mt-2 font-mono text-xs text-white/40">
                  <span className="text-azure">➜</span> ~ initializing_gui --secure-mode
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Bottom Status Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-white/10 px-4 py-2">
        <div className="flex items-center justify-between font-mono text-xs text-white/40">
          <div className="flex items-center gap-4">
            <span>MODE: SECURE</span>
            <span>ENCRYPTION: AES-256</span>
          </div>
          <div className="flex items-center gap-4">
            <span>v2.0.25</span>
            <span style={{ color: '#575757' }}>● CONNECTED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
