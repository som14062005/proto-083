// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ButtonPhoneApp from "./button";
import MigrantHealthRecordApp from "./idcreate";
import KeralaHealthSurveillanceApp from "./diseasemap";
import IPhoneHealthCampsApp from "./camp";
import MobileFraudDetection from "./fraud";
import HealthIntroduction from "./intro";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HealthIntroduction />} />
        <Route path="/intro" element={<HealthIntroduction />} />
        <Route path="/phone" element={<ButtonPhoneApp />} />
        <Route path="/createid" element={<MigrantHealthRecordApp />} />
        <Route path="/map" element={<KeralaHealthSurveillanceApp />} />
        <Route path="/camp" element={<IPhoneHealthCampsApp />} />
        <Route path="/detect" element={<MobileFraudDetection />} />
      </Routes>
    </Router>
  );
}

export default App;
