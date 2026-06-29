'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  SettingsIcon, 
  UsersIcon, 
  ShieldIcon,
  CheckCircleIcon,
  FileTextIcon,
  DatabaseIcon,
  SparklesIcon
} from "@/components/Icons";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuGroups = [
    {
      title: "System",
      items: [
        { label: "System Health", path: "/admin/overview", icon: DatabaseIcon },
        { label: "Global Settings", path: "/admin/settings", icon: SettingsIcon },
      ]
    },
    {
      title: "Governance",
      items: [
        { label: "User Management", path: "/admin/users", icon: UsersIcon },
        { label: "Security Center", path: "/admin/security", icon: ShieldIcon },
        { label: "Audit Logs", path: "/admin/audit", icon: FileTextIcon },
      ]
    },
    {
      title: "Connectivity",
      items: [
        { label: "Integrations", path: "/admin/integrations", icon: SparklesIcon },
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', height: '100%', gap: '24px' }}>
      
      {/* Secondary Admin Sidebar */}
      <div style={{ width: '240px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto', paddingRight: '8px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>Administration</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Central Governance</p>
        </div>
        
        {menuGroups.map((group, idx) => (
          <div key={idx}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '8px', paddingLeft: '12px' }}>
              {group.title}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {group.items.map((item, i) => {
                const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
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
      <div style={{ flex: 1, background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', overflowY: 'auto' }}>
        {children}
      </div>
      
    </div>
  );
}
