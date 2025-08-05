
import React, { useRef, useMemo } from 'react';
import type { ChargingStation } from '../types';
import { StationStatus } from '../types';

interface MapViewProps {
  stations: ChargingStation[];
  selectedStation: ChargingStation | null;
  onStationSelect: (station: ChargingStation | null) => void;
  city: string;
}

// Bounding box for India
const INDIA_BOUNDS = {
  latMin: 8.0,
  latMax: 37.0,
  lonMin: 68.0,
  lonMax: 98.0,
};

const statusClasses: { [key in StationStatus]: { bg: string; ring: string } } = {
  [StationStatus.AVAILABLE]: { bg: 'bg-green-500', ring: 'ring-green-400' },
  [StationStatus.IN_USE]: { bg: 'bg-yellow-500', ring: 'ring-yellow-400' },
  [StationStatus.OUT_OF_ORDER]: { bg: 'bg-red-500', ring: 'ring-red-400' },
};

// Simple linear interpolation function
const mapRange = (value: number, inMin: number, inMax: number, outMin: number, outMax: number): number => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

const StationMarker: React.FC<{ station: ChargingStation; isSelected: boolean; onSelect: (station: ChargingStation) => void; x: number; y: number }> = ({ station, isSelected, onSelect, x, y }) => {
  const { bg, ring } = statusClasses[station.status];
  const size = isSelected ? 'w-6 h-6' : 'w-4 h-4';
  const zIndex = isSelected ? 10 : 1;

  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center group`}
      style={{ left: `${x}%`, top: `${y}%`, zIndex }}
      onClick={() => onSelect(station)}
    >
      <div
        className={`rounded-full ${size} ${bg} border-2 border-dark-100 transition-all duration-300 ${isSelected ? `ring-4 ${ring}` : `group-hover:ring-2 ${ring}`}`}
      ></div>
      <div className="absolute bottom-full mb-2 w-max bg-dark-300 text-dark-content text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
           style={{ transform: 'translateX(-50%)', left: '50%' }}>
        {station.name}
      </div>
    </div>
  );
};


export const MapView: React.FC<MapViewProps> = ({ stations, selectedStation, onStationSelect, city }) => {
    const mapRef = useRef<HTMLDivElement>(null);
  
    const stationCoordinates = useMemo(() => {
        if (!mapRef.current) return [];
        return stations.map(station => {
          // Clamp coordinates to bounds to prevent markers from going way off-screen
          const lon = Math.max(INDIA_BOUNDS.lonMin, Math.min(station.longitude, INDIA_BOUNDS.lonMax));
          const lat = Math.max(INDIA_BOUNDS.latMin, Math.min(station.latitude, INDIA_BOUNDS.latMax));
    
          const x = mapRange(lon, INDIA_BOUNDS.lonMin, INDIA_BOUNDS.lonMax, 0, 100);
          // Invert latitude mapping because screen Y coordinates increase downwards
          const y = mapRange(lat, INDIA_BOUNDS.latMax, INDIA_BOUNDS.latMin, 0, 100); 
    
          return { ...station, x, y };
        });
      }, [stations]);

  return (
    <div className="w-full h-full relative overflow-hidden rounded-lg" ref={mapRef}>
        <img
            src="https://raw.githubusercontent.com/Anuj-Badarinath/India-State-And-Districts-Shapefile-Updated-2021/master/India_Map.png"
            alt="Map of India"
            className="w-full h-full object-contain object-center opacity-10"
        />
        <div className="absolute inset-0">
            {stationCoordinates.map(station => (
                <StationMarker 
                    key={station.id}
                    station={station}
                    isSelected={selectedStation?.id === station.id}
                    onSelect={() => onStationSelect(station)}
                    x={station.x}
                    y={station.y}
                />
            ))}
        </div>
        <div className="absolute top-4 left-4 bg-dark-100/70 backdrop-blur-sm p-3 rounded-lg">
            <h3 className="text-lg font-bold text-dark-content">Map View</h3>
            <p className="text-sm text-dark-content-secondary">
                {city ? `Showing stations for ${city}` : 'Search for a city'}
            </p>
        </div>
    </div>
  );
};
