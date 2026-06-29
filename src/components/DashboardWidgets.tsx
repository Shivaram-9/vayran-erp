'use client';

import React from 'react';

// --- 1. SPARKLINE KPI CARD ---
export const KpiCard = ({ title, value, trend, trendValue, sparklineData, color = 'var(--primary)' }: { title: string, value: string, trend: 'up' | 'down', trendValue: string, sparklineData: number[], color?: string }) => {
  // Simple SVG sparkline generator
  const max = Math.max(...sparklineData);
  const min = Math.min(...sparklineData);
  const range = max - min || 1;
  const points = sparklineData.map((val, i) => {
    const x = (i / (sparklineData.length - 1)) * 100;
    const y = 100 - (((val - min) / range) * 100);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="glass-card kpi-card hover:shadow-md transition-all cursor-pointer relative overflow-hidden" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', fontWeight: 600 }}>{title}</h3>
        <span style={{ 
          fontSize: '12px', fontWeight: 600, padding: '4px 8px', borderRadius: '12px',
          backgroundColor: trend === 'up' ? 'rgba(5, 150, 105, 0.1)' : 'rgba(220, 38, 38, 0.1)',
          color: trend === 'up' ? 'var(--success)' : 'var(--danger)' 
        }}>
          {trend === 'up' ? '↑' : '↓'} {trendValue}
        </span>
      </div>
      <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)' }}>{value}</div>
      
      {/* Sparkline */}
      <div style={{ height: '40px', width: '100%', marginTop: 'auto' }}>
        <svg viewBox="0 -10 100 120" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          <polyline points={points} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {/* Gradient Fill under sparkline */}
          <polygon points={`0,100 ${points} 100,100`} fill={`url(#gradient-${title.replace(/\s+/g, '')})`} opacity="0.2" />
          <defs>
            <linearGradient id={`gradient-${title.replace(/\s+/g, '')}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="1" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

// --- 2. SALES FUNNEL WIDGET ---
export const SalesFunnelWidget = () => {
  const steps = [
    { label: 'Leads', value: 12500, color: 'var(--primary)' },
    { label: 'Qualified', value: 8200, color: 'var(--secondary)' },
    { label: 'Proposals', value: 3400, color: 'var(--accent)' },
    { label: 'Negotiation', value: 1200, color: 'var(--warning)' },
    { label: 'Closed Won', value: 850, color: 'var(--success)' },
  ];
  const maxVal = steps[0].value;

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Sales Funnel</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, justifyContent: 'center' }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '80px', fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500, textAlign: 'right' }}>{step.label}</div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <div style={{ 
                width: `${(step.value / maxVal) * 100}%`, 
                height: '24px', 
                backgroundColor: step.color, 
                borderRadius: '4px',
                transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '11px', fontWeight: 600
              }}>
                {step.value.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 3. CUSTOMER SATISFACTION (CSAT) GAUGE ---
export const CsatGaugeWidget = () => {
  const score = 94; // Out of 100
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
      <h3 style={{ fontSize: '16px', fontWeight: 600, alignSelf: 'flex-start' }}>CSAT & NPS</h3>
      <div style={{ position: 'relative', width: '120px', height: '120px' }}>
        <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border-color)" strokeWidth="12" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="var(--success)" strokeWidth="12" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1.5s ease' }} />
        </svg>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)' }}>{score}%</span>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>CSAT Score</span>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '8px', padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--primary)' }}>+72</div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Net Promoter</div>
        </div>
        <div style={{ width: '1px', background: 'var(--border-color)' }}></div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--success)' }}>1.2m</div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Active Users</div>
        </div>
      </div>
    </div>
  );
};

// --- 4. EXECUTIVE TIMELINE / AI INSIGHTS ---
export const AiInsightsWidget = () => {
  return (
    <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.05) 0%, rgba(79, 70, 229, 0.05) 100%)', border: '1px solid rgba(79, 70, 229, 0.2)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <span style={{ fontSize: '18px' }}>✨</span>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--primary)' }}>VAYRAN AI Executive Brief</h3>
      </div>
      <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '16px' }}>
        Enterprise growth is accelerating in the EMEA region (+18% MoM). However, supply chain bottlenecks in Procurement are increasing Open Risks. AI recommends re-routing Q3 logistics through alternate vendors.
      </p>
      <button className="btn" style={{ width: '100%' }}>View Full Analysis</button>
    </div>
  );
};

export const TimelineWidget = () => {
  const events = [
    { title: 'Board of Directors Meeting', time: '10:00 AM', type: 'meeting', color: 'var(--primary)' },
    { title: 'Q3 Financials Approved by CFO', time: '11:45 AM', type: 'alert', color: 'var(--success)' },
    { title: 'Server Load Critical Alert', time: '1:15 PM', type: 'alert', color: 'var(--danger)' },
    { title: 'Enterprise Contract Signed (Acme)', time: '2:30 PM', type: 'event', color: 'var(--accent)' },
  ];

  return (
    <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px' }}>Live Executive Feed</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
        <div style={{ position: 'absolute', left: '7px', top: '8px', bottom: '8px', width: '2px', background: 'var(--border-color)', zIndex: 0 }}></div>
        {events.map((event, i) => (
          <div key={i} style={{ display: 'flex', gap: '16px', zIndex: 1, position: 'relative' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'var(--bg-card)', border: `4px solid ${event.color}`, flexShrink: 0, marginTop: '2px' }}></div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>{event.title}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{event.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
