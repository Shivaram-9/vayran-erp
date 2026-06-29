import React from 'react';
import { SettingsIcon } from '@/components/Icons';
import FlowDesigner from './FlowDesigner';

export const dynamic = 'force-dynamic';

export default function WorkflowBuilderPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '32px 32px 0' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '28px', height: '28px' }}><SettingsIcon /></div> Workflow Builder
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Design and automate complex business processes using the visual node editor.</p>
      </div>

      <div style={{ flex: 1, padding: '0 32px 32px' }}>
        <FlowDesigner />
      </div>
    </div>
  );
}
