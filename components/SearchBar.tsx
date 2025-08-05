
import React, { useState } from 'react';
import { SearchIcon } from './icons';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState<string>('Mumbai');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4 bg-dark-200 rounded-lg border border-dark-300">
      <label htmlFor="city-search" className="text-sm font-medium text-dark-content-secondary">
        Find Charging Stations
      </label>
      <div className="flex gap-2">
        <input
          id="city-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a city name..."
          className="flex-grow bg-dark-100 border border-dark-300 rounded-md px-3 py-2 text-dark-content focus:outline-none focus:ring-2 focus:ring-brand-green"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !query}
          className="flex items-center justify-center px-4 py-2 bg-brand-green text-white font-bold rounded-md hover:bg-green-600 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <SearchIcon className="w-5 h-5" />
          )}
        </button>
      </div>
    </form>
  );
};
