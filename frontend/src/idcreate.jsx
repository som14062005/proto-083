import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MigrantHealthRecordApp = () => {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [showQRModal, setShowQRModal] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    aadhaar: '',
    name: '',
    phone: '',
    email: '',
    age: '',
    gender: '',
    occupation: '',
    workLocation: '',
    homeState: '',
    emergencyContact: '',
    bloodGroup: '',
    medicalHistory: []
  });
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [healthId, setHealthId] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Navigate to home function
  const handleHomeClick = () => {
    navigate('/');
  };

  // Generate unique health ID
  const generateHealthId = () => {
    const prefix = 'KER-MIG';
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    return `${prefix}-${year}-${random}`;
  };

  // Generate QR code pattern
  const generateQR = (healthId) => {
    return `https://kerala.gov.in/health/migrant/${healthId}`;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateAadhaar = (aadhaar) => {
    return /^\d{12}$/.test(aadhaar.replace(/\s/g, ''));
  };

  const handleAadhaarSubmit = async () => {
    if (!validateAadhaar(formData.aadhaar)) {
      alert('कृपया वैध आधार नंबर दर्ज करें / Please enter valid Aadhaar number');
      return;
    }
    
    setIsLoading(true);
    // Simulate Aadhaar verification
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
    }, 2000);
  };

  const handleOtpVerify = async () => {
    if (otp.length !== 6) {
      alert('कृपया 6 अंकों का OTP दर्ज करें / Please enter 6-digit OTP');
      return;
    }
    
    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      // Auto-fill from Aadhaar
      setFormData(prev => ({
        ...prev,
        name: 'राम कुमार शर्मा',
        age: '32',
        gender: 'male'
      }));
      setCurrentStep('profile');
      setIsLoading(false);
    }, 1500);
  };

  const handleRegistration = async () => {
    setIsLoading(true);
    const newHealthId = generateHealthId();
    
    // Simulate registration process
    setTimeout(() => {
      setHealthId(newHealthId);
      setQrCode(generateQR(newHealthId));
      setCurrentStep('success');
      setIsLoading(false);
    }, 3000);
  };

  // QR Code SVG Component
  const QRCodeSVG = ({ value, size = 200 }) => {
    return (
      <svg width={size} height={size} viewBox="0 0 200 200">
        {/* QR Code Pattern */}
        <rect width="200" height="200" fill="white"/>
        
        {/* Corner markers */}
        <rect x="10" y="10" width="60" height="60" fill="black"/>
        <rect x="20" y="20" width="40" height="40" fill="white"/>
        <rect x="30" y="30" width="20" height="20" fill="black"/>
        
        <rect x="130" y="10" width="60" height="60" fill="black"/>
        <rect x="140" y="20" width="40" height="40" fill="white"/>
        <rect x="150" y="30" width="20" height="20" fill="black"/>
        
        <rect x="10" y="130" width="60" height="60" fill="black"/>
        <rect x="20" y="140" width="40" height="40" fill="white"/>
        <rect x="30" y="150" width="20" height="20" fill="black"/>
        
        {/* Timing patterns */}
        <rect x="80" y="15" width="10" height="10" fill="black"/>
        <rect x="100" y="15" width="10" height="10" fill="black"/>
        <rect x="120" y="15" width="10" height="10" fill="black"/>
        
        <rect x="15" y="80" width="10" height="10" fill="black"/>
        <rect x="15" y="100" width="10" height="10" fill="black"/>
        <rect x="15" y="120" width="10" height="10" fill="black"/>
        
        {/* Data pattern (simplified) */}
        <rect x="80" y="40" width="10" height="10" fill="black"/>
        <rect x="100" y="40" width="10" height="10" fill="black"/>
        <rect x="80" y="50" width="10" height="10" fill="black"/>
        <rect x="110" y="50" width="10" height="10" fill="black"/>
        
        <rect x="40" y="80" width="10" height="10" fill="black"/>
        <rect x="50" y="80" width="10" height="10" fill="black"/>
        <rect x="60" y="80" width="10" height="10" fill="black"/>
        <rect x="40" y="90" width="10" height="10" fill="black"/>
        <rect x="60" y="90" width="10" height="10" fill="black"/>
        
        <rect x="80" y="80" width="10" height="10" fill="black"/>
        <rect x="100" y="80" width="10" height="10" fill="black"/>
        <rect x="120" y="80" width="10" height="10" fill="black"/>
        <rect x="140" y="80" width="10" height="10" fill="black"/>
        <rect x="160" y="80" width="10" height="10" fill="black"/>
        <rect x="180" y="80" width="10" height="10" fill="black"/>
        
        <rect x="80" y="100" width="10" height="10" fill="black"/>
        <rect x="90" y="100" width="10" height="10" fill="black"/>
        <rect x="110" y="100" width="10" height="10" fill="black"/>
        <rect x="130" y="100" width="10" height="10" fill="black"/>
        <rect x="150" y="100" width="10" height="10" fill="black"/>
        <rect x="170" y="100" width="10" height="10" fill="black"/>
        
        <rect x="80" y="120" width="10" height="10" fill="black"/>
        <rect x="100" y="120" width="10" height="10" fill="black"/>
        <rect x="120" y="120" width="10" height="10" fill="black"/>
        <rect x="140" y="120" width="10" height="10" fill="black"/>
        <rect x="160" y="120" width="10" height="10" fill="black"/>
        <rect x="180" y="120" width="10" height="10" fill="black"/>
        
        <rect x="40" y="140" width="10" height="10" fill="black"/>
        <rect x="60" y="140" width="10" height="10" fill="black"/>
        <rect x="40" y="160" width="10" height="10" fill="black"/>
        <rect x="50" y="160" width="10" height="10" fill="black"/>
        <rect x="60" y="160" width="10" height="10" fill="black"/>
        
        <rect x="80" y="140" width="10" height="10" fill="black"/>
        <rect x="90" y="140" width="10" height="10" fill="black"/>
        <rect x="110" y="140" width="10" height="10" fill="black"/>
        <rect x="130" y="140" width="10" height="10" fill="black"/>
        <rect x="150" y="140" width="10" height="10" fill="black"/>
        <rect x="170" y="140" width="10" height="10" fill="black"/>
        
        <rect x="80" y="160" width="10" height="10" fill="black"/>
        <rect x="100" y="160" width="10" height="10" fill="black"/>
        <rect x="120" y="160" width="10" height="10" fill="black"/>
        <rect x="140" y="160" width="10" height="10" fill="black"/>
        <rect x="160" y="160" width="10" height="10" fill="black"/>
        <rect x="180" y="160" width="10" height="10" fill="black"/>
        
        <rect x="80" y="180" width="10" height="10" fill="black"/>
        <rect x="90" y="180" width="10" height="10" fill="black"/>
        <rect x="110" y="180" width="10" height="10" fill="black"/>
        <rect x="130" y="180" width="10" height="10" fill="black"/>
        <rect x="150" y="180" width="10" height="10" fill="black"/>
        <rect x="170" y="180" width="10" height="10" fill="black"/>
      </svg>
    );
  };

  // QR Modal Component
  const QRModal = ({ isOpen, onClose, healthId }) => {
    if (!isOpen) return null;

    return (
      <div className="qr-modal-overlay" onClick={onClose}>
        <div className="qr-modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="qr-modal-header">
            <h3>स्वास्थ्य कार्ड QR कोड<br/>Health Card QR Code</h3>
            <button className="qr-modal-close" onClick={onClose}>×</button>
          </div>
          <div className="qr-modal-body">
            <div className="qr-fullscreen">
              <QRCodeSVG value={`https://kerala.gov.in/health/migrant/${healthId}`} size={300} />
            </div>
            <div className="qr-modal-info">
              <p><strong>Health ID:</strong> {healthId}</p>
              <p>चिकित्सा सेवा के लिए इस QR कोड को स्कैन करें<br/>
                 Scan this QR code for medical services</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Home Button Component
  const HomeButton = () => (
    <button 
      className="home-button" 
      onClick={handleHomeClick}
      title="वापस मुख्य पृष्ठ पर जाएं / Return to Home"
    >
      🏠
    </button>
  );

  const renderWelcome = () => (
    <div className="step-container">
      <HomeButton />
      <div className="header-section">
        <div className="kerala-emblem">🏛️</div>
        <h1>केरल सरकार</h1>
        <h2>Government of Kerala</h2>
        <div className="dept-title">स्वास्थ्य सेवा विभाग<br/>Health Services Department</div>
      </div>

      <div className="welcome-content">
        <div className="system-title">
          <h3>प्रवासी श्रमिक स्वास्थ्य रिकॉर्ड प्रणाली</h3>
          <h4>Digital Health Record System for Migrant Workers</h4>
        </div>

        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">🆔</div>
            <div className="benefit-text">
              <div className="benefit-title">डिजिटल स्वास्थ्य पहचान</div>
              <div className="benefit-desc">Unique Digital Health ID</div>
            </div>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">📱</div>
            <div className="benefit-text">
              <div className="benefit-title">QR आधारित पहुंच</div>
              <div className="benefit-desc">QR-based Quick Access</div>
            </div>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🏥</div>
            <div className="benefit-text">
              <div className="benefit-title">तुरंत चिकित्सा पहुंच</div>
              <div className="benefit-desc">Instant Medical Access</div>
            </div>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🛡️</div>
            <div className="benefit-text">
              <div className="benefit-title">सुरक्षित डेटा</div>
              <div className="benefit-desc">Secure Data Protection</div>
            </div>
          </div>
        </div>

        <div className="sdg-section">
          <div className="sdg-title">Supporting UN SDG Goals</div>
          <div className="sdg-goals">
            <div className="sdg-goal">
              <div className="sdg-number">3</div>
              <div className="sdg-text">Good Health & Well-being</div>
            </div>
            <div className="sdg-goal">
              <div className="sdg-number">10</div>
              <div className="sdg-text">Reduced Inequalities</div>
            </div>
            <div className="sdg-goal">
              <div className="sdg-number">16</div>
              <div className="sdg-text">Peace & Justice</div>
            </div>
          </div>
        </div>

        <button className="primary-btn" onClick={() => setCurrentStep('aadhaar')}>
          पंजीकरण शुरू करें / Start Registration
        </button>

        <div className="disclaimer">
          <div className="disclaimer-text">
            * यह सेवा केरल सरकार की आधिकारिक पहल है<br/>
            * This service is an official initiative of Government of Kerala
          </div>
        </div>
      </div>
    </div>
  );

  const renderAadhaar = () => (
    <div className="step-container">
      <HomeButton />
      <div className="step-header">
        <div className="step-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '33%' }}></div>
          </div>
          <div className="step-text">चरण 1/3: आधार सत्यापन / Step 1/3: Aadhaar Verification</div>
        </div>
      </div>

      <div className="form-section">
        <div className="section-title">
          <div className="title-icon">🔐</div>
          <h3>आधार सत्यापन<br/>Aadhaar Verification</h3>
        </div>

        <div className="info-banner">
          <div className="banner-icon">ℹ️</div>
          <div className="banner-text">
            आपका आधार डेटा पूर्णतः सुरक्षित है। यह केवल पहचान सत्यापन के लिए उपयोग किया जाता है।<br/>
            Your Aadhaar data is completely secure. It's used only for identity verification.
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">आधार संख्या / Aadhaar Number *</label>
          <input
            type="text"
            className="form-input aadhaar-input"
            placeholder="XXXX XXXX XXXX"
            value={formData.aadhaar}
            onChange={(e) => {
              let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
              value = value.substring(0, 12);
              value = value.replace(/(.{4})/g, '$1 ').trim();
              handleInputChange('aadhaar', value);
            }}
            maxLength={14}
          />
        </div>

        {!otpSent ? (
          <button 
            className="primary-btn" 
            onClick={handleAadhaarSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="loading-spinner"></div>
                सत्यापित कर रहे हैं... / Verifying...
              </>
            ) : (
              'OTP भेजें / Send OTP'
            )}
          </button>
        ) : (
          <div className="otp-section">
            <div className="success-message">
              <div className="success-icon">✅</div>
              <div className="success-text">
                OTP आपके पंजीकृत मोबाइल नंबर पर भेजा गया है<br/>
                OTP sent to your registered mobile number
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">6 अंकों का OTP दर्ज करें / Enter 6-digit OTP</label>
              <input
                type="text"
                className="form-input otp-input"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').substring(0, 6))}
                maxLength={6}
              />
            </div>

            <button 
              className="primary-btn" 
              onClick={handleOtpVerify}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner"></div>
                  सत्यापित कर रहे हैं... / Verifying...
                </>
              ) : (
                'OTP सत्यापित करें / Verify OTP'
              )}
            </button>

            <button className="secondary-btn" onClick={() => setOtpSent(false)}>
              दोबारा OTP भेजें / Resend OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="step-container">
      <HomeButton />
      <div className="step-header">
        <div className="step-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '66%' }}></div>
          </div>
          <div className="step-text">चरण 2/3: प्रोफ़ाइल जानकारी / Step 2/3: Profile Information</div>
        </div>
      </div>

      <div className="form-section">
        <div className="section-title">
          <div className="title-icon">👤</div>
          <h3>व्यक्तिगत जानकारी<br/>Personal Information</h3>
        </div>

        <div className="form-grid">
          <div className="input-group">
            <label className="input-label">पूरा नाम / Full Name *</label>
            <input
              type="text"
              className="form-input"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="आधार से स्वतः भरा गया / Auto-filled from Aadhaar"
              disabled
            />
          </div>

          <div className="input-group">
            <label className="input-label">मोबाइल नंबर / Mobile Number *</label>
            <input
              type="tel"
              className="form-input"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, '').substring(0, 10))}
              placeholder="10 अंकों का मोबाइल नंबर"
              maxLength={10}
            />
          </div>

          <div className="input-group">
            <label className="input-label">आयु / Age *</label>
            <input
              type="number"
              className="form-input"
              value={formData.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
              placeholder="वर्षों में आयु"
              disabled
            />
          </div>

          <div className="input-group">
            <label className="input-label">लिंग / Gender *</label>
            <select 
              className="form-input"
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              disabled
            >
              <option value="">चुनें / Select</option>
              <option value="male">पुरुष / Male</option>
              <option value="female">महिला / Female</option>
              <option value="other">अन्य / Other</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">व्यवसाय / Occupation *</label>
            <select 
              className="form-input"
              value={formData.occupation}
              onChange={(e) => handleInputChange('occupation', e.target.value)}
            >
              <option value="">चुनें / Select</option>
              <option value="construction">निर्माण कार्य / Construction</option>
              <option value="agriculture">कृषि कार्य / Agriculture</option>
              <option value="domestic">घरेलू कार्य / Domestic Work</option>
              <option value="manufacturing">विनिर्माण / Manufacturing</option>
              <option value="fishing">मत्स्य उद्योग / Fishing</option>
              <option value="other">अन्य / Other</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">कार्य स्थान (केरल में) / Work Location in Kerala *</label>
            <select 
              className="form-input"
              value={formData.workLocation}
              onChange={(e) => handleInputChange('workLocation', e.target.value)}
            >
              <option value="">जिला चुनें / Select District</option>
              <option value="thiruvananthapuram">तिरुवनंतपुरम / Thiruvananthapuram</option>
              <option value="kollam">कोल्लम / Kollam</option>
              <option value="kottayam">कोट्टयम / Kottayam</option>
              <option value="ernakulam">एर्णाकुलम / Ernakulam</option>
              <option value="kozhikode">कोझीकोड / Kozhikode</option>
              <option value="kannur">कन्नूर / Kannur</option>
              <option value="kasaragod">कासरगोड / Kasaragod</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">मूल राज्य / Home State *</label>
            <select 
              className="form-input"
              value={formData.homeState}
              onChange={(e) => handleInputChange('homeState', e.target.value)}
            >
              <option value="">राज्य चुनें / Select State</option>
              <option value="uttar-pradesh">उत्तर प्रदेश / Uttar Pradesh</option>
              <option value="bihar">बिहार / Bihar</option>
              <option value="west-bengal">पश्चिम बंगाल / West Bengal</option>
              <option value="odisha">ओडिशा / Odisha</option>
              <option value="jharkhand">झारखंड / Jharkhand</option>
              <option value="assam">असम / Assam</option>
              <option value="other">अन्य / Other</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">आपातकालीन संपर्क / Emergency Contact *</label>
            <input
              type="tel"
              className="form-input"
              value={formData.emergencyContact}
              onChange={(e) => handleInputChange('emergencyContact', e.target.value.replace(/\D/g, '').substring(0, 10))}
              placeholder="आपातकाल में संपर्क नंबर"
              maxLength={10}
            />
          </div>

          <div className="input-group">
            <label className="input-label">रक्त समूह / Blood Group</label>
            <select 
              className="form-input"
              value={formData.bloodGroup}
              onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
            >
              <option value="">चुनें / Select</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
        </div>

        <button 
          className="primary-btn" 
          onClick={handleRegistration}
          disabled={isLoading || !formData.phone || !formData.occupation || !formData.workLocation || !formData.homeState}
        >
          {isLoading ? (
            <>
              <div className="loading-spinner"></div>
              पंजीकरण कर रहे हैं... / Registering...
            </>
          ) : (
            'स्वास्थ्य ID बनाएं / Create Health ID'
          )}
        </button>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="step-container">
      <HomeButton />
      <div className="success-container">
        <div className="success-header">
          <div className="success-icon-large">🎉</div>
          <h2>पंजीकरण सफल!<br/>Registration Successful!</h2>
        </div>

        <div className="health-id-card">
          <div className="card-header">
            <div className="kerala-logo">🏛️</div>
            <div className="card-title">
              <div className="title-main">केरल डिजिटल स्वास्थ्य कार्ड</div>
              <div className="title-sub">Kerala Digital Health Card</div>
            </div>
          </div>

          <div className="card-body">
            <div className="personal-info">
              <div className="info-row">
                <span className="info-label">नाम / Name:</span>
                <span className="info-value">{formData.name}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Health ID:</span>
                <span className="info-value health-id-text">{healthId}</span>
              </div>
              <div className="info-row">
                <span className="info-label">व्यवसाय / Occupation:</span>
                <span className="info-value">{formData.occupation}</span>
              </div>
              <div className="info-row">
                <span className="info-label">कार्य स्थान / Work Location:</span>
                <span className="info-value">{formData.workLocation}</span>
              </div>
            </div>

            <div className="qr-section">
              <div className="qr-code-large">
                <QRCodeSVG value={qrCode} size={150} />
              </div>
              <div 
                className="qr-instruction clickable"
                onClick={() => setShowQRModal(true)}
              >
                चिकित्सा सेवा के लिए QR स्कैन करें<br/>
                Scan QR for Medical Services
              </div>
            </div>
          </div>

          <div className="card-footer">
            <div className="validity">वैधता / Valid: जीवनपर्यंत / Lifetime</div>
            <div className="emergency">आपातकाल / Emergency: 108</div>
          </div>
        </div>

        <div className="next-steps">
          <h4>अगले कदम / Next Steps:</h4>
          <div className="steps-list">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-text">अपना QR कोड स्क्रीनशॉट लें / Take screenshot of your QR code</div>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-text">निकटतम स्वास्थ्य केंद्र में जाकर रजिस्ट्रेशन पूरा करें / Visit nearest health center</div>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-text">चिकित्सा जांच के समय QR दिखाएं / Show QR during medical checkups</div>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button className="primary-btn" onClick={() => window.print()}>
            कार्ड प्रिंट करें / Print Card
          </button>
          <button className="secondary-btn" onClick={() => setCurrentStep('welcome')}>
            नया पंजीकरण / New Registration
          </button>
        </div>
      </div>

      {/* QR Modal */}
      <QRModal 
        isOpen={showQRModal} 
        onClose={() => setShowQRModal(false)}
        healthId={healthId}
      />
    </div>
  );

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          background: linear-gradient(135deg, #0f4c75 0%, #3282b8 50%, #bbe1fa 100%);
          min-height: 100vh;
        }

        .app-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .step-container {
          background: linear-gradient(145deg, #ffffff, #f8fafc);
          border-radius: 16px;
          padding: 32px;
          max-width: 800px;
          width: 100%;
          box-shadow: 
            0 20px 60px rgba(0,0,0,0.1),
            0 0 0 1px rgba(255,255,255,0.5),
            inset 0 1px 0 rgba(255,255,255,0.8);
          position: relative;
          overflow: hidden;
        }

        .step-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #ff6b35, #f7931e, #ffd700, #4caf50, #2196f3, #9c27b0);
        }

        /* HOME BUTTON STYLES */
        .home-button {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #1976d2, #1565c0);
          border: none;
          border-radius: 50%;
          color: white;
          font-size: 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(25, 118, 210, 0.3);
          transition: all 0.3s ease;
          z-index: 1000;
        }

        .home-button:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 6px 20px rgba(25, 118, 210, 0.4);
          background: linear-gradient(135deg, #1565c0, #0d47a1);
        }

        .home-button:active {
          transform: translateY(0) scale(0.98);
        }

        .header-section {
          text-align: center;
          margin-bottom: 32px;
          padding: 24px;
          background: linear-gradient(135deg, #1565c0, #0d47a1);
          color: white;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(21, 101, 192, 0.3);
        }

        .kerala-emblem {
          font-size: 48px;
          margin-bottom: 16px;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
        }

        .header-section h1 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .header-section h2 {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 12px;
          opacity: 0.95;
        }

        .dept-title {
          font-size: 14px;
          opacity: 0.9;
          line-height: 1.4;
        }

        .system-title {
          text-align: center;
          margin-bottom: 32px;
          padding: 24px;
          background: linear-gradient(135deg, #e8f5e8, #f1f8e9);
          border-radius: 12px;
          border-left: 4px solid #4caf50;
        }

        .system-title h3 {
          font-size: 22px;
          font-weight: 700;
          color: #2e7d32;
          margin-bottom: 8px;
        }

        .system-title h4 {
          font-size: 18px;
          font-weight: 500;
          color: #558b2f;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }

        .benefit-card {
          background: linear-gradient(145deg, #ffffff, #f5f5f5);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .benefit-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          border-color: #1976d2;
        }

        .benefit-icon {
          font-size: 32px;
          flex-shrink: 0;
        }

        .benefit-title {
          font-size: 16px;
          font-weight: 600;
          color: #1976d2;
          margin-bottom: 4px;
        }

        .benefit-desc {
          font-size: 14px;
          color: #666;
        }

        .sdg-section {
          background: linear-gradient(135deg, #fff3e0, #ffe0b2);
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 32px;
          text-align: center;
        }

        .sdg-title {
          font-size: 18px;
          font-weight: 600;
          color: #ef6c00;
          margin-bottom: 16px;
        }

        .sdg-goals {
          display: flex;
          justify-content: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        .sdg-goal {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .sdg-number {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #ff6b35, #f7931e);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
        }

        .sdg-text {
          font-size: 12px;
          font-weight: 500;
          color: #bf360c;
          text-align: center;
          max-width: 80px;
          line-height: 1.2;
        }

        .primary-btn {
          background: linear-gradient(135deg, #1976d2, #1565c0);
          color: white;
          border: none;
          padding: 16px 32px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(25, 118, 210, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          margin-bottom: 16px;
        }

        .primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(25, 118, 210, 0.4);
        }

        .primary-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .secondary-btn {
          background: linear-gradient(145deg, #f5f5f5, #e0e0e0);
          color: #666;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }

        .secondary-btn:hover {
          background: linear-gradient(145deg, #e0e0e0, #d0d0d0);
        }

        .disclaimer {
          background: #e3f2fd;
          border-left: 4px solid #2196f3;
          padding: 16px;
          border-radius: 8px;
          margin-top: 24px;
        }

        .disclaimer-text {
          font-size: 12px;
          color: #1565c0;
          line-height: 1.4;
        }

        .step-progress {
          margin-bottom: 32px;
        }

        .progress-bar {
          background: #e0e0e0;
          height: 6px;
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .progress-fill {
          background: linear-gradient(90deg, #4caf50, #8bc34a);
          height: 100%;
          border-radius: 3px;
          transition: width 0.6s ease;
        }

        .step-text {
          font-size: 14px;
          color: #666;
          text-align: center;
          font-weight: 500;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 2px solid #e0e0e0;
        }

        .title-icon {
          font-size: 32px;
        }

        .section-title h3 {
          font-size: 20px;
          font-weight: 600;
          color: #333;
          line-height: 1.3;
        }

        .info-banner {
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 24px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .banner-icon {
          font-size: 20px;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .banner-text {
          font-size: 14px;
          color: #856404;
          line-height: 1.4;
        }

        .input-group {
          margin-bottom: 20px;
        }

        .input-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 16px;
          transition: all 0.3s ease;
          background: white;
        }

        .form-input:focus {
          outline: none;
          border-color: #1976d2;
          box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
        }

        .form-input:disabled {
          background: #f5f5f5;
          color: #666;
          border-color: #d0d0d0;
        }

        .aadhaar-input {
          font-family: 'Monaco', monospace;
          font-size: 18px;
          letter-spacing: 2px;
          text-align: center;
        }

        .otp-input {
          font-family: 'Monaco', monospace;
          font-size: 24px;
          letter-spacing: 4px;
          text-align: center;
        }

        .otp-section {
          margin-top: 24px;
        }

        .success-message {
          background: #e8f5e8;
          border: 1px solid #c8e6c9;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .success-icon {
          font-size: 24px;
          flex-shrink: 0;
        }

        .success-text {
          font-size: 14px;
          color: #2e7d32;
          line-height: 1.4;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .success-container {
          text-align: center;
        }

        .success-header {
          margin-bottom: 32px;
        }

        .success-icon-large {
          font-size: 64px;
          margin-bottom: 16px;
        }

        .success-header h2 {
          font-size: 24px;
          font-weight: 700;
          color: #2e7d32;
          line-height: 1.3;
        }

        .health-id-card {
          background: linear-gradient(145deg, #ffffff, #f8fafc);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
          margin: 32px 0;
          border: 2px solid #e0e0e0;
        }

        .card-header {
          background: linear-gradient(135deg, #1565c0, #0d47a1);
          color: white;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .kerala-logo {
          font-size: 40px;
        }

        .title-main {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .title-sub {
          font-size: 16px;
          opacity: 0.9;
        }

        .card-body {
          padding: 24px;
          display: grid;
          grid-template-columns: 1fr 200px;
          gap: 24px;
          align-items: center;
        }

        .personal-info {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .info-row:last-child {
          border-bottom: none;
        }

        .info-label {
          font-size: 14px;
          font-weight: 600;
          color: #666;
        }

        .info-value {
          font-size: 14px;
          font-weight: 600;
          color: #333;
        }

        .health-id-text {
          font-family: 'Monaco', monospace;
          background: #e3f2fd;
          padding: 4px 8px;
          border-radius: 4px;
          color: #1565c0;
        }

        .qr-section {
          text-align: center;
        }

        .qr-code-large {
          background: white;
          padding: 16px;
          border-radius: 8px;
          border: 2px solid #333;
          margin-bottom: 12px;
          display: inline-block;
        }

        .qr-instruction {
          font-size: 12px;
          color: #666;
          font-weight: 500;
          line-height: 1.3;
        }

        .qr-instruction.clickable {
          cursor: pointer;
          color: #1976d2;
          text-decoration: underline;
          transition: color 0.3s ease;
        }

        .qr-instruction.clickable:hover {
          color: #0d47a1;
        }

        .card-footer {
          background: #f5f5f5;
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: #666;
          font-weight: 500;
        }

        .emergency {
          color: #d32f2f;
          font-weight: 600;
        }

        .next-steps {
          background: #f3e5f5;
          border-radius: 12px;
          padding: 24px;
          margin: 32px 0;
          text-align: left;
        }

        .next-steps h4 {
          font-size: 18px;
          font-weight: 600;
          color: #7b1fa2;
          margin-bottom: 16px;
          text-align: center;
        }

        .steps-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .step-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .step-number {
          width: 28px;
          height: 28px;
          background: linear-gradient(135deg, #7b1fa2, #9c27b0);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 600;
          flex-shrink: 0;
        }

        .step-text {
          font-size: 14px;
          color: #4a148c;
          line-height: 1.4;
          margin-top: 2px;
        }

        .action-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 24px;
        }

        /* QR Modal Styles */
        .qr-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(5px);
        }

        .qr-modal-content {
          background: white;
          border-radius: 16px;
          max-width: 450px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: modalSlideIn 0.3s ease-out;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .qr-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 2px solid #e0e0e0;
          background: linear-gradient(135deg, #1565c0, #0d47a1);
          color: white;
          border-radius: 16px 16px 0 0;
        }

        .qr-modal-header h3 {
          font-size: 18px;
          font-weight: 600;
          line-height: 1.3;
        }

        .qr-modal-close {
          background: none;
          border: none;
          font-size: 32px;
          color: white;
          cursor: pointer;
          padding: 0;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background-color 0.3s ease;
        }

        .qr-modal-close:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }

        .qr-modal-body {
          padding: 32px 24px;
          text-align: center;
        }

        .qr-fullscreen {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 24px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 12px;
          border: 3px solid #1976d2;
        }

        .qr-modal-info {
          background: #e3f2fd;
          padding: 20px;
          border-radius: 12px;
          border-left: 4px solid #1976d2;
        }

        .qr-modal-info p {
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 8px;
          color: #1565c0;
        }

        .qr-modal-info p:last-child {
          margin-bottom: 0;
          font-weight: 500;
        }

        .qr-modal-info strong {
          font-family: 'Monaco', monospace;
          background: white;
          padding: 2px 6px;
          border-radius: 4px;
          color: #0d47a1;
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .step-container {
            padding: 20px;
            margin: 10px;
          }

          .home-button {
            top: 15px;
            right: 15px;
            width: 45px;
            height: 45px;
            font-size: 20px;
          }

          .benefits-grid {
            grid-template-columns: 1fr;
          }

          .sdg-goals {
            gap: 16px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .card-body {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .action-buttons {
            grid-template-columns: 1fr;
          }

          .header-section h1 {
            font-size: 24px;
          }

          .header-section h2 {
            font-size: 20px;
          }

          .qr-modal-content {
            width: 95%;
            margin: 20px;
          }

          .qr-fullscreen {
            padding: 15px;
          }
        }

        /* Print styles */
        @media print {
          body {
            background: white;
          }

          .step-container {
            box-shadow: none;
            border: 2px solid #333;
          }

          .primary-btn, .secondary-btn, .home-button {
            display: none;
          }

          .qr-modal-overlay {
            display: none;
          }
        }
      `}</style>

      <div className="app-container">
        {currentStep === 'welcome' && renderWelcome()}
        {currentStep === 'aadhaar' && renderAadhaar()}
        {currentStep === 'profile' && renderProfile()}
        {currentStep === 'success' && renderSuccess()}
      </div>
    </>
  );
};

export default MigrantHealthRecordApp;
