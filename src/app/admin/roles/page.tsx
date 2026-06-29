import { prisma } from '@/lib/prisma';
import RolesClient from './RolesClient';
import { ensureDefaultRoles } from './actions';

export const dynamic = 'force-dynamic';

export default async function RolesPage() {
  await ensureDefaultRoles();

  const roles = await prisma.role.findMany({
    include: {
      permissions: {
        include: { permission: true }
      },
      _count: { select: { users: true } }
    },
    orderBy: { createdAt: 'asc' }
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '32px 32px 0' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Roles & Permissions</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Enterprise Role-Based Access Control (RBAC) matrix.</p>
      </div>

      <div style={{ flex: 1, padding: '0 32px 32px' }}>
        <RolesClient initialRoles={roles} />
      </div>
    </div>
  );
}
