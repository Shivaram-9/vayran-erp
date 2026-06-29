'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon, LayoutDashboardIcon, UsersIcon, BriefcaseIcon, CodeIcon, BoxIcon, HandshakeIcon, BanknoteIcon, PackageIcon, ShoppingCartIcon, BarChartIcon, MegaphoneIcon, FileTextIcon, SettingsIcon, LifeBuoyIcon, BuildingIcon } from './Icons';

type CommandModule = { name: string; path: string; icon: any };

const MODULES: CommandModule[] = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboardIcon },
  { name: 'HR Management', path: '/hr', icon: UsersIcon },
  { name: 'Projects', path: '/projects', icon: BriefcaseIcon },
  { name: 'Engineering', path: '/engineering', icon: CodeIcon },
  { name: 'Product', path: '/product', icon: BoxIcon },
  { name: 'CRM & Sales', path: '/crm', icon: HandshakeIcon },
  { name: 'Finance', path: '/finance', icon: BanknoteIcon },
  { name: 'Inventory', path: '/inventory', icon: PackageIcon },
  { name: 'Procurement', path: '/procurement', icon: ShoppingCartIcon },
  { name: 'Marketing', path: '/marketing', icon: MegaphoneIcon },
  { name: 'Analytics', path: '/analytics', icon: BarChartIcon },
  { name: 'Reports', path: '/reports', icon: FileTextIcon },
  { name: 'Administration', path: '/admin', icon: BuildingIcon },
  { name: 'System Settings', path: '/settings', icon: SettingsIcon },
  { name: 'Support', path: '/support', icon: LifeBuoyIcon },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filteredModules = MODULES.filter(m => m.name.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleOpenEvent = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleOpenEvent);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleOpenEvent);
    };
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle up/down arrow keys and enter
  useEffect(() => {
    const handleNavigation = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < filteredModules.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredModules.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredModules.length > 0) {
          router.push(filteredModules[selectedIndex].path);
          setIsOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleNavigation);
    return () => window.removeEventListener('keydown', handleNavigation);
  }, [isOpen, filteredModules, selectedIndex, router]);

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '10vh' }} onClick={() => setIsOpen(false)}>
      <div 
        className="glass-card animate-slide-up"
        style={{ width: '100%', maxWidth: '600px', padding: 0, overflow: 'hidden', backgroundColor: 'var(--bg-card)', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border-color)', borderRadius: '12px' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ width: '24px', height: '24px', color: 'var(--text-secondary)', flexShrink: 0 }}>
            <SearchIcon />
          </div>
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Search modules and commands..." 
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontSize: '18px', padding: '0 16px', color: 'var(--text-primary)' }}
          />
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', background: 'var(--bg-secondary)', padding: '4px 8px', borderRadius: '4px', fontWeight: 600 }}>ESC</div>
        </div>

        <div style={{ maxHeight: '400px', overflowY: 'auto', padding: '12px' }}>
          {filteredModules.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              No results found for "{query}".
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '8px 12px', marginBottom: '4px' }}>
                Modules
              </div>
              {filteredModules.map((module, idx) => {
                const Icon = module.icon;
                const isSelected = idx === selectedIndex;
                return (
                  <div 
                    key={module.path}
                    onClick={() => { router.push(module.path); setIsOpen(false); }}
                    style={{ 
                      display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', 
                      borderRadius: '8px', cursor: 'pointer', transition: 'all 0.1s',
                      backgroundColor: isSelected ? 'var(--primary)' : 'transparent',
                      color: isSelected ? '#fff' : 'var(--text-primary)'
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                  >
                    <div style={{ width: '20px', height: '20px', opacity: isSelected ? 1 : 0.7 }}>
                      <Icon />
                    </div>
                    <span style={{ fontWeight: 500 }}>{module.name}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
