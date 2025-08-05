
import React, { useState, useCallback } from 'react';
import { fetchChargingStations } from './services/geminiService';
import type { ChargingStation } from './types';
import { SearchBar } from './components/SearchBar';
import { StationList } from './components/StationList';
import { MapView } from './components/MapView';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WelcomeSplash } from './components/WelcomeSplash';

export default function App() {
  const [stations, setStations] = useState<ChargingStation[]>([]);
  const [selectedStation, setSelectedStation] = useState<ChargingStation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchedCity, setSearchedCity] = useState<string>('');

  const handleSearch = useCallback(async (city: string) => {
    if (!city) return;
    setIsLoading(true);
    setError(null);
    setStations([]);
    setSearchedCity(city);
    setSelectedStation(null);

    try {
      const fetchedStations = await fetchChargingStations(city);
      setStations(fetchedStations);
    } catch (err) {
      setError('Failed to fetch charging stations. The AI might be busy, please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleStationSelect = useCallback((station: ChargingStation | null) => {
    setSelectedStation(station);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-dark-100 text-dark-content font-sans">
      <Header />
      <main className="flex-grow flex flex-col md:flex-row container mx-auto p-4 gap-4">
        <aside className="w-full md:w-1/3 lg:w-1/4 flex flex-col gap-4">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          <StationList 
            stations={stations} 
            selectedStation={selectedStation}
            onStationSelect={handleStationSelect}
            isLoading={isLoading}
            error={error}
          />
        </aside>
        <section className="flex-grow h-[60vh] md:h-auto rounded-lg bg-dark-200 border border-dark-300 shadow-lg">
           {stations.length > 0 || isLoading ? (
             <MapView 
               stations={stations}
               selectedStation={selectedStation}
               onStationSelect={handleStationSelect}
               city={searchedCity}
             />
           ) : (
            <WelcomeSplash error={error} />
           )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
