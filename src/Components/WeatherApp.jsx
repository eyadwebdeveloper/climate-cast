import { useState, useEffect } from 'react';
import axios from 'axios';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import WeatherDetails from './WeatherDetails';
import LocationSearch from './LocationSearch';
import WeatherBackground from './WeatherBackground';
import './WeatherApp.css';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [unit, setUnit] = useState('c');
  const [activeTab, setActiveTab] = useState('current');
  const [timeOfDay, setTimeOfDay] = useState('day');

  const API_KEY = 'd4050f4b458e4d629ab185551252910';
  const BASE_URL = 'https://api.weatherapi.com/v1';

  // Determine time of day for dynamic theming
  useEffect(() => {
    const hour = new Date().getHours();
    setTimeOfDay(hour >= 6 && hour < 18 ? 'day' : 'night');
  }, []);

  const fetchWeather = async (location = selectedLocation) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `${BASE_URL}/forecast.json?key=${API_KEY}&q=${location.value}&days=7&aqi=no&alerts=no`
      );
      setWeatherData(response.data);
      
      // Update time of day based on location time
      const localHour = new Date(response.data.location.localtime).getHours();
      setTimeOfDay(localHour >= 6 && localHour < 18 ? 'day' : 'night');
    } catch (err) {
      setError('Location not found. Please try another city.');
      console.error('Error fetching weather:', err);
    }
    setLoading(false);
  };

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const location = {
              name: 'Current Location',
              value: `${latitude},${longitude}`
            };
            resolve(location);
          },
          (error) => {
            const errorMessage = 'Location access denied. Please enable permissions.';
            reject(new Error(errorMessage));
          }
        );
      } else {
        reject(new Error('Geolocation not supported'));
      }
    });
  };

  // Get user's current location on app start
  useEffect(() => {
    const initializeApp = async () => {
      setLoading(true);
      try {
        // First try to get current location
        const currentLocation = await getCurrentLocation();
        setSelectedLocation(currentLocation);
        await fetchWeather(currentLocation);
      } catch (error) {
        // If current location fails, fall back to New York
        console.log('Falling back to default location:', error.message);
        setError(error.message);
        const defaultLocation = {
          name: 'New York',
          value: 'New York'
        };
        setSelectedLocation(defaultLocation);
        await fetchWeather(defaultLocation);
      }
    };

    initializeApp();
  }, []);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    fetchWeather(location);
  };

  const handleCurrentLocation = async () => {
    try {
      const currentLocation = await getCurrentLocation();
      setSelectedLocation(currentLocation);
      await fetchWeather(currentLocation);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  const convertTemp = (tempC) => {
    return unit === 'f' ? (tempC * 9/5 + 32).toFixed(0) : tempC.toFixed(0);
  };

  if (loading && !weatherData) {
    return (
      <div className={`weather-app ${timeOfDay}`}>
        <div className="loading-screen">
          <div className="loader">
            <div className="weather-spinner">
              <div className="sun"></div>
              <div className="ray"></div>
              <div className="ray"></div>
              <div className="ray"></div>
              <div className="ray"></div>
            </div>
            <p>Loading Weather Magic...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`weather-app ${timeOfDay}`}>
      {/* Dynamic Animated Background */}
      <WeatherBackground timeOfDay={timeOfDay} condition={weatherData?.current.condition.text} />

      {/* Main Content */}
      <div className="app-container">
        
        {/* Header */}
        <header className="app-header">
          <div className="header-content">
            <h1 className="app-title">
              <span className="title-icon">🌤️</span>
              ClimateCast
            </h1>
            <div className="header-controls">
              <LocationSearch 
                selectedLocation={selectedLocation}
                onLocationSelect={handleLocationSelect}
                onCurrentLocation={handleCurrentLocation}
                timeOfDay={timeOfDay}
              />
              <div className="unit-switcher">
                <button 
                  className={`unit-btn ${unit === 'c' ? 'active' : ''}`}
                  onClick={() => setUnit('c')}
                >
                  °C
                </button>
                <div className="divider"></div>
                <button 
                  className={`unit-btn ${unit === 'f' ? 'active' : ''}`}
                  onClick={() => setUnit('f')}
                >
                  °F
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Error Display */}
        {error && (
          <div className="error-toast">
            <span className="error-icon">⚠️</span>
            {error}
            <button onClick={() => setError('')} className="close-error">×</button>
          </div>
        )}

        {/* Main Weather Content */}
        {weatherData && (
          <main className="main-content">
            
            {/* Navigation Tabs */}
            <nav className="content-nav">
              <button 
                className={`nav-btn ${activeTab === 'current' ? 'active' : ''}`}
                onClick={() => setActiveTab('current')}
              >
                <span className="nav-icon">📊</span>
                Current
              </button>
              <button 
                className={`nav-btn ${activeTab === 'forecast' ? 'active' : ''}`}
                onClick={() => setActiveTab('forecast')}
              >
                <span className="nav-icon">📅</span>
                Forecast
              </button>
              <button 
                className={`nav-btn ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                <span className="nav-icon">🔍</span>
                Details
              </button>
            </nav>

            {/* Tab Content */}
            <div className="tab-content">
              {activeTab === 'current' && (
                <CurrentWeather 
                  data={weatherData} 
                  convertTemp={convertTemp} 
                  unit={unit}
                  timeOfDay={timeOfDay}
                />
              )}
              {activeTab === 'forecast' && (
                <Forecast 
                  data={weatherData.forecast} 
                  convertTemp={convertTemp} 
                  unit={unit}
                />
              )}
              {activeTab === 'details' && (
                <WeatherDetails data={weatherData} />
              )}
            </div>
          </main>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;