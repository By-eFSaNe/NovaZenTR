import React from 'react';
import { cn } from '../../lib/utils';

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  anchor?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
  className,
  colorFrom = '#00d2ff',
  colorTo = '#0066ff',
}) => {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent overflow-hidden',
        className
      )}
    >
      <div
        className="absolute -inset-[100%] animate-glow-spin opacity-70"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, ${colorFrom} 60deg, ${colorTo} 120deg, transparent 180deg)`,
        }}
      />
      <div className="absolute inset-[1px] rounded-[inherit] bg-inherit" />
    </div>
  );
};
