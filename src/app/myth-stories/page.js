'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import DismissableMessage from '../components/DismissableMessage';

const MythStories = () => {
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
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={{ 
      minHeight: 'calc(100vh - 80px)', 
      marginTop: '80px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      overflow: 'hidden', 
      position: 'relative' 
    }}>
      <DismissableMessage 
        title="Myth Stories"
        description="Step into a realm where ancient legends meet cutting-edge WebGL technology."
        gradient="linear-gradient(45deg, #8b5cf6, #a855f7)"
        borderColor="rgba(139, 92, 246, 0.3)"
        position={{ top: '20px', left: '2rem' }}
      />
      {/* Multi-Color Animated Background */}
      <div style={{ position: 'fixed', inset: '0', pointerEvents: 'none' }}>
        {/* Dynamic mouse-following gradient */}
        <div 
          style={{
            position: 'absolute',
            inset: '0',
            opacity: 0.4,
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, hsl(260 80% 70% / 0.3) 0%, hsl(300 80% 70% / 0.2) 25%, hsl(240 80% 70% / 0.2) 50%, transparent 70%)`,
            transition: 'background 0.5s ease-out'
          }}
        />
        
        {/* Magical gradient overlay */}
        <div 
          style={{
            position: 'absolute',
            inset: '0',
            opacity: 0.3,
            background: 'linear-gradient(45deg, #8B5CF6, #A855F7, #C084FC, #DDD6FE, #8B5CF6)',
            backgroundSize: '400% 400%',
            animation: 'rainbow-shift 12s ease infinite'
          }}
        />
        
        {/* Animated mystical orbs */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '20%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          filter: 'blur(40px)',
          opacity: 0.4,
          background: 'linear-gradient(45deg, #8B5CF6, #A855F7, #C084FC)',
          animation: 'float 25s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          top: '60%',
          right: '20%',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          filter: 'blur(40px)',
          opacity: 0.3,
          background: 'linear-gradient(45deg, #A855F7, #C084FC, #DDD6FE)',
          animation: 'float 25s ease-in-out infinite',
          animationDelay: '5s'
        }} />
        <div style={{
          position: 'absolute',
          top: '40%',
          left: '60%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          filter: 'blur(35px)',
          opacity: 0.35,
          background: 'linear-gradient(45deg, #C084FC, #DDD6FE, #8B5CF6)',
          animation: 'float 25s ease-in-out infinite',
          animationDelay: '10s'
        }} />
             
        {/* Mystical floating particles */}
        <div style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: '8px',
          height: '8px',
          background: '#A855F7',
          borderRadius: '50%',
          opacity: 0.7,
          animation: 'float 20s ease-in-out infinite',
          boxShadow: '0 0 20px #A855F7'
        }} />
        <div style={{
          position: 'absolute',
          top: '25%',
          right: '15%',
          width: '6px',
          height: '6px',
          background: '#C084FC',
          borderRadius: '50%',
          opacity: 0.6,
          animation: 'float 20s ease-in-out infinite',
          animationDelay: '3s',
          boxShadow: '0 0 15px #C084FC'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '30%',
          left: '25%',
          width: '10px',
          height: '10px',
          background: '#8B5CF6',
          borderRadius: '50%',
          opacity: 0.8,
          animation: 'float 20s ease-in-out infinite',
          animationDelay: '7s',
          boxShadow: '0 0 25px #8B5CF6'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '30%',
          width: '5px',
          height: '5px',
          background: '#DDD6FE',
          borderRadius: '50%',
          opacity: 0.5,
          animation: 'float 20s ease-in-out infinite',
          animationDelay: '12s',
          boxShadow: '0 0 10px #DDD6FE'
        }} />
      </div>


      {/* Coming Soon Section */}
      <section style={{ 
        position: 'relative', 
        minHeight: 'calc(100vh - 80px)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{ 
          position: 'relative', 
          maxWidth: '800px', 
          margin: '0 auto', 
          padding: '0 24px', 
          textAlign: 'center' 
        }}>
          {/* Main Content */}
          <div style={{
            animation: isLoaded ? 'fade-in 1s ease-out' : 'none',
            opacity: isLoaded ? 1 : 0
          }}>
            {/* Icon */}
            <div style={{
              width: '120px',
              height: '120px',
              margin: '0 auto 32px auto',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(168, 85, 247, 0.3)',
              animation: 'float 6s ease-in-out infinite'
            }}>
              <svg style={{ width: '60px', height: '60px', color: '#A855F7' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 'bold',
              marginBottom: '16px',
              margin: '0 0 16px 0',
              background: 'linear-gradient(45deg, #8B5CF6, #A855F7, #C084FC, #DDD6FE)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '400% 400%',
              animation: 'rainbow-shift 4s ease infinite'
            }}>
              Myth Stories
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: '300',
              margin: '0 0 32px 0',
              animation: 'fade-in 1s ease-out 0.3s both'
            }}>
              Coming Soon
            </p>

            {/* Description */}
            <div style={{
              maxWidth: '500px',
              margin: '0 auto 48px auto',
              animation: 'fade-in 1s ease-out 0.5s both'
            }}>
              <p style={{
                fontSize: '18px',
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: '1.6',
                margin: '0 0 16px 0'
              }}>
                Step into a realm where ancient legends meet cutting-edge WebGL technology.
              </p>
              <p style={{
                fontSize: '16px',
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: '1.6',
                margin: 0
              }}>
                Interactive mythological experiences that bring timeless stories to life through immersive 3D visualization.
              </p>
            </div>

            {/* Progress Indicator */}
            <div style={{
              animation: 'fade-in 1s ease-out 0.7s both'
            }}>
              <div style={{
                width: '200px',
                height: '4px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '2px',
                margin: '0 auto 16px auto',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '40%',
                  height: '100%',
                  background: 'linear-gradient(90deg, #8B5CF6, #A855F7)',
                  borderRadius: '2px',
                  animation: 'float 3s ease-in-out infinite'
                }} />
              </div>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.6)',
                margin: 0
              }}>
                Development in Progress
              </p>
            </div>
          </div>

          {/* Decorative Elements */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            left: '-50px',
            width: '100px',
            height: '100px',
            border: '2px solid rgba(168, 85, 247, 0.3)',
            borderRadius: '50%',
            animation: 'float 8s ease-in-out infinite',
            opacity: 0.5
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-30px',
            right: '-30px',
            width: '60px',
            height: '60px',
            border: '2px solid rgba(192, 132, 252, 0.4)',
            borderRadius: '50%',
            animation: 'float 10s ease-in-out infinite',
            animationDelay: '2s',
            opacity: 0.4
          }} />
        </div>
      </section>
    </div>
  );
};

export default MythStories;