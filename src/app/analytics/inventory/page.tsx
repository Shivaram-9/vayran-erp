import React from 'react';
import { prisma } from '@/lib/prisma';
import { PackageIcon } from '@/components/Icons';

export const dynamic = 'force-dynamic';

export default async function InventoryAnalyticsPage() {
  const warehouses = await prisma.warehouse.count();
  const lowStock = await prisma.inventory.count({ where: { quantity: { lte: 10 } } });
  
  return (
    <div style={{ padding: '32px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PackageIcon /> Inventory & Sourcing Analytics
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Deep dive into inventory valuation, supply chain, and procurement.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '12px' }}>Active Warehouses</div>
          <div style={{ fontSize: '32px', fontWeight: 700 }}>{warehouses}</div>
        </div>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '12px' }}>Low Stock Alerts</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--warning)' }}>{lowStock}</div>
        </div>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '12px' }}>Inventory Value</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)' }}>$450K</div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '48px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.2 }}><PackageIcon /></div>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>Detailed Supply Chain Reports Coming Soon</h3>
        <p style={{ maxWidth: '400px', margin: '8px auto 0', fontSize: '14px' }}>
          Interactive drill-downs for stock movement, warehouse utilization, and vendor performance will be generated here.
        </p>
      </div>
    </div>
  );
}
