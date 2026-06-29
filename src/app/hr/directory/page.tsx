import { prisma } from '@/lib/prisma';
import DirectoryClient from './DirectoryClient';

export const dynamic = 'force-dynamic';

export default async function EmployeeDirectoryPage() {
  const employees = await prisma.employee.findMany({
    include: {
      department: true,
      branch: true,
      team: true
    },
    orderBy: { name: 'asc' }
  });

  const departments = await prisma.department.findMany();
  const branches = await prisma.branch.findMany();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '32px 32px 0' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Employee Directory</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Enterprise workforce database with advanced filtering and organizational mapping.</p>
      </div>

      <div style={{ flex: 1, padding: '0 32px 32px' }}>
        <DirectoryClient initialEmployees={employees} departments={departments} branches={branches} />
      </div>
    </div>
  );
}
