'use client';

import LeaveRequestsPanel from '@/components/LeaveRequestsPanel';
import { useLang } from '@/lib/language-context';
import { leaveRequests } from '@/lib/mock-data';

export default function LeavePage() {
  const { t } = useLang();
  const pending = leaveRequests.filter(l => l.status === 'pending').length;
  const active = leaveRequests.filter(l => l.status === 'active').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{t('leave_title')}</h1>
          <p className="text-slate-400 text-sm mt-1">{leaveRequests.length} requests · {pending} pending approval · {active} currently active</p>
        </div>
      </div>
      <LeaveRequestsPanel />
    </div>
  );
}
