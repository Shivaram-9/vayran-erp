import { prisma } from '@/lib/prisma';
import WarehousesClient from './WarehousesClient';
import { MapPinIcon } from '@/components/Icons';

export const dynamic = 'force-dynamic';

export default async function WarehousesPage() {
  const warehouses = await prisma.warehouse.findMany({
    include: { branch: true },
    orderBy: { name: 'asc' }
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '32px 32px 0', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPinIcon /> Warehouses
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage physical storage locations, racks, and bins.</p>
        </div>
        <div>
          <button className="btn-primary">Add Warehouse</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '32px' }}>
        <WarehousesClient warehouses={warehouses} />
      </div>
    </div>
  );
}
