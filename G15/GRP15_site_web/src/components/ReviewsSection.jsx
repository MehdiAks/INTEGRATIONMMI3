import React from 'react';
import { Star, StarHalf, MessageSquareQuote, Newspaper, Award } from 'lucide-react';

export default function ReviewsSection() {
  const reviews = [
    {
      source: "Cahiers du Cinéma",
      category: "Presse Spécialisée",
      ratingLabel: "Note : 4/5",
      stars: 4,
      quote:
        "En transformant la déambulation morose d'une jeunesse précaire en labyrinthe borgesien, le cinéaste réussit un geste formel audacieux. La boutique n'est pas un simple décor fantastique, mais le cœur battant d'une réflexion vertigineuse sur la matière filmique elle-même : chaque porte ouverte est un montage qui refuse de clore la coupe. Une proposition rare dans le paysage hexagonal contemporain.",
      badge: "Coup de Cœur",
    },
    {
      source: "Mad Movies",
      category: "Cinéma de Genre",
      ratingLabel: "Note : 4/5",
      stars: 4,
      quote:
        "Loin des timides incursions françaises habituelles dans le genre, ce récit sans issue assume pleinement son héritage kafkaïen et son angoisse métaphysique. La mise en scène distille un sentiment de claustrophobie à ciel ouvert particulièrement soigné. Un coup d'essai atmosphérique et maîtrisé qui installe immédiatement une voix singulière.",
      badge: "Sélection Genre",
    },
    {
      source: "Écran Large",
      category: "Critique Cinéma",
      ratingLabel: "Note : 3,5/5",
      stars: 3.5,
      quote:
        "Un premier long-métrage intrigant et généreux. Si la structure narrative en boucle menace parfois de faire du surplace au milieu du deuxième acte, la galerie de personnages (mention spéciale à la composition inquiétante de Jason Samtam) et le travail remarquable sur le son et la lumière pluvieuse emportent l'adhésion. Une énigme sensorielle qui ose aller au bout de son concept.",
      badge: "À Découvrir",
    },
    {
      source: "Télérama",
      category: "Presse Culturelle",
      ratingLabel: "Note : TTT (Très Bien)",
      specialBadge: "TTT",
      quote:
        "Parti d'un spleen social d'une grande justesse — la pluie battante, la solitude du déclassement —, le scénario bascule avec une belle élégance dans un conte fantastique mélancolique. Porté par des comédiens aux partitions affûtées et un sens aiguisé du cadre, le film ausculte la peur de l'inertie existentielle avec autant de finesse que de mystère.",
      badge: "Recommandé",
    },
    {
      source: "SensCritique",
      category: "Communauté & Public",
      ratingLabel: "Note moyenne : 7,2/10",
      specialScore: "7.2 / 10",
      topReviewLabel: "Top critique utilisateur (8/10)",
      quote:
        "Un croisement inattendu entre The Twilight Zone et la grisaille urbaine française. L'ambiance sonore est hallucinante et les personnages évitent presque tous les clichés du genre. Quelques longueurs dans les monologues d'Arthur Logan, mais l'expérience reste scotchante jusqu'au plan final.",
      badge: "Avis Public",
    },
  ];

  const renderStars = (count) => {
    const fullStars = Math.floor(count);
    const hasHalf = count % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    return (
      <div className="flex items-center gap-0.5 text-stone-900">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={16} className="fill-stone-900" />
        ))}
        {hasHalf && <StarHalf size={16} className="fill-stone-900" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={16} className="text-stone-300" />
        ))}
      </div>
    );
  };

  return (
    <section id="critiques" className="w-full py-28 px-6 paper-bg border-t-2 border-stone-900">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 font-mono-spaced text-xs tracking-widest uppercase bg-stone-900 text-white px-3.5 py-1.5 sketch-box mb-4 shadow-sm">
            <Newspaper size={14} />
            <span>REVUE DE PRESSE & CRITIQUES</span>
          </div>
          <h2 className="font-mono-spaced text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
            La Réception Critique
          </h2>
          <p className="font-sketch text-2xl md:text-3xl text-stone-600 mt-2">
            « Une énigme sensorielle et métaphysique saluée par la presse »
          </p>

          {/* Quick Stats Banner */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 bg-white border-[2.5px] border-stone-900 sketch-box px-6 py-3 shadow-sm font-mono-spaced text-xs">
            <div className="flex items-center gap-2">
              <Award size={16} className="text-stone-900" />
              <span className="font-bold text-stone-900">Moyenne Presse :</span>
              <span className="bg-stone-900 text-white px-2 py-0.5 rounded text-[11px] font-bold">3.9 / 5</span>
            </div>
            <div className="hidden sm:block text-stone-300">|</div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-900">Moyenne Public :</span>
              <span className="bg-stone-900 text-white px-2 py-0.5 rounded text-[11px] font-bold">7.2 / 10</span>
            </div>
            <div className="hidden sm:block text-stone-300">|</div>
            <div className="text-stone-600 italic">
              100% Tension & Huis Clos
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          
          {/* 1. Cahiers du Cinéma */}
          <div className="bg-white border-[3.5px] border-stone-900 rounded-[28px] p-7 md:p-8 shadow-md relative flex flex-col justify-between hover:-translate-y-1 transition-transform duration-200">
            <div>
              <div className="flex justify-between items-start gap-4 mb-4 pb-4 border-b-2 border-dashed border-stone-200">
                <div>
                  <span className="font-mono-spaced text-[11px] uppercase tracking-wider text-stone-500 block mb-1">
                    {reviews[0].category}
                  </span>
                  <h3 className="font-mono-spaced text-2xl font-bold text-stone-900 tracking-tight">
                    {reviews[0].source}
                  </h3>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {renderStars(reviews[0].stars)}
                  <span className="font-mono-spaced text-xs font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded border border-stone-300">
                    {reviews[0].ratingLabel}
                  </span>
                </div>
              </div>

              <p className="font-mono-spaced text-sm md:text-[15px] text-stone-800 leading-relaxed italic">
                « {reviews[0].quote} »
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 flex justify-between items-center font-mono-spaced text-xs text-stone-500">
              <span className="bg-stone-900 text-white text-[10px] uppercase tracking-widest px-2.5 py-0.5 sketch-box font-bold">
                {reviews[0].badge}
              </span>
              <MessageSquareQuote size={20} className="text-stone-400" />
            </div>
          </div>

          {/* 2. Mad Movies */}
          <div className="bg-white border-[3.5px] border-stone-900 rounded-[28px] p-7 md:p-8 shadow-md relative flex flex-col justify-between hover:-translate-y-1 transition-transform duration-200">
            <div>
              <div className="flex justify-between items-start gap-4 mb-4 pb-4 border-b-2 border-dashed border-stone-200">
                <div>
                  <span className="font-mono-spaced text-[11px] uppercase tracking-wider text-stone-500 block mb-1">
                    {reviews[1].category}
                  </span>
                  <h3 className="font-mono-spaced text-2xl font-bold text-stone-900 tracking-tight">
                    {reviews[1].source}
                  </h3>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {renderStars(reviews[1].stars)}
                  <span className="font-mono-spaced text-xs font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded border border-stone-300">
                    {reviews[1].ratingLabel}
                  </span>
                </div>
              </div>

              <p className="font-mono-spaced text-sm md:text-[15px] text-stone-800 leading-relaxed italic">
                « {reviews[1].quote} »
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 flex justify-between items-center font-mono-spaced text-xs text-stone-500">
              <span className="bg-stone-900 text-white text-[10px] uppercase tracking-widest px-2.5 py-0.5 sketch-box font-bold">
                {reviews[1].badge}
              </span>
              <MessageSquareQuote size={20} className="text-stone-400" />
            </div>
          </div>

          {/* 3. Écran Large */}
          <div className="bg-white border-[3.5px] border-stone-900 rounded-[28px] p-7 md:p-8 shadow-md relative flex flex-col justify-between hover:-translate-y-1 transition-transform duration-200">
            <div>
              <div className="flex justify-between items-start gap-4 mb-4 pb-4 border-b-2 border-dashed border-stone-200">
                <div>
                  <span className="font-mono-spaced text-[11px] uppercase tracking-wider text-stone-500 block mb-1">
                    {reviews[2].category}
                  </span>
                  <h3 className="font-mono-spaced text-2xl font-bold text-stone-900 tracking-tight">
                    {reviews[2].source}
                  </h3>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {renderStars(reviews[2].stars)}
                  <span className="font-mono-spaced text-xs font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded border border-stone-300">
                    {reviews[2].ratingLabel}
                  </span>
                </div>
              </div>

              <p className="font-mono-spaced text-sm md:text-[15px] text-stone-800 leading-relaxed italic">
                « {reviews[2].quote} »
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 flex justify-between items-center font-mono-spaced text-xs text-stone-500">
              <span className="bg-stone-900 text-white text-[10px] uppercase tracking-widest px-2.5 py-0.5 sketch-box font-bold">
                {reviews[2].badge}
              </span>
              <MessageSquareQuote size={20} className="text-stone-400" />
            </div>
          </div>

          {/* 4. Télérama */}
          <div className="bg-white border-[3.5px] border-stone-900 rounded-[28px] p-7 md:p-8 shadow-md relative flex flex-col justify-between hover:-translate-y-1 transition-transform duration-200">
            <div>
              <div className="flex justify-between items-start gap-4 mb-4 pb-4 border-b-2 border-dashed border-stone-200">
                <div>
                  <span className="font-mono-spaced text-[11px] uppercase tracking-wider text-stone-500 block mb-1">
                    {reviews[3].category}
                  </span>
                  <h3 className="font-mono-spaced text-2xl font-bold text-stone-900 tracking-tight">
                    {reviews[3].source}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono-spaced text-sm font-extrabold bg-stone-900 text-white px-2.5 py-1 sketch-box tracking-widest">
                    TTT
                  </span>
                  <span className="font-mono-spaced text-xs font-bold text-stone-600">
                    Très Bien
                  </span>
                </div>
              </div>

              <p className="font-mono-spaced text-sm md:text-[15px] text-stone-800 leading-relaxed italic">
                « {reviews[3].quote} »
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 flex justify-between items-center font-mono-spaced text-xs text-stone-500">
              <span className="bg-stone-900 text-white text-[10px] uppercase tracking-widest px-2.5 py-0.5 sketch-box font-bold">
                {reviews[3].badge}
              </span>
              <MessageSquareQuote size={20} className="text-stone-400" />
            </div>
          </div>

          {/* 5. SensCritique — full width card to anchor the grid */}
          <div className="md:col-span-2 bg-white border-[3.5px] border-stone-900 rounded-[28px] p-7 md:p-8 shadow-md relative flex flex-col justify-between hover:-translate-y-1 transition-transform duration-200">
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4 pb-4 border-b-2 border-dashed border-stone-200">
                <div>
                  <span className="font-mono-spaced text-[11px] uppercase tracking-wider text-stone-500 block mb-1">
                    {reviews[4].category}
                  </span>
                  <h3 className="font-mono-spaced text-2xl font-bold text-stone-900 tracking-tight">
                    {reviews[4].source}
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="bg-stone-900 text-white px-3 py-1 sketch-box font-mono-spaced text-xs font-bold">
                    Note moyenne : 7,2 / 10
                  </div>
                  <span className="font-mono-spaced text-xs text-stone-600 bg-stone-100 px-2.5 py-1 rounded border border-stone-300">
                    {reviews[4].topReviewLabel}
                  </span>
                </div>
              </div>

              <p className="font-mono-spaced text-sm md:text-[15px] text-stone-800 leading-relaxed italic">
                « {reviews[4].quote} »
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 flex justify-between items-center font-mono-spaced text-xs text-stone-500">
              <span className="bg-stone-900 text-white text-[10px] uppercase tracking-widest px-2.5 py-0.5 sketch-box font-bold">
                {reviews[4].badge}
              </span>
              <span className="text-xs text-stone-500 italic font-mono-spaced">
                Avis vérifié communauté cinéma
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
