'use client';

import CandidatePipeline from '@/components/CandidatePipeline';
import { useLang } from '@/lib/language-context';
import { candidates } from '@/lib/mock-data';

export default function CandidatesPage() {
  const { t } = useLang();
  const needsAction = candidates.filter(c => c.missingDocs.length > 0 || c.status === 'new').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{t('candidates_title')}</h1>
          <p className="text-slate-400 text-sm mt-1">{candidates.length} total · {needsAction} need action</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors">
          + Add Candidate
        </button>
      </div>
      <CandidatePipeline />
    </div>
  );
}
