'use client';

import { useLang } from '@/lib/language-context';

const actions = [
  { id: 1, priority: 'critical', task: 'Respond to LogiTrans: confirm 3 drivers for tomorrow 06:00', due: 'By 18:00 today', category: 'Staffing' },
  { id: 2, priority: 'critical', task: 'Renew Altan Çetin contract — expires July 15', due: 'Within 3 days', category: 'Contracts' },
  { id: 3, priority: 'critical', task: 'Find replacement welder for MetalWorks (Oğuzhan sick)', due: 'Today', category: 'Placement' },
  { id: 4, priority: 'high', task: 'Chase Vasile Rusu for W26 timesheet — payroll blocked', due: 'Today', category: 'Payroll' },
  { id: 5, priority: 'high', task: 'Approve/review Emre Yılmaz 5h overtime W27', due: 'Today', category: 'Payroll' },
  { id: 6, priority: 'high', task: 'Send offer letter to Elif Şahin for signature', due: 'By Jul 5', category: 'Contracts' },
  { id: 7, priority: 'medium', task: 'Review Justyna Kaczmarek maternity leave — plan replacement', due: 'This week', category: 'Leave' },
  { id: 8, priority: 'medium', task: 'Place Kerem Öztürk — off assignment 2 weeks', due: 'This week', category: 'Placement' },
];

const priorityConfig = {
  critical: 'bg-red-500/10 border-red-500/40 text-red-300',
  high: 'bg-orange-500/10 border-orange-500/40 text-orange-300',
  medium: 'bg-yellow-500/10 border-yellow-500/40 text-yellow-300',
  low: 'bg-blue-500/10 border-blue-500/40 text-blue-300',
};

const priorityDot = {
  critical: 'bg-red-500',
  high: 'bg-orange-500',
  medium: 'bg-yellow-500',
  low: 'bg-blue-500',
};

export default function ActionQueue() {
  const { t } = useLang();

  return (
    <div className="space-y-2">
      {actions.map((action) => (
        <div key={action.id} className={`flex items-start gap-3 p-3 rounded-lg border ${priorityConfig[action.priority as keyof typeof priorityConfig]}`}>
          <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${priorityDot[action.priority as keyof typeof priorityDot]}`} />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-200">{action.task}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-slate-500">{action.due}</span>
              <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">{action.category}</span>
            </div>
          </div>
          <button className="text-xs px-2.5 py-1 rounded-full bg-slate-700 hover:bg-slate-600 text-slate-300 flex-shrink-0 transition-colors">
            {t('action_resolve')}
          </button>
        </div>
      ))}
    </div>
  );
}
