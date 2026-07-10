import React from 'react';

const CurrentWeather = ({ data, convertTemp, unit, timeOfDay }) => {
  const { current, location } = data;

  return (
    <div className="current-weather-card">
      <div className="current-weather-header">
        <div className="location-display">
          <h2 className="city-name">{location.name}</h2>
          <p className="country-name">{location.country}</p>
        </div>
        <div className="time-display">
          <p className="local-time">{location.localtime.split(' ')[1]}</p>
          <p className="current-date">
            {new Date(location.localtime).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>

      <div className="weather-main">
        <div className="temperature-section">
          <div className="current-temp">
            {convertTemp(current.temp_c)}°
            <span className="temp-unit">{unit.toUpperCase()}</span>
          </div>
          <div className="weather-condition">
            <img 
              src={current.condition.icon} 
              alt={current.condition.text}
              className="condition-icon"
            />
            <span className="condition-text">{current.condition.text}</span>
          </div>
          <div className="feels-like">
            Feels like {convertTemp(current.feelslike_c)}°{unit.toUpperCase()}
          </div>
        </div>

        <div className="weather-stats">
          <div className="stat-grid">
            <div className="stat-item">
              <div className="stat-icon">💧</div>
              <div className="stat-info">
                <span className="stat-value">{current.humidity}%</span>
                <span className="stat-label">Humidity</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">💨</div>
              <div className="stat-info">
                <span className="stat-value">{current.wind_kph} km/h</span>
                <span className="stat-label">Wind</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🔽</div>
              <div className="stat-info">
                <span className="stat-value">{current.pressure_mb} mb</span>
                <span className="stat-label">Pressure</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">👁️</div>
              <div className="stat-info">
                <span className="stat-value">{current.vis_km} km</span>
                <span className="stat-label">Visibility</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;