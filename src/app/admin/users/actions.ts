'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createUser(data: any) {
  await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      roleId: data.roleId || null
    }
  });

  revalidatePath('/admin/users');
  return { success: true };
}

export async function deleteUser(id: string) {
  await prisma.user.delete({ where: { id } });
  revalidatePath('/admin/users');
  return { success: true };
}
