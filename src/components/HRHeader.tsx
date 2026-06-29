'use client';

import { useState, useTransition } from 'react';
import Modal from './Modal';
import { addEmployee } from '@/app/actions';
import { useToast } from './Toast';

export default function HRHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await addEmployee(formData);
      setIsModalOpen(false);
      showToast("Employee added successfully!", "success");
    });
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>HR Management</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage employees, attendance, and leave requests.</p>
        </div>
        <button className="btn" onClick={() => setIsModalOpen(true)}>+ Add Employee</button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Employee">
        <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Name</label>
            <input type="text" name="name" required style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Role</label>
            <input type="text" name="role" required style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Department</label>
            <input type="text" name="department" required style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Status</label>
            <select name="status" style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button type="submit" className="btn" style={{ marginTop: '16px', opacity: isPending ? 0.7 : 1 }} disabled={isPending}>
            {isPending ? 'Saving...' : 'Save Employee'}
          </button>
        </form>
      </Modal>
    </>
  );
}
