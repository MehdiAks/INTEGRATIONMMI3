import React from 'react';
import InteractiveCharacter from './InteractiveCharacter';

export default function CastSection({ customCharacterUrl }) {
  const characters = [
    {
      name: "Jason SAMTAM",
      age: "55 ans",
      narrativeRole:
        "C'est le déclencheur de la quête. Il incarne le mystère initial, celui qui tient la poignée de la porte sans jamais forcer personne à la franchir.",
      relationshipTarget: "Summer Smith",
      relationship:
        "Paternaliste mais fuyant. Il ne répond jamais à une question par une certitude, poussant Summer Smith à affronter son propre vide existentiel.",
      quote:
        "“La pluie n'a rien d'un hasard, elle lave simplement les détails inutiles pour vous laisser voir le seuil. “",
      isInteractive: true,
    },
    {
      name: "Summer Smith",
      age: "31 ans",
      narrativeRole:
        "La voix de la méthode et de la frustration. Elle représente la tentative désespérée de rationaliser l'absurde avec des outils logiques.",
      relationshipTarget: "Jason SAMTAM",
      relationship:
        "Une alliance sous tension. Elle voit en Jason SAMTAM une variable neuve qui pourrait briser l'équation, mais s'agace vite de ses hésitations ou de son apathie.",
      quote:
        "« Tout système a une faille de conception. Même un cauchemar récursif. »",
      isInteractive: false,
    },
  ];

  return (
    <section id="casting" className="w-full py-24 px-6 paper-bg border-t-2 border-stone-900">
      <div className="max-w-4xl mx-auto">
        
        {/* Title */}
        <div className="text-center mb-14">
          <h2 className="font-mono-spaced text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
            Distribution
          </h2>
        </div>

        {/* Characters List */}
        <div className="space-y-12 md:space-y-16">
          {characters.map((char, index) => (
            <div key={index} className="flex flex-col items-center">
              
              {/* Character Card Row */}
              <div className="w-full flex flex-col md:flex-row gap-5 lg:gap-6 items-stretch">
                
                {/* Left: Portrait Frame */}
                <div className="w-full md:w-[260px] lg:w-[280px] shrink-0 min-h-[300px] md:min-h-0 border-[3.5px] border-stone-900 rounded-[28px] bg-white flex items-center justify-center p-4 relative overflow-hidden shadow-sm">
                  {char.isInteractive ? (
                    customCharacterUrl ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <InteractiveCharacter
                          characterUrl={customCharacterUrl}
                          alt={char.name}
                          className="w-full h-full max-h-[290px] object-contain"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center p-4 text-stone-400">
                        <span className="font-mono-spaced text-xs">Portrait Jason SAMTAM</span>
                      </div>
                    )
                  ) : (
                    /* Summer Smith Portrait Sketch */
                    <div className="w-full h-full flex flex-col items-center justify-center p-2 text-stone-800">
                      <svg
                        viewBox="0 0 200 240"
                        className="w-44 h-56 max-h-[260px] text-stone-900 stroke-current fill-none"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {/* Hair and silhouette */}
                        <path d="M70 75 C 65 40, 135 40, 130 75" />
                        <path d="M68 75 C 55 95, 60 130, 68 140" />
                        <path d="M132 75 C 145 95, 140 130, 132 140" />
                        <path d="M72 82 Q 100 86 128 82" strokeWidth="1.5" />
                        
                        {/* Face contour */}
                        <path d="M75 75 C 75 115, 88 135, 100 135 C 112 135, 125 115, 125 75" />
                        
                        {/* Eyes */}
                        <ellipse cx="88" cy="88" rx="4" ry="5" fill="#1c1917" stroke="none" />
                        <ellipse cx="112" cy="88" rx="4" ry="5" fill="#1c1917" stroke="none" />
                        
                        {/* Eyebrows */}
                        <path d="M82 80 Q 88 78 94 80" strokeWidth="2" />
                        <path d="M106 80 Q 112 78 118 80" strokeWidth="2" />
                        
                        {/* Nose and mouth */}
                        <path d="M100 89 L 98 98 L 102 99" strokeWidth="1.8" />
                        <path d="M94 112 Q 100 114 106 112" strokeWidth="2" />

                        {/* Neck & Trench coat / collar */}
                        <path d="M92 133 L 90 152" />
                        <path d="M108 133 L 110 152" />
                        <path d="M90 152 L 50 178 L 60 230" />
                        <path d="M110 152 L 150 178 L 140 230" />
                        <path d="M90 152 L 100 195 L 110 152" strokeWidth="2" />
                        <path d="M50 178 L 100 195 L 150 178" />
                        <circle cx="100" cy="210" r="2.5" fill="#1c1917" stroke="none" />

                        {/* Rain / subtle sketch texture */}
                        <line x1="30" y1="30" x2="20" y2="55" strokeDasharray="3 3" opacity="0.35" />
                        <line x1="170" y1="40" x2="160" y2="65" strokeDasharray="3 3" opacity="0.35" />
                        <line x1="180" y1="120" x2="170" y2="145" strokeDasharray="3 3" opacity="0.35" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Right: Info Column */}
                <div className="flex-1 flex flex-col justify-between gap-4">
                  
                  {/* Name Pill */}
                  <div className="w-full border-[3.5px] border-stone-900 rounded-full px-6 py-2.5 bg-white shadow-sm flex items-center">
                    <h3 className="font-mono-spaced text-2xl md:text-3xl font-bold text-stone-900 tracking-wide">
                      {char.name}
                    </h3>
                  </div>

                  {/* Details Card */}
                  <div className="w-full flex-1 border-[3.5px] border-stone-900 rounded-[28px] p-6 md:p-7 bg-white shadow-sm flex flex-col justify-center space-y-4">
                    <p className="font-mono-spaced text-sm md:text-[15px] text-stone-900 leading-relaxed">
                      <span className="font-bold">• Âge :</span> {char.age}
                    </p>
                    <p className="font-mono-spaced text-sm md:text-[15px] text-stone-900 leading-relaxed">
                      <span className="font-bold">• Fonction narrative :</span> {char.narrativeRole}
                    </p>
                    <p className="font-mono-spaced text-sm md:text-[15px] text-stone-900 leading-relaxed">
                      <span className="font-bold">• Rapport avec {char.relationshipTarget} :</span> {char.relationship}
                    </p>
                  </div>

                </div>

              </div>

              {/* Character Quote */}
              <p className="font-mono-spaced text-base md:text-lg text-stone-900 text-center font-normal mt-6 max-w-3xl px-4">
                {char.quote}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
