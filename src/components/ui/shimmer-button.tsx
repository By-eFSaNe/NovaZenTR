import React from 'react';
import { cn } from '../../lib/utils';

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  borderRadius?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = '#00d2ff',
      borderRadius = '16px',
      background = 'linear-gradient(135deg, #0052cc 0%, #0066ff 50%, #00d2ff 100%)',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        style={{
          borderRadius,
          background,
        }}
        className={cn(
          'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-7 py-3.5 text-white font-semibold text-sm shadow-xl shadow-blue-600/30 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]',
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Shimmer sweep effect */}
        <div
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
          style={{
            background: `linear-gradient(90deg, transparent, ${shimmerColor}40, transparent)`,
          }}
        />
        <div className="relative z-10 flex items-center gap-2">{children}</div>
      </button>
    );
  }
);
ShimmerButton.displayName = 'ShimmerButton';
