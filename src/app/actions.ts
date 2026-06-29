'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function addEmployee(formData: FormData) {
  const name = formData.get('name') as string;
  const role = formData.get('role') as string;
  const department = formData.get('department') as string;
  const status = formData.get('status') as string;

  await prisma.employee.create({
    data: { name, role, department, status }
  });

  revalidatePath('/hr');
}

export async function addProject(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const status = formData.get('status') as string;
  const progress = parseInt(formData.get('progress') as string) || 0;

  await prisma.project.create({
    data: { title, description, status, progress }
  });

  revalidatePath('/projects');
}

export async function addInvoice(formData: FormData) {
  const invoiceId = formData.get('invoiceId') as string;
  const client = formData.get('client') as string;
  const amount = parseFloat(formData.get('amount') as string) || 0;
  const status = formData.get('status') as string;

  await prisma.invoice.create({
    data: { invoiceId, client, amount, status }
  });

  revalidatePath('/finance');
}

export async function addLead(formData: FormData) {
  const name = formData.get('name') as string;
  const company = formData.get('company') as string;
  const value = parseFloat(formData.get('value') as string) || 0;
  const status = formData.get('status') as string;

  await prisma.lead.create({
    data: { name, company, value, status }
  });

  revalidatePath('/crm');
}

export async function saveSetting(key: string, value: string) {
  await prisma.systemSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value }
  });
  revalidatePath('/settings');
}

export async function inviteUser(email: string, role: string) {
  await prisma.user.create({
    data: { email, role, name: email.split('@')[0] }
  });
  revalidatePath('/settings');
}

