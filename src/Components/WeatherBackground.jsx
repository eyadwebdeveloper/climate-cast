import React from 'react';

const WeatherBackground = ({ timeOfDay, condition }) => {
  const isDay = timeOfDay === 'day';
  const isRainy = condition?.toLowerCase().includes('rain');
  const isCloudy = condition?.toLowerCase().includes('cloud');
  const isSnowy = condition?.toLowerCase().includes('snow');
  const isStormy = condition?.toLowerCase().includes('storm') || condition?.toLowerCase().includes('thunder');
  const isFoggy = condition?.toLowerCase().includes('fog') || condition?.toLowerCase().includes('mist');

  return (
    <div className={`weather-background ${timeOfDay}`}>
      {/* Sky Gradient */}
      <div className={`sky-gradient ${timeOfDay}`}></div>
      
      {/* Animated Sun/Moon */}
      <div className={`celestial-body ${timeOfDay}`}>
        {isDay ? (
          <div className="sun">
            <div className="sun-core"></div>
            <div className="sun-rays">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="sun-ray" style={{ transform: `rotate(${i * 45}deg)` }}></div>
              ))}
            </div>
          </div>
        ) : (
          <div className="moon">
            <div className="moon-crater"></div>
            <div className="moon-crater"></div>
            <div className="moon-crater"></div>
          </div>
        )}
      </div>

      {/* Realistic Animated Clouds */}
      {(isCloudy || isRainy || isStormy) && (
  <div className="clouds-container">
    <div className="cloud cloud-1" style={{ left: '-300px' }}>
      <div className="cloud-part part-1"></div>
      <div className="cloud-part part-2"></div>
      <div className="cloud-part part-3"></div>
      <div className="cloud-part part-4"></div>
    </div>
    <div className="cloud cloud-2" style={{ left: '-400px' }}>
      <div className="cloud-part part-1"></div>
      <div className="cloud-part part-2"></div>
      <div className="cloud-part part-3"></div>
      <div className="cloud-part part-4"></div>
    </div>
    <div className="cloud cloud-3" style={{ left: '-500px' }}>
      <div className="cloud-part part-1"></div>
      <div className="cloud-part part-2"></div>
      <div className="cloud-part part-3"></div>
      <div className="cloud-part part-4"></div>
    </div>
    <div className="cloud cloud-4" style={{ left: '-600px' }}>
      <div className="cloud-part part-1"></div>
      <div className="cloud-part part-2"></div>
      <div className="cloud-part part-3"></div>
      <div className="cloud-part part-4"></div>
    </div>
    <div className="cloud cloud-5" style={{ left: '-700px' }}>
      <div className="cloud-part part-1"></div>
      <div className="cloud-part part-2"></div>
      <div className="cloud-part part-3"></div>
      <div className="cloud-part part-4"></div>
    </div>
  </div>
)}

      {/* Fog Effect */}
      {isFoggy && (
        <div className="fog-effect">
          <div className="fog-layer fog-1"></div>
          <div className="fog-layer fog-2"></div>
          <div className="fog-layer fog-3"></div>
        </div>
      )}

      {/* Rain Effect */}
      {isRainy && (
        <div className="rain-effect">
          {[...Array(80)].map((_, i) => (
            <div key={i} className="rain-drop" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`,
              opacity: `${0.3 + Math.random() * 0.7}`
            }}></div>
          ))}
        </div>
      )}

      {/* Storm Effect */}
      {isStormy && (
        <>
          <div className="lightning-effect">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="lightning" style={{
                left: `${20 + i * 30}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${0.1 + Math.random() * 0.2}s`
              }}></div>
            ))}
          </div>
          <div className="rain-effect storm-rain">
            {[...Array(120)].map((_, i) => (
              <div key={i} className="rain-drop storm-drop" style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 1}s`,
                animationDuration: `${0.3 + Math.random() * 0.3}s`,
                opacity: `${0.5 + Math.random() * 0.5}`
              }}></div>
            ))}
          </div>
        </>
      )}

      {/* Snow Effect */}
      {isSnowy && (
        <div className="snow-effect">
          {[...Array(150)].map((_, i) => (
            <div key={i} className="snow-flake" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
              opacity: `${0.3 + Math.random() * 0.7}`,
              transform: `scale(${0.5 + Math.random() * 1})`
            }}></div>
          ))}
        </div>
      )}

      {/* Stars for Night */}
      {!isDay && (
        <div className="stars">
          {[...Array(100)].map((_, i) => (
            <div key={i} className="star" style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: `${0.1 + Math.random() * 0.9}`,
              transform: `scale(${0.5 + Math.random() * 1})`
            }}></div>
          ))}
        </div>
      )}

      {/* Floating Particles */}
      <div className="floating-particles">
        {[...Array(25)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${20 + Math.random() * 15}s`,
            transform: `scale(${0.3 + Math.random() * 0.7})`
          }}></div>
        ))}
      </div>
    </div>
  );
};

export default WeatherBackground;