'use client';

import React from 'react';
import { EnterpriseDataTable, Column } from '@/components/DataTable';

export default function AssignmentsClient({ assignments }: { assignments: any[] }) {
  const columns: Column[] = [
    { key: 'asset', label: 'Asset', render: (r) => <div style={{ fontWeight: 600 }}>{r.asset?.name} <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>({r.asset?.assetCode})</span></div> },
    { key: 'employee', label: 'Assigned To', render: (r) => <div style={{ fontWeight: 600 }}>{r.employee?.name}</div> },
    { key: 'assignedDate', label: 'Issued Date', render: (r) => <span style={{ color: 'var(--text-secondary)' }}>{new Date(r.assignedDate).toLocaleDateString()}</span> },
    { key: 'status', label: 'Status', render: (r) => (
      <span style={{ 
        padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600,
        background: r.status === 'Active' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)',
        color: r.status === 'Active' ? 'var(--primary)' : 'var(--success)'
      }}>
        {r.status}
      </span>
    )}
  ];

  return (
    <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
      <EnterpriseDataTable columns={columns} data={assignments} searchPlaceholder="Search by asset or employee..." />
    </div>
  );
}
