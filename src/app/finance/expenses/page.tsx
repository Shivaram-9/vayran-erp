import { prisma } from '@/lib/prisma';
import ExpensesClient from './ExpensesClient';
import { ShoppingCartIcon } from '@/components/Icons';

export const dynamic = 'force-dynamic';

export default async function ExpensesPage() {
  const expenses = await prisma.expense.findMany({
    include: { employee: true, category: true },
    orderBy: { date: 'desc' }
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '32px 32px 0', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingCartIcon /> Employee Expenses
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Review, approve, and reimburse out-of-pocket employee expenses.</p>
        </div>
        <div>
          <button className="btn-primary">Submit Expense</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '32px' }}>
        <ExpensesClient expenses={expenses} />
      </div>
    </div>
  );
}
