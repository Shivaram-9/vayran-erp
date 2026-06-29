'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface SlideOverPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
}

export const SlideOverPanel: React.FC<SlideOverPanelProps> = ({ isOpen, onClose, title, children, width = '500px' }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 9999, pointerEvents: isOpen ? 'auto' : 'none',
      display: 'flex', justifyContent: 'flex-end'
    }}>
      
      {/* Backdrop */}
      <div 
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(4px)',
          opacity: isOpen ? 1 : 0, transition: 'opacity 0.3s ease'
        }}
        onClick={onClose}
      />

      {/* Slide Panel */}
      <div 
        style={{
          position: 'relative', width, height: '100%', background: 'var(--bg-card)',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex', flexDirection: 'column'
        }}
      >
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600 }}>{title}</h2>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: 'var(--text-secondary)' }}
          >
            &times;
          </button>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {children}
        </div>
      </div>
      
    </div>,
    document.body
  );
};
