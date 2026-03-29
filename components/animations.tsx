'use client';

import React, { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
}

export function FadeIn({ children, delay = 0, duration = 600 }: FadeInProps) {
  return (
    <div
      style={{
        animation: `fadeIn ${duration}ms ease-out ${delay}ms forwards`,
        opacity: 0,
      }}
      className="animate-fade-in"
    >
      {children}
    </div>
  );
}

interface SlideUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
}

export function SlideUp({ children, delay = 0, duration = 600 }: SlideUpProps) {
  return (
    <div
      style={{
        animation: `slideInUp ${duration}ms ease-out ${delay}ms forwards`,
        opacity: 0,
        transform: 'translateY(30px)',
      }}
      className="animate-slide-up"
    >
      {children}
    </div>
  );
}

interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
}

export function ScaleIn({ children, delay = 0, duration = 600 }: ScaleInProps) {
  return (
    <div
      style={{
        animation: `scaleIn ${duration}ms ease-out ${delay}ms forwards`,
        opacity: 0,
        transform: 'scale(0.95)',
      }}
      className="animate-scale-in"
    >
      {children}
    </div>
  );
}

// Stagger container for animating lists
interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
}

export function StaggerContainer({ children, staggerDelay = 100 }: StaggerContainerProps) {
  return (
    <div className="space-y-0" style={{ '--stagger-delay': `${staggerDelay}ms` } as React.CSSProperties}>
      {React.Children.map(children, (child, index) => (
        <div style={{ animationDelay: `${index * staggerDelay}ms` }} className="animate-slide-up">
          {child}
        </div>
      ))}
    </div>
  );
}

// Floating animation wrapper
interface FloatingProps {
  children: ReactNode;
  delay?: number;
}

export function Floating({ children, delay = 0 }: FloatingProps) {
  return (
    <div
      style={{
        animation: `float 3s ease-in-out ${delay}s infinite`,
      }}
      className="animate-float"
    >
      {children}
    </div>
  );
}

// Glow animation wrapper
interface GlowProps {
  children: ReactNode;
  delay?: number;
}

export function Glow({ children, delay = 0 }: GlowProps) {
  return (
    <div
      style={{
        animation: `glow 2s ease-in-out ${delay}s infinite`,
      }}
      className="animate-glow"
    >
      {children}
    </div>
  );
}

// Counter animation for statistics
interface CounterProps {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
}

export function Counter({ from, to, duration = 2000, suffix = '' }: CounterProps) {
  const [count, setCount] = React.useState(from);

  React.useEffect(() => {
    let start: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = (timestamp - start) / duration;

      if (progress < 1) {
        setCount(Math.floor(from + (to - from) * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(to);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration]);

  return <span>{count}{suffix}</span>;
}

// Shimmer loading animation
export function ShimmerLoader() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="animate-shimmer bg-slate-800 rounded-lg h-12"></div>
      ))}
    </div>
  );
}

// Pulse animation wrapper
interface PulseProps {
  children: ReactNode;
}

export function Pulse({ children }: PulseProps) {
  return <div className="animate-pulse">{children}</div>;
}
