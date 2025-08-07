'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const LandingPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0f0f23', 
      overflow: 'hidden', 
      position: 'relative' 
    }}>
      {/* Multi-Color Animated Background */}
      <div style={{ position: 'fixed', inset: '0', pointerEvents: 'none' }}>
        {/* Dynamic mouse-following gradient */}
        <div 
          style={{
            position: 'absolute',
            inset: '0',
            opacity: 0.4,
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, hsl(280 100% 70% / 0.3) 0%, hsl(220 100% 70% / 0.2) 25%, hsl(180 100% 70% / 0.2) 50%, transparent 70%)`,
            transition: 'background 0.5s ease-out'
          }}
        />
        
        {/* Rainbow gradient overlay */}
        <div 
          style={{
            position: 'absolute',
            inset: '0',
            opacity: 0.2,
            background: 'linear-gradient(45deg, #ff0080, #ff8c00, #40e0d0, #ee82ee, #98fb98, #ff69b4)',
            backgroundSize: '400% 400%',
            animation: 'rainbow-shift 8s ease infinite'
          }}
        />
        
        {/* Animated orbs */}
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '25%',
          width: '384px',
          height: '384px',
          borderRadius: '50%',
          filter: 'blur(48px)',
          opacity: 0.3,
          background: 'linear-gradient(45deg, #ff0080, #ff8c00, #40e0d0)',
          animation: 'float 20s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          top: '75%',
          right: '25%',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          filter: 'blur(48px)',
          opacity: 0.25,
          background: 'linear-gradient(45deg, #40e0d0, #ee82ee, #98fb98)',
          animation: 'float 20s ease-in-out infinite',
          animationDelay: '3s'
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '75%',
          width: '288px',
          height: '288px',
          borderRadius: '50%',
          filter: 'blur(48px)',
          opacity: 0.35,
          background: 'linear-gradient(45deg, #ee82ee, #ff69b4, #ff0080)',
          animation: 'float 20s ease-in-out infinite',
          animationDelay: '6s'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '25%',
          left: '50%',
          width: '256px',
          height: '256px',
          borderRadius: '50%',
          filter: 'blur(48px)',
          opacity: 0.2,
          background: 'linear-gradient(45deg, #98fb98, #ff8c00, #40e0d0)',
          animation: 'float 20s ease-in-out infinite',
          animationDelay: '9s'
        }} />
             
        {/* Multi-colored floating particles */}
        <div style={{
          position: 'absolute',
          top: '80px',
          left: '40px',
          width: '12px',
          height: '12px',
          background: '#ff0080',
          borderRadius: '50%',
          opacity: 0.8,
          animation: 'float 15s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          top: '160px',
          right: '80px',
          width: '8px',
          height: '8px',
          background: '#40e0d0',
          borderRadius: '50%',
          opacity: 0.7,
          animation: 'float 15s ease-in-out infinite',
          animationDelay: '2s'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '160px',
          left: '80px',
          width: '16px',
          height: '16px',
          background: '#ff8c00',
          borderRadius: '50%',
          opacity: 0.6,
          animation: 'float 15s ease-in-out infinite',
          animationDelay: '4s'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '80px',
          right: '40px',
          width: '8px',
          height: '8px',
          background: '#ee82ee',
          borderRadius: '50%',
          opacity: 0.5,
          animation: 'float 15s ease-in-out infinite',
          animationDelay: '6s'
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '40px',
          width: '12px',
          height: '12px',
          background: '#98fb98',
          borderRadius: '50%',
          opacity: 0.65,
          animation: 'float 15s ease-in-out infinite',
          animationDelay: '1s'
        }} />
        <div style={{
          position: 'absolute',
          top: '240px',
          right: '160px',
          width: '8px',
          height: '8px',
          background: '#ff69b4',
          borderRadius: '50%',
          opacity: 0.55,
          animation: 'float 15s ease-in-out infinite',
          animationDelay: '3s'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '240px',
          right: '240px',
          width: '12px',
          height: '12px',
          background: '#40e0d0',
          borderRadius: '50%',
          opacity: 0.45,
          animation: 'float 15s ease-in-out infinite',
          animationDelay: '5s'
        }} />
        
        {/* Gradient mesh overlay */}
        <div style={{
          position: 'absolute',
          inset: '0',
          opacity: 0.1,
          background: `
            radial-gradient(circle at 20% 20%, hsl(280 100% 70% / 0.6) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, hsl(220 100% 70% / 0.6) 0%, transparent 50%),
            radial-gradient(circle at 40% 70%, hsl(180 100% 70% / 0.6) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, hsl(320 100% 70% / 0.6) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, hsl(120 100% 70% / 0.6) 0%, transparent 50%)
          `
        }} />
      </div>

      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{ 
          position: 'relative', 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 clamp(16px, 4vw, 24px)', 
          paddingTop: 'clamp(80px, 15vh, 96px)' 
        }}>
          <div style={{ maxWidth: '1024px', margin: '0 auto', textAlign: 'center' }}>
            {/* Brand */}
            <div style={{
              marginBottom: '32px',
              transition: 'all 1s',
              animation: isLoaded ? 'fade-in 1s ease-out' : 'none',
              opacity: isLoaded ? 1 : 0
            }}>
              <h1 style={{
                fontSize: 'clamp(3rem, 8vw, 8rem)',
                fontWeight: 'bold',
                marginBottom: '16px',
                position: 'relative',
                margin: 0
              }}>
                <span style={{
                  background: 'linear-gradient(45deg, #ff0080, #40e0d0, #ff8c00, #ee82ee)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '400% 400%',
                  animation: 'rainbow-shift 3s ease infinite'
                }}>
                  Treesa Design
                </span>
              </h1>
              <p style={{
                fontSize: 'clamp(1.25rem, 3vw, 2rem)',
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: '300',
                margin: 0,
                animation: 'fade-in 1s ease-out 0.3s both'
              }}>
                Interactive WebGL Gallery
              </p>
            </div>

            {/* Description */}
            <div style={{
              marginBottom: 'clamp(32px, 8vw, 48px)',
              maxWidth: '512px',
              margin: '0 auto clamp(32px, 8vw, 48px) auto',
              transition: 'all 1s 0.3s',
              animation: isLoaded ? 'fade-in 1s ease-out 0.5s both' : 'none',
              opacity: isLoaded ? 1 : 0,
              padding: '0 16px'
            }}>
              <p style={{
                fontSize: 'clamp(16px, 3.5vw, 18px)',
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: '1.6',
                margin: 0
              }}>
                Immerse yourself in a world where digital artistry meets interactive technology. 
                Experience stunning WebGL creations that push the boundaries of web-based visualization.
              </p>
            </div>

            {/* CTA */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'all 1s 0.5s',
              animation: isLoaded ? 'fade-in 1s ease-out 0.7s both' : 'none',
              opacity: isLoaded ? 1 : 0
            }}>
              <Link href="/tree" style={{
                gap: '12px',
                padding: 'clamp(12px, 3vw, 16px) clamp(20px, 5vw, 24px)',
                fontSize: 'clamp(16px, 4vw, 18px)',
                fontWeight: '600',
                textDecoration: 'none',
                borderRadius: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                position: 'relative',
                color: 'white',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease'
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
                <span style={{ position: 'relative', zIndex: 10 }}>Explore Projects</span>
                <svg style={{ width: '20px', height: '20px', position: 'relative', zIndex: 10 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ 
        paddingTop: 'clamp(60px, 12vw, 80px)', 
        paddingBottom: 'clamp(60px, 12vw, 80px)', 
        borderTop: '1px solid rgba(255, 255, 255, 0.1)', 
        position: 'relative' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 24px)' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: 'clamp(24px, 6vw, 32px)', 
            maxWidth: '1024px', 
            margin: '0 auto' 
          }}>
            <div style={{ 
              textAlign: 'center', 
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'scale(1.1)';
                e.target.style.boxShadow = '0 8px 32px rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = 'none';
              }}>
                <svg style={{ width: '32px', height: '32px', color: '#ff0080' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: '600', 
                marginBottom: '8px', 
                color: 'white',
                transition: 'color 0.3s ease',
                margin: '0 0 8px 0'
              }}>Interactive</h3>
              <p style={{ 
                color: 'rgba(255, 255, 255, 0.6)',
                transition: 'color 0.3s ease',
                margin: 0,
                lineHeight: '1.5'
              }}>
                Engage with responsive 3D environments that react to your every move
              </p>
            </div>
            
            <div style={{ 
              textAlign: 'center', 
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'scale(1.1)';
                e.target.style.boxShadow = '0 8px 32px rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = 'none';
              }}>
                <svg style={{ width: '32px', height: '32px', color: '#40e0d0' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4 4 4 0 004-4V5z" />
                </svg>
              </div>
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: '600', 
                marginBottom: '8px', 
                color: 'white',
                transition: 'color 0.3s ease',
                margin: '0 0 8px 0'
              }}>Artistic</h3>
              <p style={{ 
                color: 'rgba(255, 255, 255, 0.6)',
                transition: 'color 0.3s ease',
                margin: 0,
                lineHeight: '1.5'
              }}>
                Curated digital experiences that blend technology with creative expression
              </p>
            </div>
            
            <div style={{ 
              textAlign: 'center', 
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'scale(1.1)';
                e.target.style.boxShadow = '0 8px 32px rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = 'none';
              }}>
                <svg style={{ width: '32px', height: '32px', color: '#ff8c00' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: '600', 
                marginBottom: '8px', 
                color: 'white',
                transition: 'color 0.3s ease',
                margin: '0 0 8px 0'
              }}>WebGL</h3>
              <p style={{ 
                color: 'rgba(255, 255, 255, 0.6)',
                transition: 'color 0.3s ease',
                margin: 0,
                lineHeight: '1.5'
              }}>
                Cutting-edge web graphics technology delivering stunning visual experiences
              </p>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
          <div style={{
            width: '24px',
            height: '40px',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            borderRadius: '20px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '4px',
              height: '12px',
              background: 'rgba(255, 255, 255, 0.4)',
              borderRadius: '2px',
              marginTop: '8px',
              animation: 'bounce 2s infinite'
            }} />
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;