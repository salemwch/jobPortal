import React from 'react';

export const Skeleton = ({ className = '' }) => {
  return (
    <div
      className={`animate-pulse bg-gray-300 rounded ${className}`}
    ></div>
  );
};
