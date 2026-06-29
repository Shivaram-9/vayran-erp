import { prisma } from '@/lib/prisma';
import { ClockIcon, CheckCircleIcon } from '@/components/Icons';
import AttendanceClient from './AttendanceClient';

export const dynamic = 'force-dynamic';

export default async function AttendancePage() {
  const attendances = await prisma.attendance.findMany({
    include: { employee: true },
    orderBy: { date: 'desc' },
    take: 50
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '32px 32px 0' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Daily Attendance</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Monitor live check-ins, check-outs, and overtime tracking.</p>
      </div>

      <div style={{ padding: '0 32px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '20px' }}>
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ClockIcon /></div>
          <div><div style={{ fontSize: '24px', fontWeight: 700 }}>482</div><div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Checked In Today</div></div>
        </div>
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckCircleIcon /></div>
          <div><div style={{ fontSize: '24px', fontWeight: 700 }}>96%</div><div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Attendance Rate</div></div>
        </div>
      </div>

      <div style={{ flex: 1, padding: '0 32px 32px' }}>
        <AttendanceClient attendances={attendances} />
      </div>
    </div>
  );
}
