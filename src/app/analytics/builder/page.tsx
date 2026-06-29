'use client';

import React, { useState } from 'react';
import { SettingsIcon, SearchIcon, PlusIcon, BarChartIcon, CheckIcon } from '@/components/Icons';

export default function ReportBuilderPage() {
  const [selectedModule, setSelectedModule] = useState('Finance');
  const modules = ['Finance', 'HR', 'Projects', 'Inventory', 'Company'];
  
  const [fields, setFields] = useState(['Revenue', 'Expenses', 'Net Profit', 'Date']);
  const [selectedFields, setSelectedFields] = useState(['Revenue', 'Date']);

  const toggleField = (f: string) => {
    if (selectedFields.includes(f)) {
      setSelectedFields(selectedFields.filter(x => x !== f));
    } else {
      setSelectedFields([...selectedFields, f]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '32px 32px 0', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SettingsIcon /> Custom Report Builder
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Drag & Drop fields to create dynamic, scheduled reports.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-secondary">Schedule Report</button>
          <button className="btn-primary">Save Configuration</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '32px', display: 'flex', gap: '24px' }}>
        
        {/* Left Panel: Data Source */}
        <div className="glass-card" style={{ width: '300px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Data Source</h3>
            <select 
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
            >
              {modules.map(m => <option key={m} value={m}>{m} Module</option>)}
            </select>
          </div>
          
          <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Available Fields</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {fields.map(f => (
                <div 
                  key={f} 
                  onClick={() => toggleField(f)}
                  style={{ 
                    padding: '12px', 
                    background: selectedFields.includes(f) ? 'rgba(59, 130, 246, 0.1)' : 'var(--bg-secondary)', 
                    border: `1px solid ${selectedFields.includes(f) ? 'var(--primary)' : 'var(--border-color)'}`,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '13px'
                  }}
                >
                  {f}
                  {selectedFields.includes(f) && <div style={{ color: 'var(--primary)', width: '14px' }}><CheckIcon /></div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel: Canvas */}
        <div className="glass-card" style={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', color: 'var(--text-secondary)', opacity: 0.3, marginBottom: '16px' }}>
            <BarChartIcon />
          </div>
          <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Report Canvas</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '400px' }}>
            Select fields from the left panel to begin building your custom visualization.
          </p>
          
          {selectedFields.length > 0 && (
            <div style={{ marginTop: '32px', display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {selectedFields.map(f => (
                <div key={f} style={{ padding: '6px 16px', background: 'var(--primary)', color: 'white', borderRadius: '16px', fontSize: '12px', fontWeight: 600 }}>
                  {f}
                </div>
              ))}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
