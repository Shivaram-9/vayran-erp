'use client';

import React from 'react';
import { UserIcon, ClockIcon, BriefcaseIcon, FileTextIcon } from '@/components/Icons';

export default function SelfServicePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '32px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Employee Self-Service</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your personal profile, attendance, leave balance, and documents.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '32px 16px', gap: '16px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UserIcon />
          </div>
          <div>
            <h3 style={{ fontWeight: 600, fontSize: '16px' }}>My Profile</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px' }}>View and update your personal information, emergency contacts, and banking details.</p>
          </div>
          <button className="btn-secondary" style={{ marginTop: 'auto', width: '100%' }}>View Profile</button>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '32px 16px', gap: '16px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ClockIcon />
          </div>
          <div>
            <h3 style={{ fontWeight: 600, fontSize: '16px' }}>Time & Attendance</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px' }}>Log your daily working hours, request time off, and view your current leave balances.</p>
          </div>
          <button className="btn-secondary" style={{ marginTop: 'auto', width: '100%' }}>Request Leave</button>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '32px 16px', gap: '16px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileTextIcon />
          </div>
          <div>
            <h3 style={{ fontWeight: 600, fontSize: '16px' }}>Payslips & Documents</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px' }}>Access your monthly salary slips, tax forms, and company policy documents securely.</p>
          </div>
          <button className="btn-secondary" style={{ marginTop: 'auto', width: '100%' }}>View Payslips</button>
        </div>
      </div>
    </div>
  );
}
