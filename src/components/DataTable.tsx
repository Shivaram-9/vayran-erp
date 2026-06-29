'use client';

import React, { useState } from 'react';
import { SearchIcon, ChevronLeftIcon, ChevronRightIcon, SettingsIcon } from '@/components/Icons';

export interface Column {
  key: string;
  label: string;
  render?: (row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onRowClick?: (row: any) => void;
  searchPlaceholder?: string;
  primaryAction?: React.ReactNode;
}

export const EnterpriseDataTable: React.FC<DataTableProps> = ({ columns, data, onRowClick, searchPlaceholder = "Search records...", primaryAction }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(row => 
    Object.values(row).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="glass-card" style={{ padding: '0', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      
      {/* Table Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ position: 'relative', width: '320px' }}>
          <div style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-secondary)', width: '16px' }}><SearchIcon /></div>
          <input 
            type="text" 
            placeholder={searchPlaceholder} 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '8px 16px 8px 36px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-card)', cursor: 'pointer' }}>
            <div style={{ width: '16px' }}><SettingsIcon /></div> Filters
          </button>
          {primaryAction}
        </div>
      </div>

      {/* Table Content */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ position: 'sticky', top: 0, background: 'var(--bg-secondary)', zIndex: 10 }}>
            <tr>
              <th style={{ padding: '16px 24px', width: '48px' }}>
                <input type="checkbox" style={{ cursor: 'pointer' }} />
              </th>
              {columns.map(col => (
                <th key={col.key} style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? filteredData.map((row, i) => (
              <tr 
                key={row.id || i} 
                onClick={() => onRowClick && onRowClick(row)}
                style={{ cursor: onRowClick ? 'pointer' : 'default', borderBottom: '1px solid var(--border-color)', transition: 'var(--transition)' }}
                className="hover:bg-secondary"
              >
                <td style={{ padding: '16px 24px' }}>
                  <input type="checkbox" onClick={e => e.stopPropagation()} style={{ cursor: 'pointer' }} />
                </td>
                {columns.map(col => (
                  <td key={col.key} style={{ padding: '16px 24px', fontSize: '14px', color: 'var(--text-primary)' }}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            )) : (
              <tr>
                <td colSpan={columns.length + 1} style={{ padding: '48px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Table Pagination */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Showing {filteredData.length} records
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn-icon" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}><ChevronLeftIcon /></button>
          <button className="btn-icon" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}><ChevronRightIcon /></button>
        </div>
      </div>

    </div>
  );
};
