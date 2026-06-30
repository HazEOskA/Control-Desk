'use client';

import Link from 'next/link';
import { alerts } from '@/lib/mock-data';
import { useLang } from '@/lib/language-context';

const typeConfig = {
  urgent: { bg: 'bg-red-500/10 border-red-500/30', dot: 'bg-red-500', text: 'text-red-400', badge: 'bg-red-500/20 text-red-300' },
  warning: { bg: 'bg-orange-500/10 border-orange-500/30', dot: 'bg-orange-500', text: 'text-orange-400', badge: 'bg-orange-500/20 text-orange-300' },
  info: { bg: 'bg-blue-500/10 border-blue-500/30', dot: 'bg-blue-500', text: 'text-blue-400', badge: 'bg-blue-500/20 text-blue-300' },
};

export default function AlertList({ limit = 5 }: { limit?: number }) {
  const { t } = useLang();
  const visible = alerts.slice(0, limit);

  return (
    <div className="space-y-2">
      {visible.map((alert) => {
        const cfg = typeConfig[alert.type as keyof typeof typeConfig];
        return (
          <div key={alert.id} className={`flex items-start gap-3 p-3 rounded-lg border ${cfg.bg}`}>
            <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${cfg.dot}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-200">{alert.message}</p>
            </div>
            <Link
              href={alert.link}
              className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${cfg.badge} hover:opacity-80 transition-opacity`}
            >
              {t(`action_${alert.action.toLowerCase()}` as Parameters<typeof t>[0]) || alert.action}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
