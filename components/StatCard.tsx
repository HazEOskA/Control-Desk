'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  color: 'red' | 'orange' | 'yellow' | 'blue' | 'green' | 'purple' | 'slate';
  href?: string;
  subtitle?: string;
  pulse?: boolean;
}

const colorMap = {
  red: { bg: 'bg-red-500/10', icon: 'bg-red-500/20 text-red-400', border: 'border-red-500/30', value: 'text-red-400' },
  orange: { bg: 'bg-orange-500/10', icon: 'bg-orange-500/20 text-orange-400', border: 'border-orange-500/30', value: 'text-orange-400' },
  yellow: { bg: 'bg-yellow-500/10', icon: 'bg-yellow-500/20 text-yellow-400', border: 'border-yellow-500/30', value: 'text-yellow-400' },
  blue: { bg: 'bg-blue-500/10', icon: 'bg-blue-500/20 text-blue-400', border: 'border-blue-500/30', value: 'text-blue-400' },
  green: { bg: 'bg-green-500/10', icon: 'bg-green-500/20 text-green-400', border: 'border-green-500/30', value: 'text-green-400' },
  purple: { bg: 'bg-purple-500/10', icon: 'bg-purple-500/20 text-purple-400', border: 'border-purple-500/30', value: 'text-purple-400' },
  slate: { bg: 'bg-slate-700/50', icon: 'bg-slate-600 text-slate-300', border: 'border-slate-600/50', value: 'text-slate-200' },
};

export default function StatCard({ title, value, icon, color, href, subtitle, pulse }: StatCardProps) {
  const colors = colorMap[color];
  const content = (
    <div className={`${colors.bg} border ${colors.border} rounded-xl p-4 transition-all hover:scale-[1.01] hover:shadow-lg cursor-pointer`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg ${colors.icon}`}>
          {icon}
        </div>
        {pulse && (
          <span className="flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        )}
      </div>
      <div className={`text-2xl font-bold ${colors.value} mb-1`}>{value}</div>
      <div className="text-sm font-medium text-slate-300">{title}</div>
      {subtitle && <div className="text-xs text-slate-500 mt-1">{subtitle}</div>}
    </div>
  );

  if (href) return <Link href={href}>{content}</Link>;
  return content;
}
