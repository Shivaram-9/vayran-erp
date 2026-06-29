'use client';

import { useState, useTransition } from 'react';
import { useToast } from "@/components/Toast";
import { saveSetting, inviteUser } from '@/app/actions';

export default function SettingsClient({ initialSettings, initialUsers }: { initialSettings: Record<string, string>, initialUsers: any[] }) {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  const [isPending, startTransition] = useTransition();

  const [companyName, setCompanyName] = useState(initialSettings['companyName'] || 'VAYRAN Corp');
  const [supportEmail, setSupportEmail] = useState(initialSettings['supportEmail'] || 'support@vayran.com');

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'users', label: 'Users & Roles' },
    { id: 'security', label: 'Security & 2FA' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'billing', label: 'Billing' },
  ];

  function handleSaveGeneral() {
    startTransition(async () => {
      await saveSetting('companyName', companyName);
      await saveSetting('supportEmail', supportEmail);
      showToast("General settings saved successfully!", "success");
    });
  }

  function handleInviteUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const role = formData.get('role') as string;
    
    startTransition(async () => {
      await inviteUser(email, role);
      showToast("Invite sent successfully!", "success");
    });
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>System Settings</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage roles, integrations, and preferences.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '32px' }}>
        <div className="glass-card" style={{ padding: '16px' }}>
          <ul style={{ listStyle: 'none' }}>
            {tabs.map((tab) => (
              <li key={tab.id} style={{ marginBottom: '8px' }}>
                <button 
                  onClick={() => setActiveTab(tab.id)}
                  style={{ 
                    width: '100%', textAlign: 'left', padding: '12px 16px', 
                    borderRadius: 'var(--radius-sm)', border: 'none', 
                    background: activeTab === tab.id ? 'var(--bg-primary)' : 'transparent',
                    color: activeTab === tab.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    fontWeight: activeTab === tab.id ? 600 : 400,
                    cursor: 'pointer', transition: 'all 0.2s'
                  }}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card">
          {activeTab === 'general' && (
            <div>
              <h2 style={{ fontSize: '18px', marginBottom: '24px' }}>General Settings</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Company Name</label>
                  <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Support Email</label>
                  <input type="email" value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
                </div>
                <button className="btn" style={{ width: 'fit-content' }} onClick={handleSaveGeneral} disabled={isPending}>
                  {isPending ? 'Saving...' : 'Save General Settings'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2 style={{ fontSize: '18px', marginBottom: '24px' }}>Users & Roles</h2>
              <form onSubmit={handleInviteUser} style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                <input type="email" name="email" placeholder="Email Address" required style={{ padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', flex: 1 }} />
                <select name="role" style={{ padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
                  <option value="Admin">Admin</option>
                  <option value="HR">HR</option>
                  <option value="Employee">Employee</option>
                </select>
                <button type="submit" className="btn" disabled={isPending}>{isPending ? 'Sending...' : 'Invite User'}</button>
              </form>
              
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                    <th style={{ padding: '12px 8px' }}>User Email</th>
                    <th style={{ padding: '12px 8px' }}>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {initialUsers.map(user => (
                    <tr key={user.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: 500 }}>{user.email}</td>
                      <td style={{ padding: '12px 8px', color: 'var(--text-secondary)' }}>{user.role}</td>
                    </tr>
                  ))}
                  {initialUsers.length === 0 && (
                    <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: 500 }}>System Owner</td>
                      <td style={{ padding: '12px 8px', color: 'var(--text-secondary)' }}>Admin</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <h2 style={{ fontSize: '18px', marginBottom: '24px' }}>Security & 2FA</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <strong style={{ display: 'block', marginBottom: '4px' }}>Two-Factor Authentication (2FA)</strong>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Add an extra layer of security to your account.</span>
                </div>
                <button className="btn" onClick={() => showToast("2FA Setup initiated.", "info")}>Enable 2FA</button>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div>
              <h2 style={{ fontSize: '18px', marginBottom: '24px' }}>Integrations</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Connect VAYRAN ERP with your favorite tools.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
                <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                  <strong>Slack</strong>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '8px 0' }}>Get notifications in Slack.</p>
                  <button style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', color: 'var(--text-primary)' }} onClick={() => showToast("Slack connected!")}>Connect</button>
                </div>
                <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                  <strong>Google Workspace</strong>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '8px 0' }}>Sync docs and calendar.</p>
                  <button style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', color: 'var(--text-primary)' }} onClick={() => showToast("Google Workspace connected!")}>Connect</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div>
              <h2 style={{ fontSize: '18px', marginBottom: '24px' }}>Billing</h2>
              <div style={{ padding: '24px', background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--accent-primary)' }}>
                <h3 style={{ marginBottom: '8px' }}>Enterprise Plan</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>You are currently on the Enterprise plan.</p>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>$499 <span style={{ fontSize: '14px', fontWeight: 'normal', color: 'var(--text-secondary)' }}>/ month</span></div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
