import { prisma } from '@/lib/prisma';
import ProjectsClient from './ProjectsClient';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    include: {
      department: true,
      team: true,
      _count: { select: { tasks: true, sprints: true } }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '32px 32px 0', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Project Portfolio</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Manage high-level enterprise projects and resource allocation.</p>
        </div>
        <div><button className="btn">+ New Project</button></div>
      </div>

      <div style={{ flex: 1, padding: '0 32px 32px' }}>
        <ProjectsClient projects={projects} />
      </div>
    </div>
  );
}
