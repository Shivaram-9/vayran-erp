'use client';

import React from 'react';
import { EnterpriseDataTable, Column } from '@/components/DataTable';

export default function ProjectsClient({ projects }: { projects: any[] }) {
  const columns: Column[] = [
    { key: 'title', label: 'Project Name', render: (r) => <div style={{ fontWeight: 600 }}>{r.title}</div> },
    { key: 'status', label: 'Status', render: (r) => (
      <span style={{ 
        padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600,
        background: r.status === 'Planning' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)',
        color: r.status === 'Planning' ? 'var(--primary)' : 'var(--success)'
      }}>
        {r.status}
      </span>
    )},
    { key: 'department', label: 'Department', render: (r) => r.department?.name || 'N/A' },
    { key: 'team', label: 'Assigned Team', render: (r) => r.team?.name || 'N/A' },
    { key: 'metrics', label: 'Metrics', render: (r) => <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{r._count.sprints} Sprints, {r._count.tasks} Tasks</span> }
  ];

  return <EnterpriseDataTable columns={columns} data={projects} searchPlaceholder="Search projects..." />;
}
