import React from 'react';
import { prisma } from '@/lib/prisma';
import { CheckCircleIcon, ClockIcon } from '@/components/Icons';

export const dynamic = 'force-dynamic';

export default async function UnifiedApprovalsPage() {
  const pendingApprovals = await prisma.approvalRequest.findMany({
    where: { status: 'PENDING' },
    include: {
      instance: {
        include: {
          template: true,
          initiator: true
        }
      }
    },
    orderBy: { createdAt: 'asc' }
  });

  // Fallback mock data if none exist
  const displayApprovals = pendingApprovals.length > 0 ? pendingApprovals : [
    {
      id: 'mock-1',
      stepName: 'Manager Approval',
      dueDate: new Date(Date.now() + 86400000),
      instance: {
        template: { name: 'Hardware Request', category: 'IT' },
        initiator: { name: 'Alice Smith' },
        context: '{"item": "MacBook Pro M3", "reason": "Upgrade"}'
      }
    },
    {
      id: 'mock-2',
      stepName: 'Finance Review',
      dueDate: new Date(Date.now() + 172800000),
      instance: {
        template: { name: 'Q3 Marketing Budget', category: 'Finance' },
        initiator: { name: 'Bob Johnson' },
        context: '{"amount": "$50,000", "campaign": "Fall Launch"}'
      }
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '32px 32px 0', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px' }}><CheckCircleIcon /></div> Unified Approvals
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Your centralized inbox for all pending cross-module workflow approvals.</p>
        </div>
      </div>

      <div style={{ flex: 1, padding: '32px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
          {displayApprovals.map((approval: any) => (
            <div key={approval.id} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 600 }}>{approval.instance?.template?.name || 'Workflow Task'}</h3>
                  <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase', marginTop: '4px' }}>
                    {approval.instance?.template?.category || 'System'}
                  </div>
                </div>
                <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '12px', height: '12px' }}><ClockIcon /></div> Pending
                </span>
              </div>
              
              <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: '8px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Requested By:</span>
                  <span style={{ fontWeight: 600 }}>{approval.instance?.initiator?.name || 'System'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Current Step:</span>
                  <span style={{ fontWeight: 600 }}>{approval.stepName}</span>
                </div>
                {approval.dueDate && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Due Date:</span>
                    <span style={{ fontWeight: 600, color: 'var(--danger)' }}>{new Date(approval.dueDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                <button className="btn-secondary" style={{ flex: 1, borderColor: 'var(--danger)', color: 'var(--danger)' }}>Reject</button>
                <button className="btn-primary" style={{ flex: 2, background: 'var(--success)', borderColor: 'var(--success)' }}>Approve</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
