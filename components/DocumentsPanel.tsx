'use client';

import { documents } from '@/lib/mock-data';
import StatusBadge from './StatusBadge';
import { useLang } from '@/lib/language-context';

export default function DocumentsPanel() {
  const { t } = useLang();

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-slate-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-800 border-b border-slate-700">
              <th className="text-left px-4 py-3 text-slate-400 font-medium">{t('doc_worker')}</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium">{t('doc_type')}</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium">{t('doc_status')}</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium hidden md:table-cell">{t('doc_expiry')}</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium hidden lg:table-cell">{t('doc_company')}</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-medium text-white">{doc.worker}</p>
                </td>
                <td className="px-4 py-3 text-slate-300">{doc.type}</td>
                <td className="px-4 py-3"><StatusBadge status={doc.status} /></td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className={doc.status === 'expiring' ? 'text-orange-400 font-medium' : 'text-slate-400'}>
                    {doc.expiryDate}
                  </span>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell text-slate-400 text-xs">{doc.company}</td>
                <td className="px-4 py-3 text-slate-400 text-xs max-w-xs">
                  {doc.notes ? (
                    <span className={doc.status === 'expiring' || doc.status === 'missing' ? 'text-orange-300' : ''}>
                      {doc.notes}
                    </span>
                  ) : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
