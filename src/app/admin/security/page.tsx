import React from 'react';
import { ShieldIcon, ClockIcon, UsersIcon } from '@/components/Icons';

export const dynamic = 'force-dynamic';

export default function SecurityCenterPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '32px 32px 0', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldIcon /> Security Center
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage Two-Factor Authentication, Session Policies, and IP restrictions.</p>
        </div>
        <div>
          <button className="btn-primary">Enforce Policies</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Authentication Policies */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UsersIcon /> Authentication Policies
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '14px' }}>Two-Factor Authentication (2FA)</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Require all users to use 2FA via Authenticator App or SMS.</div>
              </div>
              <div style={{ width: '44px', height: '24px', background: 'var(--primary)', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}>
                <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px' }}></div>
              </div>
            </div>

            <hr style={{ borderTop: '1px solid var(--border-color)', margin: '8px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '14px' }}>Password Expiration</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Force users to change their password every 90 days.</div>
              </div>
              <div style={{ width: '44px', height: '24px', background: 'var(--border-color)', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}>
                <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px' }}></div>
              </div>
            </div>

          </div>
        </div>

        {/* Session Management */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ClockIcon /> Session Management
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', maxWidth: '600px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Idle Session Timeout</label>
              <select className="form-input" defaultValue="30">
                <option value="15">15 Minutes</option>
                <option value="30">30 Minutes</option>
                <option value="60">1 Hour</option>
                <option value="0">Never Timeout</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Maximum Failed Logins</label>
              <select className="form-input" defaultValue="5">
                <option value="3">3 Attempts (Lock 15 mins)</option>
                <option value="5">5 Attempts (Lock 30 mins)</option>
                <option value="10">10 Attempts (Lock 1 hour)</option>
              </select>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
