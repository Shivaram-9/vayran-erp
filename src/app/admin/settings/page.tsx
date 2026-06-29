import React from 'react';
import { SettingsIcon, BoxIcon, ClockIcon, BanknoteIcon } from '@/components/Icons';

export const dynamic = 'force-dynamic';

export default function SystemSettingsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '32px 32px 0', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SettingsIcon /> Global System Settings
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Configure company defaults, regional settings, and branding.</p>
        </div>
        <div>
          <button className="btn-primary">Save Changes</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Branding */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BoxIcon /> Branding & Appearance
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Primary Color</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="color" defaultValue="#6366f1" style={{ width: '40px', height: '40px', padding: '0', border: 'none', borderRadius: '4px' }} />
                <input type="text" className="form-input" defaultValue="#6366f1" style={{ flex: 1 }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Company Logo</label>
              <div style={{ padding: '16px', border: '1px dashed var(--border-color)', borderRadius: '8px', textAlign: 'center', background: 'var(--bg-secondary)', cursor: 'pointer' }}>
                <span style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 600 }}>Click to upload</span>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>SVG, PNG, JPG (max 2MB)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Settings */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ClockIcon /> Regional & Format Defaults
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>System Timezone</label>
              <select className="form-input" defaultValue="UTC">
                <option value="UTC">UTC (Coordinated Universal Time)</option>
                <option value="America/New_York">EST (New York)</option>
                <option value="Europe/London">GMT (London)</option>
                <option value="Asia/Tokyo">JST (Tokyo)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Base Currency</label>
              <select className="form-input" defaultValue="USD">
                <option value="USD">USD ($) - US Dollar</option>
                <option value="EUR">EUR (€) - Euro</option>
                <option value="GBP">GBP (£) - British Pound</option>
                <option value="JPY">JPY (¥) - Japanese Yen</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Date Format</label>
              <select className="form-input" defaultValue="MM/DD/YYYY">
                <option value="MM/DD/YYYY">MM/DD/YYYY (12/31/2026)</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY (31/12/2026)</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD (2026-12-31)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Fiscal Year Start</label>
              <select className="form-input" defaultValue="Jan">
                <option value="Jan">January 1st</option>
                <option value="Apr">April 1st</option>
                <option value="Jul">July 1st</option>
                <option value="Oct">October 1st</option>
              </select>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
