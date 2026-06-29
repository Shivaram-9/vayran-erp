import React from 'react';
import { FileTextIcon, ClockIcon } from '@/components/Icons';

export const dynamic = 'force-dynamic';

export default function SlaManagementPage() {
  const policies = [
    { name: 'Critical Approval Timeout', target: 'Finance & HR', time: '24 Hours', action: 'Escalate to VP', status: 'Active' },
    { name: 'Standard IT Request', target: 'IT Support', time: '48 Hours', action: 'Send Reminder', status: 'Active' },
    { name: 'Vendor Onboarding Review', target: 'Procurement', time: '72 Hours', action: 'Escalate to CPO', status: 'Inactive' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '32px 32px 0', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px' }}><FileTextIcon /></div> SLA Policies
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Define Service Level Agreements (SLAs) to enforce response and resolution times for human-in-the-loop tasks.</p>
        </div>
        <div>
          <button className="btn-primary">Create Policy</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '32px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
          {policies.map((policy, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600 }}>{policy.name}</h3>
                {policy.status === 'Active' ? (
                  <span style={{ padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600, background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>Active</span>
                ) : (
                  <span style={{ padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600, background: 'rgba(107, 114, 128, 0.1)', color: 'var(--text-secondary)' }}>Inactive</span>
                )}
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                  <div style={{ width: '16px', height: '16px', color: 'var(--text-secondary)' }}><ClockIcon /></div>
                  <span style={{ fontWeight: 600, color: 'var(--warning)' }}>Max Time: {policy.time}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Target Module:</span>
                  <span style={{ fontWeight: 600 }}>{policy.target}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Breach Action:</span>
                  <span style={{ fontWeight: 600, color: 'var(--danger)' }}>{policy.action}</span>
                </div>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                <button className="btn-secondary" style={{ width: '100%' }}>Edit Policy</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
