'use client';

import React, { useState } from 'react';
import { BuildingIcon, BriefcaseIcon, UsersIcon } from '@/components/Icons';

export default function OrgChartClient({ company }: { company: any }) {
  const [scale, setScale] = useState(1);

  const OrgNode = ({ title, subtitle, icon: Icon, childrenNodes }: any) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="glass-card" style={{ 
        padding: '16px 24px', minWidth: '200px', display: 'flex', flexDirection: 'column', 
        alignItems: 'center', gap: '8px', border: '1px solid var(--border-color)', 
        position: 'relative', zIndex: 2 
      }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
          <Icon />
        </div>
        <div style={{ fontWeight: 600, fontSize: '14px', textAlign: 'center' }}>{title}</div>
        {subtitle && <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{subtitle}</div>}
      </div>
      
      {childrenNodes && childrenNodes.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '2px', height: '30px', background: 'var(--border-color)' }}></div>
          <div style={{ display: 'flex', gap: '40px', position: 'relative' }}>
            {/* Horizontal connection line */}
            {childrenNodes.length > 1 && (
              <div style={{ position: 'absolute', top: 0, left: 'calc(50% / ' + childrenNodes.length + ')', right: 'calc(50% / ' + childrenNodes.length + ')', height: '2px', background: 'var(--border-color)' }}></div>
            )}
            
            {childrenNodes.map((child: any, i: number) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '2px', height: '30px', background: 'var(--border-color)' }}></div>
                {child}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="glass-card" style={{ height: '100%', position: 'relative', overflow: 'hidden', padding: 0 }}>
      {/* Controls */}
      <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px', zIndex: 10 }}>
        <button onClick={() => setScale(s => Math.min(s + 0.1, 1.5))} className="btn-icon" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>+</button>
        <button onClick={() => setScale(s => Math.max(s - 0.1, 0.5))} className="btn-icon" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>-</button>
      </div>

      {/* Canvas */}
      <div style={{ 
        width: '100%', height: '100%', overflow: 'auto', 
        display: 'flex', justifyContent: 'center', padding: '60px',
        cursor: 'grab' 
      }}>
        <div style={{ 
          transform: `scale(${scale})`, transformOrigin: 'top center', transition: 'transform 0.2s',
          display: 'flex', justifyContent: 'center' 
        }}>
          
          <OrgNode 
            title={company.name} 
            subtitle="Headquarters"
            icon={BuildingIcon}
            childrenNodes={[
              // Render Business Units
              ...company.businessUnits.map((bu: any) => (
                <OrgNode 
                  key={'bu'+bu.id} 
                  title={bu.name} 
                  subtitle="Business Unit"
                  icon={BriefcaseIcon}
                  childrenNodes={bu.departments.map((dept: any) => (
                    <OrgNode 
                      key={'dept'+dept.id} 
                      title={dept.name} 
                      subtitle="Department"
                      icon={BriefcaseIcon}
                      childrenNodes={dept.teams.map((team: any) => (
                        <OrgNode key={'team'+team.id} title={team.name} subtitle="Team" icon={UsersIcon} />
                      ))}
                    />
                  ))}
                />
              )),
              // Render Unassigned Departments
              ...company.departments.map((dept: any) => (
                <OrgNode 
                  key={'dept'+dept.id} 
                  title={dept.name} 
                  subtitle="Department"
                  icon={BriefcaseIcon}
                  childrenNodes={dept.teams.map((team: any) => (
                    <OrgNode key={'team'+team.id} title={team.name} subtitle="Team" icon={UsersIcon} />
                  ))}
                />
              ))
            ]}
          />

        </div>
      </div>
    </div>
  );
}
