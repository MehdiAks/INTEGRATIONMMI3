import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Film, Share2, Sparkles } from 'lucide-react';
const posterImage = window.GroupMedia.root + "assets/images/affiche_G15.png";
const trailerVideo = window.GroupMedia.root + "assets/videos/video_G15.mov";

export default function TrailerSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => setIsPlaying(false));
      }

    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section id="trailer" className="relative w-full min-h-screen bg-stone-900 text-stone-100 py-20 px-6 flex flex-col justify-center items-center">
      {/* Hand-drawn Frame Heading */}
      <div className="max-w-4xl w-full mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 border-2 border-stone-100 px-4 py-1.5 sketch-box mb-4 bg-stone-800">
          <Film size={16} className="text-stone-300" />
          <span className="font-mono-spaced text-xs tracking-widest uppercase">VOUS ÊTES ENTRÉ DANS LA PORTE</span>
        </div>

        <h2 className="font-sketch text-4xl md:text-5xl lg:text-6xl text-white tracking-wide font-bold">
          La Bande-Annonce Officielle
        </h2>
        <p className="font-mono-spaced text-sm text-stone-400 mt-3 max-w-xl mx-auto">
          Attente estimée du personnage : 3 minutes et 42 secondes de pur malaise.
        </p>
      </div>

      {/* Video Container with Hand-drawn TV / Cinema Frame */}
      <div className="max-w-5xl w-full mx-auto relative group">
        <div className="relative border-4 border-stone-100 sketch-box-lg bg-black overflow-hidden shadow-2xl">

          {/* Mockup / Canvas Video (Black & White Stylized Preview) */}
          <div className="relative aspect-video w-full bg-stone-950 flex items-center justify-center">

            {/* HTML5 Video Element (Or embed sample stylized video / canvas animation) */}
            <video
              ref={videoRef}
              playsInline
              preload="metadata"
              className="w-full h-full object-cover filter grayscale contrast-125 brightness-90"
              poster={posterImage}
              src={trailerVideo}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Overlay Play Button when paused */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center cursor-pointer group-hover:bg-black/40 transition-all z-20"
              >
                <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center bg-stone-900/90 text-white sketch-box shadow-2xl transform group-hover:scale-110 transition-transform">
                  <Play size={36} className="ml-1 text-white fill-white" />
                </div>
                <p className="font-sketch text-2xl text-white mt-4 tracking-wider">
                  Cliquez pour lancer la bande-annonce
                </p>
                <p className="font-mono-spaced text-xs text-stone-400 mt-1">
                  (Noir & blanc — Durée : 01:45)
                </p>
              </div>
            )}

            {/* Video Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex justify-between items-center z-30 font-mono-spaced text-xs">
              <div className="flex items-center gap-4">
                <button onClick={togglePlay} className="hover:text-amber-400 transition-colors cursor-pointer">
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button onClick={toggleMute} className="hover:text-amber-400 transition-colors cursor-pointer">
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>

              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] text-stone-400 uppercase tracking-widest hidden sm:inline">PROCHAINEMENT AU CINÉMA</span>
                <button aria-label="Plein écran" onClick={() => videoRef.current?.requestFullscreen?.().catch(() => {})} className="hover:text-amber-400 transition-colors cursor-pointer">
                  <Maximize size={18} />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Awkward note below video */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-stone-800/80 border border-stone-700 p-4 sketch-box">
          <div className="flex items-center gap-3">
            <Sparkles size={18} className="text-stone-300" />
            <p className="font-sketch text-xl text-stone-200">
              « Le premier thriller psychologique où la menace... c'est le savoir-vivre. »
            </p>
          </div>
          <button className="flex items-center gap-2 font-mono-spaced text-xs bg-white text-stone-900 px-4 py-2 sketch-box hover:bg-stone-200 transition-colors cursor-pointer">
            <Share2 size={14} />
            PARTAGER LA BANDE-ANNONCE
          </button>
        </div>
      </div>
    </section>
  );
}
