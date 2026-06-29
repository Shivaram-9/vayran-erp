'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const DEFAULT_ROLES = [
  'System Owner', 'Super Admin', 'Company Admin', 'CEO', 'CFO', 'CTO', 
  'HR Manager', 'Finance Manager', 'Product Manager', 'Project Manager', 
  'Team Lead', 'Employee', 'Intern'
];

export async function ensureDefaultRoles() {
  for (const roleName of DEFAULT_ROLES) {
    const exists = await prisma.role.findUnique({ where: { name: roleName } });
    if (!exists) {
      await prisma.role.create({ data: { name: roleName, description: 'Default system role' } });
    }
  }
}

export async function toggleRolePermission(roleId: string, module: string, action: string, checked: boolean) {
  // First, find or create the permission
  let perm = await prisma.permission.findFirst({ where: { module, action } });
  if (!perm) {
    perm = await prisma.permission.create({ data: { module, action } });
  }

  if (checked) {
    // Connect
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId, permissionId: perm.id } },
      create: { roleId, permissionId: perm.id },
      update: {}
    });
  } else {
    // Disconnect
    await prisma.rolePermission.deleteMany({
      where: { roleId, permissionId: perm.id }
    });
  }

  revalidatePath('/admin/roles');
  return { success: true };
}
