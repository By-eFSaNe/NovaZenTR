import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export const AnimatedTabs: React.FC<{
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}> = ({ tabs, activeTab, onChange, className }) => {
  return (
    <div
      className={cn(
        'flex items-center gap-1.5 p-1.5 bg-slate-950/80 border border-slate-800 rounded-2xl backdrop-blur-xl max-w-full overflow-x-auto',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-colors duration-200 z-10 whitespace-nowrap',
              isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {isActive && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-gradient-to-r from-nova-600 to-cyan-600 rounded-xl shadow-lg shadow-blue-600/30 -z-10"
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
