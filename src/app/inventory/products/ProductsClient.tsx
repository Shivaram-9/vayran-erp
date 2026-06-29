'use client';

import React from 'react';
import { EnterpriseDataTable, Column } from '@/components/DataTable';

export default function ProductsClient({ products }: { products: any[] }) {
  const columns: Column[] = [
    { key: 'sku', label: 'SKU', render: (r) => <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{r.sku}</span> },
    { key: 'name', label: 'Product Name', render: (r) => <div style={{ fontWeight: 600 }}>{r.name}</div> },
    { key: 'category', label: 'Category', render: (r) => <span style={{ color: 'var(--text-secondary)' }}>{r.category?.name || 'Uncategorized'}</span> },
    { key: 'price', label: 'Selling Price', render: (r) => <div style={{ fontWeight: 600 }}>${r.price.toFixed(2)}</div> },
    { key: 'uom', label: 'Unit', render: (r) => <span style={{ color: 'var(--text-secondary)' }}>{r.uom}</span> },
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
      <EnterpriseDataTable columns={columns} data={products} searchPlaceholder="Search products by SKU or Name..." />
    </div>
  );
}
