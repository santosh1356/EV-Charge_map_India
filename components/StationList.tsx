
import React from 'react';
import type { ChargingStation } from '../types';
import { StationStatus } from '../types';
import { LocationIcon, ZapIcon, InfoIcon } from './icons';

interface StationListProps {
  stations: ChargingStation[];
  selectedStation: ChargingStation | null;
  onStationSelect: (station: ChargingStation) => void;
  isLoading: boolean;
  error: string | null;
}

const statusColorMap: { [key in StationStatus]: string } = {
  [StationStatus.AVAILABLE]: 'bg-green-500',
  [StationStatus.IN_USE]: 'bg-yellow-500',
  [StationStatus.OUT_OF_ORDER]: 'bg-red-500',
};

const SkeletonCard: React.FC = () => (
  <div className="p-3 bg-dark-300 rounded-lg animate-pulse">
    <div className="h-5 bg-dark-100 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-dark-100 rounded w-1/2"></div>
  </div>
);

const StationCard: React.FC<{ station: ChargingStation; isSelected: boolean; onSelect: (station: ChargingStation) => void }> = ({ station, isSelected, onSelect }) => {
  return (
    <li
      onClick={() => onSelect(station)}
      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 border-2 ${isSelected ? 'bg-dark-300 border-brand-green' : 'bg-dark-200 border-dark-300 hover:bg-dark-300'}`}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-dark-content text-md pr-2">{station.name}</h3>
        <div className="flex items-center gap-2 text-xs flex-shrink-0">
          <span className={`w-3 h-3 rounded-full ${statusColorMap[station.status]}`}></span>
          <span className="text-dark-content-secondary">{station.status}</span>
        </div>
      </div>
      <p className="text-sm text-dark-content-secondary flex items-center gap-1 mt-1">
        <LocationIcon className="w-4 h-4" />
        {station.address}
      </p>
      <div className="text-xs text-dark-content-secondary flex items-center gap-1 mt-2">
        <ZapIcon className="w-4 h-4" />
        {station.chargerType.join(', ')}
      </div>
    </li>
  );
};

export const StationList: React.FC<StationListProps> = ({ stations, selectedStation, onStationSelect, isLoading, error }) => {
  return (
    <div className="bg-dark-200 border border-dark-300 rounded-lg p-4 flex-grow flex flex-col min-h-0">
      <h2 className="text-lg font-bold mb-4 text-dark-content">Stations</h2>
      {error && !isLoading && (
        <div className="flex flex-col items-center justify-center text-center p-4 text-red-400">
            <InfoIcon className="w-8 h-8 mb-2"/>
            <p>{error}</p>
        </div>
      )}
      <ul className="space-y-3 overflow-y-auto pr-1 -mr-2 flex-grow">
        {isLoading && Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}
        {!isLoading && stations.length > 0 && stations.map(station => (
          <StationCard 
            key={station.id} 
            station={station} 
            isSelected={selectedStation?.id === station.id} 
            onSelect={onStationSelect}
          />
        ))}
        {!isLoading && !error && stations.length === 0 && (
          <div className="text-center text-dark-content-secondary pt-10">
            <p>No stations found.</p>
            <p className="text-sm">Try searching for a city.</p>
          </div>
        )}
      </ul>
    </div>
  );
};
