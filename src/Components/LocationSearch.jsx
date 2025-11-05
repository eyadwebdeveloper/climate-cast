import React, { useState, useRef, useEffect } from 'react';

const POPULAR_LOCATIONS = [
  { name: 'New York, US', value: 'New York', country: 'US' },
  { name: 'London, UK', value: 'London', country: 'GB' },
  { name: 'Tokyo, Japan', value: 'Tokyo', country: 'JP' },
  { name: 'Paris, France', value: 'Paris', country: 'FR' },
  { name: 'Sydney, Australia', value: 'Sydney', country: 'AU' },
  { name: 'Dubai, UAE', value: 'Dubai', country: 'AE' },
  { name: 'Singapore', value: 'Singapore', country: 'SG' },
  { name: 'Mumbai, India', value: 'Mumbai', country: 'IN' },
  { name: 'Berlin, Germany', value: 'Berlin', country: 'DE' },
  { name: 'Toronto, Canada', value: 'Toronto', country: 'CA' }
];

const LocationSearch = ({ selectedLocation, onLocationSelect, onCurrentLocation, timeOfDay }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const filteredLocations = POPULAR_LOCATIONS.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectLocation = async (location) => {
    setIsSearching(true);
    try {
      await onLocationSelect(location);
      setIsOpen(false);
      setSearchTerm('');
    } catch (error) {
      console.error('Error selecting location:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCustomSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() && !isSearching) {
      setIsSearching(true);
      try {
        await handleSelectLocation({
          name: searchTerm,
          value: searchTerm,
          country: 'Custom'
        });
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsSearching(false);
      }
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim()) {
      setIsOpen(true);
    }
  };

  const handleInputFocus = () => {
    if (searchTerm.trim() || POPULAR_LOCATIONS.length > 0) {
      setIsOpen(true);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    inputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCustomSearch(e);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="location-search" ref={dropdownRef}>
      <div className="search-container">
        <form onSubmit={handleCustomSearch} className="search-form">
  <div className="input-wrapper">
    <button 
      type="submit"
      className={`search-icon-btn ${isSearching ? 'searching' : ''}`}
      disabled={isSearching || !searchTerm.trim()}
      title={searchTerm.trim() ? "Search" : "Enter a city name"}
    >
      <span className="search-icon">
        {isSearching ? '⏳' : '🔍'}
      </span>
    </button>
    <input
      ref={inputRef}
      type="text"
      value={searchTerm}
      onChange={handleInputChange}
      onFocus={handleInputFocus}
      onKeyDown={handleKeyPress}
      placeholder="Search city..."
      className="search-input"
      disabled={isSearching}
    />
    {searchTerm && !isSearching && (
      <button 
        type="button" 
        className="clear-search"
        onClick={handleClearSearch}
        title="Clear search"
      >
        ×
      </button>
    )}
    {isSearching && (
      <div className="search-spinner"></div>
    )}
  </div>
</form>

        <button 
          onClick={onCurrentLocation} 
          className="current-location-btn"
          title="Use current location"
          disabled={isSearching}
        >
          <span className="location-pin">📍</span>
        </button>
      </div>

      {isOpen && (
        <div className="locations-dropdown">
          <div className="dropdown-section">
            <h4 className="section-title">Popular Cities</h4>
            <div className="locations-grid">
              {filteredLocations.map((location) => (
                <button
                  key={`${location.value}-${location.country}`}
                  type="button"
                  className={`location-card ${selectedLocation.value === location.value ? 'selected' : ''}`}
                  onClick={() => handleSelectLocation(location)}
                  disabled={isSearching}
                >
                  <span className="city-name">{location.name.split(',')[0]}</span>
                  <span className="country-flag">{location.country}</span>
                </button>
              ))}
            </div>
          </div>
          
          {searchTerm && filteredLocations.length === 0 && (
            <div className="no-results">
              <span className="no-results-icon">🌍</span>
              <p>No cities found in popular locations</p>
              <button 
                type="button"
                onClick={handleCustomSearch}
                className="search-anyway-btn"
                disabled={isSearching}
              >
                {isSearching ? 'Searching...' : `Search for "${searchTerm}"`}
              </button>
            </div>
          )}

          {!searchTerm && filteredLocations.length === 0 && (
            <div className="no-results">
              <span className="no-results-icon">🏙️</span>
              <p>Enter a city name to search</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;