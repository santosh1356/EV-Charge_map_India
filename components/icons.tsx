
import React from 'react';

type IconProps = {
  className?: string;
};

export const SearchIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

export const LocationIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const ZapIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

export const LogoIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.5 8.7C3.5 5.8 5.8 3.5 8.7 3.5H12V1.5H8.7C4.7 1.5 1.5 4.7 1.5 8.7v6.6C1.5 19.3 4.7 22.5 8.7 22.5h6.6c4 0 7.2-3.2 7.2-7.2V8.7c0-2.4-1.6-4.4-3.7-5.1v10.5c0 1.2-1 2.2-2.2 2.2h-3c-1.2 0-2.2-1-2.2-2.2V8.7c0-.9-.7-1.7-1.7-1.7s-1.7.8-1.7 1.7v1.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5V8.7zM11 16.5c0 .1.1.2.2.2h3c.1 0 .2-.1.2-.2v-5c0-.1-.1-.2-.2-.2h-3c-.1 0-.2.1-.2.2v5z"/>
        <path d="M18.8 6.5c-.2-.1-.5 0-.6.2l-2.2 3.3V7.8c0-.2-.2-.4-.4-.4s-.4.2-.4.4v3.5c0 .2.2.4.4.4h.2c.1 0 .3-.1.3-.2l2.2-3.3v2.2c0 .2.2.4.4.4s.4-.2.4-.4V6.9c0-.2-.1-.4-.3-.4z"/>
    </svg>
);

export const InfoIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
