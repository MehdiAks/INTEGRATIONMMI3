import React from 'react';
import { Quote, Film, Sparkles, Image as ImageIcon } from 'lucide-react';
const posterImage = window.GroupMedia.root + "assets/images/affiche_G15.png";

export default function SynopsisSection() {
  return (
    <section id="synopsis" className="w-full py-28 px-6 paper-bg min-h-screen flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full">

        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="font-mono-spaced text-xs tracking-widest uppercase bg-stone-900 text-white px-3.5 py-1.5 sketch-box shadow-sm">
            SYNOPSIS & UNIVERS
          </span>
          <h2 className="font-mono-spaced text-4xl md:text-5xl font-bold text-stone-900 tracking-tight mt-4">
            L'Histoire
          </h2>
        </div>

        {/* 2-Column Grid: Synopsis + Movie Poster Slot */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch my-4">

          {/* Left Column: Synopsis Narrative Card */}
          <div className="flex-1 bg-white p-8 md:p-12 border-[3.5px] border-stone-900 sketch-box-lg shadow-xl relative flex flex-col justify-between">
            
            {/* Quote Icon decorative badge */}
            <div className="absolute -top-6 left-8 bg-stone-900 text-white p-3 sketch-box shadow-md">
              <Quote size={24} />
            </div>

            <div className="pt-2">
              <div className="flex items-center gap-2 text-stone-400 font-mono-spaced text-xs tracking-wider uppercase mb-4">
                <Sparkles size={14} className="text-stone-900" />
                <span>Le Pitch Officiel</span>
              </div>

              <p className="font-sketch text-2xl md:text-[28px] text-stone-800 leading-relaxed">
                Après une énième journée à s'apitoyer sur son sort de chômeuse, seule et malheureuse, Summer Smith sort de son appartement miteux sous la pluie et ère sans réel but dans les rues de sa ville natale. Dans une ruelle déserte, la devanture atypique d’une librairie attire son attention. C’est alors qu’elle se retrouve aspirée dans une histoire sans fin initiée par un mystérieux individu qui lui a simplement ouvert une porte.
              </p>
            </div>

            {/* Meta tags at the bottom */}
            <div className="mt-10 pt-6 border-t-2 border-dashed border-stone-300 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono-spaced text-xs text-stone-600">
              <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
                <span className="font-bold text-stone-900 block uppercase mb-1">Genre :</span>
                <span>Comédie & Horreur Psychologique</span>
              </div>
              <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
                <span className="font-bold text-stone-900 block uppercase mb-1">Durée de l'attente :</span>
                <span>Faut regarder le film</span>
              </div>
            </div>

          </div>

          {/* Right Column: Poster Placeholder Frame with Watermark */}
          <div className="w-full lg:w-[380px] xl:w-[410px] shrink-0 flex flex-col items-center">
            <div className="w-full h-full bg-white border-[3.5px] border-stone-900 rounded-[28px] p-3.5 shadow-xl relative flex flex-col justify-between">
              
              {/* Poster Slot with Watermarks */}
              <div className="w-full aspect-[2/3] bg-[#faf9f5] rounded-[20px] border-2 border-dashed border-stone-800 relative overflow-hidden shadow-inner">
                <img src={posterImage} alt="Affiche officielle de La porte qu'on tient" className="absolute inset-0 h-full w-full object-cover" />
                
                {/* Diagonal watermark pattern in background */}
                <div className="absolute inset-0 hidden flex-col justify-around items-center opacity-10 pointer-events-none -rotate-25 scale-125 whitespace-nowrap font-mono-spaced text-xl font-bold uppercase tracking-widest text-stone-900">
                  <span>METTRE L'AFFICHE ICI • METTRE L'AFFICHE ICI</span>
                  <span>METTRE L'AFFICHE ICI • METTRE L'AFFICHE ICI</span>
                  <span>METTRE L'AFFICHE ICI • METTRE L'AFFICHE ICI</span>
                </div>

                {/* Central watermark card */}
                <div className="relative z-10 hidden bg-white border-2 border-stone-900 p-6 sketch-box shadow-md flex-col items-center text-center max-w-[280px]">
                  <div className="w-12 h-12 rounded-full bg-stone-100 border border-stone-800 flex items-center justify-center mb-3">
                    <ImageIcon size={24} className="text-stone-700" />
                  </div>
                  <span className="font-mono-spaced text-base md:text-lg font-bold uppercase tracking-wider text-stone-900">
                    Mettre l'affiche ici
                  </span>
                  <span className="font-mono-spaced text-xs text-stone-500 mt-2">
                    Format portrait (2:3)
                  </span>
                </div>

              </div>

              {/* Poster footer caption */}
              <div className="w-full mt-3 pt-2.5 px-1 border-t border-dashed border-stone-300 flex justify-between items-center font-mono-spaced text-[11px] text-stone-600">
                <span className="font-bold text-stone-900 uppercase flex items-center gap-1.5">
                  <Film size={13} />
                  Affiche Officielle
                </span>
                <span className="bg-stone-900 text-white text-[10px] px-2 py-0.5 rounded font-bold">
                  FORMAT 2:3
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
