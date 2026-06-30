'use client';

import InboxTriage from '@/components/InboxTriage';
import { useLang } from '@/lib/language-context';
import { inboxMessages } from '@/lib/mock-data';

export default function InboxPage() {
  const { t } = useLang();
  const unread = inboxMessages.filter(m => !m.read).length;
  const urgent = inboxMessages.filter(m => m.category === 'urgent').length;

  return (
    <div className="space-y-4 h-[calc(100vh-5rem)]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{t('inbox_title')}</h1>
          <p className="text-slate-400 text-sm mt-1">{inboxMessages.length} total · {unread} unread · {urgent} urgent</p>
        </div>
      </div>
      <InboxTriage />
    </div>
  );
}
