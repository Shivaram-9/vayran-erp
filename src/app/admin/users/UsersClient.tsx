'use client';

import React, { useState } from 'react';
import { EnterpriseDataTable, Column } from '@/components/DataTable';
import { SlideOverPanel } from '@/components/SlideOverPanel';
import { ModalDialog } from '@/components/ModalDialog';
import { createUser, deleteUser } from './actions';
import { useToast } from '@/components/Toast';

export default function UsersClient({ initialUsers, roles }: { initialUsers: any[], roles: any[] }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', roleId: '' });
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useToast();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await createUser(formData);
    showToast('User provisioned successfully.', 'success');
    setIsSaving(false);
    setIsPanelOpen(false);
    setFormData({ name: '', email: '', roleId: '' });
  };

  const handleDelete = async () => {
    if (!userToDelete) return;
    await deleteUser(userToDelete);
    showToast('User access revoked.', 'success');
    setUserToDelete(null);
  };

  const columns: Column[] = [
    { key: 'name', label: 'User Name', render: (r) => <div style={{ fontWeight: 600 }}>{r.name || 'Unknown'}</div> },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Security Role', render: (r) => <span style={{ padding: '2px 8px', background: 'var(--primary)', color: '#fff', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>{r.role?.name || 'Unassigned'}</span> },
    { key: 'actions', label: '', render: (r) => (
      <button 
        onClick={(e) => { e.stopPropagation(); setUserToDelete(r.id); }}
        style={{ color: 'var(--danger)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px' }}
      >
        Revoke Access
      </button>
    )}
  ];

  const primaryAction = (
    <button className="btn" onClick={() => setIsPanelOpen(true)}>
      + Provision User
    </button>
  );

  return (
    <>
      <EnterpriseDataTable 
        columns={columns} 
        data={initialUsers} 
        searchPlaceholder="Search users by name or email..."
        primaryAction={primaryAction}
      />

      <SlideOverPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} title="Provision New User">
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="floating-input-group">
            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder=" " required />
            <label>Full Name *</label>
          </div>
          
          <div className="floating-input-group">
            <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder=" " required />
            <label>Corporate Email *</label>
          </div>

          <div className="floating-input-group">
            <select value={formData.roleId} onChange={e => setFormData({...formData, roleId: e.target.value})} required style={{ width: '100%', padding: '20px 16px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-primary)' }}>
              <option value="" disabled>Select a Role</option>
              {roles.map(role => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
            <label>Assign Role *</label>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button type="button" className="btn-secondary" onClick={() => setIsPanelOpen(false)} style={{ padding: '10px 16px', borderRadius: 'var(--radius-sm)' }}>Cancel</button>
            <button type="submit" className="btn" disabled={isSaving}>{isSaving ? 'Provisioning...' : 'Provision User'}</button>
          </div>
        </form>
      </SlideOverPanel>

      <ModalDialog 
        isOpen={!!userToDelete} 
        onClose={() => setUserToDelete(null)}
        title="Revoke Access"
        type="danger"
        primaryAction={<button className="btn" style={{ background: 'var(--danger)' }} onClick={handleDelete}>Revoke</button>}
      >
        Are you sure you want to completely delete this user? They will lose all access to the VAYRAN ERP immediately.
      </ModalDialog>
    </>
  );
}
