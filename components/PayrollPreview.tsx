'use client';

import { payrollRows } from '@/lib/mock-data';
import StatusBadge from './StatusBadge';
import { useLang } from '@/lib/language-context';

export default function PayrollPreview() {
  const { t } = useLang();

  const totalGross = payrollRows.reduce((s, r) => s + r.estimatedGross, 0);

  return (
    <div>
      <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mb-5">
        <p className="text-orange-300 text-sm font-medium">{t('payroll_disclaimer')}</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-700 mb-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-800 border-b border-slate-700">
              <th className="text-left px-4 py-3 text-slate-400 font-medium">{t('payroll_worker')}</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium hidden md:table-cell">{t('payroll_company')}</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium">{t('payroll_week')}</th>
              <th className="text-right px-4 py-3 text-slate-400 font-medium">{t('payroll_regular')}</th>
              <th className="text-right px-4 py-3 text-slate-400 font-medium hidden lg:table-cell">{t('payroll_overtime')}</th>
              <th className="text-right px-4 py-3 text-slate-400 font-medium hidden lg:table-cell">{t('payroll_rate')}</th>
              <th className="text-right px-4 py-3 text-slate-400 font-medium hidden md:table-cell">{t('payroll_allowance')}</th>
              <th className="text-right px-4 py-3 text-slate-400 font-medium">{t('payroll_gross')}</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium">{t('payroll_status')}</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium">{t('payroll_risk')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {payrollRows.map((row) => (
              <tr key={row.id} className={`hover:bg-slate-800/50 transition-colors ${row.status === 'flagged' ? 'bg-orange-500/5' : ''}`}>
                <td className="px-4 py-3 font-medium text-white">{row.worker}</td>
                <td className="px-4 py-3 hidden md:table-cell text-slate-400 text-xs">{row.company}</td>
                <td className="px-4 py-3 text-slate-300">W{row.weekNumber}</td>
                <td className="px-4 py-3 text-right text-slate-300">{row.regularHours}</td>
                <td className="px-4 py-3 text-right hidden lg:table-cell">
                  <span className={row.overtimeHours > 0 ? 'text-orange-400 font-medium' : 'text-slate-500'}>
                    {row.overtimeHours}
                  </span>
                </td>
                <td className="px-4 py-3 text-right hidden lg:table-cell text-slate-400">€{row.hourlyRate.toFixed(2)}</td>
                <td className="px-4 py-3 text-right hidden md:table-cell text-slate-400">€{row.shiftAllowance.toFixed(0)}</td>
                <td className="px-4 py-3 text-right">
                  <span className={row.estimatedGross > 0 ? 'text-green-400 font-semibold' : 'text-red-400'}>
                    €{row.estimatedGross.toFixed(0)}
                  </span>
                </td>
                <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
                <td className="px-4 py-3">
                  {row.riskFlag ? (
                    <span className="text-xs text-orange-300 bg-orange-500/10 border border-orange-500/30 px-2 py-0.5 rounded-full">
                      ⚠ {row.riskFlag}
                    </span>
                  ) : (
                    <span className="text-xs text-green-400">✓ OK</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-slate-600 bg-slate-800">
              <td colSpan={7} className="px-4 py-3 text-slate-300 font-medium text-sm">Total Estimated Gross</td>
              <td className="px-4 py-3 text-right text-green-400 font-bold text-lg">€{totalGross.toFixed(0)}</td>
              <td colSpan={2} className="px-4 py-3 text-xs text-slate-500 italic">Estimate only</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
