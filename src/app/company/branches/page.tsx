import { prisma } from '@/lib/prisma';
import BranchesClient from './BranchesClient';

export const dynamic = 'force-dynamic';

export default async function BranchesPage() {
  const company = await prisma.company.findFirst();
  
  if (!company) return <div>No company configured.</div>;

  const branches = await prisma.branch.findMany({
    where: { companyId: company.id },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '32px 32px 0' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Branch Management</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Manage global office locations, operational timezones, and branch managers.</p>
      </div>

      <div style={{ flex: 1, padding: '0 32px 32px' }}>
        <BranchesClient initialBranches={branches} />
      </div>
    </div>
  );
}
