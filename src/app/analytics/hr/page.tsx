import React from 'react';
import { prisma } from '@/lib/prisma';
import { UsersIcon, CheckCircleIcon } from '@/components/Icons';

export const dynamic = 'force-dynamic';

export default async function HRAnalyticsPage() {
  const employeeCount = await prisma.employee.count();
  const activeEmployees = await prisma.employee.count({ where: { status: 'Active' } });
  
  return (
    <div style={{ padding: '32px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UsersIcon /> HR & Workforce Analytics
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Deep dive into headcount, attrition, and performance.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '12px' }}>Total Headcount</div>
          <div style={{ fontSize: '32px', fontWeight: 700 }}>{employeeCount}</div>
        </div>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '12px' }}>Active Employees</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--success)' }}>{activeEmployees}</div>
        </div>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '12px' }}>Retention Rate</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)' }}>96.4%</div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '48px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.2 }}><UsersIcon /></div>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>Detailed HR Reports Coming Soon</h3>
        <p style={{ maxWidth: '400px', margin: '8px auto 0', fontSize: '14px' }}>
          Interactive drill-downs for payroll, attendance, and department distribution will be generated here.
        </p>
      </div>
    </div>
  );
}
