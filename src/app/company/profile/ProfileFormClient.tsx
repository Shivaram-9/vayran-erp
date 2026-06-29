'use client';

import React, { useState } from 'react';
import { updateCompanyProfile } from './actions';
import { useToast } from '@/components/Toast';
import { BuildingIcon } from '@/components/Icons';

export default function ProfileFormClient({ initialData }: { initialData: any }) {
  const [formData, setFormData] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateCompanyProfile(formData);
    showToast('Company profile updated successfully.', 'success');
    setIsSaving(false);
  };

  const FloatingInput = ({ label, name, type = 'text', required = false }: any) => (
    <div className="floating-input-group">
      <input 
        type={type} name={name} id={name} 
        value={formData[name] || ''} onChange={handleChange} 
        placeholder=" " required={required} 
      />
      <label htmlFor={name}>{label} {required && <span style={{ color: 'var(--danger)' }}>*</span>}</label>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* General Information */}
        <div className="glass-card">
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>General Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <FloatingInput label="Legal Company Name" name="legalName" required />
            <FloatingInput label="Industry" name="industry" />
            <FloatingInput label="Registration Number" name="registrationNo" />
            <FloatingInput label="Tax ID / EIN" name="taxId" />
          </div>
        </div>

        {/* Contact & Location */}
        <div className="glass-card">
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>Contact & Location</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <FloatingInput label="Official Website" name="website" type="url" />
            <FloatingInput label="Support Email" name="email" type="email" />
            <FloatingInput label="Corporate Phone" name="phone" />
            <FloatingInput label="Headquarters Address" name="headquarters" />
            <FloatingInput label="Country" name="country" />
          </div>
        </div>

        {/* Regional Settings */}
        <div className="glass-card">
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>Regional Settings</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            <div className="floating-input-group">
              <select name="currency" value={formData.currency || ''} onChange={handleChange} style={{ width: '100%', padding: '20px 16px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-primary)' }}>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="INR">INR (₹)</option>
              </select>
              <label>Base Currency</label>
            </div>
            <FloatingInput label="Timezone" name="timezone" />
            <div className="floating-input-group">
              <select name="fiscalYearStart" value={formData.fiscalYearStart || ''} onChange={handleChange} style={{ width: '100%', padding: '20px 16px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-primary)' }}>
                <option value="January">January</option>
                <option value="April">April</option>
                <option value="July">July</option>
              </select>
              <label>Fiscal Year Start</label>
            </div>
          </div>
        </div>

        <div>
          <button type="submit" className="btn" disabled={isSaving} style={{ padding: '12px 24px' }}>
            {isSaving ? 'Saving...' : 'Save Configuration'}
          </button>
        </div>
      </div>

      {/* Right Sidebar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', border: '1px dashed var(--border-color)' }}>
            <BuildingIcon />
          </div>
          <h4 style={{ fontWeight: 600 }}>Company Logo</h4>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px', marginBottom: '16px' }}>Upload a high-res SVG or PNG logo.</p>
          <button type="button" className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', borderRadius: 'var(--radius-sm)' }}>Upload Logo</button>
        </div>

        <div className="glass-card">
          <h4 style={{ fontWeight: 600, marginBottom: '12px' }}>Audit Trail</h4>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-color)' }}>
              <span>Created</span>
              <span style={{ fontWeight: 500 }}>{new Date(initialData.createdAt).toLocaleDateString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
              <span>Last Modified</span>
              <span style={{ fontWeight: 500 }}>{new Date(initialData.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
