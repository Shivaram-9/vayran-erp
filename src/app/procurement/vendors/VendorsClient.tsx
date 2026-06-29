'use client';

import React from 'react';
import { EnterpriseDataTable, Column } from '@/components/DataTable';

export default function VendorsClient({ vendors }: { vendors: any[] }) {
  const columns: Column[] = [
    { key: 'vendorCode', label: 'Vendor Code', render: (r) => <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{r.vendorCode}</span> },
    { key: 'name', label: 'Supplier Name', render: (r) => <div style={{ fontWeight: 600 }}>{r.name}</div> },
    { key: 'email', label: 'Email', render: (r) => <span style={{ color: 'var(--text-secondary)' }}>{r.email || 'N/A'}</span> },
    { key: 'rating', label: 'Performance', render: (r) => <span style={{ color: 'var(--primary)' }}>{r.rating ? `${r.rating}/5` : 'No Rating'}</span> },
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
      <EnterpriseDataTable columns={columns} data={vendors} searchPlaceholder="Search suppliers by name or code..." />
    </div>
  );
}
