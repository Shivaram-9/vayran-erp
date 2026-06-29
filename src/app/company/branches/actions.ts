'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createBranch(data: any) {
  const company = await prisma.company.findFirst();
  if (!company) throw new Error("Company not found");

  await prisma.branch.create({
    data: {
      ...data,
      companyId: company.id
    }
  });

  revalidatePath('/company/branches');
  revalidatePath('/company/overview');
  return { success: true };
}

export async function deleteBranch(id: string) {
  await prisma.branch.delete({ where: { id } });
  revalidatePath('/company/branches');
  revalidatePath('/company/overview');
  return { success: true };
}
