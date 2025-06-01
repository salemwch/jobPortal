import React from 'react';

export const Badge = ({ children, variant = 'default', className = '' }) => {
  const base = 'inline-block text-xs font-semibold px-3 py-1 rounded-full';
  const styles = {
    default: 'bg-blue-100 text-blue-800',
    outline: 'border border-blue-500 text-blue-500 bg-transparent',
  };

  return (
    <span className={`${base} ${styles[variant] || ''} ${className}`}>
      {children}
    </span>
  );
};
