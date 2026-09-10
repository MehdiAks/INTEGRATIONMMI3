import React, { useState } from 'react';
import { Mail, Film, CheckCircle2, Ticket } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <footer className="w-full bg-stone-950 text-stone-100 py-20 px-6 border-t-4 border-stone-100">
      <div className="max-w-5xl mx-auto">
        
        {/* Release Date Banner */}
        <div className="bg-stone-900 border-2 border-stone-100 p-8 md:p-12 sketch-box-lg text-center mb-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-32 h-32 bg-white/5 rounded-full pointer-events-none" />

          <span className="font-mono-spaced text-xs tracking-widest uppercase text-stone-400">
            PROCHAINEMENT AU CINÉMA
          </span>

          <h2 className="font-sketch text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-2 mb-4">
            « La porte qu'on tient »
          </h2>

          <p className="font-sketch text-lg md:text-xl text-stone-300 italic max-w-xl mx-auto">
            (Date de sortie estimée : Dès qu'il aura parcouru les 80 derniers mètres)
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button className="flex items-center gap-2 bg-white text-stone-950 font-mono-spaced text-xs font-bold px-6 py-3 sketch-box hover:bg-stone-200 transition-colors cursor-pointer">
              <Ticket size={16} />
              RÉSERVER MA PLACE À L'AVANCE
            </button>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="max-w-xl mx-auto text-center mb-16">
          <h3 className="font-sketch text-3xl font-bold text-white mb-2">
            Alerte d'Arrivée
          </h3>
          <p className="font-mono-spaced text-xs text-stone-400 mb-6">
            Inscrivez-vous pour être prévenu au moment exact où la personne franchira le pas de la porte.
          </p>

          {submitted ? (
            <div className="bg-stone-800 border border-stone-600 p-4 sketch-box flex items-center justify-center gap-2 text-stone-200 font-mono-spaced text-xs">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>Inscrit ! Nous vous préviendrons au premier signe d'accélération.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="Votre adresse email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-stone-900 border-2 border-stone-700 sketch-box px-4 py-3 font-mono-spaced text-xs text-white placeholder-stone-500 focus:outline-none focus:border-white"
              />
              <button
                type="submit"
                className="bg-white text-stone-950 font-mono-spaced text-xs font-bold px-6 py-3 sketch-box hover:bg-stone-200 transition-colors cursor-pointer"
              >
                M'INFORMER
              </button>
            </form>
          )}
        </div>

        {/* Footer Credits */}
        <div className="pt-12 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-6 font-mono-spaced text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <Film size={16} className="text-white" />
            <span className="text-stone-300 font-bold">LA PORTE QU'ON TIENT</span>
            <span>— Site Officiel</span>
          </div>

          <div className="text-center md:text-right text-[11px] text-stone-500 space-y-1">
            <p>Un film produit en noir & blanc et grands espaces.</p>
            <p>© 2026 Tous droits réservés. Aucune porte n'a été blessée pendant le tournage.</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
