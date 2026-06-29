import React from 'react';
import { prisma } from '@/lib/prisma';
import { HandshakeIcon, ShoppingCartIcon, FileTextIcon, CheckCircleIcon } from '@/components/Icons';

export const dynamic = 'force-dynamic';

export default async function ProcurementOverviewPage() {
  const vendorCount = await prisma.vendor.count();
  const poCount = await prisma.purchaseOrder.count({ where: { status: { not: 'Received' } } });
  const pendingRequests = await prisma.purchaseRequest.count({ where: { status: 'Pending' } });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '32px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Sourcing Dashboard</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Enterprise view of vendors, purchase orders, and sourcing requests.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Active Vendors</span>
            <div style={{ padding: '8px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', borderRadius: '8px' }}><HandshakeIcon /></div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 700 }}>{vendorCount}</div>
          <div style={{ fontSize: '12px', color: 'var(--success)', marginTop: '8px', fontWeight: 600 }}>Approved Suppliers</div>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Active POs</span>
            <div style={{ padding: '8px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: '8px' }}><ShoppingCartIcon /></div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 700 }}>{poCount}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>Awaiting Delivery</div>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Pending Requests</span>
            <div style={{ padding: '8px', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', borderRadius: '8px' }}><FileTextIcon /></div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 700 }}>{pendingRequests}</div>
          <div style={{ fontSize: '12px', color: 'var(--warning)', marginTop: '8px', fontWeight: 600 }}>Awaiting Approval</div>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Goods Received</span>
            <div style={{ padding: '8px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: '8px' }}><CheckCircleIcon /></div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 700 }}>0</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>Processed this week</div>
        </div>
      </div>
      
      <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.2 }}><ShoppingCartIcon /></div>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>Procurement Pipeline</h3>
        <p style={{ maxWidth: '400px', marginTop: '8px', fontSize: '14px' }}>
          Real-time purchase order status charts will populate here once orders begin flowing.
        </p>
      </div>
    </div>
  );
}
