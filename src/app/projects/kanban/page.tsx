'use client';

import React, { useState } from 'react';
import { ClockIcon, CheckCircleIcon } from '@/components/Icons';

export default function KanbanPage() {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Design Database Schema', status: 'Todo', priority: 'High', points: 5 },
    { id: '2', title: 'Implement RBAC Auth', status: 'In Progress', priority: 'High', points: 8 },
    { id: '3', title: 'Setup SlideOver Components', status: 'In Progress', priority: 'Medium', points: 3 },
    { id: '4', title: 'Review PR #412', status: 'Review', priority: 'Medium', points: 2 },
    { id: '5', title: 'Initialize Next.js App', status: 'Done', priority: 'Low', points: 1 },
  ]);

  const columns = ['Todo', 'In Progress', 'Review', 'Done'];

  const moveTask = (taskId: string, newStatus: string) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '32px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Active Sprint Kanban</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Drag or click to advance tasks through the execution pipeline.</p>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', overflowY: 'hidden' }}>
        {columns.map(col => (
          <div key={col} style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid var(--border-color)', height: '100%', overflowY: 'auto' }}>
            <div style={{ fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
              <span>{col}</span>
              <span style={{ color: 'var(--text-secondary)' }}>{tasks.filter(t => t.status === col).length}</span>
            </div>

            {tasks.filter(t => t.status === col).map(task => (
              <div key={task.id} className="glass-card" style={{ padding: '16px', cursor: 'pointer', transition: 'transform 0.1s' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>{task.title}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ 
                    fontSize: '11px', padding: '2px 8px', borderRadius: '12px', fontWeight: 600,
                    background: task.priority === 'High' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                    color: task.priority === 'High' ? 'var(--danger)' : 'var(--primary)'
                  }}>{task.priority}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{task.points} pts</span>
                </div>

                <div style={{ marginTop: '16px', display: 'flex', gap: '4px' }}>
                  {columns.map(targetCol => targetCol !== col && (
                    <button 
                      key={targetCol} 
                      onClick={() => moveTask(task.id, targetCol)}
                      style={{ flex: 1, fontSize: '10px', padding: '4px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer', color: 'var(--text-primary)' }}
                    >
                      {targetCol}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
