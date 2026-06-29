'use client';

import React, { useState } from 'react';
import { EnterpriseDataTable, Column } from '@/components/DataTable';
import { SlideOverPanel } from '@/components/SlideOverPanel';
import { ModalDialog } from '@/components/ModalDialog';
import { createBranch, deleteBranch } from './actions';
import { useToast } from '@/components/Toast';

export default function BranchesClient({ initialBranches }: { initialBranches: any[] }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', code: '', city: '', country: '', manager: '', timezone: '' });
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useToast();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await createBranch(formData);
    showToast('Branch location created successfully.', 'success');
    setIsSaving(false);
    setIsPanelOpen(false);
    setFormData({ name: '', code: '', city: '', country: '', manager: '', timezone: '' });
  };

  const handleDelete = async () => {
    if (!branchToDelete) return;
    await deleteBranch(branchToDelete);
    showToast('Branch deleted permanently.', 'success');
    setBranchToDelete(null);
  };

  const columns: Column[] = [
    { key: 'name', label: 'Branch Name', render: (r) => <div style={{ fontWeight: 600 }}>{r.name}</div> },
    { key: 'code', label: 'Code', render: (r) => <span style={{ padding: '2px 6px', background: 'var(--bg-secondary)', borderRadius: '4px', fontSize: '12px' }}>{r.code}</span> },
    { key: 'location', label: 'Location', render: (r) => `${r.city}, ${r.country}` },
    { key: 'manager', label: 'Manager' },
    { key: 'status', label: 'Status', render: (r) => <span style={{ color: 'var(--success)', fontWeight: 600, fontSize: '12px' }}>{r.status}</span> },
    { key: 'actions', label: '', render: (r) => (
      <button 
        onClick={(e) => { e.stopPropagation(); setBranchToDelete(r.id); }}
        style={{ color: 'var(--danger)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px' }}
      >
        Delete
      </button>
    )}
  ];

  const primaryAction = (
    <button className="btn" onClick={() => setIsPanelOpen(true)}>
      + Add Branch
    </button>
  );

  return (
    <>
      <EnterpriseDataTable 
        columns={columns} 
        data={initialBranches} 
        searchPlaceholder="Search branches by name, city, or code..."
        primaryAction={primaryAction}
      />

      {/* Create Branch Slide-Over */}
      <SlideOverPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} title="Add New Branch">
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="floating-input-group">
            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder=" " required />
            <label>Branch Name *</label>
          </div>
          
          <div className="floating-input-group">
            <input type="text" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} placeholder=" " required />
            <label>Branch Code (e.g. LON-01) *</label>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="floating-input-group">
              <input type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} placeholder=" " required />
              <label>City</label>
            </div>
            <div className="floating-input-group">
              <input type="text" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} placeholder=" " required />
              <label>Country</label>
            </div>
          </div>

          <div className="floating-input-group">
            <input type="text" value={formData.manager} onChange={e => setFormData({...formData, manager: e.target.value})} placeholder=" " />
            <label>Branch Manager</label>
          </div>

          <div className="floating-input-group">
            <input type="text" value={formData.timezone} onChange={e => setFormData({...formData, timezone: e.target.value})} placeholder=" " />
            <label>Timezone (e.g. GMT, EST)</label>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button type="button" className="btn-secondary" onClick={() => setIsPanelOpen(false)} style={{ padding: '10px 16px', borderRadius: 'var(--radius-sm)' }}>Cancel</button>
            <button type="submit" className="btn" disabled={isSaving}>{isSaving ? 'Saving...' : 'Create Branch'}</button>
          </div>
        </form>
      </SlideOverPanel>

      {/* Delete Confirmation Modal */}
      <ModalDialog 
        isOpen={!!branchToDelete} 
        onClose={() => setBranchToDelete(null)}
        title="Delete Branch"
        type="danger"
        primaryAction={
          <button className="btn" style={{ background: 'var(--danger)' }} onClick={handleDelete}>Delete Branch</button>
        }
      >
        Are you sure you want to permanently delete this branch? This action cannot be undone and may affect employees associated with this location.
      </ModalDialog>
    </>
  );
}
