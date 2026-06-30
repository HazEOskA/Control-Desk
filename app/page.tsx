'use client';

import Link from 'next/link';
import StatCard from '@/components/StatCard';
import AlertList from '@/components/AlertList';
import ActionQueue from '@/components/ActionQueue';
import { useLang } from '@/lib/language-context';
import { candidates, workers, inboxMessages, documents, payrollRows, leaveRequests, alerts } from '@/lib/mock-data';

export default function Dashboard() {
  const { t } = useLang();

  const urgentCount = alerts.filter(a => a.type === 'urgent').length;
  const unreadMessages = inboxMessages.filter(m => !m.read).length;
  const contractsToSign = documents.filter(d => d.status === 'pending').length;
  const missingHours = workers.filter(w => w.hoursThisWeek === 0 && w.status === 'active').length;
  const payrollIssues = payrollRows.filter(p => p.status === 'flagged' || p.status === 'pending').length;
  const pendingLeave = leaveRequests.filter(l => l.status === 'pending').length;
  const missingDocs = documents.filter(d => d.status === 'missing' || d.status === 'expiring').length;
  const companyIssues = 6;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{t('today_command_center')}</h1>
          <p className="text-slate-400 text-sm mt-1">{t('good_morning')}, Linda · Monday, June 30, 2026 · Week 27</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-slate-300">Live · {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          title={t('urgent_alerts')}
          value={urgentCount}
          color="red"
          pulse
          href="/"
          icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>}
        />
        <StatCard
          title={t('messages_to_review')}
          value={unreadMessages}
          color="blue"
          href="/inbox"
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
        />
        <StatCard
          title={t('contracts_to_sign')}
          value={contractsToSign}
          color="purple"
          href="/documents"
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
        />
        <StatCard
          title={t('missing_hours')}
          value={missingHours}
          color="orange"
          href="/workers"
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard
          title={t('payroll_to_check')}
          value={payrollIssues}
          color="yellow"
          href="/payroll"
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
        />
        <StatCard
          title={t('leave_requests')}
          value={pendingLeave}
          color="blue"
          href="/leave"
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
        />
        <StatCard
          title={t('missing_documents')}
          value={missingDocs}
          color="orange"
          href="/documents"
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
        />
        <StatCard
          title={t('staffing_issues')}
          value={companyIssues}
          color="red"
          href="/companies"
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Alert List */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold">{t('urgent_alerts')}</h2>
            <span className="text-xs text-slate-400">{alerts.length} total</span>
          </div>
          <AlertList limit={5} />
        </div>

        {/* Action Queue */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold">{t('priority_actions')}</h2>
            <span className="text-xs text-slate-400">8 {t('items')}</span>
          </div>
          <ActionQueue />
        </div>
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-blue-400">{candidates.length}</p>
          <p className="text-sm text-slate-400 mt-1">{t('nav_candidates')}</p>
          <p className="text-xs text-slate-500">{candidates.filter(c => c.status === 'new').length} new this week</p>
        </div>
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-green-400">{workers.filter(w => w.status === 'active').length}</p>
          <p className="text-sm text-slate-400 mt-1">{t('nav_workers')}</p>
          <p className="text-xs text-slate-500">{workers.filter(w => w.status !== 'active').length} not active</p>
        </div>
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-purple-400">5</p>
          <p className="text-sm text-slate-400 mt-1">{t('nav_companies')}</p>
          <p className="text-xs text-slate-500">3 with open issues</p>
        </div>
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-yellow-400">
            €{payrollRows.reduce((s, r) => s + r.estimatedGross, 0).toFixed(0)}
          </p>
          <p className="text-sm text-slate-400 mt-1">Est. Payroll W27</p>
          <p className="text-xs text-orange-400">{payrollRows.filter(r => r.status === 'flagged').length} flagged</p>
        </div>
      </div>

      {/* Quick links */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-5">
        <h2 className="text-white font-semibold mb-4">Quick Navigation</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { href: '/candidates', label: t('nav_candidates'), color: 'blue', count: candidates.filter(c => c.missingDocs.length > 0).length + ' with missing docs' },
            { href: '/workers', label: t('nav_workers'), color: 'green', count: workers.filter(w => w.alerts.length > 0).length + ' with alerts' },
            { href: '/inbox', label: t('nav_inbox'), color: 'purple', count: unreadMessages + ' unread' },
            { href: '/companies', label: t('nav_companies'), color: 'orange', count: '6 open issues' },
            { href: '/documents', label: t('nav_documents'), color: 'red', count: missingDocs + ' need action' },
            { href: '/payroll', label: t('nav_payroll'), color: 'yellow', count: payrollIssues + ' to review' },
            { href: '/leave', label: t('nav_leave'), color: 'blue', count: pendingLeave + ' pending' },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg p-3 transition-colors"
            >
              <p className="text-white text-sm font-medium">{item.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{item.count}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
