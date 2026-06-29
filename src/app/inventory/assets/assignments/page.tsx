import { prisma } from '@/lib/prisma';
import AssignmentsClient from './AssignmentsClient';
import { UsersIcon } from '@/components/Icons';

export const dynamic = 'force-dynamic';

export default async function AssignmentsPage() {
  const assignments = await prisma.assetAssignment.findMany({
    include: { asset: true, employee: true },
    orderBy: { assignedDate: 'desc' }
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '32px 32px 0', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UsersIcon /> Asset Assignments
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Track hardware and tools issued to employees.</p>
        </div>
        <div>
          <button className="btn-primary">Assign Asset</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '32px' }}>
        <AssignmentsClient assignments={assignments} />
      </div>
    </div>
  );
}
