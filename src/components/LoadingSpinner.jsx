import React, { useState, useEffect } from 'react';
import { Heart, Shield, GraduationCap, Stethoscope, Users } from 'lucide-react';

export const PremiumLoader = ({ 
  isVisible = true, 
  message = "Loading amazing content...",
  type = "default" // default, pulse, orbit, wave, heart
}) => {
  const [currentIcon, setCurrentIcon] = useState(0);
  const icons = [Heart, Shield, GraduationCap, Stethoscope, Users];
  
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 800);
    
    return () => clearInterval(interval);
  }, [isVisible, icons.length]);

  if (!isVisible) return null;

  const DefaultLoader = () => (
    <div className="relative">
      <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin">
        <div className="absolute inset-2 border-4 border-transparent border-t-green-500 rounded-full animate-spin" 
             style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
      </div>
    </div>
  );

 const PulseLoader = () => (
    <div className="flex space-x-2">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-4 h-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-full animate-pulse"
          style={{ 
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1.2s'
          }}
        ></div>
      ))}
    </div>
  );

  const OrbitLoader = () => (
    <div className="relative w-20 h-20">
      <div className="absolute inset-0 border-2 border-blue-200 rounded-full animate-spin">
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-600 rounded-full"></div>
      </div>
      <div className="absolute inset-2 border-2 border-green-200 rounded-full animate-spin" 
           style={{ animationDirection: 'reverse', animationDuration: '2s' }}>
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-600 rounded-full"></div>
      </div>
      <div className="absolute inset-4 border-2 border-purple-200 rounded-full animate-spin"
           style={{ animationDuration: '3s' }}>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-600 rounded-full"></div>
      </div>
    </div>
  );

  const WaveLoader = () => (
    <div className="flex items-end space-x-1">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-2 bg-gradient-to-t from-blue-500 to-green-500 rounded-full animate-bounce"
          style={{ 
            height: '2rem',
            animationDelay: `${i * 0.1}s`,
            animationDuration: '0.8s'
          }}
        ></div>
      ))}
    </div>
  );

  const HeartLoader = () => {
    const CurrentIcon = icons[currentIcon];
    return (
      <div className="relative">
        <div className="w-16 h-16 border-4 border-red-200 rounded-full animate-pulse flex items-center justify-center">
          <CurrentIcon 
            className="w-8 h-8 text-red-500 animate-bounce" 
            style={{ animationDuration: '1s' }}
          />
        </div>
        <div className="absolute -inset-2 border-2 border-red-100 rounded-full animate-ping opacity-20"></div>
      </div>
    );
  };

  const getLoader = () => {
    switch (type) {
      case 'pulse': return <PulseLoader />;
      case 'orbit': return <OrbitLoader />;
      case 'wave': return <WaveLoader />;
      case 'heart': return <HeartLoader />;
      default: return <DefaultLoader />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl max-w-sm w-full mx-4 border border-gray-200">
        <div className="text-center">
          {/* Main Loader */}
          <div className="mb-8 flex justify-center">
            {getLoader()}
          </div>
          
          {/* Loading Text */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2 animate-fade-in">
              {message}
            </h3>
            <p className="text-sm text-gray-500">
              Connecting you to our services
            </p>
          </div>
          
          {/* Progress Dots */}
          <div className="flex justify-center space-x-2 mb-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
          
          {/* Brand Colors Bar */}
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-500 rounded-full opacity-10 animate-bounce" 
             style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-1/4 right-10 w-16 h-16 bg-green-500 rounded-full opacity-10 animate-bounce" 
             style={{ animationDuration: '2s', animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-purple-500 rounded-full opacity-10 animate-bounce" 
             style={{ animationDuration: '2.5s', animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};