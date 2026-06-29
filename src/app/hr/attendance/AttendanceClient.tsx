'use client';

import React from 'react';
import { EnterpriseDataTable, Column } from '@/components/DataTable';

export default function AttendanceClient({ attendances }: { attendances: any[] }) {
  const columns: Column[] = [
    { key: 'date', label: 'Date', render: (r) => new Date(r.date).toLocaleDateString() },
    { key: 'employee', label: 'Employee', render: (r) => <div style={{ fontWeight: 600 }}>{r.employee?.name}</div> },
    { key: 'checkIn', label: 'Check In', render: (r) => r.checkIn ? new Date(r.checkIn).toLocaleTimeString() : '--:--' },
    { key: 'checkOut', label: 'Check Out', render: (r) => r.checkOut ? new Date(r.checkOut).toLocaleTimeString() : '--:--' },
    { key: 'status', label: 'Status', render: (r) => (
      <span style={{ 
        padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600,
        background: r.status === 'Present' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
        color: r.status === 'Present' ? 'var(--success)' : 'var(--danger)'
      }}>
        {r.status}
      </span>
    )}
  ];

  return <EnterpriseDataTable columns={columns} data={attendances} searchPlaceholder="Search by employee name..." />;
}
