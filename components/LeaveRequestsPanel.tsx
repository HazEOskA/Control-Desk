'use client';

import { useState } from 'react';
import { leaveRequests, LeaveRequest } from '@/lib/mock-data';
import StatusBadge from './StatusBadge';
import { useLang } from '@/lib/language-context';

export default function LeaveRequestsPanel() {
  const { t } = useLang();
  const [items, setItems] = useState(leaveRequests);

  const handleApprove = (id: string) => {
    setItems(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' as const } : r));
  };
  const handleReject = (id: string) => {
    setItems(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' as const } : r));
  };

  const typeLabel = (type: LeaveRequest['type']) => {
    const map: Record<string, string> = { annual: 'Annual', sick: 'Sick', maternity: 'Maternity', emergency: 'Emergency', unpaid: 'Unpaid' };
    return map[type] ?? type;
  };

  return (
    <div>
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-5 text-sm text-blue-300">
        ℹ️ Leave approvals here are for review only. Official leave records must be confirmed through your HR system.
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-800 border-b border-slate-700">
              <th className="text-left px-4 py-3 text-slate-400 font-medium">{t('leave_worker')}</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium">{t('leave_type')}</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium hidden md:table-cell">{t('leave_from')}</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium hidden md:table-cell">{t('leave_to')}</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium">{t('leave_days')}</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium">{t('leave_status')}</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium hidden lg:table-cell">Notes</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {items.map((req) => (
              <tr key={req.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-medium text-white">{req.worker}</p>
                  <p className="text-xs text-slate-400">{req.company}</p>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={req.type} label={typeLabel(req.type)} />
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-slate-300 text-xs">{req.fromDate}</td>
                <td className="px-4 py-3 hidden md:table-cell text-slate-300 text-xs">{req.toDate}</td>
                <td className="px-4 py-3">
                  <span className={req.days > 20 ? 'text-orange-400 font-semibold' : 'text-slate-200'}>
                    {req.days}
                  </span>
                </td>
                <td className="px-4 py-3"><StatusBadge status={req.status} /></td>
                <td className="px-4 py-3 hidden lg:table-cell text-slate-400 text-xs max-w-xs">
                  {req.notes ?? '—'}
                </td>
                <td className="px-4 py-3">
                  {req.status === 'pending' ? (
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleApprove(req.id)}
                        className="px-2.5 py-1 bg-green-600/80 hover:bg-green-500 text-white text-xs rounded-lg transition-colors"
                      >
                        {t('leave_approve')}
                      </button>
                      <button
                        onClick={() => handleReject(req.id)}
                        className="px-2.5 py-1 bg-red-600/80 hover:bg-red-500 text-white text-xs rounded-lg transition-colors"
                      >
                        {t('leave_reject')}
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-500">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
