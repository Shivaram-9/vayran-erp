import React from 'react';
import { prisma } from '@/lib/prisma';
import { BanknoteIcon } from '@/components/Icons';

export const dynamic = 'force-dynamic';

export default async function FinanceAnalyticsPage() {
  const customerInvoices = await prisma.customerInvoice.aggregate({ _sum: { amount: true } });
  const vendorInvoices = await prisma.vendorInvoice.aggregate({ _sum: { amount: true } });
  
  const totalRevenue = customerInvoices._sum.amount || 0;
  const totalExpenses = vendorInvoices._sum.amount || 0;
  const profit = totalRevenue - totalExpenses;
  
  return (
    <div style={{ padding: '32px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BanknoteIcon /> Financial Reports
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Deep dive into P&L, Cash Flow, and Ledgers.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '12px' }}>Total Revenue</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--success)' }}>${totalRevenue.toLocaleString()}</div>
        </div>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '12px' }}>Total Expenses</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--danger)' }}>${totalExpenses.toLocaleString()}</div>
        </div>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '12px' }}>Net Profit Margin</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)' }}>
            {totalRevenue > 0 ? ((profit / totalRevenue) * 100).toFixed(1) : 0}%
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '48px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.2 }}><BanknoteIcon /></div>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>Detailed Financial Reports Coming Soon</h3>
        <p style={{ maxWidth: '400px', margin: '8px auto 0', fontSize: '14px' }}>
          Interactive drill-downs for General Ledger, Tax Summaries, and Budget Analysis will be generated here.
        </p>
      </div>
    </div>
  );
}
