import { prisma } from '@/lib/prisma';
import { KpiCard } from '@/components/DashboardWidgets';

export const dynamic = 'force-dynamic';

export default async function HROverview() {
  const empCount = await prisma.employee.count();
  const activeCount = await prisma.employee.count({ where: { status: 'Active' } });
  const pendingLeaves = await prisma.leaveRequest.count({ where: { status: 'Pending' } });

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>HR Executive Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Macro-level view of workforce analytics and operations.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-secondary" style={{ padding: '8px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>Export Report</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <KpiCard title="Total Headcount" value={empCount.toString()} trend="up" trendValue="4%" sparklineData={[10, 15, 20, 22, 25, empCount]} color="var(--primary)" />
        <KpiCard title="Active Employees" value={activeCount.toString()} trend="up" trendValue="1%" sparklineData={[10, 15, 18, 20, activeCount, activeCount]} color="var(--success)" />
        <KpiCard title="Pending Leaves" value={pendingLeaves.toString()} trend="down" trendValue="2%" sparklineData={[5, 6, 8, 4, 2, pendingLeaves]} color="var(--warning)" />
        <KpiCard title="Attrition Rate" value="2.4%" trend="down" trendValue="0.5%" sparklineData={[4, 3.8, 3.5, 3, 2.8, 2.4]} color="var(--danger)" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div className="glass-card">
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Workforce Distribution</h3>
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            [Interactive Distribution Chart will render here in Phase 5]
          </div>
        </div>

        <div className="glass-card" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Pending Approvals</h3>
          {pendingLeaves === 0 ? (
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', textAlign: 'center', padding: '24px 0' }}>
              No pending approvals in queue.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '13px', fontWeight: 500 }}>{pendingLeaves} Leave Requests await review</div>
              <button className="btn" style={{ width: '100%', padding: '8px' }}>Review Now</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
