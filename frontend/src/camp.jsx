import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const iPhoneHealthCampsApp = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [registeredCamp, setRegisteredCamp] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [userLocation, setUserLocation] = useState([10.1632, 76.6413]); // Ernakulam, Kerala

  const camps = [
    {
      id: 1,
      name: 'Bandhu Mobile Clinic',
      location: 'Perumbavoor Bengali Market',
      distance: '2.3 km',
      time: '9:00 AM - 3:00 PM',
      date: 'Today',
      type: 'general',
      available: 34,
      total: 200,
      isWHO: true,
      urgent: true,
      icon: '🩺',
      color: '#10b981',
      coordinates: [10.1530, 76.4740] // Perumbavoor coordinates
    },
    {
      id: 2,
      name: 'Heart Checkup Camp',
      location: 'Muvattupuzha School',
      distance: '5.8 km',
      time: '8:00 AM - 5:00 PM',
      date: 'Tomorrow',
      type: 'cardiac',
      available: 67,
      total: 300,
      isWHO: false,
      urgent: false,
      icon: '❤️',
      color: '#ef4444',
      coordinates: [10.0889, 76.5767] // Muvattupuzha coordinates
    },
    {
      id: 3,
      name: 'Eye Care Camp',
      location: 'Kozhikode Medical College',
      distance: '12.4 km',
      time: '9:00 AM - 4:00 PM',
      date: 'Sept 14',
      type: 'eye',
      available: 113,
      total: 500,
      isWHO: false,
      urgent: false,
      icon: '👁️',
      color: '#3b82f6',
      coordinates: [11.2588, 75.7804] // Kozhikode coordinates
    },
    {
      id: 4,
      name: 'Migrant Worker Special',
      location: 'Cheruvannur School',
      distance: '8.1 km',
      time: '9:00 AM - 3:00 PM',
      date: 'Sept 16',
      type: 'general',
      available: 102,
      total: 400,
      isWHO: false,
      urgent: true,
      icon: '🏗️',
      color: '#f59e0b',
      coordinates: [11.2490, 75.7803] // Cheruvannur coordinates
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.log('Location access denied, using default location');
        }
      );
    }
  }, []);

  const handleRegister = (campId) => {
    setIsLoading(true);
    setTimeout(() => {
      const camp = camps.find(c => c.id === campId);
      setRegisteredCamp(camp);
      setIsLoading(false);
      setShowConfirmation(true);
      
      // Automatically show directions after 2 seconds
      setTimeout(() => {
        setShowConfirmation(false);
        openGoogleMapsDirections(camp.coordinates);
      }, 2000);
    }, 1500);
  };

  const getAvailabilityColor = (available, total) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return '#10b981';
    if (percentage > 20) return '#f59e0b';
    return '#ef4444';
  };

  // Custom marker icons for different camp types
  const createCustomIcon = (color, emoji) => {
    return L.divIcon({
      html: `<div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
      ">${emoji}</div>`,
      className: 'custom-div-icon',
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });
  };

  // Map auto-fit component
  const MapUpdater = ({ camps, userLocation }) => {
    const map = useMap();
    
    useEffect(() => {
      if (camps.length > 0) {
        const bounds = L.latLngBounds([
          userLocation,
          ...camps.map(camp => camp.coordinates)
        ]);
        map.fitBounds(bounds, { padding: [20, 20] });
      }
    }, [camps, userLocation, map]);

    return null;
  };

  // Google Maps directions function
  const openGoogleMapsDirections = (destination) => {
    const origin = `${userLocation[0]},${userLocation[1]}`;
    const dest = `${destination[0]},${destination[1]}`;
    const url = `https://www.google.com/maps/dir/${origin}/${dest}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .iphone-container {
          width: 380px;
          height: 780px;
          background: #000;
          border-radius: 40px;
          padding: 8px;
          box-shadow: 
            0 30px 80px rgba(0,0,0,0.4),
            inset 0 2px 0 rgba(255,255,255,0.1),
            inset 0 -2px 0 rgba(255,255,255,0.05);
          position: relative;
        }

        .iphone-screen {
          width: 100%;
          height: 100%;
          background: #000;
          border-radius: 32px;
          overflow: hidden;
          position: relative;
        }

        .notch {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 140px;
          height: 30px;
          background: #000;
          border-radius: 0 0 16px 16px;
          z-index: 10;
        }

        .status-bar {
          background: linear-gradient(135deg, #667eea, #764ba2);
          height: 44px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          color: white;
          font-size: 14px;
          font-weight: 600;
        }

        .status-left {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .status-right {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .app-content {
          height: calc(100% - 44px);
          background: linear-gradient(to bottom, #f8fafc 0%, #e2e8f0 100%);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        .app-header {
          background: linear-gradient(135deg, #10b981, #059669);
          padding: 20px;
          color: white;
          text-align: center;
          position: sticky;
          top: 0;
          z-index: 5;
        }

        .app-title {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .app-subtitle {
          font-size: 13px;
          opacity: 0.9;
        }

        .search-bar {
          background: rgba(255,255,255,0.2);
          border-radius: 20px;
          padding: 12px 16px;
          margin: 12px 0;
          color: white;
          border: none;
          outline: none;
          placeholder-color: rgba(255,255,255,0.7);
          backdrop-filter: blur(10px);
        }

        .search-bar::placeholder {
          color: rgba(255,255,255,0.7);
        }

        .view-toggle {
          display: flex;
          background: rgba(255,255,255,0.2);
          border-radius: 20px;
          margin: 12px 0;
          overflow: hidden;
        }

        .toggle-btn {
          flex: 1;
          padding: 8px 16px;
          background: transparent;
          color: rgba(255,255,255,0.8);
          border: none;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .toggle-btn.active {
          background: rgba(255,255,255,0.3);
          color: white;
        }

        .quick-stats {
          display: flex;
          justify-content: space-around;
          padding: 16px 20px;
          background: white;
          margin: 0 16px 16px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 20px;
          font-weight: 800;
          color: #10b981;
        }

        .stat-label {
          font-size: 10px;
          color: #6b7280;
          margin-top: 2px;
        }

        .camps-list {
          padding: 0 16px 100px;
        }

        .map-container {
          height: 350px;
          margin: 0 16px 16px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .leaflet-container {
          height: 100%;
          width: 100%;
        }

        .camp-card {
          background: white;
          border-radius: 20px;
          margin-bottom: 16px;
          padding: 20px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
          border: 2px solid transparent;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .camp-card.registered {
          border-color: #10b981;
          box-shadow: 0 8px 32px rgba(16, 185, 129, 0.2);
        }

        .camp-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--camp-color, #10b981);
        }

        .camp-card:active {
          transform: scale(0.98);
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        }

        .camp-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .camp-info {
          flex: 1;
        }

        .camp-icon {
          font-size: 32px;
          margin-bottom: 8px;
        }

        .camp-name {
          font-size: 16px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 4px;
          line-height: 1.2;
        }

        .camp-location {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 6px;
        }

        .camp-badges {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }

        .badge {
          padding: 3px 8px;
          border-radius: 12px;
          font-size: 9px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .badge.who {
          background: #dbeafe;
          color: #1e40af;
        }

        .badge.urgent {
          background: #fee2e2;
          color: #b91c1c;
          animation: badgePulse 1.5s infinite;
        }

        .badge.free {
          background: #dcfce7;
          color: #166534;
        }

        .badge.registered {
          background: #d1fae5;
          color: #065f46;
        }

        @keyframes badgePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .camp-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .camp-distance {
          background: linear-gradient(135deg, #f3e8ff, #e9d5ff);
          color: #7c3aed;
          padding: 4px 10px;
          border-radius: 16px;
          font-size: 11px;
          font-weight: 600;
        }

        .camp-date {
          font-size: 12px;
          font-weight: 600;
          color: #059669;
        }

        .camp-time {
          font-size: 11px;
          color: #6b7280;
        }

        .availability-section {
          background: #f9fafb;
          border-radius: 12px;
          padding: 12px;
          margin-bottom: 16px;
        }

        .availability-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .availability-title {
          font-size: 12px;
          font-weight: 600;
          color: #374151;
        }

        .availability-count {
          font-size: 11px;
          font-weight: 600;
          color: var(--availability-color, #10b981);
        }

        .availability-bar {
          background: #e5e7eb;
          height: 6px;
          border-radius: 3px;
          overflow: hidden;
        }

        .availability-fill {
          height: 100%;
          background: var(--availability-color, #10b981);
          border-radius: 3px;
          transition: width 0.6s ease;
        }

        .register-btn {
          background: linear-gradient(135deg, var(--camp-color, #10b981), color-mix(in srgb, var(--camp-color, #10b981) 80%, #000));
          color: white;
          border: none;
          padding: 14px 20px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          width: 100%;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .register-btn:active {
          transform: scale(0.98);
        }

        .register-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .register-btn.registered {
          background: linear-gradient(135deg, #10b981, #059669);
        }

        .directions-btn {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          width: 100%;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .directions-btn:hover {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
        }

        .loading-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .confirmation-popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          text-align: center;
          z-index: 100;
          animation: popupSlide 0.3s ease;
        }

        @keyframes popupSlide {
          from { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
          to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }

        .success-icon {
          font-size: 48px;
          margin-bottom: 12px;
        }

        .success-title {
          font-size: 16px;
          font-weight: 700;
          color: #059669;
          margin-bottom: 8px;
        }

        .success-message {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.4;
        }

        .countdown-text {
          font-size: 11px;
          color: #3b82f6;
          margin-top: 8px;
          font-weight: 600;
        }

        .home-indicator {
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 134px;
          height: 5px;
          background: rgba(255,255,255,0.3);
          border-radius: 2.5px;
        }

        /* Custom scrollbar for webkit */
        .app-content::-webkit-scrollbar {
          display: none;
        }

        .app-content {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Custom Leaflet popup styles */
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
        }

        .leaflet-popup-content {
          margin: 12px 16px;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
        }

        .popup-camp-name {
          font-size: 14px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 4px;
        }

        .popup-camp-info {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 8px;
        }

        .popup-availability {
          background: #f3f4f6;
          padding: 8px;
          border-radius: 8px;
          font-size: 11px;
          color: #374151;
        }
      `}</style>

      <div className="iphone-container">
        <div className="iphone-screen">
          <div className="notch"></div>
          
          <div className="status-bar">
            <div className="status-left">
              <span>{currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false })}</span>
            </div>
            <div className="status-right">
              <span>📶</span>
              <span>📡</span>
              <span>🔋</span>
              <span>87%</span>
            </div>
          </div>

          <div className="app-content">
            <div className="app-header">
              <div className="app-title">निकटतम स्वास्थ्य शिविर</div>
              <div className="app-subtitle">Nearby Health Camps</div>
              <input 
                type="text" 
                className="search-bar" 
                placeholder="🔍 खोजें... / Search camps near you"
              />
              
              <div className="view-toggle">
                <button 
                  className={`toggle-btn ${!showMap ? 'active' : ''}`}
                  onClick={() => setShowMap(false)}
                >
                  📋 सूची / List
                </button>
                <button 
                  className={`toggle-btn ${showMap ? 'active' : ''}`}
                  onClick={() => setShowMap(true)}
                >
                  🗺️ नक्शा / Map
                </button>
              </div>
            </div>

            <div className="quick-stats">
              <div className="stat-item">
                <div className="stat-number">4</div>
                <div className="stat-label">Today</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">316</div>
                <div className="stat-label">Available</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Free</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">2.3km</div>
                <div className="stat-label">Nearest</div>
              </div>
            </div>

            {showMap && (
              <div className="map-container">
                <MapContainer 
                  center={userLocation} 
                  zoom={10} 
                  style={{ height: '100%', width: '100%' }}
                  zoomControl={true}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  <MapUpdater camps={camps} userLocation={userLocation} />
                  
                  {/* User location marker */}
                  <Marker 
                    position={userLocation}
                    icon={createCustomIcon('#3b82f6', '📍')}
                  >
                    <Popup>
                      <div>
                        <div className="popup-camp-name">आपका स्थान / Your Location</div>
                        <div className="popup-camp-info">Current position</div>
                      </div>
                    </Popup>
                  </Marker>

                  {/* Health camp markers */}
                  {camps.map(camp => (
                    <Marker 
                      key={camp.id}
                      position={camp.coordinates}
                      icon={createCustomIcon(
                        registeredCamp?.id === camp.id ? '#10b981' : camp.color, 
                        camp.icon
                      )}
                    >
                      <Popup>
                        <div>
                          <div className="popup-camp-name">
                            {camp.name}
                            {registeredCamp?.id === camp.id && ' ✅'}
                          </div>
                          <div className="popup-camp-info">
                            📍 {camp.location}<br/>
                            📅 {camp.date} | 🕐 {camp.time}<br/>
                            🚗 {camp.distance} away
                          </div>
                          <div className="popup-availability">
                            👥 {camp.available} spots available
                            {registeredCamp?.id === camp.id && <br/>}
                            {registeredCamp?.id === camp.id && '✅ Registered!'}
                          </div>
                          {registeredCamp?.id === camp.id && (
                            <button 
                              onClick={() => openGoogleMapsDirections(camp.coordinates)}
                              style={{
                                background: '#3b82f6',
                                color: 'white',
                                border: 'none',
                                padding: '6px 12px',
                                borderRadius: '6px',
                                fontSize: '10px',
                                marginTop: '8px',
                                cursor: 'pointer'
                              }}
                            >
                              🧭 Get Directions
                            </button>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            )}

            {!showMap && (
              <div className="camps-list">
                {camps.map(camp => (
                  <div 
                    key={camp.id} 
                    className={`camp-card ${registeredCamp?.id === camp.id ? 'registered' : ''}`}
                    style={{ '--camp-color': camp.color, '--availability-color': getAvailabilityColor(camp.available, camp.total) }}
                  >
                    <div className="camp-header">
                      <div className="camp-info">
                        <div className="camp-icon">{camp.icon}</div>
                        <div className="camp-name">{camp.name}</div>
                        <div className="camp-location">📍 {camp.location}</div>
                        
                        <div className="camp-badges">
                          <span className="badge free">निःशुल्क</span>
                          {camp.isWHO && <span className="badge who">WHO</span>}
                          {camp.urgent && <span className="badge urgent">तत्काल</span>}
                          {registeredCamp?.id === camp.id && <span className="badge registered">पंजीकृत</span>}
                        </div>
                      </div>
                    </div>

                    <div className="camp-meta">
                      <div className="camp-distance">📍 {camp.distance}</div>
                      <div>
                        <div className="camp-date">📅 {camp.date}</div>
                        <div className="camp-time">🕐 {camp.time}</div>
                      </div>
                    </div>

                    <div className="availability-section">
                      <div className="availability-header">
                        <span className="availability-title">👥 उपलब्धता / Availability</span>
                        <span className="availability-count">{camp.available} स्थान बाकी</span>
                      </div>
                      <div className="availability-bar">
                        <div 
                          className="availability-fill"
                          style={{ width: `${(camp.available / camp.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {registeredCamp?.id === camp.id ? (
                      <>
                        <button className="register-btn registered" disabled>
                          ✅ पंजीकृत / Registered
                        </button>
                        <button 
                          className="directions-btn"
                          onClick={() => openGoogleMapsDirections(camp.coordinates)}
                        >
                          🧭 दिशाएं देखें / Get Directions
                        </button>
                      </>
                    ) : (
                      <button 
                        className="register-btn"
                        onClick={() => handleRegister(camp.id)}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="loading-spinner"></div>
                            पंजीकरण हो रहा है...
                          </>
                        ) : (
                          <>✅ तुरंत पंजीकरण करें / Register Now</>
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {showConfirmation && (
            <div className="confirmation-popup">
              <div className="success-icon">🎉</div>
              <div className="success-title">सफलतापूर्वक पंजीकृत!</div>
              <div className="success-message">
                आपका पंजीकरण पूरा हो गया है।<br/>
                SMS द्वारा पुष्टि मिलेगी।<br/>
                <strong>Successfully Registered!</strong>
              </div>
              <div className="countdown-text">
                🧭 Opening directions in 2 seconds...
              </div>
            </div>
          )}

          <div className="home-indicator"></div>
        </div>
      </div>
    </>
  );
};

export default iPhoneHealthCampsApp;
