import React, { useState, useEffect, useCallback, useMemo } from 'react';

const ButtonPhoneApp = () => {
  const [currentScreen, setCurrentScreen] = useState('boot');
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [currentLangCode, setCurrentLangCode] = useState('hi');
  const [currentAudio, setCurrentAudio] = useState('');
  const [symptoms, setSymptoms] = useState({});
  const [symptomStep, setSymptomStep] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [signalStrength, setSignalStrength] = useState(4);
  const [keyPress, setKeyPress] = useState(null);
  const [isVibrating, setIsVibrating] = useState(false);
  const [showFullQR, setShowFullQR] = useState(false);

  // Memoized language data
  const languageTexts = useMemo(() => ({
    ml: {
      welcome: 'സ്വാസ്ഥ്യ സഹായകത്തിലേക്ക് സ്വാഗതം',
      greeting: 'നമസ്കാരം!',
      homeMenu: {
        1: { title: 'മരുന്ന് & അപ്പോയിന്റ്മെന്റുകൾ', subtitle: 'Medicine & Appointments' },
        2: { title: 'ലക്ഷണ റിപ്പോർട്ട്', subtitle: 'Symptom Report' },
        3: { title: 'ആരോഗ്യ വിദ്യാഭ്യാസം', subtitle: 'Health Education' },
        4: { title: 'ഡിജിറ്റൽ കാർഡ്', subtitle: 'Digital Health Card' }
      },
      questions: [
        { q: 'നിങ്ങൾക്ക് പനി ഉണ്ടോ?', e: 'Do you have fever?' },
        { q: 'നിങ്ങൾക്ക് ചുമ ഉണ്ടോ?', e: 'Do you have cough?' },
        { q: 'നിങ്ങൾക്ക് തലവേദന ഉണ്ടോ?', e: 'Do you have headache?' },
        { q: 'നിങ്ങൾക്ക് ശരീര വേദന ഉണ്ടോ?', e: 'Do you have body pain?' }
      ],
      yes: 'അതെ', no: 'ഇല്ല',
      goBack: '* തിരികെ പോകാൻ അമർത്തുക',
      completed: 'പൂർത്തിയായി',
      nextReminder: 'അടുത്ത മരുന്ന്: ഇന്ന് വൈകുന്നേരം 8:00',
      showQR: 'QR കാണിക്കൂ'
    },
    hi: {
      welcome: 'स्वास्थ्य सहायक में आपका स्वागत है',
      greeting: 'नमस्ते!',
      homeMenu: {
        1: { title: 'दवा और अपॉइंटमेंट', subtitle: 'Medicine & Appointments' },
        2: { title: 'लक्षण रिपोर्ट', subtitle: 'Symptom Report' },
        3: { title: 'स्वास्थ्य शिक्षा', subtitle: 'Health Education' },
        4: { title: 'डिजिटल कार्ड', subtitle: 'Digital Health Card' }
      },
      questions: [
        { q: 'क्या आपको बुखार है?', e: 'Do you have fever?' },
        { q: 'क्या आपको खांसी है?', e: 'Do you have cough?' },
        { q: 'क्या आपको सिरदर्द है?', e: 'Do you have headache?' },
        { q: 'क्या आपको शरीर में दर्द है?', e: 'Do you have body pain?' }
      ],
      yes: 'हाँ', no: 'नहीं',
      goBack: '* वापस जाने के लिए दबाएं',
      completed: 'पूर्ण',
      nextReminder: 'अगली दवा: आज शाम 8:00 बजे',
      showQR: 'QR दिखाएं'
    },
    bn: {
      welcome: 'স্বাস্থ্য সহায়কে স্বাগতম',
      greeting: 'নমস্কার!',
      homeMenu: {
        1: { title: 'ওষুধ ও অ্যাপয়েন্টমেন্ট', subtitle: 'Medicine & Appointments' },
        2: { title: 'উপসর্গ রিপোর্ট', subtitle: 'Symptom Report' },
        3: { title: 'স্বাস্থ্য শিক্ষা', subtitle: 'Health Education' },
        4: { title: 'ডিজিটাল কার্ড', subtitle: 'Digital Health Card' }
      },
      questions: [
        { q: 'আপনার জ্বর আছে?', e: 'Do you have fever?' },
        { q: 'আপনার কাশি আছে?', e: 'Do you have cough?' },
        { q: 'আপনার মাথাব্যথা আছে?', e: 'Do you have headache?' },
        { q: 'আপনার শরীরে ব্যথা আছে?', e: 'Do you have body pain?' }
      ],
      yes: 'হ্যাঁ', no: 'না',
      goBack: '* ফিরে যেতে চাপুন',
      completed: 'সম্পূর্ণ',
      nextReminder: 'পরবর্তী ওষুধ: আজ সন্ধ্যা ৮টায়',
      showQR: 'QR দেখান'
    },
    ta: {
      welcome: 'ஆரோக்கிய உதவியாளருக்கு வரவேற்கிறோம்',
      greeting: 'வணக்கம்!',
      homeMenu: {
        1: { title: 'மருந்து மற்றும் அப்பாயின்ட்மென்ட்', subtitle: 'Medicine & Appointments' },
        2: { title: 'அறிகுறி அறிக்கை', subtitle: 'Symptom Report' },
        3: { title: 'சுகாதார கல்வி', subtitle: 'Health Education' },
        4: { title: 'டிஜிட்டல் அட்டை', subtitle: 'Digital Health Card' }
      },
      questions: [
        { q: 'உங்களுக்கு காய்ச்சல் உள்ளதா?', e: 'Do you have fever?' },
        { q: 'உங்களுக்கு இருமல் உள்ளதா?', e: 'Do you have cough?' },
        { q: 'உங்களுக்கு தலைவலி உள்ளதா?', e: 'Do you have headache?' },
        { q: 'உங்களுக்கு உடல் வலி உள்ளதா?', e: 'Do you have body pain?' }
      ],
      yes: 'ஆம்', no: 'இல்லை',
      goBack: '* திரும்ப செல்ல அழுத்தவும்',
      completed: 'முடிந்தது',
      nextReminder: 'அடுத்த மருந்து: இன்று மாலை 8:00',
      showQR: 'QR காட்டு'
    },
    or: {
      welcome: 'ସ୍ୱାସ୍ଥ୍ୟ ସହାୟକକୁ ସ୍ୱାଗତ',
      greeting: 'ନମସ୍କାର!',
      homeMenu: {
        1: { title: 'ଔଷଧ ଏବଂ ଆପଏଣ୍ଟମେଣ୍ଟ', subtitle: 'Medicine & Appointments' },
        2: { title: 'ଲକ୍ଷଣ ରିପୋର୍ଟ', subtitle: 'Symptom Report' },
        3: { title: 'ସ୍ୱାସ୍ଥ୍ୟ ଶିକ୍ଷା', subtitle: 'Health Education' },
        4: { title: 'ଡିଜିଟାଲ କାର୍ଡ', subtitle: 'Digital Health Card' }
      },
      questions: [
        { q: 'ଆପଣଙ୍କର ଜ୍ୱର ଅଛି କି?', e: 'Do you have fever?' },
        { q: 'ଆପଣଙ୍କର ଖାସି ଅଛି କି?', e: 'Do you have cough?' },
        { q: 'ଆପଣଙ୍କର ମୁଣ୍ଡ ବିନ୍ଧେ କି?', e: 'Do you have headache?' },
        { q: 'ଆପଣଙ୍କର ଶରୀର ବିନ୍ଧେ କି?', e: 'Do you have body pain?' }
      ],
      yes: 'ହଁ', no: 'ନା',
      goBack: '* ପଛକୁ ଯିବାକୁ ଦବାନ୍ତୁ',
      completed: 'ସମ୍ପୂର୍ଣ୍ଣ',
      nextReminder: 'ପରବର୍ତ୍ତୀ ଔଷଧ: ଆଜି ସନ୍ଧ୍ୟା ୮ଟା',
      showQR: 'QR ଦେଖାନ୍ତୁ'
    },
    en: {
      welcome: 'Welcome to Health Assistant',
      greeting: 'Hello!',
      homeMenu: {
        1: { title: 'Medicine & Appointments', subtitle: 'Medicine & Appointments' },
        2: { title: 'Symptom Report', subtitle: 'Symptom Report' },
        3: { title: 'Health Education', subtitle: 'Health Education' },
        4: { title: 'Digital Health Card', subtitle: 'Digital Health Card' }
      },
      questions: [
        { q: 'Do you have fever?', e: 'Do you have fever?' },
        { q: 'Do you have cough?', e: 'Do you have cough?' },
        { q: 'Do you have headache?', e: 'Do you have headache?' },
        { q: 'Do you have body pain?', e: 'Do you have body pain?' }
      ],
      yes: 'Yes', no: 'No',
      goBack: '* Press to go back',
      completed: 'Completed',
      nextReminder: 'Next reminder: Today 8:00 PM',
      showQR: 'Show QR'
    }
  }), []);

  const languages = useMemo(() => ({
    1: { name: 'മലയാളം', english: 'Malayalam', flag: '🌴', users: '34M+', code: 'ml' },
    2: { name: 'हिन्दी', english: 'Hindi', flag: '🇮🇳', users: '600M+', code: 'hi' },
    3: { name: 'বাংলা', english: 'Bengali', flag: '🐅', users: '300M+', code: 'bn' },
    4: { name: 'தமிழ்', english: 'Tamil', flag: '🏛️', users: '78M+', code: 'ta' },
    5: { name: 'ଓଡ଼ିଆ', english: 'Odia', flag: '🦚', users: '42M+', code: 'or' },
    6: { name: 'English', english: 'English', flag: '🇺🇸', users: '1.5B+', code: 'en' }
  }), []);

  const homeMenuBase = useMemo(() => ({
    1: { icon: '💊', color: '#059669', pending: 2 },
    2: { icon: '🌡️', color: '#dc2626', urgent: true },
    3: { icon: '🎓', color: '#7c3aed', newContent: 3 },
    4: { icon: '🆔', color: '#0ea5e9', verified: true },
  }), []);

  const medicines = useMemo(() => [
    {
      name: { 
        hi: 'मलेरिया निरोधी दवा', 
        ta: 'மலேரியா தடுப்பு மருந்து',
        ml: 'മലേറിയ പ്രതിരോധ മരുന്ന്',
        bn: 'ম্যালেরিয়া প্রতিরোধী ওষুধ',
        or: 'ମ୍ୟାଲେରିଆ ପ୍ରତିରୋଧୀ ଔଷଧ',
        en: 'Malaria Prevention Medicine'
      },
      time: '2:00 PM',
      status: 'due',
      dosage: { 
        hi: '1 टैबलेट', 
        ta: '1 மாத்திரை',
        ml: '1 ഗുളിക',
        bn: '1 ট্যাবলেট',
        or: '1 ଟାବଲେଟ',
        en: '1 Tablet'
      },
      remaining: { 
        hi: '12 दिन', 
        ta: '12 நாள்',
        ml: '12 ദിവസം',
        bn: '12 দিন',
        or: '12 ଦିନ',
        en: '12 days'
      }
    }
  ], []);

  const healthTips = useMemo(() => ({
    1: {
      title: { 
        hi: 'स्वच्छता के नियम', 
        ta: 'சுத்தமான விதிகள்',
        ml: 'ശുചിത്വ നിയമങ്ങൾ',
        bn: 'পরিচ্ছন্নতার নিয়ম',
        or: 'ପରିଷ୍କାର ନିୟମ',
        en: 'Hygiene Guidelines'
      },
      subtitle: 'Hygiene Guidelines',
      duration: '4:32',
      progress: 0,
      category: 'Prevention'
    },
    2: {
      title: { 
        hi: 'पोषण गाइड', 
        ta: 'ஊட்டச்சத்து வழிகாட்டி',
        ml: 'പോഷക ഗൈഡ്',
        bn: 'পুষ্টি গাইড',
        or: 'ପୁଷ୍ଟି ଗାଇଡ୍',
        en: 'Nutrition Guide'
      },
      subtitle: 'Nutrition Guide',
      duration: '6:15',
      progress: 45,
      category: 'Wellness'
    },
    3: {
      title: { 
        hi: 'टीकाकरण जानकारी', 
        ta: 'தடுப்பூசி தகவல்',
        ml: 'വാക്സിനേഷൻ വിവരങ്ങൾ',
        bn: 'টিকাদান তথ্য',
        or: 'ଟିକାକରଣ ସୂଚନା',
        en: 'Vaccination Information'
      },
      subtitle: 'Vaccination Info',
      duration: '3:48',
      progress: 100,
      category: 'Prevention'
    }
  }), []);

  // GENERATE REAL QR CODE DATA
  const generateQRData = useCallback(() => {
    const healthData = {
      id: 'MW-2025-001234',
      name: currentLangCode === 'en' ? 'Ram Kumar Sharma' : 'राम कुमार शर्मा',
      age: 32,
      bloodGroup: 'B+',
      emergencyContact: '108',
      validUntil: '2025-12-31',
      issuer: 'KERIS Health System',
      type: 'Digital Health Card'
    };
    return `https://keris.health.gov.in/card/${healthData.id}?data=${encodeURIComponent(JSON.stringify(healthData))}`;
  }, [currentLangCode]);

  // Get current language text - memoized
  const getText = useCallback(() => 
    languageTexts[currentLangCode] || languageTexts.hi, 
    [languageTexts, currentLangCode]
  );

  // Optimized effects
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setBatteryLevel(prev => Math.max(20, prev - Math.random() * 0.1));
      setSignalStrength(Math.floor(Math.random() * 5));
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentScreen === 'boot') {
      const timeout = setTimeout(() => setCurrentScreen('language'), 2500);
      return () => clearTimeout(timeout);
    }
  }, [currentScreen]);

  // Optimized functions
  const simulateKeyPress = useCallback((key) => {
    setKeyPress(key);
    setIsVibrating(true);
    const timeout = setTimeout(() => {
      setKeyPress(null);
      setIsVibrating(false);
    }, 150);
    return () => clearTimeout(timeout);
  }, []);

  const speakText = useCallback((text) => {
    setCurrentAudio(text);
    const timeout = setTimeout(() => setCurrentAudio(''), 4000);
    return () => clearTimeout(timeout);
  }, []);

  const handleKeyPress = useCallback((key) => {
    simulateKeyPress(key);
    const texts = getText();
    
    switch (currentScreen) {
      case 'language':
        if (languages[key]) {
          setSelectedLanguage(languages[key]);
          setCurrentLangCode(languages[key].code);
          setCurrentScreen('home');
          speakText(`Language set to ${languages[key].name}. ${languageTexts[languages[key].code].welcome}`);
        }
        break;

      case 'home':
        if (homeMenuBase[key]) {
          const screens = { 1: 'medicines', 2: 'symptoms', 3: 'education', 4: 'healthcard' };
          setCurrentScreen(screens[key]);
          if (key === 2) {
            setSymptomStep(0);
          }
          speakText(`Selected: ${texts.homeMenu[key].title}`);
        }
        break;

      case 'education':
        if (healthTips[key]) {
          speakText(`Playing: ${healthTips[key].title[currentLangCode]}`);
        }
        break;

      case 'symptoms':
        if (key === 1 || key === 2) {
          const currentQuestion = texts.questions[symptomStep];
          if (currentQuestion) {
            setSymptoms(prev => ({
              ...prev,
              [`symptom_${symptomStep}`]: key === 1
            }));
            
            if (symptomStep < texts.questions.length - 1) {
              setSymptomStep(symptomStep + 1);
              speakText('Recorded. Next question...');
            } else {
              speakText('Symptom report complete. Data will be sent to health officials.');
              setTimeout(() => setCurrentScreen('symptom-result'), 2000);
            }
          }
        }
        break;

      // HANDLE PRESS 1 ON HEALTH CARD SCREEN TO SHOW QR
      case 'healthcard':
        if (key === 1) {
          setShowFullQR(true);
          setCurrentScreen('qr-fullscreen');
          speakText(`${texts.showQR} - QR Code displayed in full screen`);
        }
        break;

      case 'qr-fullscreen':
        setShowFullQR(false);
        setCurrentScreen('healthcard');
        break;
    }
  }, [currentScreen, languages, homeMenuBase, healthTips, currentLangCode, symptomStep, simulateKeyPress, speakText, getText, languageTexts]);

  const goBack = useCallback(() => {
    simulateKeyPress('*');
    if (currentScreen === 'qr-fullscreen') {
      setShowFullQR(false);
      setCurrentScreen('healthcard');
    } else if (currentScreen !== 'language' && currentScreen !== 'boot') {
      if (currentScreen === 'symptoms') {
        setSymptomStep(0);
        setSymptoms({});
      }
      setCurrentScreen('home');
    }
  }, [currentScreen, simulateKeyPress]);

  // Render functions
  const renderBootScreen = useCallback(() => (
    <div className="screen boot-screen">
      <div className="boot-logo">
        <div className="logo-icon">🏥</div>
        <div className="logo-text">KERIS</div>
        <div className="logo-subtitle">Digital Health Assistant</div>
        <div className="loading-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
      <div className="boot-footer">
        <div className="govt-seal">🇮🇳</div>
        <div className="govt-text">Government of India Initiative</div>
      </div>
    </div>
  ), []);

  const renderLanguageScreen = useCallback(() => (
    <div className="screen language-screen">
      <div className="screen-header">
        <div className="header-icon">🌐</div>
        <h2>अपनी भाषा चुनें</h2>
        <div className="subtitle">Choose Your Language</div>
      </div>
      <div className="language-list">
        {Object.entries(languages).map(([key, lang]) => (
          <div 
            key={key} 
            className="language-item"
            onClick={() => handleKeyPress(parseInt(key))}
          >
            <div className="lang-number">{key}</div>
            <div className="lang-flag">{lang.flag}</div>
            <div className="lang-content">
              <div className="lang-name">{lang.name}</div>
              <div className="lang-english">{lang.english}</div>
              <div className="lang-users">{lang.users} speakers</div>
            </div>
            <div className="lang-arrow">▶</div>
          </div>
        ))}
      </div>
    </div>
  ), [languages, handleKeyPress]);

  const renderHomeScreen = useCallback(() => {
    const texts = getText();
    return (
      <div className="screen home-screen">
        <div className="status-bar">
          <div className="status-left">
            <div className="carrier">Airtel</div>
            <div className="signal-bars">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`bar ${i < signalStrength ? 'active' : ''}`}></div>
              ))}
            </div>
          </div>
          <div className="status-center">
            <div className="time">{currentTime.toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })}</div>
          </div>
          <div className="status-right">
            <div className="wifi-icon">📡</div>
            <div className="battery">
              <div className="battery-level" style={{ width: `${batteryLevel}%` }}></div>
              <span>{Math.round(batteryLevel)}%</span>
            </div>
          </div>
        </div>
        
        <div className="welcome-header">
          <div className="user-greeting">{texts.greeting}</div>
          <div className="language-badge">
            {selectedLanguage?.flag} {selectedLanguage?.name}
          </div>
        </div>

        <div className="menu-container">
          {Object.entries(homeMenuBase).map(([key, item]) => (
            <div 
              key={key}
              className="menu-card"
              onClick={() => handleKeyPress(parseInt(key))}
            >
              <div className="card-header">
                <div className="menu-icon" style={{ color: item.color }}>
                  {item.icon}
                </div>
                <div className="menu-number">{key}</div>
              </div>
              <div className="card-content">
                <div className="menu-title">{texts.homeMenu[key].title}</div>
                <div className="menu-subtitle">{texts.homeMenu[key].subtitle}</div>
              </div>
              <div className="card-footer">
                {item.pending && <div className="badge pending">{item.pending} pending</div>}
                {item.urgent && <div className="badge urgent">Urgent</div>}
                {item.newContent && <div className="badge new">{item.newContent} new</div>}
                {item.verified && <div className="badge verified">✓ Verified</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }, [getText, signalStrength, currentTime, batteryLevel, selectedLanguage, homeMenuBase, handleKeyPress]);

  const renderMedicinesScreen = useCallback(() => {
    const texts = getText();
    return (
      <div className="screen medicines-screen">
        <div className="screen-header">
          <div className="header-icon">💊</div>
          <h2>{texts.homeMenu[1].title}</h2>
          <div className="subtitle">{texts.homeMenu[1].subtitle}</div>
        </div>
        
        <div className="medicines-list">
          {medicines.map((med, index) => (
            <div key={index} className={`medicine-card ${med.status}`}>
              <div className="med-time">
                <div className="time-badge">{med.time}</div>
                <div className="status-dot"></div>
              </div>
              <div className="med-content">
                <div className="med-name">{med.name[currentLangCode]}</div>
                <div className="med-dosage">{med.dosage[currentLangCode]}</div>
                <div className="med-remaining">{med.remaining[currentLangCode]} {currentLangCode === 'en' ? 'remaining' : 'बचे हैं'}</div>
              </div>
              <div className="med-action">
                {med.status === 'due' ? (
                  <div className="take-now">{currentLangCode === 'en' ? 'Take Now' : 'अभी लें'}</div>
                ) : (
                  <div className="upcoming">{currentLangCode === 'en' ? 'Upcoming' : 'आगामी'}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="next-reminder">
          <div className="reminder-text">{texts.nextReminder}</div>
          <div className="reminder-countdown">⏱️ {currentLangCode === 'en' ? 'In 5 hours 23 minutes' : '5 घंटे 23 मिनट में'}</div>
        </div>

        <div className="navigation-hint">{texts.goBack}</div>
      </div>
    );
  }, [getText, medicines, currentLangCode]);

  const renderSymptomsScreen = useCallback(() => {
    const texts = getText();
    const currentQuestion = texts.questions[symptomStep];
    
    return (
      <div className="screen symptoms-screen">
        <div className="screen-header">
          <div className="header-icon">🌡️</div>
          <h2>{texts.homeMenu[2].title}</h2>
          <div className="subtitle">{texts.homeMenu[2].subtitle}</div>
        </div>

        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((symptomStep + 1) / texts.questions.length) * 100}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {currentLangCode === 'en' ? `Question ${symptomStep + 1} of ${texts.questions.length}` : `प्रश्न ${symptomStep + 1} of ${texts.questions.length}`}
          </div>
        </div>

        {currentQuestion && (
          <div className="question-container">
            <div className="question-card">
              <div className="question-hindi">{currentQuestion.q}</div>
              <div className="question-english">{currentQuestion.e}</div>
            </div>

            <div className="answer-buttons">
              <div className="answer-option yes-option" onClick={() => handleKeyPress(1)}>
                <div className="option-number">1</div>
                <div className="option-text">
                  <div className="hindi">{texts.yes}</div>
                  <div className="english">Yes</div>
                </div>
                <div className="option-icon">✓</div>
              </div>
              <div className="answer-option no-option" onClick={() => handleKeyPress(2)}>
                <div className="option-number">2</div>
                <div className="option-text">
                  <div className="hindi">{texts.no}</div>
                  <div className="english">No</div>
                </div>
                <div className="option-icon">✗</div>
              </div>
            </div>
          </div>
        )}

        <div className="navigation-hint">{texts.goBack}</div>
      </div>
    );
  }, [getText, symptomStep, handleKeyPress, currentLangCode]);

  const renderEducationScreen = useCallback(() => {
    const texts = getText();
    return (
      <div className="screen education-screen">
        <div className="screen-header">
          <div className="header-icon">🎓</div>
          <h2>{texts.homeMenu[3].title}</h2>
          <div className="subtitle">{texts.homeMenu[3].subtitle}</div>
        </div>

        <div className="education-list">
          {Object.entries(healthTips).map(([key, tip]) => (
            <div 
              key={key}
              className="education-card"
              onClick={() => handleKeyPress(parseInt(key))}
            >
              <div className="card-number">{key}</div>
              <div className="card-content">
                <div className="tip-title">{tip.title[currentLangCode]}</div>
                <div className="tip-subtitle">{tip.subtitle}</div>
                <div className="tip-meta">
                  <span className="duration">⏱️ {tip.duration}</span>
                  <span className="category">{tip.category}</span>
                </div>
                <div className="progress-mini">
                  <div className="progress-mini-fill" style={{ width: `${tip.progress}%` }}></div>
                </div>
              </div>
              <div className="card-status">
                {tip.progress === 100 ? '✅' : tip.progress > 0 ? '▶️' : '🎵'}
              </div>
            </div>
          ))}
        </div>

        <div className="navigation-hint">{texts.goBack}</div>
      </div>
    );
  }, [getText, healthTips, currentLangCode, handleKeyPress]);

  // UPDATED HEALTH CARD SCREEN - Press 1 to show QR
  const renderHealthCardScreen = useCallback(() => {
    const texts = getText();
    return (
      <div className="screen healthcard-screen">
        <div className="screen-header">
          <div className="header-icon">🆔</div>
          <h2>{texts.homeMenu[4].title}</h2>
          <div className="subtitle">{texts.homeMenu[4].subtitle}</div>
        </div>

        <div className="health-card">
          <div className="card-top">
            <div className="card-logo">
              <div className="logo">🏥</div>
              <div className="logo-text">
                <div className="title">DIGITAL HEALTH CARD</div>
                <div className="subtitle">भारत सरकार | Government of India</div>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="qr-section">
              <div className="qr-button-display" onClick={() => handleKeyPress(1)}>
                <div className="qr-button-number">1</div>
                <div className="qr-button-content">
                  <div className="qr-icon">📱</div>
                  <div className="qr-button-text">{texts.showQR}</div>
                  <div className="qr-press-hint">Press 1</div>
                </div>
              </div>
              <div className="worker-info">
                <div className="info-row">
                  <div className="label">Worker ID</div>
                  <div className="value">MW-2025-001234</div>
                </div>
                <div className="info-row">
                  <div className="label">Name</div>
                  <div className="value">{currentLangCode === 'en' ? 'Ram Kumar Sharma' : 'राम कुमार शर्मा'}</div>
                </div>
                <div className="info-row">
                  <div className="label">Age</div>
                  <div className="value">32 years</div>
                </div>
                <div className="info-row">
                  <div className="label">Blood Group</div>
                  <div className="value">B+ Positive</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-footer">
            <div className="validity">Valid till: Dec 2025</div>
            <div className="emergency">Emergency: 108</div>
          </div>
        </div>

        <div className="navigation-hint">{texts.goBack}</div>
      </div>
    );
  }, [getText, currentLangCode, handleKeyPress]);

  // FULL SCREEN QR CODE WITH REAL QR
  const renderFullQRScreen = useCallback(() => {
    const qrData = generateQRData();
    
    return (
      <div className="screen qr-fullscreen-screen">
        <div className="qr-fullscreen-container">
          <div className="qr-header">
            <div className="qr-title">Digital Health QR Code</div>
            <div className="qr-subtitle">Scan to access health information</div>
          </div>
          
          <div className="qr-code-large">
            <div className="real-qr-code">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}&bgcolor=ffffff&color=000000&margin=10`}
                alt="Health QR Code"
                style={{
                  width: '200px',
                  height: '200px',
                  border: '4px solid #000',
                  borderRadius: '8px'
                }}
              />
            </div>
          </div>

          <div className="qr-info">
            <div className="qr-id">QR ID: MW-2025-001234</div>
            <div className="qr-worker">{currentLangCode === 'en' ? 'Ram Kumar Sharma' : 'राम कुमार शर्मा'}</div>
            <div className="qr-validity">Valid until December 2025</div>
          </div>

          <div className="qr-instructions">
            <div className="instruction">📱 {currentLangCode === 'en' ? 'Scan with any QR reader' : 'किसी भी QR रीडर से स्कैन करें'}</div>
            <div className="instruction">🏥 {currentLangCode === 'en' ? 'Access health records instantly' : 'स्वास्थ्य रिकॉर्ड तुरंत एक्सेस करें'}</div>
            <div className="instruction">🔒 {currentLangCode === 'en' ? 'Secure and encrypted data' : 'सुरक्षित और एन्क्रिप्टेड डेटा'}</div>
          </div>

          <div className="qr-data-preview">
            <div className="data-title">QR Data Preview:</div>
            <div className="data-content">{qrData.length > 80 ? `${qrData.substring(0, 80)}...` : qrData}</div>
          </div>
        </div>
        
        <div className="navigation-hint">
          {currentLangCode === 'en' ? 'Press any key to go back' : 'वापस जाने के लिए कोई भी बटन दबाएं'}
        </div>
      </div>
    );
  }, [currentLangCode, generateQRData]);

  const renderReportScreen = useCallback(() => (
    <div className="screen keris-report-screen">
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .keris-report-screen {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          
          .keris-logo {
            width: 80px;
            height: 80px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            animation: pulse 2s infinite;
            box-shadow: 0 8px 32px rgba(0,0,0,0.2);
          }
          
          .keris-logo-text {
            font-size: 28px;
            font-weight: bold;
            color: #667eea;
          }
        `}
      </style>
      
      <div className="keris-logo">
        <div className="keris-logo-text">K</div>
      </div>
      
      <div className="report-title">
        {currentLangCode === 'en' ? 'Report Submitted Successfully' : 'Report Submitted Successfully'}
      </div>
      
      <div className="keris-footer">
        <div>🔒 Secure • 🏥 KERIS Network • ✅ Verified</div>
        <div style={{marginTop: '8px', fontSize: '12px'}}>
          Reference ID: KRS-{Math.random().toString(36).substr(2, 9).toUpperCase()}
        </div>
      </div>
    </div>
  ), [currentLangCode]);

  // Main render function
  const renderScreen = useCallback(() => {
    switch (currentScreen) {
      case 'boot': return renderBootScreen();
      case 'language': return renderLanguageScreen();
      case 'home': return renderHomeScreen();
      case 'medicines': return renderMedicinesScreen();
      case 'symptoms': return renderSymptomsScreen();
      case 'education': return renderEducationScreen();
      case 'healthcard': return renderHealthCardScreen();
      case 'qr-fullscreen': return renderFullQRScreen();
      default: return renderReportScreen();
    }
  }, [currentScreen, renderBootScreen, renderLanguageScreen, renderHomeScreen, renderMedicinesScreen, renderSymptomsScreen, renderEducationScreen, renderHealthCardScreen, renderFullQRScreen, renderReportScreen]);

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          overflow-x: hidden;
          min-height: 100vh;
        }

        .phone-simulator {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          min-height: 100vh;
          padding: 20px;
          background: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%);
          gap: 40px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .phone-container {
          position: relative;
          background: linear-gradient(145deg, #2c2c2c, #1a1a1a);
          border-radius: 32px;
          padding: 24px;
          width: 380px;
          box-shadow: 
            0 25px 80px rgba(0,0,0,0.6),
            0 0 0 1px rgba(255,255,255,0.1),
            inset 0 1px 0 rgba(255,255,255,0.2),
            inset 0 -1px 0 rgba(0,0,0,0.8);
          position: relative;
          flex-shrink: 0;
        }

        .phone-container::before {
          content: '';
          position: absolute;
          top: 12px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 6px;
          background: linear-gradient(90deg, #666, #999, #666);
          border-radius: 3px;
          box-shadow: inset 0 1px 2px rgba(0,0,0,0.8);
        }

        .phone-container::after {
          content: '';
          position: absolute;
          top: 12px;
          right: 24px;
          width: 12px;
          height: 6px;
          background: #333;
          border-radius: 1px;
        }

        .screen-container {
          background: linear-gradient(145deg, #000, #111);
          border-radius: 20px;
          height: 480px;
          overflow: hidden;
          margin-bottom: 24px;
          position: relative;
          box-shadow: 
            inset 0 2px 10px rgba(0,0,0,0.8),
            0 0 0 2px #333,
            0 0 20px rgba(0,100,255,0.1);
        }

        .screen {
          height: 100%;
          background: linear-gradient(145deg, #f8fafc, #e2e8f0);
          color: #1a202c;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow-y: auto;
        }

        .boot-screen {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .boot-logo {
          animation: bootPulse 2s ease-in-out infinite alternate;
        }

        .logo-icon {
          font-size: 64px;
          margin-bottom: 16px;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
        }

        .logo-text {
          font-size: 28px;
          font-weight: 800;
          letter-spacing: 2px;
          margin-bottom: 8px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .logo-subtitle {
          font-size: 14px;
          opacity: 0.9;
          margin-bottom: 32px;
        }

        .loading-dots {
          display: flex;
          gap: 8px;
          justify-content: center;
        }

        .loading-dots span {
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          animation: loadingDots 1.5s ease-in-out infinite;
        }

        .loading-dots span:nth-child(2) { animation-delay: 0.3s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.6s; }

        @keyframes bootPulse {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }

        @keyframes loadingDots {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.3); opacity: 1; }
        }

        .boot-footer {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
        }

        .govt-seal {
          font-size: 32px;
          margin-bottom: 8px;
        }

        .govt-text {
          font-size: 12px;
          opacity: 0.8;
        }

        .screen-header {
          background: linear-gradient(135deg, #4338ca, #6366f1);
          color: white;
          padding: 20px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(67, 56, 202, 0.3);
        }

        .header-icon {
          font-size: 32px;
          margin-bottom: 8px;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
        }

        .screen-header h2 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 4px;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }

        .screen-header .subtitle {
          font-size: 12px;
          opacity: 0.9;
        }

        .status-bar {
          background: linear-gradient(90deg, #1f2937, #374151);
          color: white;
          padding: 8px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 10px;
          font-weight: 500;
        }

        .status-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .carrier {
          font-weight: 600;
        }

        .signal-bars {
          display: flex;
          gap: 2px;
          align-items: end;
        }

        .bar {
          width: 3px;
          height: 6px;
          background: #4b5563;
          border-radius: 1px;
        }

        .bar:nth-child(1) { height: 2px; }
        .bar:nth-child(2) { height: 3px; }
        .bar:nth-child(3) { height: 4px; }
        .bar:nth-child(4) { height: 5px; }
        .bar:nth-child(5) { height: 6px; }

        .bar.active {
          background: #10b981;
        }

        .status-center {
          flex: 1;
          text-align: center;
        }

        .time {
          font-family: 'Monaco', monospace;
          font-weight: 600;
        }

        .status-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .battery {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 9px;
        }

        .battery-level {
          width: 20px;
          height: 8px;
          border: 1px solid #9ca3af;
          border-radius: 1px;
          position: relative;
          background: #374151;
        }

        .battery-level::after {
          content: '';
          position: absolute;
          top: 2px;
          right: -3px;
          width: 2px;
          height: 4px;
          background: #9ca3af;
          border-radius: 0 1px 1px 0;
        }

        .language-list {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .language-item {
          background: linear-gradient(145deg, #ffffff, #f1f5f9);
          border: 2px solid transparent;
          border-radius: 16px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 16px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          position: relative;
          overflow: hidden;
        }

        .language-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: left 0.5s;
        }

        .language-item:hover::before {
          left: 100%;
        }

        .language-item:hover {
          border-color: #4338ca;
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(67, 56, 202, 0.2);
        }

        .lang-number {
          background: linear-gradient(135deg, #4338ca, #6366f1);
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(67, 56, 202, 0.3);
        }

        .lang-flag {
          font-size: 28px;
        }

        .lang-content {
          flex: 1;
        }

        .lang-name {
          font-size: 18px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 2px;
        }

        .lang-english {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 2px;
        }

        .lang-users {
          font-size: 11px;
          color: #9ca3af;
          font-weight: 500;
        }

        .lang-arrow {
          color: #4338ca;
          font-size: 20px;
          transform: translateX(-4px);
          transition: transform 0.3s;
        }

        .language-item:hover .lang-arrow {
          transform: translateX(0);
        }

        .welcome-header {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white;
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 20px rgba(245, 158, 11, 0.3);
        }

        .user-greeting {
          font-size: 18px;
          font-weight: 700;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }

        .language-badge {
          background: rgba(255,255,255,0.2);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          backdrop-filter: blur(10px);
        }

        .menu-container {
          padding: 20px;
          display: grid;
          gap: 16px;
        }

        .menu-card {
          background: linear-gradient(145deg, #ffffff, #f8fafc);
          border-radius: 20px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 
            0 4px 20px rgba(0,0,0,0.08),
            0 0 0 1px rgba(0,0,0,0.05);
          position: relative;
          overflow: hidden;
        }

        .menu-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #4338ca, #06b6d4, #10b981, #f59e0b);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }

        .menu-card:hover::before {
          transform: translateX(0);
        }

        .menu-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 
            0 20px 40px rgba(0,0,0,0.15),
            0 0 0 1px rgba(67, 56, 202, 0.1);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .menu-icon {
          font-size: 32px;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        }

        .menu-number {
          background: linear-gradient(135deg, #e5e7eb, #d1d5db);
          color: #374151;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
        }

        .card-content {
          margin-bottom: 12px;
        }

        .menu-title {
          font-size: 16px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 4px;
        }

        .menu-subtitle {
          font-size: 13px;
          color: #6b7280;
          font-weight: 500;
        }

        .card-footer {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .badge.pending {
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          color: #92400e;
        }

        .badge.urgent {
          background: linear-gradient(135deg, #fee2e2, #fecaca);
          color: #b91c1c;
          animation: urgentPulse 2s infinite;
        }

        .badge.new {
          background: linear-gradient(135deg, #dcfce7, #bbf7d0);
          color: #166534;
        }

        .badge.verified {
          background: linear-gradient(135deg, #dbeafe, #bfdbfe);
          color: #1e40af;
        }

        @keyframes urgentPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .medicines-list, .education-list {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .medicine-card {
          background: linear-gradient(145deg, #ffffff, #f8fafc);
          border-radius: 16px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          border-left: 4px solid;
          transition: all 0.3s ease;
        }

        .medicine-card.due {
          border-left-color: #ef4444;
          background: linear-gradient(145deg, #fef2f2, #fee2e2);
        }

        .medicine-card.upcoming {
          border-left-color: #3b82f6;
          background: linear-gradient(145deg, #eff6ff, #dbeafe);
        }

        .medicine-card:hover, .education-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }

        .med-time {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .time-badge {
          background: linear-gradient(135deg, #4338ca, #6366f1);
          color: white;
          padding: 8px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(67, 56, 202, 0.3);
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ef4444;
          animation: statusPulse 2s infinite;
        }

        .medicine-card.upcoming .status-dot {
          background: #3b82f6;
          animation: none;
        }

        @keyframes statusPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .med-content {
          flex: 1;
        }

        .med-name, .tip-title {
          font-size: 16px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 4px;
        }

        .med-dosage, .tip-subtitle {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 2px;
        }

        .med-remaining {
          font-size: 12px;
          color: #9ca3af;
        }

        .med-action {
          text-align: center;
        }

        .take-now {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
          animation: takeNowPulse 2s infinite;
        }

        .upcoming {
          background: linear-gradient(135deg, #e5e7eb, #d1d5db);
          color: #6b7280;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        @keyframes takeNowPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .next-reminder {
          margin: 0 20px 20px;
          background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
          border: 2px solid #0ea5e9;
          border-radius: 16px;
          padding: 16px;
          text-align: center;
        }

        .reminder-text {
          font-size: 14px;
          font-weight: 600;
          color: #0c4a6e;
          margin-bottom: 4px;
        }

        .reminder-countdown {
          font-size: 12px;
          color: #0369a1;
        }

        .progress-container {
          padding: 16px 20px;
          background: linear-gradient(135deg, #f8fafc, #e2e8f0);
        }

        .progress-bar {
          background: #e2e8f0;
          height: 8px;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .progress-fill {
          background: linear-gradient(90deg, #4338ca, #06b6d4);
          height: 100%;
          transition: width 0.6s ease;
          border-radius: 4px;
        }

        .progress-text {
          text-align: center;
          font-size: 12px;
          color: #64748b;
          font-weight: 600;
        }

        .question-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 30px 20px;
        }

        .question-card {
          background: linear-gradient(145deg, #ffffff, #f1f5f9);
          border-radius: 20px;
          padding: 24px;
          text-align: center;
          margin-bottom: 32px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          border: 2px solid #e2e8f0;
        }

        .question-hindi {
          font-size: 20px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 8px;
          line-height: 1.4;
        }

        .question-english {
          font-size: 16px;
          color: #6b7280;
          font-weight: 500;
        }

        .answer-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
        }

        .answer-option {
          background: linear-gradient(145deg, #ffffff, #f1f5f9);
          border: 3px solid #e2e8f0;
          border-radius: 20px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: center;
          min-width: 100px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          position: relative;
          overflow: hidden;
        }

        .answer-option::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
          transform: scale(0);
          transition: transform 0.6s;
        }

        .answer-option:hover::before {
          transform: scale(1);
        }

        .yes-option:hover {
          border-color: #10b981;
          background: linear-gradient(145deg, #ecfdf5, #d1fae5);
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 16px 48px rgba(16, 185, 129, 0.3);
        }

        .no-option:hover {
          border-color: #ef4444;
          background: linear-gradient(145deg, #fef2f2, #fee2e2);
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 16px 48px rgba(239, 68, 68, 0.3);
        }

        .option-number {
          background: linear-gradient(135deg, #4338ca, #6366f1);
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 700;
          margin: 0 auto 12px;
          box-shadow: 0 4px 16px rgba(67, 56, 202, 0.3);
        }

        .option-text {
          margin-bottom: 8px;
        }

        .option-text .hindi {
          font-size: 16px;
          font-weight: 700;
          color: #1f2937;
        }

        .option-text .english {
          font-size: 12px;
          color: #6b7280;
          font-weight: 500;
        }

        .option-icon {
          font-size: 20px;
          opacity: 0.7;
        }

        .education-card {
          background: linear-gradient(145deg, #ffffff, #f8fafc);
          border-radius: 16px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          border: 2px solid transparent;
        }

        .education-card:hover {
          border-color: #4338ca;
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(67, 56, 202, 0.2);
        }

        .card-number {
          background: linear-gradient(135deg, #4338ca, #6366f1);
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(67, 56, 202, 0.3);
        }

        .card-content {
          flex: 1;
        }

        .tip-meta {
          display: flex;
          gap: 12px;
          font-size: 11px;
          margin-bottom: 8px;
        }

        .duration {
          color: #059669;
          font-weight: 600;
        }

        .category {
          color: #7c3aed;
          font-weight: 600;
        }

        .progress-mini {
          background: #e5e7eb;
          height: 4px;
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-mini-fill {
          background: linear-gradient(90deg, #4338ca, #06b6d4);
          height: 100%;
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        .card-status {
          font-size: 24px;
        }

        .health-card {
          margin: 20px;
          background: linear-gradient(145deg, #ffffff, #f8fafc);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 
            0 16px 48px rgba(0,0,0,0.15),
            0 0 0 1px rgba(0,0,0,0.05);
        }

        .card-top {
          background: linear-gradient(135deg, #1e40af, #3730a3);
          color: white;
          padding: 20px;
        }

        .card-logo {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .logo {
          font-size: 32px;
        }

        .logo-text .title {
          font-size: 16px;
          font-weight: 800;
          letter-spacing: 1px;
          margin-bottom: 4px;
        }

        .logo-text .subtitle {
          font-size: 11px;
          opacity: 0.9;
        }

        .card-body {
          padding: 24px;
        }

        .qr-section {
          display: flex;
          gap: 20px;
          align-items: center;
          margin-bottom: 24px;
        }

        .qr-button-display {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          background: linear-gradient(145deg, #f8fafc, #e2e8f0);
          border: 2px solid #4338ca;
          border-radius: 16px;
          padding: 16px;
          min-width: 120px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .qr-button-display:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(67, 56, 202, 0.2);
        }

        .qr-button-number {
          background: linear-gradient(135deg, #4338ca, #6366f1);
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(67, 56, 202, 0.3);
        }

        .qr-button-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .qr-icon {
          font-size: 24px;
        }

        .qr-button-text {
          font-size: 12px;
          font-weight: 600;
          color: #1f2937;
          text-align: center;
        }

        .qr-press-hint {
          font-size: 10px;
          color: #6b7280;
          font-style: italic;
        }

        .qr-fullscreen-screen {
          background: linear-gradient(135deg, #1e3a8a, #3730a3);
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 20px;
        }

        .qr-fullscreen-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          max-width: 320px;
        }

        .qr-header {
          text-align: center;
        }

        .qr-title {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 4px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .qr-subtitle {
          font-size: 11px;
          opacity: 0.9;
        }

        .qr-code-large {
          background: white;
          padding: 16px;
          border-radius: 16px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.4);
        }

        .real-qr-code img {
          display: block;
          max-width: 100%;
          height: auto;
        }

        .qr-info {
          text-align: center;
        }

        .qr-id {
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 2px;
          font-family: 'Monaco', monospace;
        }

        .qr-worker {
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 2px;
        }

        .qr-validity {
          font-size: 10px;
          opacity: 0.8;
        }

        .qr-instructions {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .instruction {
          font-size: 9px;
          opacity: 0.9;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .qr-data-preview {
          text-align: center;
          padding: 8px;
          background: rgba(255,255,255,0.1);
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .data-title {
          font-size: 10px;
          font-weight: 600;
          margin-bottom: 4px;
          opacity: 0.8;
        }

        .data-content {
          font-size: 8px;
          font-family: 'Monaco', monospace;
          opacity: 0.7;
          word-break: break-all;
        }

        .worker-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 4px 0;
          border-bottom: 1px solid #f1f5f9;
        }

        .info-row:last-child {
          border-bottom: none;
        }

        .label {
          font-size: 11px;
          color: #6b7280;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .value {
          font-size: 13px;
          color: #1f2937;
          font-weight: 700;
        }

        .card-footer {
          background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
          padding: 12px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 10px;
          color: #6b7280;
          font-weight: 600;
        }

        .emergency {
          color: #dc2626;
          font-weight: 700;
        }

        .navigation-hint {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.8);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          backdrop-filter: blur(10px);
        }

        .audio-feedback {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white;
          padding: 12px 16px;
          text-align: center;
          font-size: 13px;
          font-weight: 600;
          animation: slideDown 0.5s ease;
          z-index: 100;
          box-shadow: 0 4px 20px rgba(245, 158, 11, 0.4);
        }

        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .keypad {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .key {
          padding: 18px;
          border: none;
          border-radius: 16px;
          font-size: 20px;
          font-weight: 700;
          cursor: pointer;
          background: linear-gradient(145deg, #374151, #1f2937);
          color: #ffffff;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 
            0 6px 20px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.1),
            inset 0 -1px 0 rgba(0,0,0,0.2);
          position: relative;
          overflow: hidden;
        }

        .key::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
          transition: all 0.3s;
          border-radius: 50%;
        }

        .key:hover::before {
          width: 100px;
          height: 100px;
          top: calc(50% - 50px);
          left: calc(50% - 50px);
        }

        .key:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 
            0 12px 32px rgba(0,0,0,0.4),
            inset 0 1px 0 rgba(255,255,255,0.2);
        }

        .key:active {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 
            0 8px 24px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.1);
        }

        .key.special {
          background: linear-gradient(145deg, #2563eb, #1d4ed8);
        }

        .key.pressed {
          transform: translateY(-2px) scale(0.98);
          box-shadow: 
            0 4px 16px rgba(0,0,0,0.3),
            inset 0 2px 4px rgba(0,0,0,0.3);
        }

        .demo-panel {
          background: linear-gradient(145deg, #ffffff, #f8fafc);
          border-radius: 24px;
          padding: 32px;
          width: 100%;
          max-width: 500px;
          box-shadow: 
            0 16px 48px rgba(0,0,0,0.1),
            0 0 0 1px rgba(0,0,0,0.05);
          flex-shrink: 0;
          height: fit-content;
        }

        .demo-title {
          background: linear-gradient(135deg, #4338ca, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: 24px;
          font-weight: 800;
          margin-bottom: 20px;
          text-align: center;
        }

        .demo-features {
          display: grid;
          gap: 16px;
        }

        .feature-item {
          background: linear-gradient(145deg, #f8fafc, #e2e8f0);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
        }

        .feature-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
        }

        .feature-icon {
          font-size: 20px;
        }

        .feature-text {
          flex: 1;
        }

        .feature-title {
          font-size: 14px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 2px;
        }

        .feature-desc {
          font-size: 12px;
          color: #6b7280;
        }

        .vibration-effect {
          animation: vibrate 0.1s linear 3;
        }

        @keyframes vibrate {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }

        @media (max-width: 1200px) {
          .phone-simulator {
            flex-direction: column;
            align-items: center;
            max-width: 100%;
          }
          
          .demo-panel {
            max-width: 380px;
          }
        }

        @media (max-width: 768px) {
          .phone-simulator {
            padding: 10px;
          }
          
          .phone-container {
            width: 100%;
            max-width: 380px;
            padding: 16px;
          }
          
          .demo-panel {
            padding: 20px;
          }
        }
      `}</style>

      <div className="phone-simulator">
        <div className={`phone-container ${isVibrating ? 'vibration-effect' : ''}`}>
          <div className="screen-container">
            {renderScreen()}
            
            {currentAudio && (
              <div className="audio-feedback">
                🔊 {currentAudio}
              </div>
            )}
          </div>
          
          <div className="keypad">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleKeyPress(num)}
                className={`key ${keyPress === num ? 'pressed' : ''}`}
              >
                {num}
              </button>
            ))}
            <button 
              onClick={goBack} 
              className={`key special ${keyPress === '*' ? 'pressed' : ''}`}
            >
              *
            </button>
            <button 
              onClick={() => handleKeyPress(0)} 
              className={`key ${keyPress === 0 ? 'pressed' : ''}`}
            >
              0
            </button>
            <button 
              onClick={() => handleKeyPress('#')} 
              className={`key special ${keyPress === '#' ? 'pressed' : ''}`}
            >
              #
            </button>
          </div>
        </div>
        
        <div className="demo-panel">
          <h3 className="demo-title">🎯 QR CODE FEATURE</h3>
          <div className="demo-features">
            <div className="feature-item">
              <div className="feature-icon">🎯</div>
              <div className="feature-text">
                <div className="feature-title">Press 1 for QR Code</div>
                <div className="feature-desc">On health card screen (option 4), press 1 to show QR</div>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📱</div>
              <div className="feature-text">
                <div className="feature-title">Real QR Code Generated</div>
                <div className="feature-desc">Uses QR server API to generate actual scannable QR codes</div>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🌐</div>
              <div className="feature-text">
                <div className="feature-title">6 Language Support</div>
                <div className="feature-desc">Malayalam, Hindi, Bengali, Tamil, Odia & English</div>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">⚡</div>
              <div className="feature-text">
                <div className="feature-title">Optimized Performance</div>
                <div className="feature-desc">React.memo, useCallback, useMemo for smooth operation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ButtonPhoneApp;
