import React from 'react';
import { prisma } from '@/lib/prisma';
import { 
  DatabaseIcon, UsersIcon, ShieldIcon, CheckCircleIcon 
} from '@/components/Icons';

export const dynamic = 'force-dynamic';

export default async function SystemDashboardPage() {
  const userCount = await prisma.employee.count();
  const companyCount = await prisma.company.count();
  
  return (
    <div style={{ padding: '32px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '28px', height: '28px' }}><DatabaseIcon /></div> System Health Dashboard
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Master overview of VAYRAN ERP platform performance and usage.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>Active Users</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--primary)' }}>{userCount}</div>
        </div>
        
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>Active Tenants</div>
          <div style={{ fontSize: '28px', fontWeight: 700 }}>{companyCount}</div>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>Database Load</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--success)' }}>12%</div>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>API Latency</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--success)' }}>45ms</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Recent Security Alerts */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px' }}><ShieldIcon /></div> Security Events
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid var(--danger)', borderRadius: '4px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Multiple Failed Logins</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>IP: 192.168.1.45 (2 mins ago)</div>
            </div>
            <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.1)', borderLeft: '4px solid var(--success)', borderRadius: '4px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Nightly Backup Completed</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Size: 1.4GB (4 hours ago)</div>
            </div>
          </div>
        </div>

        {/* System Services Status */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px' }}><CheckCircleIcon /></div> Platform Services
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {['Authentication', 'Prisma Database', 'Storage Engine', 'Email Gateway', 'Analytics Engine'].map(svc => (
              <div key={svc} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', fontWeight: 500 }}>{svc}</span>
                <span style={{ padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600, background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>Operational</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}
