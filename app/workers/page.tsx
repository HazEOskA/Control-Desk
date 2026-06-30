'use client';

import WorkerTable from '@/components/WorkerTable';
import { useLang } from '@/lib/language-context';
import { workers } from '@/lib/mock-data';

export default function WorkersPage() {
  const { t } = useLang();
  const withAlerts = workers.filter(w => w.alerts.length > 0).length;
  const missingHours = workers.filter(w => w.hoursThisWeek === 0 && w.status === 'active').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{t('workers_title')}</h1>
          <p className="text-slate-400 text-sm mt-1">{workers.length} total · {withAlerts} with alerts · {missingHours} missing hours</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors">
          + Add Worker
        </button>
      </div>
      <WorkerTable />
    </div>
  );
}
