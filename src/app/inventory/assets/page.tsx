import { prisma } from '@/lib/prisma';
import AssetsClient from './AssetsClient';
import { ShieldIcon } from '@/components/Icons';

export const dynamic = 'force-dynamic';

export default async function AssetsPage() {
  const assets = await prisma.asset.findMany({
    orderBy: { assetCode: 'asc' }
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '32px 32px 0', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldIcon /> Enterprise Asset Registry
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Track fixed assets, IT equipment, and maintenance schedules.</p>
        </div>
        <div>
          <button className="btn-primary">Register Asset</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '32px' }}>
        <AssetsClient assets={assets} />
      </div>
    </div>
  );
}
