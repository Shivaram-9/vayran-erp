'use client';

import { useState, useEffect } from 'react';
import { 
  VayranLogoFull, SparklesIcon, GoogleIcon, MicrosoftIcon, 
  EyeIcon, EyeOffIcon, CheckIcon, BuildingIcon, HandshakeIcon, BanknoteIcon, UsersIcon
} from "@/components/Icons";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.getModifierState('CapsLock')) {
        setCapsLockActive(true);
      } else {
        setCapsLockActive(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Simple password strength calculation
  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length > 7) strength += 25;
    if (password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[0-9]/)) strength += 25;
    if (password.match(/[^A-Za-z0-9]/)) strength += 25;
    return strength;
  };

  const strength = getPasswordStrength();
  let strengthColor = 'var(--border-color)';
  if (strength > 0) strengthColor = 'var(--danger)';
  if (strength > 50) strengthColor = 'var(--warning)';
  if (strength > 75) strengthColor = 'var(--success)';

  if (!mounted) return null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)', flexDirection: 'column' }}>
      
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Left Side - Hero & Animations */}
        <div style={{ 
          flex: '1.2', 
          background: 'linear-gradient(135deg, #1E40AF 0%, #4F46E5 100%)', 
          color: '#fff', 
          display: 'flex', 
          flexDirection: 'column', 
          padding: '64px', 
          position: 'relative', 
          overflow: 'hidden' 
        }}>
          
          {/* Animated Background Mesh */}
          <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%', pointerEvents: 'none', animation: 'pulse-soft 8s infinite' }}></div>
          <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '1000px', height: '1000px', background: 'radial-gradient(circle, rgba(37,99,235,0.4) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%', pointerEvents: 'none', animation: 'pulse-soft 12s infinite reverse' }}></div>

          <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', height: '100%' }}>
            
            <VayranLogoFull style={{ height: '40px', color: '#fff', marginBottom: '80px' }} />
            
            <div style={{ maxWidth: '540px' }} className="animate-slide-up">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.2)' }}>
                <SparklesIcon /> AI-Powered
              </div>
              <h1 style={{ fontSize: '48px', fontWeight: 300, lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.02em' }}>
                Enterprise Business<br />
                <strong style={{ fontWeight: 700 }}>Operating System</strong>
              </h1>
              <p style={{ fontSize: '18px', opacity: 0.9, lineHeight: 1.6, marginBottom: '48px', fontWeight: 300 }}>
                Run your entire organization from one intelligent platform. Manage HR, Finance, CRM, Projects, and AI Operations from a single unified workspace.
              </p>
              
              {/* Animated Stats */}
              <div style={{ display: 'flex', gap: '32px', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '32px' }}>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>1000+</div>
                  <div style={{ fontSize: '13px', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Companies</div>
                </div>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>99.99%</div>
                  <div style={{ fontSize: '13px', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Uptime</div>
                </div>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}><CheckIcon /> SOC2</div>
                  <div style={{ fontSize: '13px', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Certified</div>
                </div>
              </div>
            </div>

            {/* Floating UI Elements */}
            <div style={{ position: 'absolute', right: '-40px', top: '150px', width: '400px', height: '500px', pointerEvents: 'none' }}>
              
              {/* Floating HR Card */}
              <div className="animate-float" style={{ position: 'absolute', top: '0', right: '40px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', padding: '20px', width: '220px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><UsersIcon /></div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 600 }}>Active Employees</div>
                    <div style={{ fontSize: '18px', fontWeight: 700 }}>2,405</div>
                  </div>
                </div>
                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }}><div style={{ width: '70%', height: '100%', background: 'var(--success)', borderRadius: '2px' }}></div></div>
              </div>

              {/* Floating Finance Card */}
              <div className="animate-float-delay" style={{ position: 'absolute', top: '140px', left: '0', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', padding: '20px', width: '240px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--warning)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><BanknoteIcon /></div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 600 }}>Q3 Revenue</div>
                    <div style={{ fontSize: '18px', fontWeight: 700 }}>$14.2M</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '40px', marginTop: '12px' }}>
                  {[40, 60, 30, 80, 50, 90, 70].map((h, i) => <div key={i} style={{ flex: 1, background: 'rgba(255,255,255,0.5)', height: `${h}%`, borderRadius: '2px' }}></div>)}
                </div>
              </div>

              {/* Floating AI Node */}
              <div className="animate-float" style={{ position: 'absolute', top: '280px', right: '60px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(255,255,255,0.2)', animationDelay: '1s' }}>
                <SparklesIcon />
              </div>

            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px', background: 'var(--bg-primary)' }}>
          <div className="animate-slide-up" style={{ 
            width: '100%', maxWidth: '440px', background: 'var(--bg-card)', 
            borderRadius: '20px', padding: '40px', boxShadow: 'var(--shadow-xl)',
            border: '1px solid var(--border-color)'
          }}>
            
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', letterSpacing: '-0.02em' }}>Welcome back</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Sign in to your enterprise workspace.</p>
            </div>

            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={(e) => { e.preventDefault(); window.location.href = '/'; }}>
              
              <div className="floating-input-group">
                <input 
                  type="email" 
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" " 
                  required 
                />
                <label htmlFor="email">Work Email</label>
              </div>
              
              <div className="floating-input-group" style={{ marginBottom: '8px' }}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=" " 
                  required 
                />
                <label htmlFor="password">Password</label>
                <div 
                  style={{ position: 'absolute', right: '16px', top: '18px', cursor: 'pointer', color: 'var(--text-secondary)' }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </div>
              </div>

              {/* Password Strength & Caps Lock */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '20px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '4px', width: '100px' }}>
                  {[1, 2, 3, 4].map(level => (
                    <div key={level} style={{ height: '4px', flex: 1, borderRadius: '2px', background: level * 25 <= strength ? strengthColor : 'var(--border-color)', transition: 'background 0.3s' }}></div>
                  ))}
                </div>
                {capsLockActive && <div style={{ fontSize: '11px', color: 'var(--warning)', fontWeight: 600 }}>CAPS LOCK IS ON</div>}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <input type="checkbox" style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }} />
                  Remember me
                </label>
                <a href="#" style={{ fontSize: '13px', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Forgot password?</a>
              </div>

              <button type="submit" className="btn" style={{ padding: '14px', fontSize: '14px', width: '100%', marginBottom: '24px' }}>
                Sign In
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Or continue with</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <button type="button" className="btn-secondary" style={{ flex: 1, padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', borderRadius: 'var(--radius-sm)' }}>
                  <GoogleIcon /> Google
                </button>
                <button type="button" className="btn-secondary" style={{ flex: 1, padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', borderRadius: 'var(--radius-sm)' }}>
                  <MicrosoftIcon /> Microsoft
                </button>
              </div>

              <button type="button" className="btn-secondary" style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', fontWeight: 600 }}>
                Sign in with SSO (SAML)
              </button>

            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          &copy; 2026 VAYRAN Enterprise OS. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          <a href="#" style={{ fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none' }} className="hover:text-primary">Privacy</a>
          <a href="#" style={{ fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none' }} className="hover:text-primary">Terms</a>
          <a href="#" style={{ fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none' }} className="hover:text-primary">Security</a>
          <a href="#" style={{ fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none' }} className="hover:text-primary">Status</a>
          <a href="#" style={{ fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none' }} className="hover:text-primary">Documentation</a>
          <a href="#" style={{ fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none' }} className="hover:text-primary">Support</a>
        </div>
      </footer>
    </div>
  );
}
