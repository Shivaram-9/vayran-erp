'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createEmployee(data: any) {
  // Generate random employee code if not provided
  const empCode = data.employeeCode || `EMP-${Math.floor(1000 + Math.random() * 9000)}`;

  await prisma.employee.create({
    data: {
      name: data.name,
      employeeCode: empCode,
      jobTitle: data.jobTitle,
      status: data.status || 'Active',
      companyId: data.companyId || null,
      departmentId: data.departmentId || null,
      branchId: data.branchId || null
    }
  });

  revalidatePath('/hr/directory');
  revalidatePath('/hr/overview');
  return { success: true };
}

export async function deleteEmployee(id: string) {
  await prisma.employee.delete({ where: { id } });
  revalidatePath('/hr/directory');
  revalidatePath('/hr/overview');
  return { success: true };
}
