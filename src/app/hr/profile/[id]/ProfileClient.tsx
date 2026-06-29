'use client';

import React, { useState } from 'react';
import { UserIcon, BriefcaseIcon, ClockIcon, FileTextIcon, BuildingIcon, BanknoteIcon } from '@/components/Icons';

export default function ProfileClient({ employee }: { employee: any }) {
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = [
    'Overview', 'Personal Information', 'Employment', 'Compensation', 
    'Attendance', 'Leave', 'Documents', 'Assets', 'Performance', 'Training'
  ];

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Profile Header */}
      <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 600 }}>
          {employee.name.charAt(0)}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 700 }}>{employee.name}</h1>
            <span style={{ padding: '4px 12px', background: 'rgba(16,185,129,0.1)', color: 'var(--success)', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>
              {employee.status}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '24px', color: 'var(--text-secondary)', fontSize: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><BriefcaseIcon /> {employee.jobTitle}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><BuildingIcon /> {employee.department?.name || 'No Department'}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><UserIcon /> ID: {employee.employeeCode}</div>
          </div>
        </div>
        <div>
          <button className="btn">Edit Profile</button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', overflowX: 'auto' }}>
        {tabs.map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: activeTab === tab ? 'var(--bg-card)' : 'transparent',
              border: activeTab === tab ? '1px solid var(--border-color)' : '1px solid transparent',
              color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-secondary)',
              padding: '8px 16px', borderRadius: '16px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content Area */}
      <div className="glass-card" style={{ minHeight: '400px' }}>
        {activeTab === 'Overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Reporting Line</div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Manager</div>
                <div style={{ fontWeight: 500 }}>{employee.manager?.name || 'None'}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Team</div>
                <div style={{ fontWeight: 500 }}>{employee.team?.name || 'Unassigned'}</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Key Metrics</div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Attendance Rate</div>
                <div style={{ fontWeight: 500, color: 'var(--success)' }}>98.5%</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Leave Balance</div>
                <div style={{ fontWeight: 500 }}>14 Days</div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'Personal Information' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '24px' }}>Contact Information</h3>
              <div className="floating-input-group"><input type="text" placeholder=" " value="john.doe@vayran.com" readOnly/><label>Email Address</label></div>
              <div className="floating-input-group" style={{ marginTop: '16px' }}><input type="text" placeholder=" " value="+1 (555) 019-2831" readOnly/><label>Phone Number</label></div>
            </div>
          </div>
        )}

        {activeTab !== 'Overview' && activeTab !== 'Personal Information' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', color: 'var(--text-secondary)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.2 }}><ClockIcon /></div>
            <h3 style={{ fontWeight: 600 }}>{activeTab} Module</h3>
            <p style={{ fontSize: '14px' }}>This enterprise sub-module will be activated in Phase 5 integration.</p>
          </div>
        )}
      </div>

    </div>
  );
}
