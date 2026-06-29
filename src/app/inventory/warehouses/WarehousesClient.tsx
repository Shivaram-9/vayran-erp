'use client';

import React from 'react';
import { EnterpriseDataTable, Column } from '@/components/DataTable';

export default function WarehousesClient({ warehouses }: { warehouses: any[] }) {
  const columns: Column[] = [
    { key: 'code', label: 'Code', render: (r) => <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{r.code}</span> },
    { key: 'name', label: 'Warehouse Name', render: (r) => <div style={{ fontWeight: 600 }}>{r.name}</div> },
    { key: 'address', label: 'Location/Address', render: (r) => <span style={{ color: 'var(--text-secondary)' }}>{r.address || 'Unspecified'}</span> },
    { key: 'branch', label: 'Branch', render: (r) => <span style={{ color: 'var(--text-secondary)' }}>{r.branch?.name || 'HQ'}</span> },
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
      <EnterpriseDataTable columns={columns} data={warehouses} searchPlaceholder="Search by warehouse name or code..." />
    </div>
  );
}
