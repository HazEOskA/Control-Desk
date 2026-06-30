const configs: Record<string, string> = {
  active: 'bg-green-500/20 text-green-300 border-green-500/30',
  approved: 'bg-green-500/20 text-green-300 border-green-500/30',
  valid: 'bg-green-500/20 text-green-300 border-green-500/30',
  processed: 'bg-green-500/20 text-green-300 border-green-500/30',
  placed: 'bg-green-500/20 text-green-300 border-green-500/30',
  pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  screening: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  interview: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  in_progress: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  review: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  offer: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  expiring: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  flagged: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  on_leave: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  urgent: 'bg-red-500/20 text-red-300 border-red-500/30',
  expired: 'bg-red-500/20 text-red-300 border-red-500/30',
  rejected: 'bg-red-500/20 text-red-300 border-red-500/30',
  overdue: 'bg-red-500/20 text-red-300 border-red-500/30',
  sick: 'bg-red-500/20 text-red-300 border-red-500/30',
  missing: 'bg-red-500/20 text-red-300 border-red-500/30',
  off_assignment: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  new: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  on_hold: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  inactive: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  annual: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  sick_leave: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  maternity: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  emergency: 'bg-red-500/20 text-red-300 border-red-500/30',
  unpaid: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
};

export default function StatusBadge({ status, label }: { status: string; label?: string }) {
  const cls = configs[status] ?? 'bg-slate-500/20 text-slate-300 border-slate-500/30';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
      {label ?? status.replace(/_/g, ' ')}
    </span>
  );
}
