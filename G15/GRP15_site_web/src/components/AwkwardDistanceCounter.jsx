import React, { useState } from 'react';
import { Timer, Footprints, AlertCircle, Smile, RefreshCw } from 'lucide-react';

export default function AwkwardDistanceCounter() {
  const [holdingTime, setHoldingTime] = useState(14); // seconds
  const [distance, setDistance] = useState(87); // meters
  const [embarrassmentLevel, setEmbarrassmentLevel] = useState(78); // percentage
  const [actionLog, setActionLog] = useState([
    "00:02 — Vous apercevez la personne au loin.",
    "00:05 — Vous bloquez la porte avec votre pied.",
    "00:08 — Vous faites un petit sourire poli.",
    "00:12 — La personne n'accélère pas son pas.",
  ]);

  const handleAction = (actionText, distDelta, embarrassDelta) => {
    setHoldingTime(prev => prev + 5);
    setDistance(prev => Math.max(5, prev - distDelta));
    setEmbarrassmentLevel(prev => Math.min(100, prev + embarrassDelta));
    const newLogTime = `00:${holdingTime + 5 < 10 ? '0' : ''}${holdingTime + 5}`;
    setActionLog(prev => [`${newLogTime} — ${actionText}`, ...prev.slice(0, 4)]);
  };

  return (
    <section className="w-full py-20 px-6 paper-bg border-t-2 border-b-2 border-stone-900">
      <div className="max-w-4xl mx-auto">

        {/* Title */}
        <div className="text-center mb-12">
          <span className="font-mono-spaced text-xs tracking-widest uppercase bg-stone-900 text-white px-3 py-1 sketch-box">
            SIMULATEUR DE MALAISE INTERACTIF
          </span>
          <h3 className="font-sketch text-4xl md:text-5xl font-bold mt-4 text-stone-900">
            Combien de temps tiendriez-vous la porte ?
          </h3>
          <p className="font-mono-spaced text-sm text-stone-600 mt-2">
            Testez vos réflexes de politesse face au vide interminable.
          </p>
        </div>

        {/* Dashboard grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {/* Stat 1: Time */}
          <div className="bg-white p-6 border-2 border-stone-900 sketch-box flex flex-col items-center justify-center text-center shadow-sm">
            <Timer size={28} className="text-stone-800 mb-2" />
            <span className="font-mono-spaced text-xs text-stone-500 uppercase">Temps écoulé</span>
            <span className="font-sketch text-5xl font-bold text-stone-900 mt-1">
              00:{holdingTime < 10 ? `0${holdingTime}` : holdingTime}
            </span>
            <span className="font-mono-spaced text-[11px] text-stone-400 mt-1">Secondes d'attente</span>
          </div>

          {/* Stat 2: Distance */}
          <div className="bg-white p-6 border-2 border-stone-900 sketch-box flex flex-col items-center justify-center text-center shadow-sm">
            <Footprints size={28} className="text-stone-800 mb-2" />
            <span className="font-mono-spaced text-xs text-stone-500 uppercase">Distance restante</span>
            <span className="font-sketch text-5xl font-bold text-stone-900 mt-1">
              {distance}m
            </span>
            <span className="font-mono-spaced text-[11px] text-stone-400 mt-1">Vitesse : 0.4 km/h</span>
          </div>

          {/* Stat 3: Embarrassment */}
          <div className="bg-white p-6 border-2 border-stone-900 sketch-box flex flex-col items-center justify-center text-center shadow-sm">
            <AlertCircle size={28} className="text-stone-800 mb-2" />
            <span className="font-mono-spaced text-xs text-stone-500 uppercase">Niveau de gêne</span>
            <span className="font-sketch text-5xl font-bold text-stone-900 mt-1">
              {embarrassmentLevel}%
            </span>
            <div className="w-full bg-stone-200 h-2 rounded-full mt-2 overflow-hidden border border-stone-800">
              <div
                className="bg-stone-900 h-full transition-all duration-300"
                style={{ width: `${embarrassmentLevel}%` }}
              />
            </div>
          </div>

        </div>

        {/* Interactive Choice Buttons */}
        <div className="bg-white p-8 border-2 border-stone-900 sketch-box-lg shadow-md mb-8">
          <h4 className="font-sketch text-2xl font-bold text-stone-900 mb-4">
            Que faites-vous maintenant ?
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => handleAction("Vous faites un petit signe de la main forcé.", 6, 8)}
              className="p-4 border-2 border-stone-900 sketch-box text-left font-mono-spaced text-xs hover:bg-stone-100 transition-colors cursor-pointer flex items-center justify-between"
            >
              <span>1. Faire un petit signe de la main gêné</span>
              <span className="font-sketch text-lg text-stone-600">+8% Gêne</span>
            </button>

            <button
              onClick={() => handleAction("Vous regardez soudainement votre téléphone portable.", 4, 12)}
              className="p-4 border-2 border-stone-900 sketch-box text-left font-mono-spaced text-xs hover:bg-stone-100 transition-colors cursor-pointer flex items-center justify-between"
            >
              <span>2. Pretendre regarder son téléphone</span>
              <span className="font-sketch text-lg text-stone-600">+12% Gêne</span>
            </button>

            <button
              onClick={() => handleAction("Vous criez « Prenez votre temps ! » mais le vent emporte votre voix.", 8, 15)}
              className="p-4 border-2 border-stone-900 sketch-box text-left font-mono-spaced text-xs hover:bg-stone-100 transition-colors cursor-pointer flex items-center justify-between"
            >
              <span>3. Crier « Prenez votre temps ! »</span>
              <span className="font-sketch text-lg text-stone-600">+67% Gêne</span>
            </button>

            <button
              onClick={() => handleAction("Vous tentez de lâcher la porte, mais il vous a vu.", 2, 20)}
              className="p-4 border-2 border-stone-900 sketch-box text-left font-mono-spaced text-xs hover:bg-stone-100 transition-colors cursor-pointer flex items-center justify-between"
            >
              <span>4. Tenter un lâcher de porte discret</span>
              <span className="font-sketch text-lg text-stone-600">+20% Gêne</span>
            </button>
          </div>
        </div>

        {/* Live Action Log */}
        <div className="bg-stone-100 p-6 border-2 border-stone-900 sketch-box font-mono-spaced text-xs">
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold text-stone-900 uppercase">Journal des événements :</span>
            <button
              onClick={() => {
                setHoldingTime(14);
                setDistance(87);
                setEmbarrassmentLevel(78);
                setActionLog(["00:02 — Vous apercevez la personne au loin."]);
              }}
              className="flex items-center gap-1 text-[11px] text-stone-600 hover:text-stone-900 cursor-pointer"
            >
              <RefreshCw size={12} /> Réinitialiser
            </button>
          </div>
          <ul className="space-y-2 text-stone-700">
            {actionLog.map((log, index) => (
              <li key={index} className={index === 0 ? "font-bold text-stone-900" : ""}>
                {log}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
