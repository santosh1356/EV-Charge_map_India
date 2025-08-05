
import React from 'react';
import { LogoIcon, InfoIcon } from './icons';

interface WelcomeSplashProps {
  error: string | null;
}

export const WelcomeSplash: React.FC<WelcomeSplashProps> = ({ error }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 text-dark-content-secondary">
      {error ? (
        <>
            <InfoIcon className="w-16 h-16 text-red-400 mb-4"/>
            <h2 className="text-2xl font-bold text-red-400 mb-2">An Error Occurred</h2>
            <p className="max-w-md">{error}</p>
        </>
      ) : (
        <>
            <LogoIcon className="w-24 h-24 text-dark-300 mb-4" />
            <h2 className="text-2xl font-bold text-dark-content mb-2">Welcome to EV ChargeMap</h2>
            <p className="max-w-md">Use the search bar to find electric vehicle charging stations in any major Indian city. Your results will be plotted on this map.</p>
        </>
      )}
    </div>
  );
};
