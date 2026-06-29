import React from 'react';
import { prisma } from '@/lib/prisma';
import { BarChartIcon, CheckCircleIcon, ClockIcon } from '@/components/Icons';

export const dynamic = 'force-dynamic';

export default async function WorkflowDashboardPage() {
  const activeInstances = await prisma.workflowInstance.count({ where: { status: 'IN_PROGRESS' } });
  const pendingApprovals = await prisma.approvalRequest.count({ where: { status: 'PENDING' } });
  const totalTemplates = await prisma.workflowTemplate.count();

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '28px', height: '28px' }}><BarChartIcon /></div> Workflow Engine Dashboard
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Master overview of active automations, background processes, and bottlenecks.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>Active Instances</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--primary)' }}>{activeInstances}</div>
        </div>
        
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>Pending Approvals</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--warning)' }}>{pendingApprovals}</div>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>Automations Blocked (SLA)</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--danger)' }}>0</div>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>Templates Deployed</div>
          <div style={{ fontSize: '28px', fontWeight: 700 }}>{totalTemplates}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Recent Automation Executions */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px' }}><ClockIcon /></div> Recent Automations
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.1)', borderLeft: '4px solid var(--success)', borderRadius: '4px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>New Employee Onboarding - John Doe</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Completed automatically (2 mins ago)</div>
            </div>
            <div style={{ padding: '12px', background: 'rgba(245, 158, 11, 0.1)', borderLeft: '4px solid var(--warning)', borderRadius: '4px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Hardware Request #REQ-829</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Paused: Pending Manager Approval</div>
            </div>
            <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.1)', borderLeft: '4px solid var(--success)', borderRadius: '4px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Q3 Marketing Budget Approval</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Completed (1 hr ago)</div>
            </div>
          </div>
        </div>

        {/* Engine Status */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px' }}><CheckCircleIcon /></div> Execution Engine Status
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {['Trigger Daemon', 'State Machine', 'SLA Monitor', 'Notification Gateway'].map(svc => (
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
