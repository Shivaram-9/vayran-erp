'use client';

import React, { useState } from 'react';
import { toggleRolePermission } from './actions';
import { useToast } from '@/components/Toast';

const MODULES = ['Company', 'HRMS', 'Projects', 'Finance', 'Administration'];
const ACTIONS = ['Read', 'Write', 'Delete'];

export default function RolesClient({ initialRoles }: { initialRoles: any[] }) {
  const [selectedRole, setSelectedRole] = useState(initialRoles[0]);
  const [isUpdating, setIsUpdating] = useState(false);
  const { showToast } = useToast();

  const hasPermission = (module: string, action: string) => {
    return selectedRole.permissions.some((p: any) => p.permission.module === module && p.permission.action === action);
  };

  const handleToggle = async (module: string, action: string, currentStatus: boolean) => {
    setIsUpdating(true);
    await toggleRolePermission(selectedRole.id, module, action, !currentStatus);
    
    // Optimistic UI update
    const newPerms = currentStatus 
      ? selectedRole.permissions.filter((p:any) => !(p.permission.module === module && p.permission.action === action))
      : [...selectedRole.permissions, { permission: { module, action } }];
      
    setSelectedRole({ ...selectedRole, permissions: newPerms });
    showToast(`Permission ${!currentStatus ? 'granted' : 'revoked'}.`, 'success');
    setIsUpdating(false);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '24px', height: '100%', alignItems: 'start' }}>
      
      {/* Roles List */}
      <div className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', fontWeight: 600 }}>System Roles</div>
        <div style={{ overflowY: 'auto', maxHeight: '600px' }}>
          {initialRoles.map((role: any) => (
            <div 
              key={role.id}
              onClick={() => setSelectedRole(role)}
              style={{ 
                padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid var(--border-color)',
                background: selectedRole.id === role.id ? 'var(--bg-secondary)' : 'transparent',
                borderLeft: selectedRole.id === role.id ? '3px solid var(--primary)' : '3px solid transparent',
                transition: 'all 0.2s'
              }}
              className="hover:bg-secondary"
            >
              <div style={{ fontWeight: 500, fontSize: '14px', color: selectedRole.id === role.id ? 'var(--primary)' : 'var(--text-primary)' }}>{role.name}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{role._count.users} Users Assigned</div>
            </div>
          ))}
        </div>
      </div>

      {/* Permission Matrix */}
      <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600 }}>Permission Matrix: {selectedRole.name}</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Configure granular access controls for this specific role across all ERP modules.</p>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: 'var(--bg-secondary)' }}>
            <tr>
              <th style={{ padding: '16px 24px', fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Module</th>
              {ACTIONS.map(action => (
                <th key={action} style={{ padding: '16px 24px', fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-secondary)', textAlign: 'center' }}>
                  {action}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MODULES.map(module => (
              <tr key={module} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '16px 24px', fontWeight: 500 }}>{module}</td>
                {ACTIONS.map(action => {
                  const hasPerm = hasPermission(module, action);
                  return (
                    <td key={action} style={{ padding: '16px 24px', textAlign: 'center' }}>
                      <input 
                        type="checkbox" 
                        checked={hasPerm}
                        disabled={isUpdating}
                        onChange={() => handleToggle(module, action, hasPerm)}
                        style={{ cursor: 'pointer', transform: 'scale(1.2)' }}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
