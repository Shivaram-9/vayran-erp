'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseIcon, LayoutDashboardIcon, ClockIcon } from "@/components/Icons";

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuGroups = [
    {
      title: "Portfolio",
      items: [
        { label: "All Projects", path: "/projects", icon: BriefcaseIcon },
        { label: "Active Sprints", path: "/projects/sprints", icon: LayoutDashboardIcon },
      ]
    },
    {
      title: "Execution",
      items: [
        { label: "Kanban Board", path: "/projects/kanban", icon: LayoutDashboardIcon },
        { label: "Time Tracking", path: "/projects/time", icon: ClockIcon },
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', height: '100%', gap: '24px' }}>
      
      {/* Secondary Projects Sidebar */}
      <div style={{ width: '240px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto', paddingRight: '8px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>Projects</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Enterprise PMO & Execution</p>
        </div>
        
        {menuGroups.map((group, idx) => (
          <div key={idx}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '8px', paddingLeft: '12px' }}>
              {group.title}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {group.items.map((item, i) => {
                const isActive = pathname === item.path;
                return (
                  <Link 
                    key={i} 
                    href={item.path} 
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    style={{ padding: '8px 12px', fontSize: '13px' }}
                  >
                    <div style={{ width: '16px' }}><item.icon /></div>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
      
    </div>
  );
}
