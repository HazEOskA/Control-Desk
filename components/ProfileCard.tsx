'use client';

import StatusBadge from './StatusBadge';
import { Worker } from '@/lib/mock-data';

export default function ProfileCard({ worker, onClose }: { worker: Worker; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-end p-4" onClick={onClose}>
      <div
        className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
              {worker.name.split(' ').map(n => n[0]).join('').slice(0,2)}
            </div>
            <div>
              <h3 className="text-white font-semibold">{worker.name}</h3>
              <p className="text-slate-400 text-sm">{worker.role}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><span className="text-slate-400">Company</span><p className="text-white font-medium">{worker.company}</p></div>
            <div><span className="text-slate-400">Status</span><div className="mt-1"><StatusBadge status={worker.status} /></div></div>
            <div><span className="text-slate-400">Language</span><p className="text-white">{worker.language}</p></div>
            <div><span className="text-slate-400">Contract End</span><p className="text-white">{worker.contractEnd}</p></div>
            <div><span className="text-slate-400">Email</span><p className="text-blue-400 break-all">{worker.email}</p></div>
            <div><span className="text-slate-400">Phone</span><p className="text-white">{worker.phone}</p></div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-2xl font-bold text-white">{worker.hoursThisWeek}</p>
              <p className="text-xs text-slate-400">Hours W{worker.weekNumber}</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-400">€{worker.estimatedPay.toFixed(0)}</p>
              <p className="text-xs text-slate-400">Est. Pay</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-400">{worker.leaveBalance}</p>
              <p className="text-xs text-slate-400">Leave Days</p>
            </div>
          </div>
          {worker.alerts.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-slate-300">Alerts</h4>
              {worker.alerts.map((a, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-orange-300 bg-orange-500/10 border border-orange-500/30 rounded-lg px-3 py-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {a}
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors">Contact</button>
            <button className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-medium rounded-lg transition-colors">Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
