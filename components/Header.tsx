
import React from 'react';
import { LogoIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-dark-200 border-b border-dark-300 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center gap-3">
        <LogoIcon className="w-8 h-8 text-brand-green" />
        <h1 className="text-xl font-bold text-dark-content tracking-tight">
          EV ChargeMap <span className="text-brand-green">India</span>
        </h1>
      </div>
    </header>
  );
};
