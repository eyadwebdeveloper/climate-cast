import React from 'react';

const WeatherDetails = ({ data }) => {
  const { current, forecast } = data;
  const today = forecast.forecastday[0];

  return (
    <div className="weather-details">
      <h3>Today's Details</h3>
      <div className="details-grid">
        <div className="detail-card">
          <h4>Sunrise & Sunset</h4>
          <div className="sun-times">
            <div>🌅 Sunrise: {today.astro.sunrise}</div>
            <div>🌇 Sunset: {today.astro.sunset}</div>
          </div>
        </div>
        
        <div className="detail-card">
          <h4>Precipitation</h4>
          <div className="precipitation">
            <div>💧 Chance of Rain: {today.day.daily_chance_of_rain}%</div>
            <div>❄️ Chance of Snow: {today.day.daily_chance_of_snow}%</div>
            <div>🌧️ Total Precipitation: {today.day.totalprecip_mm}mm</div>
          </div>
        </div>
        
        <div className="detail-card">
          <h4>Wind & Pressure</h4>
          <div className="wind-pressure">
            <div>💨 Wind: {current.wind_kph} km/h {current.wind_dir}</div>
            <div>📊 Pressure: {current.pressure_mb} mb</div>
            <div>👁️ Visibility: {current.vis_km} km</div>
          </div>
        </div>
        
        <div className="detail-card">
          <h4>Moon Phase</h4>
          <div className="moon-phase">
            <div>🌙 {today.astro.moon_phase}</div>
            <div>Moonrise: {today.astro.moonrise}</div>
            <div>Moonset: {today.astro.moonset}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;