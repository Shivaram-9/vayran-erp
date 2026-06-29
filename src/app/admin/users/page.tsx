import { prisma } from '@/lib/prisma';
import UsersClient from './UsersClient';

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    include: { role: true },
    orderBy: { createdAt: 'desc' }
  });

  const roles = await prisma.role.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '32px 32px 0' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>User Management</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Provision user accounts and assign security roles.</p>
      </div>

      <div style={{ flex: 1, padding: '0 32px 32px' }}>
        <UsersClient initialUsers={users} roles={roles} />
      </div>
    </div>
  );
}
