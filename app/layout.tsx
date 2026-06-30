import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import DashboardShell from "@/components/DashboardShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Control Desk — Staffing Agency Dashboard",
  description: "Multilingual operational dashboard for staffing agency office workers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-950`}>
        <LanguageProvider>
          <DashboardShell>
            {children}
          </DashboardShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
