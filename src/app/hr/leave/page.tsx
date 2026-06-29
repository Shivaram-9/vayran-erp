import { prisma } from '@/lib/prisma';
import LeaveClient from './LeaveClient';

export const dynamic = 'force-dynamic';

export default async function LeavePage() {
  const leaves = await prisma.leaveRequest.findMany({
    include: { employee: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '32px 32px 0' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Leave Management</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Approve, track, and manage employee time off workflows.</p>
      </div>

      <div style={{ flex: 1, padding: '0 32px 32px' }}>
        <LeaveClient leaves={leaves} />
      </div>
    </div>
  );
}
