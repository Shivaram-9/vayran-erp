import { prisma } from '@/lib/prisma';
import { updateCompanyProfile } from './actions';
import ProfileFormClient from './ProfileFormClient';

export const dynamic = 'force-dynamic';

export default async function CompanyProfile() {
  let company = await prisma.company.findFirst();
  
  if (!company) {
    company = await prisma.company.create({
      data: {
        name: 'VAYRAN Enterprise',
        legalName: 'Vayran Inc.',
      }
    });
  }

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Company Profile</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your enterprise branding, legal information, and global settings.</p>
      </div>

      <ProfileFormClient initialData={company} />
    </div>
  );
}
