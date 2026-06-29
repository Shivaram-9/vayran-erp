'use client';

import React from 'react';
import { EnterpriseDataTable, Column } from '@/components/DataTable';

export default function LeaveClient({ leaves }: { leaves: any[] }) {
  const columns: Column[] = [
    { key: 'employee', label: 'Employee', render: (r) => <div style={{ fontWeight: 600 }}>{r.employee?.name}</div> },
    { key: 'type', label: 'Leave Type' },
    { key: 'dates', label: 'Duration', render: (r) => `${new Date(r.startDate).toLocaleDateString()} - ${new Date(r.endDate).toLocaleDateString()}` },
    { key: 'reason', label: 'Reason', render: (r) => <span style={{ color: 'var(--text-secondary)' }}>{r.reason || 'N/A'}</span> },
    { key: 'status', label: 'Status', render: (r) => {
      let bg = 'rgba(245, 158, 11, 0.1)'; let color = 'var(--warning)';
      if (r.status === 'Approved') { bg = 'rgba(16, 185, 129, 0.1)'; color = 'var(--success)'; }
      if (r.status === 'Rejected') { bg = 'rgba(239, 68, 68, 0.1)'; color = 'var(--danger)'; }
      return <span style={{ padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600, background: bg, color }}>{r.status}</span>
    }},
    { key: 'actions', label: '', render: (r) => (
      r.status === 'Pending' ? (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ background: 'var(--success)', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Approve</button>
          <button style={{ background: 'var(--danger)', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Reject</button>
        </div>
      ) : <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>Resolved</span>
    )}
  ];

  return <EnterpriseDataTable columns={columns} data={leaves} searchPlaceholder="Search leave requests..." />;
}
