import React from 'react';
import { prisma } from '@/lib/prisma';
import { 
  UsersIcon, BriefcaseIcon, BanknoteIcon, BoxIcon, 
  ShoppingCartIcon, SparklesIcon 
} from '@/components/Icons';
import AnalyticsCharts from './AnalyticsCharts';

export const dynamic = 'force-dynamic';

export default async function ExecutiveDashboard() {
  // Aggregate KPIs from across all modules
  const totalEmployees = await prisma.employee.count();
  const activeProjects = await prisma.project.count({ where: { status: { in: ['Planning', 'In Progress'] } } });
  
  // Finance Metrics
  const customerInvoices = await prisma.customerInvoice.aggregate({ _sum: { amount: true } });
  const vendorInvoices = await prisma.vendorInvoice.aggregate({ _sum: { amount: true } });
  const revenue = customerInvoices._sum.amount || 0;
  const expenses = vendorInvoices._sum.amount || 0;
  const netProfit = revenue - expenses;

  // Inventory & Sourcing
  const totalInventory = await prisma.inventory.count();
  const activePOs = await prisma.purchaseOrder.count({ where: { status: { not: 'Received' } } });

  // Mock data for charts
  const revenueData = [
    { name: 'Jan', Revenue: 4000, Expenses: 2400 },
    { name: 'Feb', Revenue: 3000, Expenses: 1398 },
    { name: 'Mar', Revenue: 2000, Expenses: 9800 },
    { name: 'Apr', Revenue: 2780, Expenses: 3908 },
    { name: 'May', Revenue: 1890, Expenses: 4800 },
    { name: 'Jun', Revenue: 2390, Expenses: 3800 },
    { name: 'Jul', Revenue: 3490, Expenses: 4300 },
  ];

  const departmentDistribution = [
    { name: 'Engineering', value: 400 },
    { name: 'Sales', value: 300 },
    { name: 'Marketing', value: 300 },
    { name: 'HR', value: 200 },
    { name: 'Finance', value: 150 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Executive Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Cross-module enterprise intelligence and KPIs.</p>
        </div>
        <div style={{ padding: '8px 16px', background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600 }}>
          <SparklesIcon /> AI Insights Active
        </div>
      </div>

      {/* KPI Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Employees</span>
            <div style={{ color: 'var(--primary)' }}><UsersIcon /></div>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700 }}>{totalEmployees}</div>
        </div>
        
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Active Projects</span>
            <div style={{ color: 'var(--warning)' }}><BriefcaseIcon /></div>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700 }}>{activeProjects}</div>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Revenue</span>
            <div style={{ color: 'var(--success)' }}><BanknoteIcon /></div>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700 }}>${revenue.toLocaleString()}</div>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Net Profit</span>
            <div style={{ color: netProfit >= 0 ? 'var(--success)' : 'var(--danger)' }}><BanknoteIcon /></div>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700 }}>${netProfit.toLocaleString()}</div>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Active POs</span>
            <div style={{ color: '#8b5cf6' }}><ShoppingCartIcon /></div>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700 }}>{activePOs}</div>
        </div>
      </div>

      {/* AI Insights Bar */}
      <div className="glass-card" style={{ padding: '16px 24px', marginBottom: '24px', borderLeft: '4px solid #6366f1', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ color: '#6366f1' }}><SparklesIcon /></div>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>AI Recommendation</div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Revenue is trending slightly below projections for Q3, while {activeProjects} active projects are fully staffed. Consider reallocating engineering resources to accelerate delivery of high-margin client deliverables.
          </div>
        </div>
      </div>

      {/* Charts Area */}
      <div style={{ flex: 1, minHeight: '400px' }}>
        <AnalyticsCharts revenueData={revenueData} departmentData={departmentDistribution} />
      </div>
      
    </div>
  );
}
