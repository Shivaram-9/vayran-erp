import { prisma } from '@/lib/prisma';
import BUClient from './BUClient';

export const dynamic = 'force-dynamic';

export default async function BusinessUnitsPage() {
  const company = await prisma.company.findFirst();
  
  if (!company) return <div>No company configured.</div>;

  const units = await prisma.businessUnit.findMany({
    where: { companyId: company.id },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '32px 32px 0' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Business Units</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Configure high-level organizational business units and segment operations.</p>
      </div>

      <div style={{ flex: 1, padding: '0 32px 32px' }}>
        <BUClient initialUnits={units} />
      </div>
    </div>
  );
}
