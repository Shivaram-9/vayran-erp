import React from 'react';
import { SparklesIcon, CheckCircleIcon } from '@/components/Icons';

export const dynamic = 'force-dynamic';

export default function IntegrationsPage() {
  const integrations = [
    { name: 'Microsoft 365', category: 'Productivity', status: 'Active', description: 'SSO and Calendar sync.' },
    { name: 'Google Workspace', category: 'Productivity', status: 'Inactive', description: 'SSO and Drive integration.' },
    { name: 'Slack', category: 'Communication', status: 'Active', description: 'Real-time alerts and notifications.' },
    { name: 'Stripe', category: 'Finance', status: 'Active', description: 'Payment processing gateway.' },
    { name: 'GitHub', category: 'Development', status: 'Inactive', description: 'Repository sync for Project Management.' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '32px 32px 0', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SparklesIcon /> Integration Center
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage API keys, webhooks, and third-party software connections.</p>
        </div>
        <div>
          <button className="btn-primary">Add Integration</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '32px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {integrations.map((integration, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600 }}>{integration.name}</h3>
                {integration.status === 'Active' ? (
                  <span style={{ padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600, background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>Active</span>
                ) : (
                  <span style={{ padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600, background: 'rgba(107, 114, 128, 0.1)', color: 'var(--text-secondary)' }}>Inactive</span>
                )}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase' }}>
                {integration.category}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                {integration.description}
              </div>
              <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                <button className="btn-secondary" style={{ width: '100%' }}>
                  {integration.status === 'Active' ? 'Configure' : 'Connect'}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
