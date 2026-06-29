import React from 'react';
import { prisma } from '@/lib/prisma';
import { BoxIcon, PackageIcon, MapPinIcon, ShieldIcon } from '@/components/Icons';

export const dynamic = 'force-dynamic';

export default async function InventoryOverviewPage() {
  const productCount = await prisma.product.count();
  const warehouseCount = await prisma.warehouse.count();
  const assetCount = await prisma.asset.count();
  
  // Aggregate total inventory quantity
  const allInventory = await prisma.inventory.findMany();
  const totalStock = allInventory.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '32px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Inventory Dashboard</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Enterprise view of products, stock levels, and asset allocations.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Total Products</span>
            <div style={{ padding: '8px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', borderRadius: '8px' }}><PackageIcon /></div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 700 }}>{productCount}</div>
          <div style={{ fontSize: '12px', color: 'var(--success)', marginTop: '8px', fontWeight: 600 }}>Active in Catalog</div>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Total Stock</span>
            <div style={{ padding: '8px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: '8px' }}><BoxIcon /></div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 700 }}>{totalStock}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>Units across all locations</div>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Warehouses</span>
            <div style={{ padding: '8px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', borderRadius: '8px' }}><MapPinIcon /></div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 700 }}>{warehouseCount}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>Active Facilities</div>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Enterprise Assets</span>
            <div style={{ padding: '8px', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', borderRadius: '8px' }}><ShieldIcon /></div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 700 }}>{assetCount}</div>
          <div style={{ fontSize: '12px', color: 'var(--warning)', marginTop: '8px', fontWeight: 600 }}>Tracked Internally</div>
        </div>
      </div>
      
      <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.2 }}><BoxIcon /></div>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>Stock Movement Trends</h3>
        <p style={{ maxWidth: '400px', marginTop: '8px', fontSize: '14px' }}>
          Real-time inventory velocity charts will populate here once transactions begin flowing.
        </p>
      </div>
    </div>
  );
}
