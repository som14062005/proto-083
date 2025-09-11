import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle, Shield, CheckCircle, XCircle, Camera, X } from 'lucide-react';

const MobileFraudDetection = () => {
  const [medicineData, setMedicineData] = useState({
    prescribedMedicine: '',
    batchNumber: '',
    manufacturerCode: '',
    expiryDate: '',
    pharmacyId: ''
  });

  const [detectionResult, setDetectionResult] = useState(null);
  const [permanentLogs, setPermanentLogs] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [isVideoReady, setIsVideoReady] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  const mockPermanentLogs = [
    { id: 1, medicine: 'Paracetamol 500mg', batch: 'PAR2024001', manufacturer: 'SUN001', status: 'verified', timestamp: '2024-09-10T10:30:00Z' },
    { id: 2, medicine: 'Amoxicillin 250mg', batch: 'AMX2024002', manufacturer: 'CIP002', status: 'verified', timestamp: '2024-09-09T14:15:00Z' },
    { id: 3, medicine: 'Fake Paracetamol', batch: 'FAKE001', manufacturer: 'UNKNOWN', status: 'fraud_detected', timestamp: '2024-09-08T09:45:00Z' }
  ];

  useEffect(() => {
    setPermanentLogs(mockPermanentLogs);
  }, []);

  const isSecureContext = () => {
    return window.location.protocol === 'https:' || 
           window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1';
  };

  const startCamera = async () => {
    setCameraError('');
    setIsVideoReady(false);
    
    if (!isSecureContext()) {
      setCameraError('Camera requires HTTPS. Please use https://localhost:5173');
      return;
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Camera not supported in this browser');
      handleFileInput();
      return;
    }

    try {
      console.log('Starting camera...');
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640, max: 1280 },
          height: { ideal: 480, max: 720 },
          facingMode: 'user'
        }
      });
      
      console.log('Camera stream received:', stream);
      streamRef.current = stream;
      setIsCameraOpen(true);
      
      setTimeout(() => {
        if (videoRef.current && stream) {
          console.log('Setting up video element...');
          videoRef.current.srcObject = stream;
          
          videoRef.current.onloadedmetadata = () => {
            console.log('Video metadata loaded');
            setIsVideoReady(true);
          };

          videoRef.current.oncanplay = () => {
            console.log('Video can play');
            videoRef.current.play().then(() => {
              console.log('Video playing successfully');
              setIsVideoReady(true);
            }).catch(err => {
              console.error('Play failed:', err);
            });
          };

          videoRef.current.onerror = (error) => {
            console.error('Video error:', error);
            setCameraError('Failed to display video stream');
          };
        }
      }, 100);

    } catch (error) {
      console.error('Camera error:', error);
      setCameraError(`Camera failed: ${error.message}`);
      setTimeout(() => handleFileInput(), 2000);
    }
  };

  const handleFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target.result);
        processImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const stopCamera = () => {
    console.log('Stopping camera...');
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
        console.log('Camera track stopped');
      });
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsCameraOpen(false);
    setIsVideoReady(false);
    setCameraError('');
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current && isVideoReady) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        alert('Video not ready. Please wait a moment and try again.');
        return;
      }
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      
      const imageDataURL = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedImage(imageDataURL);
      stopCamera();
      processImage(imageDataURL);
    }
  };

  const processImage = async (imageDataURL) => {
    setIsProcessingImage(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockOCRResults = {
      prescribedMedicine: 'Paracetamol 500mg',
      batchNumber: 'PAR2024001',
      manufacturerCode: 'SUN001',
      expiryDate: '2025-12-31'
    };
    
    setMedicineData(mockOCRResults);
    setIsProcessingImage(false);
    
    setTimeout(() => {
      detectFraud(mockOCRResults);
    }, 500);
  };

  const detectFraud = async (dataOverride = null) => {
    setIsScanning(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const data = dataOverride || medicineData;
    const { prescribedMedicine, batchNumber, manufacturerCode, expiryDate } = data;
    
    const logMatch = permanentLogs.find(log => 
      log.batch === batchNumber && log.manufacturer === manufacturerCode
    );

    const fraudPatterns = ['FAKE', 'COUNTERFEIT', 'UNKNOWN'];
    const isFraudulent = fraudPatterns.some(pattern => 
      batchNumber.includes(pattern) || manufacturerCode.includes(pattern)
    );

    const isExpired = new Date(expiryDate) < new Date();
    const nameMismatch = logMatch && !logMatch.medicine.toLowerCase().includes(prescribedMedicine.toLowerCase());

    let result = {
      isAuthentic: true,
      riskLevel: 'low',
      issues: [],
      verificationScore: 95
    };

    if (isFraudulent) {
      result = {
        isAuthentic: false,
        riskLevel: 'critical',
        issues: ['Counterfeit medicine detected', 'Unverified manufacturer'],
        verificationScore: 15
      };
    } else if (isExpired) {
      result = {
        isAuthentic: false,
        riskLevel: 'high',
        issues: ['Medicine expired', 'Potential health risk'],
        verificationScore: 30
      };
    } else if (nameMismatch) {
      result = {
        isAuthentic: false,
        riskLevel: 'medium',
        issues: ['Medicine name mismatch', 'Prescription verification required'],
        verificationScore: 60
      };
    } else if (!logMatch) {
      result = {
        isAuthentic: false,
        riskLevel: 'medium',
        issues: ['No verification record found', 'Manual verification needed'],
        verificationScore: 45
      };
    }

    setDetectionResult(result);
    setIsScanning(false);

    const newLog = {
      id: permanentLogs.length + 1,
      medicine: prescribedMedicine,
      batch: batchNumber,
      manufacturer: manufacturerCode,
      status: result.isAuthentic ? 'verified' : 'fraud_detected',
      timestamp: new Date().toISOString(),
      riskLevel: result.riskLevel,
      verificationScore: result.verificationScore,
      hasImage: !!capturedImage
    };

    setPermanentLogs(prev => [newLog, ...prev]);
  };

  const getRiskColor = (level) => {
    switch(level) {
      case 'critical': return 'text-red-600 bg-red-100 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      default: return 'text-green-600 bg-green-100 border-green-200';
    }
  };

  // Camera View - FIXED VIDEO ZOOM ISSUE
  if (isCameraOpen) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        zIndex: 1000
      }}>
        {/* Header */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '20px',
          zIndex: 1002
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '18px' }}>Scan Medicine Package</h3>
            <button
              onClick={stopCamera}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
          </div>
          <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: 0.8 }}>
            Position medicine package in the frame
          </p>
        </div>

        {/* Video Element - FIXED ZOOM ISSUE */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain', // FIXED: Changed from 'cover' to 'contain'
            objectPosition: 'center',
            transform: 'scaleX(-1)', // Mirror effect
            backgroundColor: 'black' // Fill empty space
          }}
        />

        {/* Loading indicator */}
        {!isVideoReady && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            textAlign: 'center',
            zIndex: 1001
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '4px solid rgba(255,255,255,0.3)',
              borderTop: '4px solid white',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 10px'
            }}></div>
            <p>Loading camera...</p>
          </div>
        )}

        {/* Scanning Frame Overlay */}
        {isVideoReady && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1001
          }}>
            <div style={{
              width: '800px',
              height: '500px',
              border: '2px dashed white',
              borderRadius: '12px',
              position: 'relative'
            }}>
              {/* Corner indicators */}
              <div style={{ position: 'absolute', top: '-2px', left: '-2px', width: '20px', height: '20px', borderTop: '4px solid #3b82f6', borderLeft: '4px solid #3b82f6', borderRadius: '8px 0 0 0' }}></div>
              <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '20px', height: '20px', borderTop: '4px solid #3b82f6', borderRight: '4px solid #3b82f6', borderRadius: '0 8px 0 0' }}></div>
              <div style={{ position: 'absolute', bottom: '-2px', left: '-2px', width: '20px', height: '20px', borderBottom: '4px solid #3b82f6', borderLeft: '4px solid #3b82f6', borderRadius: '0 0 0 8px' }}></div>
              <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '20px', height: '20px', borderBottom: '4px solid #3b82f6', borderRight: '4px solid #3b82f6', borderRadius: '0 0 8px 0' }}></div>
              
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '14px'
              }}>
                Align medicine package here
              </div>
            </div>
          </div>
        )}

        {/* Capture Button */}
        {isVideoReady && (
          <div style={{
            position: 'absolute',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1001
          }}>
            <button
              onClick={capturePhoto}
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: 'white',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Camera size={24} color="white" />
              </div>
            </button>
          </div>
        )}

        <canvas ref={canvasRef} style={{ display: 'none' }} />
        
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Main App View
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 sticky top-0 z-40 shadow-lg">
        <div className="flex items-center">
          <Shield className="w-6 h-6 mr-3" />
          <div>
            <h1 className="text-lg font-bold">Medicine Verifier</h1>
            <p className="text-sm opacity-90">Fraud Detection System</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Security Warning */}
        {!isSecureContext() && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
            <div className="flex items-center">
              <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
              <div>
                <p className="font-semibold text-red-800">HTTPS Required</p>
                <p className="text-sm text-red-600">Camera access requires HTTPS. Use https://localhost:5173</p>
              </div>
            </div>
          </div>
        )}

        {/* Camera Error Display */}
        {cameraError && (
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
            <div className="flex items-center">
              <AlertTriangle className="w-6 h-6 text-orange-600 mr-3" />
              <div>
                <p className="font-semibold text-orange-800">Camera Issue</p>
                <p className="text-sm text-orange-600">{cameraError}</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Scan Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
              🔍 Quick Medicine Scan
            </h2>
            
            {capturedImage && (
              <div className="mb-4">
                <img 
                  src={capturedImage} 
                  alt="Captured medicine" 
                  className="w-full h-48 object-cover rounded-lg border"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-600">Captured Image</span>
                  <button 
                    onClick={() => setCapturedImage(null)}
                    className="text-red-500 text-sm hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={startCamera}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all"
                style={{ minHeight: '60px' }}
              >
                <Camera className="w-6 h-6 mr-3" />
                {capturedImage ? 'Scan Another Medicine' : 'Start Camera Scan'}
              </button>

              <button
                onClick={handleFileInput}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg flex items-center justify-center hover:from-green-600 hover:to-green-700 transition-all"
                style={{ minHeight: '60px' }}
              >
                📁 Upload Medicine Photo
              </button>
            </div>

            <div className="text-center text-gray-600 text-sm mt-4">
              📱 Camera scan or upload photo for instant verification
            </div>
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileCapture}
          style={{ display: 'none' }}
        />

        {/* Processing Indicator */}
        {isProcessingImage && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-3"></div>
              <div>
                <p className="font-semibold text-blue-800">Processing Image...</p>
                <p className="text-sm text-blue-600">Extracting medicine information using AI OCR</p>
              </div>
            </div>
          </div>
        )}

        {/* Manual Entry Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">✏️ Manual Entry</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Medicine Name"
                value={medicineData.prescribedMedicine}
                onChange={(e) => setMedicineData({...medicineData, prescribedMedicine: e.target.value})}
                className="w-full p-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Batch Number"
                value={medicineData.batchNumber}
                onChange={(e) => setMedicineData({...medicineData, batchNumber: e.target.value})}
                className="w-full p-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Manufacturer Code"
                value={medicineData.manufacturerCode}
                onChange={(e) => setMedicineData({...medicineData, manufacturerCode: e.target.value})}
                className="w-full p-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="date"
                value={medicineData.expiryDate}
                onChange={(e) => setMedicineData({...medicineData, expiryDate: e.target.value})}
                className="w-full p-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={() => detectFraud()}
                disabled={isScanning}
                className="w-full bg-green-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg disabled:opacity-50 flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                {isScanning ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                ) : (
                  <Shield className="w-6 h-6 mr-3" />
                )}
                {isScanning ? 'Verifying...' : 'Verify Medicine'}
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {detectionResult && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">📊 Verification Results</h3>
              <div className={`p-4 rounded-xl border-2 mb-4 ${getRiskColor(detectionResult.riskLevel)}`}>
                <div className="flex items-center justify-center text-center">
                  {detectionResult.isAuthentic ? (
                    <CheckCircle className="w-8 h-8 mr-3" />
                  ) : (
                    <XCircle className="w-8 h-8 mr-3" />
                  )}
                  <div>
                    <p className="font-bold text-lg">
                      {detectionResult.isAuthentic ? '✅ Medicine Verified' : '⚠️ Potential Fraud'}
                    </p>
                    <p className="text-sm opacity-80">
                      Risk Level: {detectionResult.riskLevel.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl mb-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold">Verification Score</span>
                  <span className="font-bold text-2xl">{detectionResult.verificationScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      detectionResult.verificationScore > 70 ? 'bg-green-500' : 
                      detectionResult.verificationScore > 40 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{width: `${detectionResult.verificationScore}%`}}
                  ></div>
                </div>
              </div>
              {detectionResult.issues.length > 0 && (
                <div className="bg-red-50 border-2 border-red-200 p-4 rounded-xl">
                  <h4 className="font-semibold text-red-800 mb-3">⚠️ Issues Found:</h4>
                  <ul className="space-y-2">
                    {detectionResult.issues.map((issue, index) => (
                      <li key={index} className="flex items-start text-red-700">
                        <span className="text-red-500 mr-2">•</span>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Recent Scans */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">📝 Recent Scans</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {permanentLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{log.medicine}</p>
                    <p className="text-xs text-gray-600">{log.batch}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(log.timestamp).toLocaleString()}
                      {log.hasImage && ' 📸'}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRiskColor(log.riskLevel || 'low')}`}>
                      {log.status === 'verified' ? '✅ Safe' : '❌ Risk'}
                    </span>
                    {log.verificationScore && (
                      <span className="text-xs font-bold mt-1">{log.verificationScore}%</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Help & Demo Data */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <h3 className="font-semibold text-blue-800 mb-2">💡 How to Use</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Camera now shows full view (not zoomed)</li>
            <li>• Allow camera permissions when prompted</li>
            <li>• Use "Upload Photo" if camera doesn't work</li>
            <li>• Check verification score and warnings</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">🧪 Test Data for SIH Demo</h3>
          <div className="text-sm text-yellow-700 space-y-1">
            <p><strong>Fake Medicine:</strong> Batch: FAKE001, Manufacturer: UNKNOWN</p>
            <p><strong>Valid Medicine:</strong> Batch: PAR2024001, Manufacturer: SUN001</p>
            <p><strong>Expired Medicine:</strong> Set expiry date to yesterday</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileFraudDetection;
