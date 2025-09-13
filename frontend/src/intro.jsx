import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserPlus,
  Phone,
  Stethoscope,
  Tent,
  Pill,
  ArrowRight,
} from "lucide-react";

const healthFeatures = [
  {
    id: "keris",
    title: "KERIS Registration",
    desc: "Secure digital identity creation and health record initialization for migrant workers",
    icon: <UserPlus size={24} />,
    gradient: "from-blue-500 to-blue-600",
    borderColor: "border-blue-300",
    path: "/createid", // Maps to MigrantHealthRecordApp
  },
  {
    id: "phone",
    title: "Button Phone", 
    desc: "Buttton (kaiOS) which makes even the button phone using workers to access health services",
    icon: <Phone size={24} />,
    gradient: "from-teal-500 to-teal-600",
    borderColor: "border-teal-300",
    path: "/phone", // Changed from "/" to "/phone" to avoid conflict
  },
  {
    id: "disease-map",
    title: "Health Monitoring",
    desc: "Real-time disease tracking and camp arranging for worker communities",
    icon: <Stethoscope size={24} />,
    gradient: "from-green-500 to-green-600", 
    borderColor: "border-green-300",
    path: "/map", // Maps to KeralaHealthSurveillanceApp
  },
  {
    id: "camp-arrangement", 
    title: "Camp registration",
    desc: "Safe accommodation standards and health compliance for worker camps",
    icon: <Tent size={24} />,
    gradient: "from-cyan-500 to-cyan-600",
    borderColor: "border-cyan-300",
    path: "/camp", // Maps to IPhoneHealthCampsApp
  },
  {
    id: "fake-medicine",
    title: "Medicine Verification",
    desc: "Authentic drug verification to protect workers from counterfeit medicines",
    icon: <Pill size={24} />,
    gradient: "from-indigo-500 to-indigo-600",
    borderColor: "border-indigo-300",
    path: "/detect", // Maps to MobileFraudDetection
  },
];

export default function HealthIntroduction() {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const navigate = useNavigate();
  const radius = 280;

  const handleFeatureClick = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8 overflow-hidden relative">
      
      {/* DNA Helix Animation */}
      <div className="absolute left-10 top-1/2 transform -translate-y-1/2 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`dna-${i}`}
            className="relative w-2 h-12 mx-auto mb-2"
            style={{
              animation: `dnaRotate 4s linear infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          >
            <div className="absolute left-0 top-0 w-2 h-2 bg-cyan-400 rounded-full shadow-lg"></div>
            <div className="absolute right-0 bottom-0 w-2 h-2 bg-pink-400 rounded-full shadow-lg"></div>
            <div className="absolute left-1/2 top-1/2 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-pink-400 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        ))}
      </div>

      {/* Medical Particles Floating */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float 6s ease-in-out infinite`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          >
            <div className={`w-1 h-1 rounded-full ${
              i % 4 === 0 ? 'bg-cyan-400' : 
              i % 4 === 1 ? 'bg-blue-400' : 
              i % 4 === 2 ? 'bg-teal-400' : 'bg-indigo-400'
            } opacity-60 shadow-lg`}></div>
          </div>
        ))}
      </div>

      {/* Heartbeat Lines */}
      <div className="absolute top-20 right-20 opacity-30">
        <svg width="200" height="100" viewBox="0 0 200 100" className="animate-pulse">
          <path 
            d="M0,50 L20,50 L25,30 L30,70 L35,20 L40,80 L45,50 L200,50" 
            stroke="cyan" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
            style={{
              strokeDasharray: '4,4',
              animation: 'heartbeat 2s ease-in-out infinite'
            }}
          />
        </svg>
      </div>

      {/* Molecular Structure Background */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`molecule-${i}`}
            className="absolute"
            style={{
              left: `${20 + (i % 4) * 25}%`,
              top: `${20 + Math.floor(i / 4) * 25}%`,
              animation: `moleculeFloat 8s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            <div className="relative">
              <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
              <div className="absolute -right-8 -top-2 w-3 h-3 bg-cyan-300 rounded-full"></div>
              <div className="absolute -left-6 -bottom-1 w-3 h-3 bg-teal-300 rounded-full"></div>
              <div className="absolute -right-4 top-4 w-0.5 h-6 bg-white transform rotate-45"></div>
              <div className="absolute -left-3 top-1 w-0.5 h-4 bg-white transform -rotate-45"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `
          linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px),
          linear-gradient(0deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        animation: 'gridMove 20s linear infinite'
      }}></div>

      {/* Pulsing Medical Cross */}
      <div className="absolute bottom-20 left-20 opacity-20">
        <div className="relative w-16 h-16 animate-pulse">
          <div className="absolute inset-x-0 top-1/2 h-2 bg-red-400 transform -translate-y-1/2 rounded-full shadow-lg"></div>
          <div className="absolute inset-y-0 left-1/2 w-2 bg-red-400 transform -translate-x-1/2 rounded-full shadow-lg"></div>
          <div className="absolute inset-0 bg-red-400/20 rounded-full animate-ping"></div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes dnaRotate {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
        @keyframes moleculeFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-10px, -15px) scale(1.1); }
        }
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        @keyframes heartbeat {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
      
      <div className="relative w-[800px] h-[800px] z-10">
        
        {/* Simple Connection Lines */}
        {healthFeatures.map((_, idx) => {
          const angle = (idx / healthFeatures.length) * (2 * Math.PI) - Math.PI / 2;
          return (
            <div
              key={`line-${idx}`}
              className={`absolute top-1/2 left-1/2 origin-left h-0.5 transition-all duration-300 ${
                hoveredFeature === idx 
                  ? 'bg-gradient-to-r from-cyan-400 via-blue-400 to-transparent opacity-80' 
                  : 'bg-gradient-to-r from-blue-300/50 via-cyan-300/30 to-transparent opacity-40'
              }`}
              style={{
                width: `${radius - 80}px`,
                transform: `rotate(${angle}rad)`,
              }}
            />
          );
        })}

        {/* Animated Orbital Rings */}
        <div 
          className="absolute top-1/2 left-1/2 rounded-full border border-cyan-400/30 animate-spin"
          style={{
            width: `${radius * 2 + 180}px`,
            height: `${radius * 2 + 180}px`,
            transform: 'translate(-50%, -50%)',
            animationDuration: '30s',
            boxShadow: '0 0 30px rgba(34, 211, 238, 0.3)',
          }}
        />
        
        <div 
          className="absolute top-1/2 left-1/2 rounded-full border border-blue-400/20 animate-spin"
          style={{
            width: `${radius * 2 + 120}px`,
            height: `${radius * 2 + 120}px`,
            transform: 'translate(-50%, -50%)',
            animationDuration: '45s',
            animationDirection: 'reverse',
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)',
          }}
        />

        {/* Enhanced Center Hub */}
        <div 
          className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-gradient-to-br from-slate-800/90 via-blue-900/90 to-indigo-800/90 backdrop-blur-md border-2 border-cyan-400/50 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 shadow-2xl"
          style={{ 
            boxShadow: '0 0 60px rgba(34, 211, 238, 0.4), inset 0 0 30px rgba(0, 0, 0, 0.5)' 
          }}
        >
          <div className="text-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="relative z-10">
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-2 animate-pulse">
                KERIS
              </div>
              <div className="text-sm font-semibold text-cyan-100">
                Health Records
              </div>
              <div className="text-xs text-blue-300 font-medium">
                Advanced Medical System
              </div>
              <div className="flex items-center justify-center mt-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse shadow-lg shadow-green-400/50"></div>
                <span className="text-xs text-green-300 font-medium">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Clickable Feature Circles with Navigation */}
        {healthFeatures.map((feature, idx) => {
          const angle = (idx / healthFeatures.length) * (2 * Math.PI) - Math.PI / 2;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          const isHovered = hoveredFeature === idx;

          return (
            <div
              key={feature.id}
              className={`absolute w-48 h-48 rounded-2xl transition-all duration-300 ease-out cursor-pointer group ${
                isHovered ? 'scale-105 z-20' : 'scale-100 z-10'
              }`}
              style={{
                left: `calc(50% + ${x}px - 6rem)`,
                top: `calc(50% + ${y}px - 6rem)`,
              }}
              onMouseEnter={() => setHoveredFeature(idx)}
              onMouseLeave={() => setHoveredFeature(null)}
              onClick={() => handleFeatureClick(feature.path)}
            >
              
              {/* Simple Background - NO GLOW */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg transition-all duration-300`}>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent"></div>
              </div>

              {/* Simple Border - NO GLOW */}
              <div className={`absolute inset-0 rounded-2xl border-2 ${feature.borderColor} transition-all duration-300 ${
                isHovered ? 'opacity-100 border-white/60' : 'opacity-70'
              }`}></div>

              <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                
                {/* Simple Icon Container */}
                <div className={`flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-3 transition-all duration-300 border border-white/30 ${
                  isHovered ? 'scale-110 bg-white/30' : ''
                }`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-lg font-bold leading-tight mb-2 text-white">
                  {feature.title}
                </h3>
                
                <p className={`text-xs text-white/95 leading-relaxed transition-all duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-90'
                }`}>
                  {feature.desc}
                </p>

                <div className={`mt-3 flex items-center gap-1 transition-all duration-300 ${
                  isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}>
                  <span className="text-xs font-semibold text-white/90">Explore Feature</span>
                  <ArrowRight size={12} className="text-white/90" />
                </div>

                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-black/40 flex items-center justify-center text-xs font-bold text-white border border-white/50">
                  {idx + 1}
                </div>
              </div>
            </div>
          );
        })}

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-cyan-200 text-sm font-semibold">
            🧬 Advanced Health Management Ecosystem 🏥
          </p>
          <p className="text-blue-300 text-xs mt-1 font-medium">
            5 Intelligent Features • Next-Gen Medical Protection
          </p>
        </div>
      </div>
    </div>
  );
}
