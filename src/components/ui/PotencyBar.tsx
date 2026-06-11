'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  label: string;
  component: string;
  multiplier: number;
  unit: string;
  pct: number; // visual width percentage
}

export function PotencyBar({ label, component, multiplier, unit, pct }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const dur = 1500;

          function tick(now: number) {
            const p = Math.min((now - t0) / dur, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setWidth(pct * ease);
            setCount(Math.round(multiplier * ease));
            if (p < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [pct, multiplier]);

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-[220px_1fr_auto] gap-3 md:gap-6 items-center">
      <div>
        <p className="text-lg font-heading font-bold text-white">{label}</p>
        <p className="text-xs text-fern">{component}</p>
      </div>
      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-moss to-fern shadow-[0_0_16px_rgba(149,213,178,.4)]"
          style={{ width: `${width}%`, height: '14px', top: '-3px' }}
        />
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl md:text-4xl font-heading font-bold text-fern">
          {count.toLocaleString()}
        </span>
        <span className="text-xs text-white/50">{unit}</span>
      </div>
    </div>
  );
}
