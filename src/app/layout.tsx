import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { ToastProvider } from "@/components/Toast";
import CommandPalette from "@/components/CommandPalette";

export const metadata: Metadata = {
  title: "VAYRAN | Enterprise Operating System",
  description: "Next-generation enterprise operating system for Fortune 500 companies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <ToastProvider>
          <CommandPalette />
          <Sidebar />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Topbar />
            <main style={{ padding: '32px', flex: 1, overflowY: 'auto' }}>
              {children}
            </main>
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
