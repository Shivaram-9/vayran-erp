import { prisma } from '@/lib/prisma';
import VendorsClient from './VendorsClient';
import { HandshakeIcon } from '@/components/Icons';

export const dynamic = 'force-dynamic';

export default async function VendorsPage() {
  const vendors = await prisma.vendor.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '32px 32px 0', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HandshakeIcon /> Vendor & Supplier Directory
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage approved vendors, contracts, and supplier performance metrics.</p>
        </div>
        <div>
          <button className="btn-primary">Onboard Vendor</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '32px' }}>
        <VendorsClient vendors={vendors} />
      </div>
    </div>
  );
}
