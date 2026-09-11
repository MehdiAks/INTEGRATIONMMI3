import React, { useState } from 'react';
import HandDrawnDoorHero from './components/HandDrawnDoorHero';
import TrailerSection from './components/TrailerSection';
import SynopsisSection from './components/SynopsisSection';
import CastSection from './components/CastSection';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
const piCorpsImg = window.GroupMedia.root + 'assets/images/pi_corps.png';

export default function App() {
  const [customCharacterUrl, setCustomCharacterUrl] = useState(piCorpsImg);

  const handleDoorOpened = () => {
    // Optional callback when door fully opens
  };

  return (
    <div className="w-full min-h-screen bg-stone-100 text-stone-900 font-mono-spaced selection:bg-stone-900 selection:text-white">
      
      {/* Interactive Hero with opening door animation & zoom */}
      <HandDrawnDoorHero 
        customCharacterUrl={customCharacterUrl}
        onDoorOpened={handleDoorOpened}
      />

      {/* Trailer Video Section (Inside the door) */}
      <TrailerSection />

      {/* Synopsis Section */}
      <SynopsisSection />

      {/* Cast & Characters Section */}
      <CastSection customCharacterUrl={customCharacterUrl} />

      {/* Press & Community Reviews Section */}
      <ReviewsSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
