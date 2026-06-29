import React from 'react';
import { BarChartIcon } from '@/components/Icons';

export default function BudgetingPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '32px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BarChartIcon /> Budget Allocation
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Set and track financial budgets across Cost Centers and Departments.</p>
      </div>

      <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.2 }}><BarChartIcon /></div>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>Advanced Budgeting Module</h3>
        <p style={{ maxWidth: '400px', marginTop: '8px', fontSize: '14px' }}>
          This enterprise module requires full cross-department data integration. It will be fully populated in the upcoming Global Reporting Phase.
        </p>
      </div>
    </div>
  );
}
