'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createBusinessUnit(data: any) {
  const company = await prisma.company.findFirst();
  if (!company) throw new Error("Company not found");

  await prisma.businessUnit.create({
    data: {
      ...data,
      companyId: company.id
    }
  });

  revalidatePath('/company/business-units');
  revalidatePath('/company/overview');
  return { success: true };
}

export async function deleteBusinessUnit(id: string) {
  await prisma.businessUnit.delete({ where: { id } });
  revalidatePath('/company/business-units');
  revalidatePath('/company/overview');
  return { success: true };
}
