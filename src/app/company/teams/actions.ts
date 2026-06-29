'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createTeam(data: any) {
  const company = await prisma.company.findFirst();
  if (!company) throw new Error("Company not found");

  // We need a department to link this to. If no department exists, we'll create a dummy one for now.
  let dept = await prisma.department.findFirst({ where: { companyId: company.id } });
  if (!dept) {
    dept = await prisma.department.create({
      data: { name: 'General', companyId: company.id }
    });
  }

  await prisma.team.create({
    data: {
      ...data,
      capacity: parseInt(data.capacity) || 0,
      companyId: company.id,
      departmentId: dept.id
    }
  });

  revalidatePath('/company/teams');
  revalidatePath('/company/overview');
  return { success: true };
}

export async function deleteTeam(id: string) {
  await prisma.team.delete({ where: { id } });
  revalidatePath('/company/teams');
  revalidatePath('/company/overview');
  return { success: true };
}
