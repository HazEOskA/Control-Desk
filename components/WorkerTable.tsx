'use client';

import { useState } from 'react';
import { workers, Worker } from '@/lib/mock-data';
import StatusBadge from './StatusBadge';
import ProfileCard from './ProfileCard';
import { useLang } from '@/lib/language-context';

export default function WorkerTable() {
  const { t } = useLang();
  const [selected, setSelected] = useState<Worker | null>(null);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? workers : workers.filter(w => w.status === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {['all', 'active', 'on_leave', 'sick', 'off_assignment'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === f ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
          >
            {f === 'all' ? t('inbox_all') : f.replace(/_/g, ' ')}
            <span className="ml-2 text-xs opacity-70">
              {f === 'all' ? workers.length : workers.filter(w => w.status === f).length}
            </span>
          </button>
        ))}
      </div>
      <div className="overflow-x-auto rounded-xl border border-slate-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-800 border-b border-slate-700">
              <th className="text-left px-4 py-3 text-slate-400 font-medium">{t('worker_name')}</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium hidden md:table-cell">{t('worker_company')}</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium hidden lg:table-cell">{t('worker_role')}</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium">{t('worker_hours')}</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium hidden md:table-cell">{t('worker_pay')}</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium">{t('worker_contract_end')}</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium">{t('worker_alerts')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filtered.map((worker) => (
              <tr
                key={worker.id}
                onClick={() => setSelected(worker)}
                className="hover:bg-slate-800/50 cursor-pointer transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 flex-shrink-0">
                      {worker.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                    </div>
                    <div>
                      <p className="font-medium text-white">{worker.name}</p>
                      <p className="text-xs text-slate-400">{worker.language}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-slate-300">{worker.company}</td>
                <td className="px-4 py-3 hidden lg:table-cell text-slate-400 text-xs">{worker.role}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <span className={worker.hoursThisWeek === 0 ? 'text-red-400 font-medium' : 'text-slate-200'}>
                      {worker.hoursThisWeek}
                    </span>
                    <span className="text-slate-500 text-xs">/{worker.targetHours}</span>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className={worker.estimatedPay > 0 ? 'text-green-400' : 'text-slate-500'}>
                    €{worker.estimatedPay.toFixed(0)}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-400 text-xs">{worker.contractEnd}</td>
                <td className="px-4 py-3">
                  {worker.alerts.length > 0 ? (
                    <span className="inline-flex items-center gap-1 text-xs text-orange-300 bg-orange-500/10 border border-orange-500/30 px-2 py-0.5 rounded-full">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {worker.alerts.length}
                    </span>
                  ) : (
                    <StatusBadge status={worker.status} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selected && <ProfileCard worker={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
