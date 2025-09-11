// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ButtonPhoneApp from "./button";
import MigrantHealthRecordApp from "./idcreate";
import KeralaHealthSurveillanceApp from "./diseasemap";
import IPhoneHealthCampsApp from "./camp"; // ✅ PascalCase
import MobileFraudDetection from "./fraud"; // ✅ PascalCase

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/createid" element={<MigrantHealthRecordApp />} />
        <Route path="/" element={<ButtonPhoneApp />} />
        <Route path="/map" element={<KeralaHealthSurveillanceApp />} />
        <Route path="/camp" element={<IPhoneHealthCampsApp />} /> 
        <Route path="/detect" element={<MobileFraudDetection />} /> 
      </Routes>
    </Router>
  );
}

export default App;
