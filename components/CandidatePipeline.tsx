'use client';

import { useState } from 'react';
import { candidates, Candidate } from '@/lib/mock-data';
import StatusBadge from './StatusBadge';
import { useLang } from '@/lib/language-context';

export default function CandidatePipeline() {
  const { t } = useLang();
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<Candidate | null>(null);

  const filtered = filter === 'all' ? candidates : candidates.filter(c => c.status === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {['all', 'new', 'screening', 'interview', 'offer', 'placed', 'on_hold', 'rejected'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === f ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
          >
            {f === 'all' ? t('inbox_all') : f.replace(/_/g, ' ')}
            <span className="ml-2 text-xs opacity-70">
              {f === 'all' ? candidates.length : candidates.filter(c => c.status === f).length}
            </span>
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-800 border-b border-slate-700">
              <th className="text-left px-4 py-3 text-slate-400 font-medium">{t('candidate_name')}</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium">{t('candidate_status')}</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium hidden md:table-cell">{t('candidate_role')}</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium hidden lg:table-cell">{t('candidate_availability')}</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium">{t('candidate_missing_docs')}</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium hidden md:table-cell">{t('candidate_recruiter')}</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium hidden lg:table-cell">{t('candidate_last_contact')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filtered.map((candidate) => (
              <tr
                key={candidate.id}
                onClick={() => setSelected(candidate)}
                className="hover:bg-slate-800/50 cursor-pointer transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 flex-shrink-0">
                      {candidate.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                    </div>
                    <div>
                      <p className="font-medium text-white">{candidate.name}</p>
                      <p className="text-xs text-slate-400">{candidate.language}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3"><StatusBadge status={candidate.status} /></td>
                <td className="px-4 py-3 hidden md:table-cell text-slate-300 text-xs">{candidate.desiredRole}</td>
                <td className="px-4 py-3 hidden lg:table-cell text-slate-400 text-xs">{candidate.availability}</td>
                <td className="px-4 py-3">
                  {candidate.missingDocs.length > 0 ? (
                    <span className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 px-2 py-0.5 rounded-full">
                      {candidate.missingDocs.length} missing
                    </span>
                  ) : (
                    <span className="text-xs text-green-400">✓ Complete</span>
                  )}
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-slate-400 text-xs">{candidate.recruiter.split(' ')[0]}</td>
                <td className="px-4 py-3 hidden lg:table-cell text-slate-400 text-xs">{candidate.lastContact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-end p-4" onClick={() => setSelected(null)}>
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-5 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                  {selected.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{selected.name}</h3>
                  <p className="text-slate-400 text-sm">{selected.desiredRole}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-slate-400">Status</span><div className="mt-1"><StatusBadge status={selected.status} /></div></div>
                <div><span className="text-slate-400">Language</span><p className="text-white">{selected.language}</p></div>
                <div><span className="text-slate-400">Availability</span><p className="text-white">{selected.availability}</p></div>
                <div><span className="text-slate-400">Recruiter</span><p className="text-white">{selected.recruiter}</p></div>
                <div><span className="text-slate-400">Email</span><p className="text-blue-400 break-all text-xs">{selected.email}</p></div>
                <div><span className="text-slate-400">Phone</span><p className="text-white text-xs">{selected.phone}</p></div>
              </div>
              {selected.missingDocs.length > 0 && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <p className="text-sm font-medium text-red-300 mb-2">Missing Documents</p>
                  <ul className="space-y-1">
                    {selected.missingDocs.map((doc, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>{doc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors">Contact</button>
                <button className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-medium rounded-lg transition-colors">Advance</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
