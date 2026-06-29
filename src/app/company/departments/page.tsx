import { prisma } from '@/lib/prisma';
import DeptsClient from './DeptsClient';

export const dynamic = 'force-dynamic';

export default async function DepartmentsPage() {
  const company = await prisma.company.findFirst();
  
  if (!company) return <div>No company configured.</div>;

  const depts = await prisma.department.findMany({
    where: { companyId: company.id },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '32px 32px 0' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Departments</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Manage operational departments, cost centers, and hierarchies.</p>
      </div>

      <div style={{ flex: 1, padding: '0 32px 32px' }}>
        <DeptsClient initialDepts={depts} />
      </div>
    </div>
  );
}
