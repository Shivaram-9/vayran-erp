'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  PackageIcon, 
  BoxIcon, 
  MapPinIcon, 
  BarChartIcon, 
  ClockIcon, 
  ShieldIcon 
} from "@/components/Icons";

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuGroups = [
    {
      title: "Inventory Control",
      items: [
        { label: "Dashboard", path: "/inventory/overview", icon: BarChartIcon },
        { label: "Current Stock", path: "/inventory/stock", icon: BoxIcon },
        { label: "Stock Movement", path: "/inventory/movement", icon: ClockIcon },
      ]
    },
    {
      title: "Catalog",
      items: [
        { label: "Product Master", path: "/inventory/products", icon: PackageIcon },
        { label: "Categories", path: "/inventory/categories", icon: PackageIcon },
      ]
    },
    {
      title: "Warehousing",
      items: [
        { label: "Warehouses", path: "/inventory/warehouses", icon: MapPinIcon },
        { label: "Bin Locations", path: "/inventory/locations", icon: MapPinIcon },
      ]
    },
    {
      title: "Enterprise Assets",
      items: [
        { label: "Asset Registry", path: "/inventory/assets", icon: ShieldIcon },
        { label: "Assignments", path: "/inventory/assets/assignments", icon: ShieldIcon },
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', height: '100%', gap: '24px' }}>
      
      {/* Secondary Inventory Sidebar */}
      <div style={{ width: '240px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto', paddingRight: '8px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>Inventory</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Enterprise Supply Chain</p>
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
