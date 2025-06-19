import React from 'react';
import { motion } from 'framer-motion';
import { Search, Home, ArrowLeft, AlertCircle, Compass, MapPin } from 'lucide-react';

const NotFoundPage = () => {
  const backgroundElements = [
    { size: 'w-96 h-96', position: '-top-48 -right-48', color: 'bg-gradient-to-br from-purple-400 to-indigo-500', delay: 0 },
    { size: 'w-80 h-80', position: '-bottom-40 -left-40', color: 'bg-gradient-to-tr from-blue-400 to-purple-400', delay: 1000 },
    { size: 'w-64 h-64', position: 'top-1/4 right-1/4', color: 'bg-gradient-to-bl from-indigo-400 to-blue-500', delay: 500 },
    { size: 'w-72 h-72', position: 'bottom-1/4 left-1/4', color: 'bg-gradient-to-tr from-cyan-400 to-indigo-500', delay: 1500 },
  ];

  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {backgroundElements.map((element, index) => (
          <motion.div
            key={index}
            className={`absolute ${element.size} ${element.position} ${element.color} rounded-full mix-blend-multiply filter blur-xl opacity-20`}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 10 + index * 2,
              repeat: Infinity,
              delay: element.delay / 1000,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating search icons */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            <Search className="w-4 h-4 text-indigo-400" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-2xl relative z-10 text-center"
      >
        {/* Main Icon with Compass */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 200 }}
        >
          <motion.div
            className="relative"
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-32 h-32 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <Compass className="w-16 h-16 text-white relative z-10" />
            </div>
            
            {/* Pulsing rings */}
            <motion.div
              className="absolute inset-0 border-4 border-indigo-400 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <motion.div
              className="absolute inset-0 border-2 border-purple-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.5,
              }}
            />
          </motion.div>
        </motion.div>

        {/* Error Code */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-8xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700 bg-clip-text text-transparent mb-4">
            404
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          className="backdrop-blur-xl bg-white/90 rounded-3xl shadow-2xl border border-white/30 p-8 mb-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          whileHover={{ 
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            scale: 1.02,
          }}
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 pointer-events-none" />
          
          <div className="relative z-10">
            <motion.h2
              className="text-3xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Page Not Found
            </motion.h2>
            
            <motion.p
              className="text-lg text-gray-600 mb-6 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              Oops! The page you're looking for seems to have wandered off into the digital wilderness. 
              Don't worry, even the best explorers sometimes take a wrong turn.
            </motion.p>

            <motion.div
              className="flex items-center justify-center space-x-3 text-indigo-600 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <MapPin className="w-5 h-5" />
              <span className="font-semibold">Lost in Cyberspace</span>
              <MapPin className="w-5 h-5" />
            </motion.div>

            <motion.div
              className="text-sm text-gray-500 bg-gray-100 rounded-xl p-4 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <p className="font-medium mb-2">Here's what you can try:</p>
              <ul className="text-left space-y-1">
                <li>• Check the URL for any typos</li>
                <li>• Use the navigation menu to find what you need</li>
                <li>• Go back to the previous page</li>
                <li>• Return to the homepage and start fresh</li>
              </ul>
            </motion.div>

            {/* Fun animated element */}
            <motion.div
              className="flex justify-center mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              <motion.div
                className="flex space-x-2"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-3 h-3 bg-indigo-400 rounded-full"></div>
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <motion.button
            onClick={handleGoBack}
            className="flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: [-100, 300],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 4,
              }}
            />
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </motion.button>

          <motion.button
            onClick={handleGoHome}
            className="flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: [-100, 300],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 4,
              }}
            />
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <p className="text-gray-500 text-sm">
            🧭 Every journey has its detours - let's get you back on track
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;