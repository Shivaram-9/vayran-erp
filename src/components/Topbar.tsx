"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  SearchIcon, BellIcon, MessageIcon, CalendarIcon, 
  SparklesIcon, MoonIcon, BuildingIcon, ChevronDownIcon, ChevronUpIcon 
} from "./Icons";

export default function Topbar() {
  const pathname = usePathname();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCompanyMenu, setShowCompanyMenu] = useState(false);

  if (pathname === '/login') return null;

  return (
    <header className="topbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', padding: '0 24px', background: 'var(--glass-bg)', borderBottom: '1px solid var(--border-color)' }}>
      
      {/* Left Section - Company Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <div 
            className="btn-secondary" 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', background: 'var(--bg-card)', height: '36px' }}
            onClick={() => setShowCompanyMenu(!showCompanyMenu)}
          >
            <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700 }}>A</div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>Acme Corp HQ</span>
            <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)' }}>
              {showCompanyMenu ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </div>
          </div>

          {showCompanyMenu && (
            <div className="animate-slide-up" style={{ 
              position: 'absolute', top: '100%', left: '0', marginTop: '8px', background: 'var(--bg-card)', 
              border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', 
              boxShadow: 'var(--shadow-lg)', width: '240px', padding: '8px', zIndex: 100 
            }}>
              <div style={{ padding: '8px', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.05em', fontWeight: 600 }}>Workspaces</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', cursor: 'pointer', marginBottom: '4px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '4px', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>A</div>
                <div style={{ fontSize: '13px', fontWeight: 500 }}>Acme Corp HQ</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }} className="hover:bg-primary">
                <div style={{ width: '24px', height: '24px', borderRadius: '4px', background: 'var(--border-color)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>E</div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>EMEA Branch</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center Section - Global Search */}
      <div style={{ flex: 2, display: 'flex', justifyContent: 'center' }}>
        {/* Global Search */}
        <div 
          className="search-bar hover:bg-secondary cursor-pointer" 
          style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-secondary)', padding: '6px 12px', borderRadius: 'var(--radius-sm)', width: '400px', border: '1px solid var(--border-color)', transition: 'all 0.2s', cursor: 'text' }}
          onClick={() => window.dispatchEvent(new Event('open-command-palette'))}
        >
          <div style={{ color: 'var(--text-secondary)', marginRight: '8px', width: '16px', height: '16px' }}>
            <SearchIcon />
          </div>
          <div style={{ flex: 1, color: 'var(--text-secondary)', fontSize: '13px' }}>
            Search everywhere...
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', background: 'var(--bg-card)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>⌘K</div>
        </div>
      </div>
      
      {/* Right Section - User Actions */}
      <div className="user-actions" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px', flex: 1 }}>
        
        {/* Action Icons */}
        <div style={{ display: 'flex', gap: '4px', color: 'var(--text-secondary)' }}>
          
          <Link href="/calendar" className="btn-icon">
            <div style={{ width: '18px', height: '18px' }}><CalendarIcon /></div>
          </Link>
          
          <Link href="/messages" className="btn-icon">
            <div style={{ width: '18px', height: '18px' }}><MessageIcon /></div>
          </Link>
          
          {/* Notifications */}
          <div style={{ position: 'relative' }}>
            <button className="btn-icon" onClick={() => setShowNotifications(!showNotifications)}>
              <div style={{ width: '18px', height: '18px' }}><BellIcon /></div>
              <div style={{ position: 'absolute', top: '6px', right: '8px', width: '6px', height: '6px', background: 'var(--danger)', borderRadius: '50%' }}></div>
            </button>
            
            {showNotifications && (
              <div className="animate-slide-up" style={{ 
                position: 'absolute', top: '100%', right: '0', background: 'var(--bg-card)', 
                border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', 
                boxShadow: 'var(--shadow-lg)', width: '320px', padding: '16px', zIndex: 100 
              }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>Notifications</h4>
                <div style={{ fontSize: '13px', marginBottom: '8px', padding: '12px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--info)' }}>
                  <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '2px' }}>Q3 Financial Report Approved</strong>
                  <span style={{ color: 'var(--text-secondary)' }}>2 hours ago by CFO</span>
                </div>
              </div>
            )}
          </div>

          <button 
            className="btn-icon" 
            onClick={() => {
              if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
              } else {
                document.documentElement.classList.add('dark');
              }
            }}
          >
            <div style={{ width: '18px', height: '18px' }}><MoonIcon /></div>
          </button>
        </div>

        {/* AI Copilot Button */}
        <button 
          className="btn" 
          style={{ background: 'var(--accent-light)', color: 'var(--primary)', border: '1px solid rgba(30, 64, 175, 0.2)', padding: '6px 12px' }}
          onClick={() => window.alert("VAYRAN AI Copilot activated. Scanning enterprise context...")}
        >
          <div style={{ width: '16px', height: '16px' }}><SparklesIcon /></div>
          AI Copilot
        </button>

        <div style={{ width: '1px', height: '24px', background: 'var(--border-color)' }}></div>

        {/* Profile Dropdown */}
        <div className="user-profile" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <div 
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '4px', borderRadius: 'var(--radius-sm)', height: '100%' }}
            className="hover:bg-secondary"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>System Owner</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Administrator</div>
            </div>
            <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600, fontSize: '12px', boxShadow: 'var(--shadow-sm)' }}>SO</div>
          </div>

          {showProfileMenu && (
            <div className="animate-slide-up" style={{ 
              position: 'absolute', top: '100%', right: '0', marginTop: '8px', background: 'var(--bg-card)', 
              border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', 
              boxShadow: 'var(--shadow-lg)', width: '200px', padding: '8px', zIndex: 100 
            }}>
              <Link href="/settings" style={{ padding: '8px 12px', display: 'block', textDecoration: 'none', color: 'var(--text-primary)', fontSize: '13px', borderRadius: 'var(--radius-sm)' }} className="hover:bg-secondary" onClick={() => setShowProfileMenu(false)}>My Profile</Link>
              <Link href="/settings" style={{ padding: '8px 12px', display: 'block', textDecoration: 'none', color: 'var(--text-primary)', fontSize: '13px', borderRadius: 'var(--radius-sm)' }} className="hover:bg-secondary" onClick={() => setShowProfileMenu(false)}>Settings & Billing</Link>
              <div style={{ borderTop: '1px solid var(--border-color)', margin: '8px 0' }}></div>
              <Link href="/login" style={{ padding: '8px 12px', display: 'block', textDecoration: 'none', color: 'var(--danger)', fontSize: '13px', fontWeight: 500, borderRadius: 'var(--radius-sm)' }} className="hover:bg-secondary">Sign Out</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
