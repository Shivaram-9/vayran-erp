'use client';

import React from 'react';
import { ClockIcon } from '@/components/Icons';

export default function TimeTrackingPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '32px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Time Tracking & Timesheets</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Log hours against specific project tasks and sprints.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, color: 'var(--text-secondary)' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.2 }}><ClockIcon /></div>
        <h3 style={{ fontWeight: 600 }}>Timesheet Module</h3>
        <p style={{ fontSize: '14px', maxWidth: '400px', textAlign: 'center' }}>
          This enterprise sub-module is wired to the database `TimeEntry` model and will be fully activated for user input in Phase 5 global integration.
        </p>
      </div>
    </div>
  );
}
