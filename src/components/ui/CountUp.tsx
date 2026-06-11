'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  useComma?: boolean;
  className?: string;
}

export function CountUp({
  target,
  suffix = '',
  prefix = '',
  duration = 1400,
  useComma = false,
  className,
}: Props) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();

          function tick(now: number) {
            const p = Math.min((now - t0) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(target * ease));
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
  }, [target, duration]);

  const display = useComma ? value.toLocaleString() : String(value);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
