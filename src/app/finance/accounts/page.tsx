import { prisma } from '@/lib/prisma';
import AccountsClient from './AccountsClient';
import { FileTextIcon } from '@/components/Icons';

export const dynamic = 'force-dynamic';

export default async function AccountsPage() {
  const accounts = await prisma.account.findMany({
    include: { chartOfAccounts: true },
    orderBy: { code: 'asc' }
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '32px 32px 0', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileTextIcon /> Chart of Accounts
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage the core ledger accounts for all enterprise entities.</p>
        </div>
        <div>
          <button className="btn-primary">Add Account</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '32px' }}>
        <AccountsClient accounts={accounts} />
      </div>
    </div>
  );
}
