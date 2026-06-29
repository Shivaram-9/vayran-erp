'use client';

import React, { useState } from 'react';
import { EnterpriseDataTable, Column } from '@/components/DataTable';
import { SlideOverPanel } from '@/components/SlideOverPanel';
import { ModalDialog } from '@/components/ModalDialog';
import { createBusinessUnit, deleteBusinessUnit } from './actions';
import { useToast } from '@/components/Toast';

export default function BUClient({ initialUnits }: { initialUnits: any[] }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [unitToDelete, setUnitToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', code: '', head: '', description: '' });
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useToast();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await createBusinessUnit(formData);
    showToast('Business Unit created successfully.', 'success');
    setIsSaving(false);
    setIsPanelOpen(false);
    setFormData({ name: '', code: '', head: '', description: '' });
  };

  const handleDelete = async () => {
    if (!unitToDelete) return;
    await deleteBusinessUnit(unitToDelete);
    showToast('Business Unit deleted.', 'success');
    setUnitToDelete(null);
  };

  const columns: Column[] = [
    { key: 'name', label: 'Unit Name', render: (r) => <div style={{ fontWeight: 600 }}>{r.name}</div> },
    { key: 'code', label: 'Code', render: (r) => <span style={{ padding: '2px 6px', background: 'var(--bg-secondary)', borderRadius: '4px', fontSize: '12px' }}>{r.code}</span> },
    { key: 'head', label: 'Unit Head' },
    { key: 'description', label: 'Description', render: (r) => <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{r.description || 'N/A'}</span> },
    { key: 'status', label: 'Status', render: (r) => <span style={{ color: 'var(--success)', fontWeight: 600, fontSize: '12px' }}>{r.status}</span> },
    { key: 'actions', label: '', render: (r) => (
      <button 
        onClick={(e) => { e.stopPropagation(); setUnitToDelete(r.id); }}
        style={{ color: 'var(--danger)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px' }}
      >
        Delete
      </button>
    )}
  ];

  const primaryAction = (
    <button className="btn" onClick={() => setIsPanelOpen(true)}>
      + Add Business Unit
    </button>
  );

  return (
    <>
      <EnterpriseDataTable 
        columns={columns} 
        data={initialUnits} 
        searchPlaceholder="Search business units..."
        primaryAction={primaryAction}
      />

      <SlideOverPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} title="Add Business Unit">
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="floating-input-group">
            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder=" " required />
            <label>Unit Name *</label>
          </div>
          
          <div className="floating-input-group">
            <input type="text" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} placeholder=" " required />
            <label>Code (e.g. BU-TECH) *</label>
          </div>

          <div className="floating-input-group">
            <input type="text" value={formData.head} onChange={e => setFormData({...formData, head: e.target.value})} placeholder=" " />
            <label>Unit Head (VP / Director)</label>
          </div>

          <div className="floating-input-group">
            <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder=" " rows={4} style={{ width: '100%', padding: '20px 16px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-primary)', resize: 'none' }}></textarea>
            <label style={{ top: '6px', fontSize: '11px', color: 'var(--secondary)', fontWeight: 600 }}>Description</label>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button type="button" className="btn-secondary" onClick={() => setIsPanelOpen(false)} style={{ padding: '10px 16px', borderRadius: 'var(--radius-sm)' }}>Cancel</button>
            <button type="submit" className="btn" disabled={isSaving}>{isSaving ? 'Saving...' : 'Create Unit'}</button>
          </div>
        </form>
      </SlideOverPanel>

      <ModalDialog 
        isOpen={!!unitToDelete} 
        onClose={() => setUnitToDelete(null)}
        title="Delete Business Unit"
        type="danger"
        primaryAction={<button className="btn" style={{ background: 'var(--danger)' }} onClick={handleDelete}>Delete</button>}
      >
        Are you sure? This will affect all associated divisions and departments.
      </ModalDialog>
    </>
  );
}
