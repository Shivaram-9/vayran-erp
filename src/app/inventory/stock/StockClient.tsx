'use client';

import React from 'react';
import { EnterpriseDataTable, Column } from '@/components/DataTable';

export default function StockClient({ inventory }: { inventory: any[] }) {
  const columns: Column[] = [
    { key: 'product', label: 'Product', render: (r) => <div style={{ fontWeight: 600 }}>{r.product?.name} <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>({r.product?.sku})</span></div> },
    { key: 'warehouse', label: 'Warehouse', render: (r) => <span style={{ color: 'var(--text-secondary)' }}>{r.warehouse?.name}</span> },
    { key: 'quantity', label: 'Quantity Available', render: (r) => <div style={{ fontWeight: 600 }}>{r.quantity} {r.product?.uom}</div> },
    { key: 'status', label: 'Stock Status', render: (r) => {
      let bg = 'rgba(16, 185, 129, 0.1)'; let color = 'var(--success)'; let label = 'In Stock';
      if (r.quantity === 0) { bg = 'rgba(239, 68, 68, 0.1)'; color = 'var(--danger)'; label = 'Out of Stock'; }
      else if (r.quantity <= r.reorderLevel) { bg = 'rgba(245, 158, 11, 0.1)'; color = 'var(--warning)'; label = 'Low Stock'; }
      return <span style={{ padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600, background: bg, color }}>{label}</span>
    }}
  ];

  return (
    <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
      <EnterpriseDataTable columns={columns} data={inventory} searchPlaceholder="Search by product name or SKU..." />
    </div>
  );
}
