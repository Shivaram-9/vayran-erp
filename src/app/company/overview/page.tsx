import { prisma } from '@/lib/prisma';
import { KpiCard } from '@/components/DashboardWidgets';

export const dynamic = 'force-dynamic';

export default async function CompanyOverview() {
  // We'll assume the first company is the primary tenant for now
  let company = await prisma.company.findFirst();
  
  if (!company) {
    company = await prisma.company.create({
      data: {
        name: 'VAYRAN Enterprise',
        legalName: 'Vayran Inc.',
        industry: 'Software',
        headquarters: 'San Francisco, CA'
      }
    });
  }

  const branchesCount = await prisma.branch.count({ where: { companyId: company.id } });
  const deptsCount = await prisma.department.count({ where: { companyId: company.id } });
  const unitsCount = await prisma.businessUnit.count({ where: { companyId: company.id } });

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Company Overview</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Macro-level view of {company.name}'s organizational structure.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-secondary" style={{ padding: '8px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>Download Org Chart</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <KpiCard title="Active Branches" value={branchesCount.toString()} trend="up" trendValue="1" sparklineData={[1, 1, 2, 2, 3, branchesCount]} color="var(--primary)" />
        <KpiCard title="Business Units" value={unitsCount.toString()} trend="up" trendValue="0" sparklineData={[0, 0, 1, 1, unitsCount, unitsCount]} color="var(--accent)" />
        <KpiCard title="Departments" value={deptsCount.toString()} trend="up" trendValue="2" sparklineData={[2, 3, 4, deptsCount, deptsCount, deptsCount]} color="var(--info)" />
        <KpiCard title="Org Health Score" value="98%" trend="up" trendValue="2.1%" sparklineData={[80, 85, 90, 92, 95, 98]} color="var(--success)" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div className="glass-card">
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Company Profile Summary</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>Legal Name</div>
              <div style={{ fontWeight: 500 }}>{company.legalName || 'N/A'}</div>
            </div>
            <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>Headquarters</div>
              <div style={{ fontWeight: 500 }}>{company.headquarters || 'N/A'}</div>
            </div>
            <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>Industry</div>
              <div style={{ fontWeight: 500 }}>{company.industry || 'N/A'}</div>
            </div>
            <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>Status</div>
              <div style={{ fontWeight: 500, color: 'var(--success)' }}>{company.status}</div>
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.05) 0%, rgba(79, 70, 229, 0.05) 100%)', border: '1px solid rgba(79, 70, 229, 0.2)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--primary)', marginBottom: '16px' }}>AI Structure Analysis</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
            The organizational hierarchy is currently flat. VAYRAN AI recommends establishing Business Units to categorize the {deptsCount} unassigned departments for better cost-center tracking.
          </p>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent)' }}>+ Create Recommended Units</div>
        </div>
      </div>
    </div>
  );
}
