'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  type?: 'default' | 'danger';
}

export const ModalDialog: React.FC<ModalDialogProps> = ({ isOpen, onClose, title, children, primaryAction, secondaryAction, type = 'default' }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      
      {/* Backdrop */}
      <div 
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)',
        }}
        onClick={onClose}
      />

      {/* Dialog Box */}
      <div 
        className="animate-slide-up"
        style={{
          position: 'relative', width: '400px', background: 'var(--bg-card)',
          borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-xl)',
          overflow: 'hidden', border: '1px solid var(--border-color)'
        }}
      >
        <div style={{ padding: '24px 24px 16px', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: type === 'danger' ? 'var(--danger)' : 'var(--text-primary)' }}>{title}</h2>
        </div>
        
        <div style={{ padding: '24px', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          {children}
        </div>

        <div style={{ padding: '16px 24px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          {secondaryAction || (
            <button className="btn-secondary" onClick={onClose} style={{ padding: '8px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-card)', cursor: 'pointer' }}>Cancel</button>
          )}
          {primaryAction}
        </div>
      </div>
      
    </div>,
    document.body
  );
};
