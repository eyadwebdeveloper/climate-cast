import React from 'react';

const Forecast = ({ data, convertTemp, unit }) => {
  const { forecastday } = data;

  return (
    <div className="forecast">
      <h3>7-Day Forecast</h3>
      <div className="forecast-days">
        {forecastday.map((day, index) => (
          <div key={day.date_epoch} className="forecast-day">
            <div className="forecast-date">
              {index === 0 ? 'Today' : new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <img 
              src={day.day.condition.icon} 
              alt={day.day.condition.text}
              className="forecast-icon"
            />
            <div className="forecast-temps">
              <span className="forecast-high">
                {convertTemp(day.day.maxtemp_c)}°
              </span>
              <span className="forecast-low">
                {convertTemp(day.day.mintemp_c)}°
              </span>
            </div>
            <div className="forecast-condition">
              {day.day.condition.text}
            </div>
            <div className="forecast-details">
              <div>💧 {day.day.avghumidity}%</div>
              <div>💨 {day.day.maxwind_kph} km/h</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;