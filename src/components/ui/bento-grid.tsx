import React from 'react';
import { cn } from '../../lib/utils';

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto',
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  subtitle,
  description,
  header,
  icon,
  badge,
  footer,
}: {
  className?: string;
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  badge?: string | React.ReactNode;
  footer?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'group/bento relative rounded-3xl p-6 sm:p-8 bg-[#090e1b]/90 border border-slate-800/90 hover:border-nova-500/60 shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden backdrop-blur-xl hover:shadow-2xl hover:shadow-blue-950/40 hover:-translate-y-1',
        className
      )}
    >
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-nova-500/10 rounded-full blur-3xl pointer-events-none group-hover/bento:bg-cyan-400/20 transition-all duration-500" />

      <div>
        {header && <div className="mb-6">{header}</div>}

        <div className="flex items-center justify-between gap-3 mb-4">
          {icon && (
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400 group-hover/bento:scale-110 group-hover/bento:border-cyan-400 transition-all duration-300">
              {icon}
            </div>
          )}

          {badge && (
            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-nova-900/80 text-cyan-300 border border-nova-500/40">
              {badge}
            </span>
          )}
        </div>

        {subtitle && (
          <div className="text-xs font-mono text-nova-400 mb-1 tracking-wider uppercase">
            {subtitle}
          </div>
        )}

        {title && (
          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover/bento:text-cyan-300 transition-colors duration-200 mb-3">
            {title}
          </h3>
        )}

        {description && (
          <div className="text-sm text-slate-300 leading-relaxed">
            {description}
          </div>
        )}
      </div>

      {footer && <div className="mt-6 pt-4 border-t border-slate-800/80">{footer}</div>}
    </div>
  );
};
