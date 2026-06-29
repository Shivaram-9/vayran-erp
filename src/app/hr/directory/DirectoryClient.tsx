'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EnterpriseDataTable, Column } from '@/components/DataTable';
import { SlideOverPanel } from '@/components/SlideOverPanel';
import { ModalDialog } from '@/components/ModalDialog';
import { createEmployee, deleteEmployee } from './actions';
import { useToast } from '@/components/Toast';

export default function DirectoryClient({ initialEmployees, departments, branches }: { initialEmployees: any[], departments: any[], branches: any[] }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [empToDelete, setEmpToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', employeeCode: '', jobTitle: '', departmentId: '', branchId: '' });
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await createEmployee(formData);
    showToast('Employee created successfully.', 'success');
    setIsSaving(false);
    setIsPanelOpen(false);
    setFormData({ name: '', employeeCode: '', jobTitle: '', departmentId: '', branchId: '' });
  };

  const handleDelete = async () => {
    if (!empToDelete) return;
    await deleteEmployee(empToDelete);
    showToast('Employee record permanently deleted.', 'success');
    setEmpToDelete(null);
  };

  const columns: Column[] = [
    { key: 'employee', label: 'Employee', render: (r) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '12px' }}>
          {r.name.charAt(0)}
        </div>
        <div>
          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{r.name}</div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{r.employeeCode || 'N/A'}</div>
        </div>
      </div>
    ) },
    { key: 'jobTitle', label: 'Job Title' },
    { key: 'department', label: 'Department', render: (r) => r.department?.name || '-' },
    { key: 'branch', label: 'Branch', render: (r) => r.branch?.name || '-' },
    { key: 'status', label: 'Status', render: (r) => (
      <span style={{ 
        padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600,
        background: r.status === 'Active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
        color: r.status === 'Active' ? 'var(--success)' : 'var(--danger)'
      }}>
        {r.status}
      </span>
    )},
    { key: 'actions', label: '', render: (r) => (
      <button 
        onClick={(e) => { e.stopPropagation(); setEmpToDelete(r.id); }}
        style={{ color: 'var(--danger)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px' }}
      >
        Offboard
      </button>
    )}
  ];

  const primaryAction = (
    <button className="btn" onClick={() => setIsPanelOpen(true)}>
      + Add Employee
    </button>
  );

  return (
    <>
      <EnterpriseDataTable 
        columns={columns} 
        data={initialEmployees} 
        searchPlaceholder="Search by name, ID, or job title..."
        primaryAction={primaryAction}
        onRowClick={(row) => router.push(`/hr/profile/${row.id}`)}
      />

      <SlideOverPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} title="Onboard Employee">
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="floating-input-group">
            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder=" " required />
            <label>Full Name *</label>
          </div>
          
          <div className="floating-input-group">
            <input type="text" value={formData.employeeCode} onChange={e => setFormData({...formData, employeeCode: e.target.value})} placeholder=" " />
            <label>Employee ID (Leave blank to auto-generate)</label>
          </div>

          <div className="floating-input-group">
            <input type="text" value={formData.jobTitle} onChange={e => setFormData({...formData, jobTitle: e.target.value})} placeholder=" " required />
            <label>Job Title *</label>
          </div>

          <div className="floating-input-group">
            <select value={formData.departmentId} onChange={e => setFormData({...formData, departmentId: e.target.value})} style={{ width: '100%', padding: '20px 16px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-primary)' }}>
              <option value="">No Department</option>
              {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
            <label>Department</label>
          </div>

          <div className="floating-input-group">
            <select value={formData.branchId} onChange={e => setFormData({...formData, branchId: e.target.value})} style={{ width: '100%', padding: '20px 16px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-primary)' }}>
              <option value="">No Branch</option>
              {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
            <label>Branch / Office</label>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button type="button" className="btn-secondary" onClick={() => setIsPanelOpen(false)} style={{ padding: '10px 16px', borderRadius: 'var(--radius-sm)' }}>Cancel</button>
            <button type="submit" className="btn" disabled={isSaving}>{isSaving ? 'Saving...' : 'Onboard Employee'}</button>
          </div>
        </form>
      </SlideOverPanel>

      <ModalDialog 
        isOpen={!!empToDelete} 
        onClose={() => setEmpToDelete(null)}
        title="Offboard Employee"
        type="danger"
        primaryAction={<button className="btn" style={{ background: 'var(--danger)' }} onClick={handleDelete}>Confirm Offboarding</button>}
      >
        Are you sure you want to completely offboard this employee? This will purge their record and revoke all active permissions.
      </ModalDialog>
    </>
  );
}
