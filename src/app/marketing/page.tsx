export default function MarketingPage() {
  return (
    <div className="glass-card">
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>Marketing Campaigns</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Monitor ad spend, campaign ROI, and lead generation.</p>
      </div>
      
      <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-md)' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Marketing module will be implemented here.</p>
      </div>
    </div>
  );
}
