'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createDepartment(data: any) {
  const company = await prisma.company.findFirst();
  if (!company) throw new Error("Company not found");

  await prisma.department.create({
    data: {
      ...data,
      budget: parseFloat(data.budget) || 0,
      companyId: company.id
    }
  });

  revalidatePath('/company/departments');
  revalidatePath('/company/overview');
  return { success: true };
}

export async function deleteDepartment(id: string) {
  await prisma.department.delete({ where: { id } });
  revalidatePath('/company/departments');
  revalidatePath('/company/overview');
  return { success: true };
}
