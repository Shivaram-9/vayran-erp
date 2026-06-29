import React from 'react';
import { prisma } from '@/lib/prisma';
import { BriefcaseIcon } from '@/components/Icons';

export const dynamic = 'force-dynamic';

export default async function ProjectAnalyticsPage() {
  const activeProjects = await prisma.project.count({ where: { status: 'In Progress' } });
  const completedProjects = await prisma.project.count({ where: { status: 'Done' } });
  
  return (
    <div style={{ padding: '32px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BriefcaseIcon /> Project Insights
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Deep dive into velocity, budgets, and resource allocation.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '12px' }}>Active Projects</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)' }}>{activeProjects}</div>
        </div>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '12px' }}>Completed Projects</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--success)' }}>{completedProjects}</div>
        </div>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '12px' }}>Average Velocity</div>
          <div style={{ fontSize: '32px', fontWeight: 700 }}>42 pts</div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '48px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.2 }}><BriefcaseIcon /></div>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>Detailed Project Reports Coming Soon</h3>
        <p style={{ maxWidth: '400px', margin: '8px auto 0', fontSize: '14px' }}>
          Interactive drill-downs for burn-down charts, resource utilization, and sprint progression will be generated here.
        </p>
      </div>
    </div>
  );
}
