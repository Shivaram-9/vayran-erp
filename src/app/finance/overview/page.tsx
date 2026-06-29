import React from 'react';
import { prisma } from '@/lib/prisma';
import { BanknoteIcon, HandshakeIcon, LayoutDashboardIcon, BarChartIcon } from '@/components/Icons';

export const dynamic = 'force-dynamic';

export default async function FinanceOverviewPage() {
  const accountCount = await prisma.account.count();
  const arInvoices = await prisma.customerInvoice.count({ where: { status: { not: 'Paid' } } });
  const apInvoices = await prisma.vendorInvoice.count({ where: { status: { not: 'Paid' } } });
  const pendingExpenses = await prisma.expense.count({ where: { status: 'Pending' } });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '32px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Executive Finance Dashboard</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Enterprise view of Accounts Receivable, Accounts Payable, and Cash Flow.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Total Accounts</span>
            <div style={{ padding: '8px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', borderRadius: '8px' }}><LayoutDashboardIcon /></div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 700 }}>{accountCount}</div>
          <div style={{ fontSize: '12px', color: 'var(--success)', marginTop: '8px', fontWeight: 600 }}>Active in Chart of Accounts</div>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>A/R Aging</span>
            <div style={{ padding: '8px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: '8px' }}><BanknoteIcon /></div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 700 }}>{arInvoices}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>Pending Customer Invoices</div>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>A/P Aging</span>
            <div style={{ padding: '8px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', borderRadius: '8px' }}><HandshakeIcon /></div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 700 }}>{apInvoices}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>Pending Vendor Bills</div>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Pending Expenses</span>
            <div style={{ padding: '8px', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', borderRadius: '8px' }}><BarChartIcon /></div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 700 }}>{pendingExpenses}</div>
          <div style={{ fontSize: '12px', color: 'var(--warning)', marginTop: '8px', fontWeight: 600 }}>Awaiting Approval</div>
        </div>
      </div>
      
      <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.2 }}><BarChartIcon /></div>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>Monthly Financial Trends</h3>
        <p style={{ maxWidth: '400px', marginTop: '8px', fontSize: '14px' }}>
          Revenue vs Expense visualizations will populate here once enough Ledger data is collected.
        </p>
      </div>
    </div>
  );
}
