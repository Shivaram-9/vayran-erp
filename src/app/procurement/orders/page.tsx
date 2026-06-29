import { prisma } from '@/lib/prisma';
import OrdersClient from './OrdersClient';
import { ShoppingCartIcon } from '@/components/Icons';

export const dynamic = 'force-dynamic';

export default async function OrdersPage() {
  const orders = await prisma.purchaseOrder.findMany({
    include: { vendor: true },
    orderBy: { date: 'desc' }
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '32px 32px 0', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingCartIcon /> Purchase Orders
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Track and fulfill external material sourcing.</p>
        </div>
        <div>
          <button className="btn-primary">Create PO</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '32px' }}>
        <OrdersClient orders={orders} />
      </div>
    </div>
  );
}
