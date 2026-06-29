import { prisma } from '@/lib/prisma';
import ReceivablesClient from './ReceivablesClient';
import { BanknoteIcon } from '@/components/Icons';

export const dynamic = 'force-dynamic';

export default async function ReceivablesPage() {
  const invoices = await prisma.customerInvoice.findMany({
    orderBy: { dueDate: 'asc' }
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '32px 32px 0', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BanknoteIcon /> Accounts Receivable (AR)
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Track and manage money owed to the company by customers.</p>
        </div>
        <div>
          <button className="btn-primary">Create Invoice</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '32px' }}>
        <ReceivablesClient invoices={invoices} />
      </div>
    </div>
  );
}
