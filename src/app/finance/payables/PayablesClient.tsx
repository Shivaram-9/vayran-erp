'use client';

import React from 'react';
import { EnterpriseDataTable, Column } from '@/components/DataTable';

export default function PayablesClient({ bills }: { bills: any[] }) {
  const columns: Column[] = [
    { key: 'billNo', label: 'Bill No', render: (r) => <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{r.billNo}</span> },
    { key: 'vendor', label: 'Vendor', render: (r) => <div style={{ fontWeight: 600 }}>{r.vendor}</div> },
    { key: 'amount', label: 'Amount', render: (r) => <div style={{ fontWeight: 600 }}>${r.amount.toFixed(2)}</div> },
    { key: 'dueDate', label: 'Due Date', render: (r) => <span style={{ color: 'var(--text-secondary)' }}>{new Date(r.dueDate).toLocaleDateString()}</span> },
    { key: 'status', label: 'Status', render: (r) => {
      let bg = 'rgba(59, 130, 246, 0.1)'; let color = 'var(--primary)'; // Draft
      if (r.status === 'Pending') { bg = 'rgba(245, 158, 11, 0.1)'; color = 'var(--warning)'; }
      if (r.status === 'Paid') { bg = 'rgba(16, 185, 129, 0.1)'; color = 'var(--success)'; }
      if (r.status === 'Overdue') { bg = 'rgba(239, 68, 68, 0.1)'; color = 'var(--danger)'; }
      return <span style={{ padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600, background: bg, color }}>{r.status}</span>
    }}
  ];

  return (
    <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
      <EnterpriseDataTable columns={columns} data={bills} searchPlaceholder="Search by bill number or vendor..." />
    </div>
  );
}
