'use client';

import { useState, ReactNode } from 'react';
import TopBar from './TopBar';
import Sidebar from './Sidebar';

export default function DashboardShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <TopBar onMenuToggle={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="lg:ml-56 min-h-[calc(100vh-3.5rem)] p-4 lg:p-6">
        {children}
      </main>
    </div>
  );
}
