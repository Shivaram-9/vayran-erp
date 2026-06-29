import React from 'react';
import { prisma } from '@/lib/prisma';
import { FileTextIcon } from '@/components/Icons';

export const dynamic = 'force-dynamic';

export default async function AuditLogsPage() {
  // We'll mock the audit logs for demonstration if none exist in the database yet
  let logs = await prisma.auditLog.findMany({
    include: { actor: true },
    orderBy: { createdAt: 'desc' },
    take: 10
  });

  const mockLogs = [
    { id: '1', action: 'SETTINGS_UPDATED', module: 'ADMIN', details: 'Updated Base Currency to EUR', actor: { name: 'Admin User' }, createdAt: new Date() },
    { id: '2', action: 'USER_PROVISIONED', module: 'HRMS', details: 'Created account for John Doe', actor: { name: 'HR Manager' }, createdAt: new Date(Date.now() - 3600000) },
    { id: '3', action: 'INVOICE_APPROVED', module: 'FINANCE', details: 'Approved Vendor Invoice #INV-8892', actor: { name: 'Finance Lead' }, createdAt: new Date(Date.now() - 7200000) },
    { id: '4', action: 'FAILED_LOGIN', module: 'SECURITY', details: 'Invalid password attempt from 192.168.1.45', actor: { name: 'System' }, createdAt: new Date(Date.now() - 86400000) },
  ];

  const displayLogs = logs.length > 0 ? logs : mockLogs;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '32px 32px 0', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileTextIcon /> Enterprise Audit Log
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Immutable ledger of system actions, changes, and security events.</p>
        </div>
        <div>
          <button className="btn-secondary">Export CSV</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '32px' }}>
        
        <div className="glass-card" style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                <th style={{ padding: '16px', fontWeight: 600, color: 'var(--text-secondary)' }}>Timestamp</th>
                <th style={{ padding: '16px', fontWeight: 600, color: 'var(--text-secondary)' }}>Module</th>
                <th style={{ padding: '16px', fontWeight: 600, color: 'var(--text-secondary)' }}>Action</th>
                <th style={{ padding: '16px', fontWeight: 600, color: 'var(--text-secondary)' }}>Details</th>
                <th style={{ padding: '16px', fontWeight: 600, color: 'var(--text-secondary)' }}>Actor</th>
              </tr>
            </thead>
            <tbody>
              {displayLogs.map((log: any) => (
                <tr key={log.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{new Date(log.createdAt).toLocaleString()}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 700, background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)' }}>
                      {log.module}
                    </span>
                  </td>
                  <td style={{ padding: '16px', fontWeight: 600 }}>{log.action}</td>
                  <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{log.details}</td>
                  <td style={{ padding: '16px', fontWeight: 600 }}>{log.actor?.name || 'Unknown'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
