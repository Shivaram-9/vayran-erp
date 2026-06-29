'use client';

import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Event: Employee Created' },
    position: { x: 250, y: 25 },
    style: { background: '#6366f1', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600 }
  },
  {
    id: '2',
    data: { label: 'Action: Generate IT Ticket' },
    position: { x: 250, y: 125 },
    style: { background: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }
  },
  {
    id: '3',
    data: { label: 'Approval: Department Head' },
    position: { x: 250, y: 225 },
    style: { background: '#f59e0b', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600 }
  },
  {
    id: '4',
    type: 'output',
    data: { label: 'Action: Notify Employee' },
    position: { x: 250, y: 325 },
    style: { background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600 }
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4', label: 'Approved' },
];

export default function FlowDesigner() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <div style={{ width: '100%', height: '100%', background: 'var(--bg-secondary)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', position: 'relative' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background color="#ccc" gap={16} />
        <Controls />
        <Panel position="top-right">
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn-secondary" style={{ background: 'white' }}>Cancel</button>
            <button className="btn-primary">Save Workflow</button>
          </div>
        </Panel>
        <Panel position="top-left">
          <div className="glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', width: '200px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>Nodes Library</h4>
            <div style={{ padding: '8px', background: '#6366f1', color: 'white', borderRadius: '4px', fontSize: '11px', textAlign: 'center', cursor: 'grab' }}>Trigger Event</div>
            <div style={{ padding: '8px', background: '#f59e0b', color: 'white', borderRadius: '4px', fontSize: '11px', textAlign: 'center', cursor: 'grab' }}>Approval Node</div>
            <div style={{ padding: '8px', background: '#10b981', color: 'white', borderRadius: '4px', fontSize: '11px', textAlign: 'center', cursor: 'grab' }}>Action / Notify</div>
            <div style={{ padding: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '4px', fontSize: '11px', textAlign: 'center', cursor: 'grab' }}>Delay / Timer</div>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}
