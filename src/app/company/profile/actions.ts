'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateCompanyProfile(data: any) {
  let company = await prisma.company.findFirst();
  if (company) {
    await prisma.company.update({
      where: { id: company.id },
      data: {
        legalName: data.legalName,
        registrationNo: data.registrationNo,
        taxId: data.taxId,
        industry: data.industry,
        website: data.website,
        email: data.email,
        phone: data.phone,
        headquarters: data.headquarters,
        country: data.country,
        currency: data.currency,
        timezone: data.timezone,
        fiscalYearStart: data.fiscalYearStart,
      }
    });
  }
  revalidatePath('/company/profile');
  revalidatePath('/company/overview');
  return { success: true };
}
