import { prisma } from '@/lib/prisma';
import TeamsClient from './TeamsClient';

export const dynamic = 'force-dynamic';

export default async function TeamsPage() {
  const company = await prisma.company.findFirst();
  
  if (!company) return <div>No company configured.</div>;

  const teams = await prisma.team.findMany({
    where: { companyId: company.id },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '32px 32px 0' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Teams</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Manage agile teams, squad leads, and capacity planning.</p>
      </div>

      <div style={{ flex: 1, padding: '0 32px 32px' }}>
        <TeamsClient initialTeams={teams} />
      </div>
    </div>
  );
}
