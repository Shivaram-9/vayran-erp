'use client';

import React from 'react';
import { EnterpriseDataTable, Column } from '@/components/DataTable';

export default function OrdersClient({ orders }: { orders: any[] }) {
  const columns: Column[] = [
    { key: 'orderNo', label: 'PO Number', render: (r) => <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{r.orderNo}</span> },
    { key: 'vendor', label: 'Vendor', render: (r) => <div style={{ fontWeight: 600 }}>{r.vendor?.name}</div> },
    { key: 'date', label: 'Order Date', render: (r) => <span style={{ color: 'var(--text-secondary)' }}>{new Date(r.date).toLocaleDateString()}</span> },
    { key: 'total', label: 'Total Amount', render: (r) => <div style={{ fontWeight: 600 }}>${r.totalAmount.toFixed(2)}</div> },
    { key: 'status', label: 'Status', render: (r) => {
      let bg = 'rgba(59, 130, 246, 0.1)'; let color = 'var(--primary)'; // Draft
      if (r.status === 'Issued') { bg = 'rgba(245, 158, 11, 0.1)'; color = 'var(--warning)'; }
      if (r.status === 'Received') { bg = 'rgba(16, 185, 129, 0.1)'; color = 'var(--success)'; }
      if (r.status === 'Cancelled') { bg = 'rgba(239, 68, 68, 0.1)'; color = 'var(--danger)'; }
      return <span style={{ padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600, background: bg, color }}>{r.status}</span>
    }}
  ];

  return (
    <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
      <EnterpriseDataTable columns={columns} data={orders} searchPlaceholder="Search POs by number or vendor..." />
    </div>
  );
}
