import React from 'react';
import { Film, Share2, Sparkles } from 'lucide-react';

const trailerVideo = 'https://www.youtube.com/embed/hZTntX5LKP0?rel=0';

export default function TrailerSection() {
  return (
    <section id="trailer" className="relative w-full min-h-screen bg-stone-900 text-stone-100 py-20 px-6 flex flex-col justify-center items-center">
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

      <div className="max-w-5xl w-full mx-auto relative group">
        <div className="relative border-4 border-stone-100 sketch-box-lg bg-black overflow-hidden shadow-2xl">
          <iframe
            className="w-full aspect-video border-0"
            src={trailerVideo}
            title="Film G15"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-stone-800/80 border border-stone-700 p-4 sketch-box">
          <div className="flex items-center gap-3">
            <Sparkles size={18} className="text-stone-300" />
            <p className="font-sketch text-xl text-stone-200">
              « Le premier thriller psychologique où la menace... c'est le savoir-vivre. »
            </p>
          </div>
          <a href="https://www.youtube.com/watch?v=hZTntX5LKP0" target="_blank" rel="noreferrer" className="flex items-center gap-2 font-mono-spaced text-xs bg-white text-stone-900 px-4 py-2 sketch-box hover:bg-stone-200 transition-colors cursor-pointer">
            <Share2 size={14} />
            PARTAGER LA BANDE-ANNONCE
          </a>
        </div>
      </div>
    </section>
  );
}
