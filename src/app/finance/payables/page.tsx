import { prisma } from '@/lib/prisma';
import PayablesClient from './PayablesClient';
import { HandshakeIcon } from '@/components/Icons';

export const dynamic = 'force-dynamic';

export default async function PayablesPage() {
  const bills = await prisma.vendorInvoice.findMany({
    orderBy: { dueDate: 'asc' }
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '32px 32px 0', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HandshakeIcon /> Accounts Payable (AP)
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Track and manage money the company owes to external vendors.</p>
        </div>
        <div>
          <button className="btn-primary">Record Bill</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '32px' }}>
        <PayablesClient bills={bills} />
      </div>
    </div>
  );
}
