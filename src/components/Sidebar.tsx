'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { 
  VayranLogoFull, VayranMark, LayoutDashboardIcon, UsersIcon, 
  BriefcaseIcon, BanknoteIcon, HandshakeIcon, BarChartIcon, 
  SettingsIcon, ChevronLeftIcon, ChevronRightIcon, PinIcon, 
  ChevronDownIcon, ClockIcon, CodeIcon, BoxIcon, PackageIcon, 
  ShoppingCartIcon, MegaphoneIcon, FileTextIcon, LifeBuoyIcon, BuildingIcon, CheckCircleIcon 
} from "./Icons";

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(260);
  const [isResizing, setIsResizing] = useState(false);
  
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    operations: true,
    sales: false,
    admin: false
  });

  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      let newWidth = e.clientX;
      if (newWidth < 200) newWidth = 200;
      if (newWidth > 400) newWidth = 400;
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = 'default';
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  if (pathname === '/login') return null;

  const toggleMenu = (key: string) => setOpenMenus(prev => ({ ...prev, [key]: !prev[key] }));

  const currentWidth = isCollapsed ? 72 : sidebarWidth;

  const NavItem = ({ href, icon: Icon, label, isActive }: { href: string, icon: any, label: string, isActive: boolean }) => (
    <Link href={href} className={`nav-item ${isActive ? 'active' : ''}`} style={{ padding: isCollapsed ? '12px' : '8px 12px', justifyContent: isCollapsed ? 'center' : 'flex-start' }}>
      <div style={{ width: '18px' }}><Icon /></div>
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );

  return (
    <aside 
      ref={sidebarRef}
      className={`sidebar`} 
      style={{ 
        width: `${currentWidth}px`, 
        flexShrink: 0, 
        position: 'relative',
        transition: isResizing ? 'none' : 'width 0.3s ease'
      }}
    >
      
      {/* Logo Area */}
      <div className="sidebar-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: isCollapsed ? 'center' : 'flex-start', padding: isCollapsed ? '0' : '0 20px', height: '64px', overflow: 'hidden' }}>
        {isCollapsed ? (
          <VayranMark style={{ color: 'var(--primary)', height: '24px', width: '24px', minWidth: '24px' }} />
        ) : (
          <VayranLogoFull style={{ color: 'var(--primary)', height: '24px', width: 'auto' }} />
        )}
      </div>
      
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 12px', overflowX: 'hidden' }}>
        
        {/* Favorites / Pinned */}
        {!isCollapsed && (
          <div style={{ marginBottom: '24px' }}>
            <div style={{ padding: '0 12px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '8px' }}>Pinned</div>
            <Link href="/" className="nav-item" style={{ padding: '8px 12px', fontSize: '13px' }}>
              <div style={{ width: '16px' }}><PinIcon /></div> <span style={{ whiteSpace: 'nowrap' }}>Executive Dashboard</span>
            </Link>
            <Link href="/finance" className="nav-item" style={{ padding: '8px 12px', fontSize: '13px' }}>
              <div style={{ width: '16px' }}><PinIcon /></div> <span style={{ whiteSpace: 'nowrap' }}>Q3 Invoices</span>
            </Link>
          </div>
        )}

        {/* Recently Visited */}
        {!isCollapsed && (
          <div style={{ marginBottom: '24px' }}>
            <div style={{ padding: '0 12px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '8px' }}>Recently Visited</div>
            <Link href="/analytics" className="nav-item" style={{ padding: '8px 12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <div style={{ width: '14px' }}><ClockIcon /></div> <span style={{ whiteSpace: 'nowrap' }}>Analytics Engine</span>
            </Link>
            <Link href="/hr" className="nav-item" style={{ padding: '8px 12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <div style={{ width: '14px' }}><ClockIcon /></div> <span style={{ whiteSpace: 'nowrap' }}>Employee Directory</span>
            </Link>
          </div>
        )}

        {/* Main Navigation */}
        <div style={{ marginBottom: '24px' }}>
          {!isCollapsed && <div style={{ padding: '0 12px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '8px' }}>Core Modules</div>}
          
          <NavItem href="/" icon={LayoutDashboardIcon} label="Dashboard" isActive={pathname === '/'} />

          {/* Operations Menu */}
          <div>
            <div 
              className="nav-item" 
              onClick={() => toggleMenu('operations')}
              style={{ padding: isCollapsed ? '12px' : '8px 12px', justifyContent: isCollapsed ? 'center' : 'space-between', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '18px' }}><BriefcaseIcon /></div>
                {!isCollapsed && <span>Operations</span>}
              </div>
              {!isCollapsed && <div style={{ width: '16px', transform: openMenus['operations'] ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}><ChevronDownIcon /></div>}
            </div>

            {!isCollapsed && openMenus['operations'] && (
              <div style={{ paddingLeft: '32px', display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '2px', marginBottom: '8px' }}>
                <Link href="/hr" className={`nav-item ${pathname === '/hr' ? 'active' : ''}`} style={{ padding: '6px 12px', fontSize: '13px' }}>HRMS</Link>
                <Link href="/projects" className={`nav-item ${pathname === '/projects' ? 'active' : ''}`} style={{ padding: '6px 12px', fontSize: '13px' }}>Projects</Link>
                <Link href="/product" className={`nav-item ${pathname === '/product' ? 'active' : ''}`} style={{ padding: '6px 12px', fontSize: '13px' }}>Product</Link>
                <Link href="/engineering" className={`nav-item ${pathname === '/engineering' ? 'active' : ''}`} style={{ padding: '6px 12px', fontSize: '13px' }}>Engineering</Link>
              </div>
            )}
          </div>

          <NavItem href="/finance" icon={BanknoteIcon} label="Finance" isActive={pathname === '/finance'} />
          <NavItem href="/inventory" icon={PackageIcon} label="Inventory" isActive={pathname === '/inventory'} />
          <NavItem href="/procurement" icon={ShoppingCartIcon} label="Procurement" isActive={pathname === '/procurement'} />

          {/* Sales Menu */}
          <div>
            <div 
              className="nav-item" 
              onClick={() => toggleMenu('sales')}
              style={{ padding: isCollapsed ? '12px' : '8px 12px', justifyContent: isCollapsed ? 'center' : 'space-between', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '18px' }}><HandshakeIcon /></div>
                {!isCollapsed && <span>Sales & Marketing</span>}
              </div>
              {!isCollapsed && <div style={{ width: '16px', transform: openMenus['sales'] ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}><ChevronDownIcon /></div>}
            </div>

            {!isCollapsed && openMenus['sales'] && (
              <div style={{ paddingLeft: '32px', display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '2px', marginBottom: '8px' }}>
                <Link href="/crm" className={`nav-item ${pathname === '/crm' ? 'active' : ''}`} style={{ padding: '6px 12px', fontSize: '13px' }}>CRM</Link>
                <Link href="/sales" className={`nav-item ${pathname === '/sales' ? 'active' : ''}`} style={{ padding: '6px 12px', fontSize: '13px' }}>Sales</Link>
                <Link href="/marketing" className={`nav-item ${pathname === '/marketing' ? 'active' : ''}`} style={{ padding: '6px 12px', fontSize: '13px' }}>Marketing</Link>
              </div>
            )}
          </div>

          <NavItem href="/analytics" icon={BarChartIcon} label="Analytics" isActive={pathname === '/analytics'} />
          <NavItem href="/reports" icon={FileTextIcon} label="Reports" isActive={pathname === '/reports'} />
        </div>
        
        {/* Settings & Admin */}
        <div>
          {!isCollapsed && <div style={{ padding: '0 12px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '8px' }}>Administration</div>}
          
          <NavItem href="/analytics" icon={BarChartIcon} label="Reports & Analytics" isActive={pathname.startsWith('/analytics')} />
          <NavItem href="/automation" icon={CheckCircleIcon} label="Workflow Engine" isActive={pathname.startsWith('/automation')} />
          <NavItem href="/admin" icon={SettingsIcon} label="System Administration" isActive={pathname.startsWith('/admin')} />
          <NavItem href="/finance" icon={BanknoteIcon} label="Finance & Accounting" isActive={pathname.startsWith('/finance')} />
          <NavItem href="/inventory" icon={PackageIcon} label="Inventory & Assets" isActive={pathname.startsWith('/inventory')} />
          <NavItem href="/procurement" icon={ShoppingCartIcon} label="Procurement" isActive={pathname.startsWith('/procurement')} />
          <NavItem href="/projects" icon={BriefcaseIcon} label="Project Management" isActive={pathname.startsWith('/projects')} />
          <NavItem href="/company/overview" icon={BuildingIcon} label="Company Management" isActive={pathname.startsWith('/company')} />
          <NavItem href="/hr/overview" icon={UsersIcon} label="HR Management" isActive={pathname.startsWith('/hr')} />
          <NavItem href="/admin" icon={SettingsIcon} label="System Admin" isActive={pathname.startsWith('/admin')} />
          <NavItem href="/support" icon={LifeBuoyIcon} label="Support" isActive={pathname === '/support'} />
        </div>

      </div>

      {/* Collapse Toggle */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{
          background: 'var(--bg-secondary)', border: 'none', color: 'var(--text-secondary)',
          cursor: 'pointer', padding: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center',
          width: '100%', borderTop: '1px solid var(--border-color)', transition: 'background 0.2s'
        }}
        className="hover:bg-border-color"
      >
        <div style={{ width: '16px', height: '16px', transition: 'transform 0.3s', transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0)' }}>
          <ChevronLeftIcon />
        </div>
      </button>

      {/* Resize Handle */}
      {!isCollapsed && (
        <div 
          onMouseDown={() => setIsResizing(true)}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '4px',
            height: '100%',
            cursor: 'col-resize',
            backgroundColor: isResizing ? 'var(--primary)' : 'transparent',
            transition: 'background-color 0.2s',
            zIndex: 50
          }}
          className="hover:bg-border-color"
        />
      )}

    </aside>
  );
}
