'use client';

import DocumentsPanel from '@/components/DocumentsPanel';
import { useLang } from '@/lib/language-context';
import { documents } from '@/lib/mock-data';

export default function DocumentsPage() {
  const { t } = useLang();
  const expiring = documents.filter(d => d.status === 'expiring').length;
  const missing = documents.filter(d => d.status === 'missing').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{t('documents_title')}</h1>
          <p className="text-slate-400 text-sm mt-1">{documents.length} total · {expiring} expiring · {missing} missing</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors">
          + Upload Document
        </button>
      </div>
      <DocumentsPanel />
    </div>
  );
}
