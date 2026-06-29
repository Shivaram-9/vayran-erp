'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BuildingIcon, UsersIcon, BriefcaseIcon, PinIcon, 
  SettingsIcon, FileTextIcon, ClockIcon, BarChartIcon 
} from "@/components/Icons";

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuGroups = [
    {
      title: "Core Configuration",
      items: [
        { label: "Overview", path: "/company/overview", icon: BarChartIcon },
        { label: "Company Profile", path: "/company/profile", icon: BuildingIcon },
      ]
    },
    {
      title: "Organization Structure",
      items: [
        { label: "Branches", path: "/company/branches", icon: PinIcon },
        { label: "Business Units", path: "/company/business-units", icon: BriefcaseIcon },
        { label: "Divisions", path: "/company/divisions", icon: BriefcaseIcon },
        { label: "Departments", path: "/company/departments", icon: BriefcaseIcon },
        { label: "Teams", path: "/company/teams", icon: UsersIcon },
        { label: "Org Chart", path: "/company/organization", icon: UsersIcon },
      ]
    },
    {
      title: "Operational Rules",
      items: [
        { label: "Working Hours", path: "/company/working-hours", icon: ClockIcon },
        { label: "Holiday Calendar", path: "/company/holiday-calendar", icon: ClockIcon },
        { label: "Approval Hierarchy", path: "/company/approval-hierarchy", icon: SettingsIcon },
      ]
    },
    {
      title: "Governance",
      items: [
        { label: "Branding", path: "/company/branding", icon: SettingsIcon },
        { label: "Integrations", path: "/company/integrations", icon: SettingsIcon },
        { label: "Audit Logs", path: "/company/audit-logs", icon: FileTextIcon },
        { label: "Analytics", path: "/company/analytics", icon: BarChartIcon },
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', height: '100%', gap: '24px' }}>
      
      {/* Secondary Company Sidebar */}
      <div style={{ width: '240px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto', paddingRight: '8px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>Company Hub</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Enterprise configuration</p>
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
