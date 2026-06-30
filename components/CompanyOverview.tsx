'use client';

import { useState } from 'react';
import { companies, Company } from '@/lib/mock-data';
import StatusBadge from './StatusBadge';
import { useLang } from '@/lib/language-context';

export default function CompanyOverview() {
  const { t } = useLang();
  const [selected, setSelected] = useState<Company | null>(null);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        {companies.map((company) => (
          <button
            key={company.id}
            onClick={() => setSelected(company)}
            className="text-left bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-xl p-5 transition-all hover:shadow-lg"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white font-semibold">{company.name}</h3>
                <p className="text-slate-400 text-sm">{company.location} · {company.sector}</p>
              </div>
              <StatusBadge status={company.payrollStatus} label={company.payrollStatus} />
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-slate-900 rounded-lg p-2">
                <p className="text-xl font-bold text-blue-400">{company.activeWorkers}</p>
                <p className="text-xs text-slate-500">{t('company_workers')}</p>
              </div>
              <div className="bg-slate-900 rounded-lg p-2">
                <p className={`text-xl font-bold ${company.openRequests > 0 ? 'text-orange-400' : 'text-slate-400'}`}>
                  {company.openRequests}
                </p>
                <p className="text-xs text-slate-500">{t('company_open_requests')}</p>
              </div>
              <div className="bg-slate-900 rounded-lg p-2">
                <p className={`text-xl font-bold ${company.issues > 0 ? 'text-red-400' : 'text-green-400'}`}>
                  {company.issues}
                </p>
                <p className="text-xs text-slate-500">{t('company_issues')}</p>
              </div>
            </div>
            {company.issueList.length > 0 && (
              <div className="mt-3 space-y-1">
                {company.issueList.slice(0, 2).map((issue, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-orange-300 bg-orange-500/10 px-2 py-1 rounded">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0"></span>
                    <span className="truncate">{issue}</span>
                  </div>
                ))}
              </div>
            )}
          </button>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-5 border-b border-slate-700 flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold text-lg">{selected.name}</h3>
                <p className="text-slate-400 text-sm">{selected.location} · {selected.sector}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-slate-400">Contact</span><p className="text-white">{selected.contactPerson}</p></div>
                <div><span className="text-slate-400">Email</span><p className="text-blue-400 text-xs">{selected.contactEmail}</p></div>
                <div><span className="text-slate-400">Payroll Status</span><div className="mt-1"><StatusBadge status={selected.payrollStatus} /></div></div>
                <div><span className="text-slate-400">Open Requests</span><p className="text-orange-400 font-bold">{selected.openRequests}</p></div>
              </div>
              {selected.issueList.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-slate-300 mb-2">Open Issues</h4>
                  <div className="space-y-2">
                    {selected.issueList.map((issue, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-red-300 bg-red-500/10 border border-red-500/30 px-3 py-2 rounded-lg">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0"></span>
                        {issue}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors">Contact</button>
                <button className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-medium rounded-lg transition-colors">View Workers</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
