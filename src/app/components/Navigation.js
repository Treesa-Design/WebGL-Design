'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && !e.target.closest('.sidebar-menu') && !e.target.closest('.mobile-menu-btn')) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    // Prevent body scroll when menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navigationLinks = [
    { href: '/tree', label: 'Interactive Tree' },
    { href: '/maram', label: 'Maram' },
    { href: '/rosapo', label: 'Rosapo' },
    { href: '/myth-stories', label: 'Myth Stories' },
  ];

  return (
    <>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(20px)',
        padding: '16px 24px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <Link href="/" style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: 'clamp(18px, 4vw, 24px)',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #ff0080, #40e0d0, #ff8c00)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundSize: '400% 400%',
            animation: 'rainbow-shift 3s ease infinite',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            Treesa Design
          </Link>
          
          {/* Desktop Navigation */}
          <div style={{ 
            display: 'flex', 
            gap: '24px'
          }} className="desktop-nav">
            {navigationLinks.map((link) => (
              <Link key={link.href} href={link.href} style={{
                color: 'white',
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease',
                fontSize: '14px',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 20px rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}>
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: 'none',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              padding: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              zIndex: 1001
            }}
            className="mobile-menu-btn"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <div style={{
              width: '24px',
              height: '18px',
              position: 'relative'
            }}>
              <span style={{
                display: 'block',
                position: 'absolute',
                height: '2px',
                width: '100%',
                background: 'white',
                borderRadius: '1px',
                left: 0,
                top: 0,
                transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'rotate(0)',
                transition: 'all 0.3s ease'
              }} />
              <span style={{
                display: 'block',
                position: 'absolute',
                height: '2px',
                width: '100%',
                background: 'white',
                borderRadius: '1px',
                left: 0,
                top: '8px',
                opacity: isMobileMenuOpen ? 0 : 1,
                transition: 'all 0.3s ease'
              }} />
              <span style={{
                display: 'block',
                position: 'absolute',
                height: '2px',
                width: '100%',
                background: 'white',
                borderRadius: '1px',
                left: 0,
                top: '16px',
                transform: isMobileMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'rotate(0)',
                transition: 'all 0.3s ease'
              }} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.5)',
          opacity: isMobileMenuOpen ? 1 : 0,
          visibility: isMobileMenuOpen ? 'visible' : 'hidden',
          transition: 'all 0.3s ease',
          zIndex: 999
        }}
        className="menu-backdrop"
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Sidebar Menu */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '280px',
          height: '100vh',
          background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.95) 0%, rgba(25, 25, 45, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          zIndex: 1001,
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: isMobileMenuOpen ? '-10px 0 30px rgba(0, 0, 0, 0.3)' : 'none'
        }}
        className="sidebar-menu"
      >
        <div style={{
          padding: '80px 24px 24px 24px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Menu Header */}
          <div style={{
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            <h2 style={{
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold',
              margin: '0 0 8px 0',
              background: 'linear-gradient(45deg, #ff0080, #40e0d0, #ff8c00)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Navigation
            </h2>
            <div style={{
              width: '40px',
              height: '2px',
              background: 'linear-gradient(45deg, #ff0080, #40e0d0)',
              margin: '0 auto',
              borderRadius: '1px'
            }} />
          </div>

          {/* Navigation Links */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            flex: 1
          }}>
            {navigationLinks.map((link, index) => (
              <Link 
                key={link.href}
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease',
                  textAlign: 'left',
                  fontSize: '16px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transform: 'translateX(0)',
                  animation: isMobileMenuOpen ? `slideInRight 0.3s ease ${index * 0.1}s both` : 'none'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'translateX(-4px)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.target.style.transform = 'translateX(0)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #ff0080, #40e0d0)',
                  flexShrink: 0
                }} />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div style={{
            textAlign: 'center',
            paddingTop: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <p style={{
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '14px',
              margin: 0,
              fontWeight: '300'
            }}>
              WebGL Design Gallery
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;