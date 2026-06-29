import { prisma } from '@/lib/prisma';
import CRMHeader from '@/components/CRMHeader';

export const dynamic = 'force-dynamic';

export default async function CRM() {
  const leads: any[] = [
    { id: 1, name: 'John Doe', company: 'TechFlow', value: 50000, status: 'New' },
    { id: 2, name: 'Jane Smith', company: 'Acme Corp', value: 12000, status: 'In Negotiation' },
    { id: 3, name: 'Bob Johnson', company: 'Global Ind.', value: 85000, status: 'Closed Won' }
  ];
  
  const newLeads = leads.filter(l => l.status === 'New');
  const inNegotiation = leads.filter(l => l.status === 'In Negotiation');
  const closedWon = leads.filter(l => l.status === 'Closed Won');

  return (
    <div>
      <CRMHeader />

      <div className="grid-dashboard">
        <div className="glass-card">
          <h2 style={{ fontSize: '16px', marginBottom: '16px', color: 'var(--text-secondary)' }}>New Leads</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {newLeads.map(lead => (
              <div key={lead.id} style={{ background: 'var(--bg-primary)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontWeight: 600 }}>{lead.company}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Contact: {lead.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Est. Value: ${lead.value.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card">
          <h2 style={{ fontSize: '16px', marginBottom: '16px', color: 'var(--info)' }}>In Negotiation</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {inNegotiation.map(lead => (
              <div key={lead.id} style={{ background: 'var(--bg-primary)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontWeight: 600 }}>{lead.company}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Contact: {lead.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Est. Value: ${lead.value.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card">
          <h2 style={{ fontSize: '16px', marginBottom: '16px', color: 'var(--success)' }}>Closed Won</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {closedWon.map(lead => (
              <div key={lead.id} style={{ background: 'var(--bg-primary)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontWeight: 600 }}>{lead.company}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Value: ${lead.value.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
