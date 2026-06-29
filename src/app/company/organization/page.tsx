import { prisma } from '@/lib/prisma';
import OrgChartClient from './OrgChartClient';

export const dynamic = 'force-dynamic';

export default async function OrganizationPage() {
  const company = await prisma.company.findFirst({
    include: {
      branches: true,
      businessUnits: {
        include: {
          divisions: true,
          departments: {
            include: { teams: true }
          }
        }
      },
      departments: {
        where: { businessUnitId: null },
        include: { teams: true }
      }
    }
  });
  
  if (!company) return <div>No company configured.</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '32px 32px 0', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Organization Structure</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Interactive, zooming hierarchy of the entire enterprise.</p>
        </div>
        <div>
          <button className="btn-secondary" style={{ padding: '8px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>Export as PDF</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '0 32px 32px', overflow: 'hidden' }}>
        <OrgChartClient company={company} />
      </div>
    </div>
  );
}
