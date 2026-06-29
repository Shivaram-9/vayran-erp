'use client';

import React from 'react';
import { EnterpriseDataTable, Column } from '@/components/DataTable';

export default function ExpensesClient({ expenses }: { expenses: any[] }) {
  const columns: Column[] = [
    { key: 'employee', label: 'Submitter', render: (r) => <div style={{ fontWeight: 600 }}>{r.employee?.name}</div> },
    { key: 'category', label: 'Category', render: (r) => <span style={{ color: 'var(--text-secondary)' }}>{r.category?.name || 'General'}</span> },
    { key: 'description', label: 'Description', render: (r) => <span>{r.description}</span> },
    { key: 'amount', label: 'Amount', render: (r) => <div style={{ fontWeight: 600 }}>${r.amount.toFixed(2)}</div> },
    { key: 'date', label: 'Date', render: (r) => <span style={{ color: 'var(--text-secondary)' }}>{new Date(r.date).toLocaleDateString()}</span> },
    { key: 'status', label: 'Status', render: (r) => {
      let bg = 'rgba(245, 158, 11, 0.1)'; let color = 'var(--warning)'; // Pending
      if (r.status === 'Approved') { bg = 'rgba(59, 130, 246, 0.1)'; color = 'var(--primary)'; }
      if (r.status === 'Reimbursed') { bg = 'rgba(16, 185, 129, 0.1)'; color = 'var(--success)'; }
      if (r.status === 'Rejected') { bg = 'rgba(239, 68, 68, 0.1)'; color = 'var(--danger)'; }
      return <span style={{ padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600, background: bg, color }}>{r.status}</span>
    }}
  ];

  return (
    <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
      <EnterpriseDataTable columns={columns} data={expenses} searchPlaceholder="Search expenses by description or employee..." />
    </div>
  );
}
