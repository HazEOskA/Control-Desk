'use client';

import PayrollPreview from '@/components/PayrollPreview';
import { useLang } from '@/lib/language-context';
import { payrollRows } from '@/lib/mock-data';

export default function PayrollPage() {
  const { t } = useLang();
  const flagged = payrollRows.filter(r => r.status === 'flagged').length;
  const totalGross = payrollRows.reduce((s, r) => s + r.estimatedGross, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{t('payroll_title')}</h1>
          <p className="text-slate-400 text-sm mt-1">{payrollRows.length} entries · {flagged} flagged · Est. total €{totalGross.toFixed(0)}</p>
        </div>
        <span className="text-xs bg-orange-500/20 text-orange-300 border border-orange-500/30 px-3 py-1.5 rounded-full font-medium">
          Estimate Only — Not Legal Payroll
        </span>
      </div>
      <PayrollPreview />
    </div>
  );
}
