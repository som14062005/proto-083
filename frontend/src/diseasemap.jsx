import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const KeralaHealthSurveillanceApp = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDisease, setSelectedDisease] = useState('all');
  const [timeRange, setTimeRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('heatmap');
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Enhanced disease outbreak data with priority levels
  const diseaseData = [
    {
      id: 1,
      location: 'Ernakulam Industrial Area',
      coordinates: [10.1632, 76.6413],
      cases: 24,
      disease: 'dengue',
      severity: 'critical',
      workers: 340,
      lastUpdated: '2 hours ago',
      trend: 'increasing',
      priority: 'urgent',
      affectedCamps: 3,
      mortalityRate: 2.1
    },
    {
      id: 2,
      location: 'Kozhikode Construction Sites',
      coordinates: [11.2588, 75.7804],
      cases: 8,
      disease: 'tuberculosis',
      severity: 'high',
      workers: 180,
      lastUpdated: '4 hours ago',
      trend: 'stable',
      priority: 'high',
      affectedCamps: 2,
      mortalityRate: 0.8
    },
    {
      id: 3,
      location: 'Thrissur Agricultural Sector',
      coordinates: [10.5276, 76.2144],
      cases: 15,
      disease: 'hepatitis',
      severity: 'medium',
      workers: 210,
      lastUpdated: '1 hour ago',
      trend: 'decreasing',
      priority: 'medium',
      affectedCamps: 1,
      mortalityRate: 0.3
    },
    {
      id: 4,
      location: 'Kollam Port Area',
      coordinates: [8.8932, 76.6141],
      cases: 32,
      disease: 'covid19',
      severity: 'critical',
      workers: 450,
      lastUpdated: '30 min ago',
      trend: 'increasing',
      priority: 'critical',
      affectedCamps: 4,
      mortalityRate: 1.2
    },
    {
      id: 5,
      location: 'Kottayam Plantation Workers',
      coordinates: [9.5916, 76.5222],
      cases: 6,
      disease: 'malaria',
      severity: 'low',
      workers: 120,
      lastUpdated: '6 hours ago',
      trend: 'stable',
      priority: 'low',
      affectedCamps: 1,
      mortalityRate: 0.1
    },
    {
      id: 6,
      location: 'Palakkad Rice Mills',
      coordinates: [10.7867, 76.6548],
      cases: 18,
      disease: 'typhoid',
      severity: 'high',
      workers: 280,
      lastUpdated: '3 hours ago',
      trend: 'increasing',
      priority: 'high',
      affectedCamps: 2,
      mortalityRate: 0.5
    }
  ];

  const diseases = [
    { id: 'all', name: 'All Diseases', color: '#6b7280', icon: '🦠' },
    { id: 'covid19', name: 'COVID-19', color: '#ef4444', icon: '🦠' },
    { id: 'dengue', name: 'Dengue', color: '#f59e0b', icon: '🦟' },
    { id: 'tuberculosis', name: 'Tuberculosis', color: '#8b5cf6', icon: '🫁' },
    { id: 'hepatitis', name: 'Hepatitis', color: '#10b981', icon: '🫀' },
    { id: 'malaria', name: 'Malaria', color: '#06b6d4', icon: '🦟' },
    { id: 'typhoid', name: 'Typhoid', color: '#ec4899', icon: '🧬' }
  ];

  const campaignTypes = [
    { id: 'vaccination', name: 'Vaccination Drive', icon: '💉', color: '#10b981' },
    { id: 'screening', name: 'Health Screening', icon: '🩺', color: '#3b82f6' },
    { id: 'awareness', name: 'Awareness Campaign', icon: '📢', color: '#f59e0b' },
    { id: 'quarantine', name: 'Quarantine Setup', icon: '🏥', color: '#ef4444' },
    { id: 'sanitation', name: 'Sanitation Drive', icon: '🧽', color: '#06b6d4' }
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate real-time notifications
  useEffect(() => {
    const notificationTimer = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        message: `New outbreak detected in ${diseaseData[Math.floor(Math.random() * diseaseData.length)].location}`,
        timestamp: new Date(),
        type: 'alert'
      };
      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
    }, 15000);

    return () => clearInterval(notificationTimer);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return '#dc2626';
      case 'high': return '#ea580c';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'critical': return '🚨';
      case 'urgent': return '⚠️';
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '📊';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return '📈';
      case 'decreasing': return '📉';
      case 'stable': return '📊';
      default: return '📊';
    }
  };

  const handleCreateCampaign = (campaignData) => {
    const newCampaign = {
      id: Date.now(),
      ...campaignData,
      location: selectedLocation,
      status: 'planned',
      createdAt: new Date(),
      estimatedCost: Math.floor(Math.random() * 500000) + 100000
    };
    setCampaigns(prev => [newCampaign, ...prev]);
    setShowCampaignModal(false);
    setSelectedLocation(null);
  };

  const filteredData = selectedDisease === 'all' 
    ? diseaseData 
    : diseaseData.filter(item => item.disease === selectedDisease);

  const CampaignModal = () => {
    const [campaignType, setCampaignType] = useState('vaccination');
    const [duration, setDuration] = useState('3');
    const [resources, setResources] = useState('100');

    return (
      <div className="campaign-modal" onClick={() => setShowCampaignModal(false)}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>🎯 Launch Health Campaign</h3>
            <p>Location: {selectedLocation?.location}</p>
          </div>
          
          <div className="campaign-form">
            <div className="form-group">
              <label>Campaign Type</label>
              <div className="campaign-type-grid">
                {campaignTypes.map(type => (
                  <button
                    key={type.id}
                    className={`type-btn ${campaignType === type.id ? 'active' : ''}`}
                    style={{ '--type-color': type.color }}
                    onClick={() => setCampaignType(type.id)}
                  >
                    {type.icon} {type.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Duration (days)</label>
                <select value={duration} onChange={e => setDuration(e.target.value)}>
                  <option value="1">1 Day</option>
                  <option value="3">3 Days</option>
                  <option value="7">1 Week</option>
                  <option value="14">2 Weeks</option>
                </select>
              </div>
              <div className="form-group">
                <label>Resources Needed</label>
                <select value={resources} onChange={e => setResources(e.target.value)}>
                  <option value="50">Small (50 people)</option>
                  <option value="100">Medium (100 people)</option>
                  <option value="200">Large (200 people)</option>
                </select>
              </div>
            </div>

            <div className="campaign-actions">
              <button 
                className="launch-btn"
                onClick={() => handleCreateCampaign({
                  type: campaignType,
                  duration: parseInt(duration),
                  resources: parseInt(resources)
                })}
              >
                🚀 Launch Campaign
              </button>
              <button className="cancel-btn" onClick={() => setShowCampaignModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
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
          background: linear-gradient(135deg, #1e40af 0%, #3730a3 100%);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .phone-container {
          width: 380px;
          height: 780px;
          background: #000;
          border-radius: 40px;
          padding: 8px;
          box-shadow: 
            0 30px 80px rgba(0,0,0,0.4),
            inset 0 2px 0 rgba(255,255,255,0.1);
        }

        .phone-screen {
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
          background: linear-gradient(135deg, #059669, #047857);
          height: 44px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          color: white;
          font-size: 14px;
          font-weight: 600;
        }

        .app-content {
          height: calc(100% - 44px);
          background: linear-gradient(to bottom, #f8fafc 0%, #e2e8f0 100%);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        .app-header {
          background: linear-gradient(135deg, #059669, #047857);
          padding: 20px;
          color: white;
          position: sticky;
          top: 0;
          z-index: 5;
        }

        .app-title {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .app-subtitle {
          font-size: 12px;
          opacity: 0.9;
          margin-bottom: 12px;
        }

        .tab-navigation {
          display: flex;
          background: rgba(255,255,255,0.2);
          border-radius: 20px;
          overflow: hidden;
        }

        .tab-btn {
          flex: 1;
          padding: 8px 12px;
          background: transparent;
          color: rgba(255,255,255,0.8);
          border: none;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .tab-btn.active {
          background: rgba(255,255,255,0.3);
          color: white;
        }

        .notification-banner {
          background: rgba(239, 68, 68, 0.1);
          border-left: 4px solid #dc2626;
          margin: 16px;
          padding: 12px;
          border-radius: 12px;
          animation: slideIn 0.5s ease;
        }

        @keyframes slideIn {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        .notification-text {
          font-size: 11px;
          color: #dc2626;
          font-weight: 600;
        }

        .controls-section {
          padding: 16px;
          background: white;
          margin: 0 16px 16px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .disease-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }

        .filter-btn {
          padding: 6px 10px;
          border-radius: 16px;
          border: 2px solid #e5e7eb;
          background: white;
          font-size: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .filter-btn.active {
          background: var(--disease-color, #059669);
          color: white;
          border-color: var(--disease-color, #059669);
        }

        .time-filters {
          display: flex;
          gap: 8px;
        }

        .time-btn {
          flex: 1;
          padding: 8px;
          border-radius: 12px;
          border: 2px solid #e5e7eb;
          background: white;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .time-btn.active {
          background: #059669;
          color: white;
          border-color: #059669;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin: 0 16px 16px;
        }

        .stat-card {
          background: white;
          padding: 16px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--stat-color, #059669);
        }

        .stat-number {
          font-size: 20px;
          font-weight: 800;
          color: var(--stat-color, #059669);
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 9px;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .map-container {
          height: 250px;
          margin: 0 16px 16px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          position: relative;
        }

        .leaflet-container {
          height: 100%;
          width: 100%;
        }

        .alerts-section {
          padding: 0 16px 100px;
        }

        .alert-card {
          background: white;
          border-radius: 16px;
          margin-bottom: 12px;
          padding: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          border-left: 4px solid var(--severity-color, #059669);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .alert-card:active {
          transform: scale(0.98);
        }

        .alert-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .alert-location {
          font-size: 14px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 4px;
        }

        .alert-disease {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 8px;
        }

        .priority-badge {
          background: rgba(5, 150, 105, 0.1);
          color: #059669;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .alert-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-bottom: 12px;
        }

        .stat-item {
          text-align: center;
          padding: 8px;
          background: #f9fafb;
          border-radius: 8px;
        }

        .stat-value {
          font-size: 14px;
          font-weight: 700;
          color: #1f2937;
        }

        .stat-desc {
          font-size: 9px;
          color: #6b7280;
          text-transform: uppercase;
        }

        .campaign-btn {
          width: 100%;
          padding: 10px;
          background: linear-gradient(135deg, #059669, #047857);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 8px;
        }

        .campaign-btn:active {
          transform: scale(0.98);
        }

        .campaigns-list {
          padding: 0 16px 100px;
        }

        .campaign-card {
          background: white;
          border-radius: 16px;
          margin-bottom: 12px;
          padding: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          border-left: 4px solid var(--campaign-color, #059669);
        }

        .campaign-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .campaign-title {
          font-size: 14px;
          font-weight: 700;
          color: #1f2937;
        }

        .campaign-status {
          background: rgba(5, 150, 105, 0.1);
          color: #059669;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 600;
        }

        .campaign-meta {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: #6b7280;
        }

        .campaign-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 20px;
        }

        .modal-content {
          background: white;
          border-radius: 20px;
          padding: 24px;
          width: 90%;
          max-width: 320px;
          max-height: 80vh;
          overflow-y: auto;
        }

        .modal-header {
          text-align: center;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid #f3f4f6;
        }

        .modal-header h3 {
          font-size: 16px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 4px;
        }

        .modal-header p {
          font-size: 12px;
          color: #6b7280;
        }

        .campaign-form {
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-group label {
          font-size: 12px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
          display: block;
        }

        .campaign-type-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .type-btn {
          padding: 12px 8px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          background: white;
          font-size: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }

        .type-btn.active {
          background: var(--type-color, #059669);
          color: white;
          border-color: var(--type-color, #059669);
        }

        .form-row {
          display: flex;
          gap: 12px;
        }

        .form-row .form-group {
          flex: 1;
        }

        select {
          width: 100%;
          padding: 8px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 12px;
          background: white;
        }

        .campaign-actions {
          display: flex;
          gap: 12px;
        }

        .launch-btn {
          flex: 2;
          padding: 12px;
          background: linear-gradient(135deg, #059669, #047857);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .cancel-btn {
          flex: 1;
          padding: 12px;
          background: #f3f4f6;
          color: #6b7280;
          border: none;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
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

        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
        }

        .popup-content {
          padding: 8px;
          font-family: inherit;
        }

        .popup-title {
          font-weight: 700;
          font-size: 12px;
          margin-bottom: 4px;
        }

        .popup-info {
          font-size: 10px;
          color: #6b7280;
          margin-bottom: 8px;
        }

        .popup-btn {
          width: 100%;
          padding: 6px;
          background: #059669;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 600;
          cursor: pointer;
        }
      `}</style>

      <div className="phone-container">
        <div className="phone-screen">
          <div className="notch"></div>
          
          <div className="status-bar">
            <div>🏛️ KERALA GOVT ADMIN</div>
            <div>{currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</div>
          </div>

          <div className="app-content">
            <div className="app-header">
              <div className="app-title">🎯 Health Campaign Control Center</div>
              <div className="app-subtitle">Migrant Worker Disease Surveillance & Campaign Management</div>
              
              <div className="tab-navigation">
                <button 
                  className={`tab-btn ${activeTab === 'heatmap' ? 'active' : ''}`}
                  onClick={() => setActiveTab('heatmap')}
                >
                  🗺️ Heatmap
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'campaigns' ? 'active' : ''}`}
                  onClick={() => setActiveTab('campaigns')}
                >
                  🎯 Campaigns
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
                  onClick={() => setActiveTab('analytics')}
                >
                  📊 Analytics
                </button>
              </div>
            </div>

            {notifications.length > 0 && (
              <div className="notification-banner">
                <div className="notification-text">
                  🚨 ALERT: {notifications[0]?.message}
                </div>
              </div>
            )}

            {activeTab === 'heatmap' && (
              <>
                <div className="controls-section">
                  <div className="disease-filters">
                    {diseases.map(disease => (
                      <button
                        key={disease.id}
                        className={`filter-btn ${selectedDisease === disease.id ? 'active' : ''}`}
                        style={{ '--disease-color': disease.color }}
                        onClick={() => setSelectedDisease(disease.id)}
                      >
                        {disease.icon} {disease.name}
                      </button>
                    ))}
                  </div>
                  
                  <div className="time-filters">
                    {['24h', '7d', '30d'].map(period => (
                      <button
                        key={period}
                        className={`time-btn ${timeRange === period ? 'active' : ''}`}
                        onClick={() => setTimeRange(period)}
                      >
                        {period === '24h' ? '24 Hours' : period === '7d' ? '7 Days' : '30 Days'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="stats-grid">
                  <div className="stat-card" style={{'--stat-color': '#dc2626'}}>
                    <div className="stat-number">
                      {filteredData.reduce((sum, item) => sum + item.cases, 0)}
                    </div>
                    <div className="stat-label">Total Cases</div>
                  </div>
                  <div className="stat-card" style={{'--stat-color': '#f59e0b'}}>
                    <div className="stat-number">
                      {filteredData.filter(item => item.priority === 'critical' || item.priority === 'urgent').length}
                    </div>
                    <div className="stat-label">Critical Areas</div>
                  </div>
                  <div className="stat-card" style={{'--stat-color': '#10b981'}}>
                    <div className="stat-number">
                      {filteredData.reduce((sum, item) => sum + item.workers, 0)}
                    </div>
                    <div className="stat-label">Workers Monitored</div>
                  </div>
                  <div className="stat-card" style={{'--stat-color': '#3b82f6'}}>
                    <div className="stat-number">
                      {campaigns.length}
                    </div>
                    <div className="stat-label">Active Campaigns</div>
                  </div>
                </div>

                <div className="map-container">
                  <MapContainer 
                    center={[9.9312, 76.2673]} 
                    zoom={7} 
                    style={{ height: '100%', width: '100%' }}
                    zoomControl={false}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; OpenStreetMap contributors'
                    />
                    
                    {filteredData.map(item => (
                      <CircleMarker
                        key={item.id}
                        center={item.coordinates}
                        radius={Math.max(10, item.cases / 1.5)}
                        pathOptions={{
                          fillColor: getSeverityColor(item.severity),
                          color: getSeverityColor(item.severity),
                          weight: 3,
                          opacity: 0.9,
                          fillOpacity: 0.7
                        }}
                      >
                        <Popup>
                          <div className="popup-content">
                            <div className="popup-title">{item.location}</div>
                            <div className="popup-info">
                              🦠 {item.cases} cases • {item.disease}<br/>
                              👥 {item.workers} workers • {item.affectedCamps} camps<br/>
                              ⚠️ {item.severity} severity • {getTrendIcon(item.trend)} {item.trend}
                            </div>
                            <button 
                              className="popup-btn"
                              onClick={() => {
                                setSelectedLocation(item);
                                setShowCampaignModal(true);
                              }}
                            >
                              🎯 Launch Campaign
                            </button>
                          </div>
                        </Popup>
                      </CircleMarker>
                    ))}
                  </MapContainer>
                </div>

                <div className="alerts-section">
                  {filteredData
                    .sort((a, b) => {
                      const priorityOrder = { critical: 4, urgent: 3, high: 2, medium: 1, low: 0 };
                      return priorityOrder[b.priority] - priorityOrder[a.priority];
                    })
                    .map(alert => (
                    <div 
                      key={alert.id} 
                      className="alert-card"
                      style={{ '--severity-color': getSeverityColor(alert.severity) }}
                      onClick={() => {
                        setSelectedLocation(alert);
                        setShowCampaignModal(true);
                      }}
                    >
                      <div className="alert-header">
                        <div>
                          <div className="alert-location">{alert.location}</div>
                          <div className="alert-disease">
                            {diseases.find(d => d.id === alert.disease)?.icon} {alert.disease.toUpperCase()} OUTBREAK
                          </div>
                        </div>
                        <div className="priority-badge" style={{ color: getSeverityColor(alert.severity), background: `${getSeverityColor(alert.severity)}20` }}>
                          {getPriorityIcon(alert.priority)} {alert.priority}
                        </div>
                      </div>
                      
                      <div className="alert-stats">
                        <div className="stat-item">
                          <div className="stat-value">{alert.cases}</div>
                          <div className="stat-desc">Cases</div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-value">{alert.workers}</div>
                          <div className="stat-desc">Workers</div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-value">{alert.mortalityRate}%</div>
                          <div className="stat-desc">Mortality</div>
                        </div>
                      </div>
                      
                      <button className="campaign-btn">
                        🚀 Launch Immediate Response Campaign
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'campaigns' && (
              <div className="campaigns-list">
                {campaigns.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px', color: '#6b7280' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎯</div>
                    <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>No Active Campaigns</div>
                    <div style={{ fontSize: '12px' }}>Click on disease hotspots to launch campaigns</div>
                  </div>
                ) : (
                  campaigns.map(campaign => (
                    <div 
                      key={campaign.id} 
                      className="campaign-card"
                      style={{ '--campaign-color': campaignTypes.find(t => t.id === campaign.type)?.color }}
                    >
                      <div className="campaign-header">
                        <div className="campaign-title">
                          {campaignTypes.find(t => t.id === campaign.type)?.icon} {campaignTypes.find(t => t.id === campaign.type)?.name}
                        </div>
                        <div className="campaign-status">{campaign.status}</div>
                      </div>
                      
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>
                        📍 {campaign.location.location}
                      </div>
                      
                      <div className="campaign-meta">
                        <span>📅 {campaign.duration} days</span>
                        <span>👥 {campaign.resources} people</span>
                        <span>💰 ₹{(campaign.estimatedCost / 1000).toFixed(0)}K</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'analytics' && (
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📈</div>
                <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#1f2937' }}>Analytics Dashboard</div>
                <div style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.4' }}>
                  Comprehensive disease trends, campaign effectiveness metrics, and resource allocation analytics coming soon.
                </div>
              </div>
            )}
          </div>

          {showCampaignModal && <CampaignModal />}

          <div className="home-indicator"></div>
        </div>
      </div>
    </>
  );
};

export default KeralaHealthSurveillanceApp;
