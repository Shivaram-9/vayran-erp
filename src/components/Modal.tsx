'use client';

import { ReactNode } from 'react';

export default function Modal({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: ReactNode }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '500px', backgroundColor: 'var(--bg-secondary)', padding: '32px', position: 'relative' }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'var(--text-secondary)'
        }}>✖</button>
        <h2 style={{ marginBottom: '24px', fontSize: '24px' }}>{title}</h2>
        {children}
      </div>
    </div>
  );
}
