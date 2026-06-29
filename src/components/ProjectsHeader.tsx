'use client';

import { useState, useTransition } from 'react';
import Modal from './Modal';
import { addProject } from '@/app/actions';
import { useToast } from './Toast';

export default function ProjectsHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await addProject(formData);
      setIsModalOpen(false);
      showToast("Project created successfully!", "success");
    });
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Project Management</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Track epics, sprints, and tasks.</p>
        </div>
        <button className="btn" onClick={() => setIsModalOpen(true)}>+ New Project</button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Project">
        <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Title</label>
            <input type="text" name="title" required style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Description</label>
            <input type="text" name="description" required style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Status</label>
            <select name="status" style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
              <option value="Planning">Planning</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Progress (%)</label>
            <input type="number" name="progress" min="0" max="100" defaultValue="0" required style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
          </div>
          <button type="submit" className="btn" style={{ marginTop: '16px', opacity: isPending ? 0.7 : 1 }} disabled={isPending}>
            {isPending ? 'Saving...' : 'Save Project'}
          </button>
        </form>
      </Modal>
    </>
  );
}
