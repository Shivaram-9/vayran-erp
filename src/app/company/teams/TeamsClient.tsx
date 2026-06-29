'use client';

import React, { useState } from 'react';
import { EnterpriseDataTable, Column } from '@/components/DataTable';
import { SlideOverPanel } from '@/components/SlideOverPanel';
import { ModalDialog } from '@/components/ModalDialog';
import { createTeam, deleteTeam } from './actions';
import { useToast } from '@/components/Toast';

export default function TeamsClient({ initialTeams }: { initialTeams: any[] }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', lead: '', capacity: '', currentSprint: '' });
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useToast();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await createTeam(formData);
    showToast('Team created successfully.', 'success');
    setIsSaving(false);
    setIsPanelOpen(false);
    setFormData({ name: '', lead: '', capacity: '', currentSprint: '' });
  };

  const handleDelete = async () => {
    if (!teamToDelete) return;
    await deleteTeam(teamToDelete);
    showToast('Team deleted.', 'success');
    setTeamToDelete(null);
  };

  const columns: Column[] = [
    { key: 'name', label: 'Team Name', render: (r) => <div style={{ fontWeight: 600 }}>{r.name}</div> },
    { key: 'lead', label: 'Team Lead' },
    { key: 'capacity', label: 'Capacity (Points)' },
    { key: 'currentSprint', label: 'Current Sprint', render: (r) => <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{r.currentSprint || 'N/A'}</span> },
    { key: 'status', label: 'Status', render: (r) => <span style={{ color: 'var(--success)', fontWeight: 600, fontSize: '12px' }}>{r.status}</span> },
    { key: 'actions', label: '', render: (r) => (
      <button 
        onClick={(e) => { e.stopPropagation(); setTeamToDelete(r.id); }}
        style={{ color: 'var(--danger)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px' }}
      >
        Delete
      </button>
    )}
  ];

  const primaryAction = (
    <button className="btn" onClick={() => setIsPanelOpen(true)}>
      + Add Team
    </button>
  );

  return (
    <>
      <EnterpriseDataTable 
        columns={columns} 
        data={initialTeams} 
        searchPlaceholder="Search teams..."
        primaryAction={primaryAction}
      />

      <SlideOverPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} title="Add Team">
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="floating-input-group">
            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder=" " required />
            <label>Team Name *</label>
          </div>

          <div className="floating-input-group">
            <input type="text" value={formData.lead} onChange={e => setFormData({...formData, lead: e.target.value})} placeholder=" " />
            <label>Team Lead</label>
          </div>

          <div className="floating-input-group">
            <input type="number" value={formData.capacity} onChange={e => setFormData({...formData, capacity: e.target.value})} placeholder=" " />
            <label>Capacity (Story Points)</label>
          </div>

          <div className="floating-input-group">
            <input type="text" value={formData.currentSprint} onChange={e => setFormData({...formData, currentSprint: e.target.value})} placeholder=" " />
            <label>Current Sprint Name</label>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button type="button" className="btn-secondary" onClick={() => setIsPanelOpen(false)} style={{ padding: '10px 16px', borderRadius: 'var(--radius-sm)' }}>Cancel</button>
            <button type="submit" className="btn" disabled={isSaving}>{isSaving ? 'Saving...' : 'Create Team'}</button>
          </div>
        </form>
      </SlideOverPanel>

      <ModalDialog 
        isOpen={!!teamToDelete} 
        onClose={() => setTeamToDelete(null)}
        title="Delete Team"
        type="danger"
        primaryAction={<button className="btn" style={{ background: 'var(--danger)' }} onClick={handleDelete}>Delete</button>}
      >
        Are you sure? This will disband the team and reassign members.
      </ModalDialog>
    </>
  );
}
