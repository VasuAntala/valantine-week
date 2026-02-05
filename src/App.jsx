import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
// We will import other components as we build them
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';
import Jar from './components/Jar';
import ValentineQuestion from './components/ValentineQuestion';
import Timer from './components/Timer';
// import MusicPlayer from './components/MusicPlayer';
import CustomCursor from './components/CustomCursor';
import ParallaxBackground from './components/ParallaxBackground';
import { ConfigProvider } from './context/ConfigContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import EditButton from './components/EditButton';
import ThinkingOfYou from './components/ThinkingOfYou';


import ErrorBoundary from './components/ErrorBoundary';

function MainApp() {
  const { user, login, isAuthenticated, loading } = useAuth();
  const [started, setStarted] = useState(false);

  // Authentication is now handled locally via localStorage
  // No backend connection needed


  // Show login screen if not authenticated
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="text-2xl text-rose-500">Loading...</div>
      </div>
    );
  }

  return (
    <ConfigProvider>
      <ErrorBoundary>
        <div className="min-h-screen bg-pink-50 text-gray-800 cursor-none">
          <CustomCursor />
          <ParallaxBackground />
          <EditButton />
          <ThinkingOfYou />

          {!started ? (
            <Hero onStart={() => setStarted(true)} />
          ) : (
            <div className="animate-in fade-in duration-1000">
              <Hero showButton={false} onStart={() => { }} />

              {/* Main Content Container */}
              <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-20 sm:space-y-32 pb-20 sm:pb-32">
                <div className="mt-20 text-center space-y-6">
                  <h2 className="text-3xl md:text-5xl font-display text-rose-600">Our Love Story</h2>
                  <p className="text-xl text-gray-600">A journey of beautiful moments...</p>
                </div>

                <Timeline />
                <Gallery />
                <Timer />
                <Jar />
                <ValentineQuestion />
              </div>

              <footer className="text-center py-8 text-rose-400">
                <p>Made with ❤️ for You</p>
              </footer>
            </div>
          )}
        </div>
      </ErrorBoundary>
    </ConfigProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;

