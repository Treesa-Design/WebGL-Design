'use client';
import { useState } from 'react';

const DismissableMessage = ({ 
  title, 
  description, 
  gradient = 'linear-gradient(45deg, #ff0080, #40e0d0)', 
  borderColor = 'rgba(255, 255, 255, 0.3)',
  position = { top: '100px', left: '2rem' }
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Trigger fade-in animation after component mounts
  useState(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'absolute',
      top: position.top,
      left: position.left,
      right: position.right,
      color: 'white',
      zIndex: 20,
      background: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(20px)',
      padding: '1rem 1rem 1rem 1.2rem',
      borderRadius: '0.75rem',
      border: `1px solid ${borderColor}`,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      animation: `${isLoaded ? 'fade-in 1s ease-out' : 'none'}`,
      opacity: isLoaded ? 1 : 0,
      maxWidth: '350px',
      transition: 'all 0.3s ease'
    }}>
      {/* Close Button */}
      <button
        onClick={() => setIsVisible(false)}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: 'rgba(255, 255, 255, 0.1)',
          border: 'none',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          fontWeight: 'bold',
          transition: 'all 0.2s ease',
          zIndex: 1
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.2)';
          e.target.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.1)';
          e.target.style.transform = 'scale(1)';
        }}
        aria-label="Dismiss message"
      >
        ×
      </button>

      {/* Content */}
      <div style={{ paddingRight: '24px' }}>
        <h3 style={{ 
          margin: '0 0 0.5rem 0',
          background: gradient,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '1.1rem',
          fontWeight: '600'
        }}>
          {title}
        </h3>
        <p style={{ 
          margin: 0, 
          fontSize: '0.9rem', 
          opacity: 0.9,
          lineHeight: '1.4'
        }}>
          {description}
        </p>
      </div>

      {/* Subtle indicator dot */}
      <div style={{
        position: 'absolute',
        left: '8px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '4px',
        height: '24px',
        background: gradient,
        borderRadius: '2px',
        opacity: 0.6
      }} />
    </div>
  );
};

export default DismissableMessage;