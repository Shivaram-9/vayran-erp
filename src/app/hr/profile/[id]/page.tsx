import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ProfileClient from './ProfileClient';

export const dynamic = 'force-dynamic';

export default async function EmployeeProfilePage({ params }: { params: { id: string } }) {
  const employee = await prisma.employee.findUnique({
    where: { id: params.id },
    include: {
      department: true,
      branch: true,
      team: true,
      manager: true
    }
  });

  if (!employee) return notFound();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ProfileClient employee={employee} />
    </div>
  );
}
