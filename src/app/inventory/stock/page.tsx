import { prisma } from '@/lib/prisma';
import StockClient from './StockClient';
import { BoxIcon } from '@/components/Icons';

export const dynamic = 'force-dynamic';

export default async function StockPage() {
  const inventory = await prisma.inventory.findMany({
    include: { product: true, warehouse: true },
    orderBy: { quantity: 'desc' }
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '32px 32px 0', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BoxIcon /> Current Stock
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Real-time inventory levels across all warehouses.</p>
        </div>
        <div>
          <button className="btn-primary">Transfer Stock</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '32px' }}>
        <StockClient inventory={inventory} />
      </div>
    </div>
  );
}
