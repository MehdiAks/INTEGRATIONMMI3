import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Volume2, VolumeX } from 'lucide-react';
import piCorpsImg from '../assets/pi_corps.png';
import InteractiveCharacter from './InteractiveCharacter';

gsap.registerPlugin(ScrollTrigger);

// Door dimensions (px)
const DOOR_W = 200;
const DOOR_H = 440;

export default function HandDrawnDoorHero({ customCharacterUrl, onDoorOpened }) {
  const heroRef = useRef(null);
  const sceneRef = useRef(null);
  const doorLeafRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=1600',
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            if (self.progress > 0.94 && onDoorOpened) onDoorOpened();
          },
        },
      });

      // 1. Door swings open — flipped, so hinge is on right, opens left
      tl.to(doorLeafRef.current, {
        rotateY: 110,
        transformOrigin: 'right center',
        ease: 'power2.inOut',
        duration: 0.45,
      }, 0);

      // 2. Zoom into door opening.
      //    Door is absolutely centered → its center = 50% 50% of sceneRef.
      tl.to(sceneRef.current, {
        scale: 20,
        transformOrigin: '50% 50%',
        ease: 'power3.in',
        duration: 0.6,
      }, 0.38);

      // 3. Fade out
      tl.to(sceneRef.current, {
        opacity: 0,
        duration: 0.15,
        ease: 'none',
      }, 0.85);

    }, heroRef);

    return () => ctx.revert();
  }, [onDoorOpened]);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden paper-bg select-none"
    >
      {/* Top Bar */}
      <div className="absolute top-6 left-8 right-8 z-30 flex justify-between items-center font-mono-spaced text-xs tracking-widest uppercase">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-stone-900 animate-ping" />
          <span className="font-bold text-sm tracking-tight">LA PORTE QU'ON TIENT</span>
          <span className="hidden md:inline text-stone-400">|</span>
          <span className="hidden md:inline text-stone-500 italic font-sketch text-base">Un film de l'attente infinie</span>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="flex items-center gap-2 hover:opacity-75 transition-opacity sketch-box px-3 py-1 bg-white/80 cursor-pointer"
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            <span className="text-[11px]">{isMuted ? 'SON : COUPÉ' : 'SON : ACTIF'}</span>
          </button>
        </div>
      </div>

      {/* Floor lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-0" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="68%" x2="100%" y2="68%" stroke="#111" strokeWidth="1.5" strokeDasharray="6 4" />
        <line x1="5%" y1="100%" x2="48%" y2="68%" stroke="#111" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="25%" y1="100%" x2="50%" y2="68%" stroke="#111" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="75%" y1="100%" x2="52%" y2="68%" stroke="#111" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="95%" y1="100%" x2="54%" y2="68%" stroke="#111" strokeWidth="1" strokeDasharray="3 3" />
      </svg>

      {/* ── SCENE — zooms on scroll ── */}
      <div
        ref={sceneRef}
        className="absolute inset-0 z-10"
      >

        {/* ── DOOR ── always exactly centered on the page ── */}
        <div
          className="absolute"
          style={{
            width: `${DOOR_W}px`,
            height: `${DOOR_H}px`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            perspective: '900px',
            zIndex: 2,
          }}
        >
          {/* Dark void (visible when door opens) */}
          <div className="absolute inset-0 bg-stone-900 overflow-hidden rounded-t-sm" style={{ zIndex: 0 }}>
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/5" />
          </div>

          {/* DOOR LEAF — rotates open */}
          <div
            ref={doorLeafRef}
            className="absolute inset-0 bg-white border-4 border-stone-900 rounded-t-sm flex flex-col justify-between p-4"
            style={{ zIndex: 2 }}
          >
            <div className="w-full h-full border-2 border-stone-800 rounded flex flex-col justify-between p-2 bg-[#faf9f5]">
              <div className="w-full h-[44%] border-2 border-stone-800 rounded flex items-center justify-center">
                <div className="w-full h-full border border-dashed border-stone-400 m-1" />
              </div>
              <div className="w-full h-[44%] border-2 border-stone-800 rounded flex items-center justify-center">
                <div className="w-full h-full border border-dashed border-stone-400 m-1" />
              </div>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <div className="w-3.5 h-7 bg-stone-900 rounded-sm" />
                <div className="w-6 h-2 bg-stone-900 rounded-r-md" />
              </div>
            </div>
          </div>

          {/* DOOR FRAME — fixed on top */}
          <div className="absolute inset-0 border-4 border-stone-900 rounded-t-sm pointer-events-none" style={{ zIndex: 3 }} />
        </div>

        {/* ── CHARACTER ──
             Door left edge = 50% - (DOOR_W/2)px = 50% - 100px from left of viewport.
             Character right edge overlaps door left edge by 20px:
               right edge at = 50% - 100px + 20px = 50% - 80px from left
                              = 50% + 80px from right
             Bottom of character = bottom of door:
               door bottom = 50% + (DOOR_H/2)px from top = 50% - (DOOR_H/2)px from bottom
                           = 50% - 220px from bottom
        */}
        <div
          className="absolute"
          style={{
            right: `calc(50% + ${DOOR_W / 2 - 20}px)`,
            bottom: `calc(50% - ${DOOR_H / 2 + 60}px)`,
            zIndex: 1,
          }}
        >
          <InteractiveCharacter
            characterUrl={customCharacterUrl || piCorpsImg}
            alt="L'Homme à la porte"
            className="h-[65vh] w-auto object-contain select-none pointer-events-none"
          />
        </div>

      </div>
    </section>
  );
}
