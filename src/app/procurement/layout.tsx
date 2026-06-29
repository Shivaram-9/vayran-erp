'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ShoppingCartIcon, 
  HandshakeIcon, 
  FileTextIcon, 
  BarChartIcon,
  CheckCircleIcon
} from "@/components/Icons";

export default function ProcurementLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuGroups = [
    {
      title: "Sourcing",
      items: [
        { label: "Dashboard", path: "/procurement/overview", icon: BarChartIcon },
        { label: "Purchase Requests", path: "/procurement/requests", icon: FileTextIcon },
        { label: "Purchase Orders", path: "/procurement/orders", icon: ShoppingCartIcon },
      ]
    },
    {
      title: "Vendor Management",
      items: [
        { label: "Vendors & Suppliers", path: "/procurement/vendors", icon: HandshakeIcon },
        { label: "Contracts", path: "/procurement/contracts", icon: FileTextIcon },
      ]
    },
    {
      title: "Receiving",
      items: [
        { label: "Goods Receipt", path: "/procurement/receipts", icon: CheckCircleIcon },
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', height: '100%', gap: '24px' }}>
      
      {/* Secondary Procurement Sidebar */}
      <div style={{ width: '240px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto', paddingRight: '8px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>Procurement</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Enterprise Sourcing</p>
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
