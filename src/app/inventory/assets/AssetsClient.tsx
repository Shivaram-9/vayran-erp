'use client';

import React from 'react';
import { EnterpriseDataTable, Column } from '@/components/DataTable';

export default function AssetsClient({ assets }: { assets: any[] }) {
  const columns: Column[] = [
    { key: 'assetCode', label: 'Asset Code', render: (r) => <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{r.assetCode}</span> },
    { key: 'name', label: 'Asset Name', render: (r) => <div style={{ fontWeight: 600 }}>{r.name}</div> },
    { key: 'category', label: 'Category', render: (r) => <span style={{ color: 'var(--text-secondary)' }}>{r.category}</span> },
    { key: 'purchaseCost', label: 'Value', render: (r) => <div style={{ fontWeight: 600 }}>${r.purchaseCost?.toFixed(2) || '0.00'}</div> },
    { key: 'status', label: 'Status', render: (r) => {
      let bg = 'rgba(16, 185, 129, 0.1)'; let color = 'var(--success)';
      if (r.status === 'Assigned') { bg = 'rgba(59, 130, 246, 0.1)'; color = 'var(--primary)'; }
      if (r.status === 'Maintenance') { bg = 'rgba(245, 158, 11, 0.1)'; color = 'var(--warning)'; }
      if (r.status === 'Retired') { bg = 'rgba(239, 68, 68, 0.1)'; color = 'var(--danger)'; }
      return <span style={{ padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600, background: bg, color }}>{r.status}</span>
    }}
  ];

  return (
    <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
      <EnterpriseDataTable columns={columns} data={assets} searchPlaceholder="Search assets by code or name..." />
    </div>
  );
}
