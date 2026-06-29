'use client';

import React from 'react';
import { EnterpriseDataTable, Column } from '@/components/DataTable';

export default function AccountsClient({ accounts }: { accounts: any[] }) {
  const columns: Column[] = [
    { key: 'code', label: 'Account Code', render: (r) => <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{r.code}</span> },
    { key: 'name', label: 'Account Name', render: (r) => <div style={{ fontWeight: 600 }}>{r.name}</div> },
    { key: 'type', label: 'Type', render: (r) => (
      <span style={{ 
        padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600,
        background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)'
      }}>
        {r.type}
      </span>
    )},
    { key: 'chart', label: 'Chart of Accounts', render: (r) => <span style={{ color: 'var(--text-secondary)' }}>{r.chartOfAccounts?.name}</span> },
    { key: 'status', label: 'Status', render: (r) => (
      <span style={{ 
        padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600,
        background: r.status === 'Active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
        color: r.status === 'Active' ? 'var(--success)' : 'var(--danger)'
      }}>
        {r.status}
      </span>
    )}
  ];

  return (
    <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
      <EnterpriseDataTable columns={columns} data={accounts} searchPlaceholder="Search accounts by code or name..." />
    </div>
  );
}
