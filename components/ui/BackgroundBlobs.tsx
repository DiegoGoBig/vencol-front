import React from 'react';

export const BackgroundBlobs: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="blob bg-zinc-600/20 w-96 h-96 rounded-full top-0 left-0 -translate-x-1/2 -translate-y-1/2 mix-blend-screen animate-pulse duration-[10000ms]"></div>
      <div className="blob bg-brand-green/10 w-[500px] h-[500px] rounded-full bottom-0 right-0 translate-x-1/3 translate-y-1/3 mix-blend-screen"></div>
      <div className="blob bg-gray-500/10 w-80 h-80 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-overlay"></div>
    </div>
  );
};