'use client';

import React, { useState } from 'react';
import { EnterpriseDataTable, Column } from '@/components/DataTable';
import { SlideOverPanel } from '@/components/SlideOverPanel';
import { ModalDialog } from '@/components/ModalDialog';
import { createDepartment, deleteDepartment } from './actions';
import { useToast } from '@/components/Toast';

export default function DeptsClient({ initialDepts }: { initialDepts: any[] }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [deptToDelete, setDeptToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', code: '', head: '', costCenter: '', budget: '' });
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useToast();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await createDepartment(formData);
    showToast('Department created successfully.', 'success');
    setIsSaving(false);
    setIsPanelOpen(false);
    setFormData({ name: '', code: '', head: '', costCenter: '', budget: '' });
  };

  const handleDelete = async () => {
    if (!deptToDelete) return;
    await deleteDepartment(deptToDelete);
    showToast('Department deleted.', 'success');
    setDeptToDelete(null);
  };

  const columns: Column[] = [
    { key: 'name', label: 'Department Name', render: (r) => <div style={{ fontWeight: 600 }}>{r.name}</div> },
    { key: 'code', label: 'Code', render: (r) => <span style={{ padding: '2px 6px', background: 'var(--bg-secondary)', borderRadius: '4px', fontSize: '12px' }}>{r.code}</span> },
    { key: 'head', label: 'Department Head' },
    { key: 'costCenter', label: 'Cost Center' },
    { key: 'budget', label: 'Budget', render: (r) => `$${r.budget.toLocaleString()}` },
    { key: 'status', label: 'Status', render: (r) => <span style={{ color: 'var(--success)', fontWeight: 600, fontSize: '12px' }}>{r.status}</span> },
    { key: 'actions', label: '', render: (r) => (
      <button 
        onClick={(e) => { e.stopPropagation(); setDeptToDelete(r.id); }}
        style={{ color: 'var(--danger)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px' }}
      >
        Delete
      </button>
    )}
  ];

  const primaryAction = (
    <button className="btn" onClick={() => setIsPanelOpen(true)}>
      + Add Department
    </button>
  );

  return (
    <>
      <EnterpriseDataTable 
        columns={columns} 
        data={initialDepts} 
        searchPlaceholder="Search departments..."
        primaryAction={primaryAction}
      />

      <SlideOverPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} title="Add Department">
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="floating-input-group">
            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder=" " required />
            <label>Department Name *</label>
          </div>
          
          <div className="floating-input-group">
            <input type="text" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} placeholder=" " required />
            <label>Code (e.g. DPT-ENG) *</label>
          </div>

          <div className="floating-input-group">
            <input type="text" value={formData.head} onChange={e => setFormData({...formData, head: e.target.value})} placeholder=" " />
            <label>Department Head</label>
          </div>

          <div className="floating-input-group">
            <input type="text" value={formData.costCenter} onChange={e => setFormData({...formData, costCenter: e.target.value})} placeholder=" " />
            <label>Cost Center Code</label>
          </div>

          <div className="floating-input-group">
            <input type="number" value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} placeholder=" " />
            <label>Annual Budget ($)</label>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button type="button" className="btn-secondary" onClick={() => setIsPanelOpen(false)} style={{ padding: '10px 16px', borderRadius: 'var(--radius-sm)' }}>Cancel</button>
            <button type="submit" className="btn" disabled={isSaving}>{isSaving ? 'Saving...' : 'Create Department'}</button>
          </div>
        </form>
      </SlideOverPanel>

      <ModalDialog 
        isOpen={!!deptToDelete} 
        onClose={() => setDeptToDelete(null)}
        title="Delete Department"
        type="danger"
        primaryAction={<button className="btn" style={{ background: 'var(--danger)' }} onClick={handleDelete}>Delete</button>}
      >
        Are you sure? This will delete the department and affect associated teams.
      </ModalDialog>
    </>
  );
}
