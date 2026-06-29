'use client';

import { useToast } from "@/components/Toast";
import { KpiCard, SalesFunnelWidget, CsatGaugeWidget, AiInsightsWidget, TimelineWidget } from "@/components/DashboardWidgets";

export default function Dashboard() {
  const { showToast } = useToast();

  const mockSparklines = {
    revenue: [40, 45, 55, 50, 70, 65, 85, 95],
    profit: [20, 22, 28, 25, 35, 30, 42, 50],
    ebitda: [15, 18, 20, 22, 28, 26, 35, 40],
    cashFlow: [30, 25, 40, 35, 50, 45, 60, 55],
    mrr: [100, 105, 115, 118, 125, 132, 140, 150],
    arr: [1200, 1260, 1380, 1416, 1500, 1584, 1680, 1800],
    growth: [10, 12, 11, 15, 14, 18, 20, 25],
    projects: [12, 14, 15, 15, 18, 20, 22, 25],
    employees: [1000, 1050, 1100, 1120, 1150, 1180, 1200, 1240],
    customers: [500, 520, 550, 580, 600, 650, 700, 750],
    risks: [5, 4, 6, 3, 2, 4, 3, 2],
    approvals: [12, 15, 10, 8, 14, 18, 12, 5]
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', marginBottom: '8px', fontWeight: 700 }}>Executive Command Center</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Live macro-overview of enterprise operations.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <select style={{ padding: '10px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-primary)', outline: 'none' }}>
            <option>Global (All Regions)</option>
            <option>North America</option>
            <option>EMEA</option>
            <option>APAC</option>
          </select>
          <button className="btn" onClick={() => showToast("Compiling full executive PDF report...", "info")}>Export Board Report</button>
        </div>
      </div>

      {/* TOP KPI GRID (12 Cards) */}
      <div className="kpi-grid">
        <KpiCard title="Total Revenue" value="$42.5M" trend="up" trendValue="18.2%" sparklineData={mockSparklines.revenue} color="var(--primary)" />
        <KpiCard title="Net Profit" value="$8.4M" trend="up" trendValue="12.5%" sparklineData={mockSparklines.profit} color="var(--success)" />
        <KpiCard title="EBITDA" value="$11.2M" trend="up" trendValue="8.4%" sparklineData={mockSparklines.ebitda} color="var(--primary)" />
        <KpiCard title="Cash Flow" value="$6.1M" trend="down" trendValue="2.1%" sparklineData={mockSparklines.cashFlow} color="var(--danger)" />
        
        <KpiCard title="Monthly Recur. (MRR)" value="$3.2M" trend="up" trendValue="5.2%" sparklineData={mockSparklines.mrr} color="var(--accent)" />
        <KpiCard title="Annual Recur. (ARR)" value="$38.4M" trend="up" trendValue="22.1%" sparklineData={mockSparklines.arr} color="var(--accent)" />
        <KpiCard title="YoY Growth" value="+24.5%" trend="up" trendValue="4.2%" sparklineData={mockSparklines.growth} color="var(--success)" />
        <KpiCard title="Active Customers" value="8,402" trend="up" trendValue="8.9%" sparklineData={mockSparklines.customers} color="var(--primary)" />

        <KpiCard title="Active Projects" value="142" trend="up" trendValue="12" sparklineData={mockSparklines.projects} color="var(--info)" />
        <KpiCard title="Global Headcount" value="1,240" trend="up" trendValue="45" sparklineData={mockSparklines.employees} color="var(--primary)" />
        <KpiCard title="Open Risks (Crit)" value="2" trend="down" trendValue="3" sparklineData={mockSparklines.risks} color="var(--warning)" />
        <KpiCard title="Pending Approvals" value="18" trend="up" trendValue="4" sparklineData={mockSparklines.approvals} color="var(--text-secondary)" />
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="mega-dashboard-layout">
        
        {/* Left Column (Main Charts) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <SalesFunnelWidget />
            <CsatGaugeWidget />
          </div>

          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Financial Performance Matrix</h3>
              <div style={{ display: 'flex', gap: '8px', fontSize: '12px', fontWeight: 500 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }}></span> Revenue</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)' }}></span> Profit</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--danger)' }}></span> Expense</div>
              </div>
            </div>
            
            {/* CSS Grid Multi-Bar Chart */}
            <div style={{ height: '240px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', paddingTop: '40px', position: 'relative' }}>
              
              {/* Y-Axis Guidelines */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 0, pointerEvents: 'none' }}>
                <div style={{ borderBottom: '1px dashed var(--border-color)', height: '1px', width: '100%' }}></div>
                <div style={{ borderBottom: '1px dashed var(--border-color)', height: '1px', width: '100%' }}></div>
                <div style={{ borderBottom: '1px dashed var(--border-color)', height: '1px', width: '100%' }}></div>
                <div style={{ borderBottom: '1px dashed var(--border-color)', height: '1px', width: '100%' }}></div>
              </div>

              {[
                { label: 'Q1', rev: 80, prof: 30, exp: 50 },
                { label: 'Q2', rev: 65, prof: 20, exp: 45 },
                { label: 'Q3', rev: 90, prof: 40, exp: 50 },
                { label: 'Q4', rev: 100, prof: 45, exp: 55 }
              ].map((q, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%', justifyContent: 'flex-end', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '100%', width: '100%', justifyContent: 'center' }}>
                    <div style={{ width: '20px', height: `${q.rev}%`, background: 'var(--primary)', borderRadius: '4px 4px 0 0' }}></div>
                    <div style={{ width: '20px', height: `${q.prof}%`, background: 'var(--success)', borderRadius: '4px 4px 0 0' }}></div>
                    <div style={{ width: '20px', height: `${q.exp}%`, background: 'var(--danger)', borderRadius: '4px 4px 0 0' }}></div>
                  </div>
                  <div style={{ position: 'absolute', bottom: '-24px', fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>{q.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (Live Feed & AI) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <AiInsightsWidget />
          <TimelineWidget />
        </div>

      </div>
    </div>
  );
}
