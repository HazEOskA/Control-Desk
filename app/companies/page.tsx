'use client';

import CompanyOverview from '@/components/CompanyOverview';
import { useLang } from '@/lib/language-context';
import { companies } from '@/lib/mock-data';

export default function CompaniesPage() {
  const { t } = useLang();
  const totalIssues = companies.reduce((s, c) => s + c.issues, 0);
  const totalRequests = companies.reduce((s, c) => s + c.openRequests, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{t('companies_title')}</h1>
          <p className="text-slate-400 text-sm mt-1">{companies.length} clients · {totalRequests} open requests · {totalIssues} active issues</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors">
          + Add Company
        </button>
      </div>
      <CompanyOverview />
    </div>
  );
}
