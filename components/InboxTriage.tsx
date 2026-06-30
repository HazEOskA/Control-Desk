'use client';

import { useState } from 'react';
import { inboxMessages, InboxMessage } from '@/lib/mock-data';
import { useLang } from '@/lib/language-context';

const CATEGORIES = ['all', 'urgent', 'documents', 'payroll', 'leave', 'client', 'candidate', 'archive'] as const;

const categoryColor: Record<string, string> = {
  urgent: 'bg-red-500/20 text-red-300 border-red-500/30',
  documents: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  payroll: 'bg-green-500/20 text-green-300 border-green-500/30',
  leave: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  client: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  candidate: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  archive: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
};

export default function InboxTriage() {
  const { t } = useLang();
  const [category, setCategory] = useState<string>('all');
  const [selected, setSelected] = useState<InboxMessage | null>(null);

  const filtered = category === 'all' ? inboxMessages : inboxMessages.filter(m => m.category === category);

  const catLabel = (c: string) => {
    if (c === 'all') return t('inbox_all');
    const key = `inbox_${c}` as Parameters<typeof t>[0];
    return t(key);
  };

  return (
    <div className="flex gap-4 h-[calc(100vh-10rem)]">
      <div className="w-full lg:w-80 xl:w-96 flex flex-col">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${category === c ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
            >
              {catLabel(c)}
              <span className="ml-1 opacity-70">
                {c === 'all' ? inboxMessages.length : inboxMessages.filter(m => m.category === c).length}
              </span>
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto space-y-1 pr-1">
          {filtered.map(msg => (
            <button
              key={msg.id}
              onClick={() => setSelected(msg)}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${selected?.id === msg.id ? 'bg-blue-600/20 border-blue-500/50' : 'bg-slate-800 border-slate-700 hover:bg-slate-750'} ${!msg.read ? 'border-l-2 border-l-blue-500' : ''}`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="text-xs font-medium text-white truncate">{msg.from}</span>
                <span className="text-xs text-slate-500 flex-shrink-0">{msg.time}</span>
              </div>
              <p className={`text-xs mb-1 ${msg.read ? 'text-slate-400' : 'text-slate-200 font-medium'} truncate`}>{msg.subject}</p>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-1.5 py-0.5 rounded-full border ${categoryColor[msg.category]}`}>
                  {catLabel(msg.category)}
                </span>
                {msg.priority === 'high' && !msg.read && (
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-slate-800 border border-slate-700 rounded-xl overflow-hidden flex-col">
        {selected ? (
          <>
            <div className="p-4 border-b border-slate-700">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-white font-semibold">{selected.subject}</h3>
                  <p className="text-sm text-slate-400 mt-1">From: <span className="text-slate-200">{selected.from}</span></p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full border ${categoryColor[selected.category]}`}>
                  {catLabel(selected.category)}
                </span>
              </div>
              <p className="text-xs text-slate-500">{selected.time}</p>
            </div>
            <div className="p-6 flex-1">
              <p className="text-slate-300 leading-relaxed">{selected.preview}</p>
              <p className="text-slate-500 text-sm mt-4 italic">[Full message would appear here in production]</p>
            </div>
            <div className="p-4 border-t border-slate-700 flex gap-2">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors">Reply</button>
              <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-medium rounded-lg transition-colors">Archive</button>
              <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-medium rounded-lg transition-colors">Forward</button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-500">
            <div className="text-center">
              <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p>Select a message to read</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
