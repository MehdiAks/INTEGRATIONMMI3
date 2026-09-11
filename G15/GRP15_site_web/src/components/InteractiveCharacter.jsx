import React, { useEffect, useRef, useState } from 'react';
const piCorpsImg = window.GroupMedia.root + 'assets/images/pi_corps.png';

export default function InteractiveCharacter({ 
  characterUrl = piCorpsImg, 
  className = "h-[340px] sm:h-[380px] md:h-[440px] w-auto object-contain filter drop-shadow-md",
  alt = "L'Homme à la porte" 
}) {
  const svgRef = useRef(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  
  // Refs for smooth animation interpolation
  const targetOffset = useRef({ x: 0, y: 0 });
  const currentOffset = useRef({ x: 0, y: 0 });
  const animFrameId = useRef(null);

  // Mouse tracking across the entire window
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      // Center between the two eyes in SVG coordinates (viewBox 5197 x 7252)
      // Left eye is at 3570, Right eye is at 3850 => Midpoint is 3710, y is 840
      const eyeScreenX = rect.left + rect.width * (3710 / 5197);
      const eyeScreenY = rect.top + rect.height * (840 / 7252);

      const dx = e.clientX - eyeScreenX;
      const dy = e.clientY - eyeScreenY;
      const angle = Math.atan2(dy, dx);
      const dist = Math.hypot(dx, dy);

      // Max travel inside the white circles:
      // White radius is 80, Pupil radius is 30 -> max physical travel is 80 - 30 = 50.
      // Set to 44 so the pupil never reaches or spills past the outer edge of the white circle.
      const maxTravel = 44;

      // Smooth distance factor as cursor moves away
      const factor = Math.min(1, Math.max(0.12, dist / 220));

      targetOffset.current = {
        x: Math.cos(angle) * maxTravel * factor,
        y: Math.sin(angle) * maxTravel * factor,
      };
    };

    const handleMouseLeave = () => {
      // Look subtly towards the door when cursor leaves
      targetOffset.current = { x: 18, y: 8 };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth animation loop (lerp)
    const animate = () => {
      const lerpFactor = 0.15;
      currentOffset.current.x += (targetOffset.current.x - currentOffset.current.x) * lerpFactor;
      currentOffset.current.y += (targetOffset.current.y - currentOffset.current.y) * lerpFactor;

      setEyeOffset({
        x: Math.round(currentOffset.current.x * 100) / 100,
        y: Math.round(currentOffset.current.y * 100) / 100,
      });

      animFrameId.current = requestAnimationFrame(animate);
    };

    animFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  return (
    <div className="relative inline-block select-none">
      {/* Base Character Body */}
      <img 
        src={characterUrl} 
        alt={alt} 
        className={`${className} select-none pointer-events-none`}
      />

      {/* Two Eyes Overlay without black outline */}
      <svg 
        ref={svgRef}
        viewBox="0 0 5197 7252" 
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="left-eye-clip">
            <circle cx="3570" cy="840" r="80" />
          </clipPath>
          <clipPath id="right-eye-clip">
            <circle cx="3850" cy="840" r="80" />
          </clipPath>
        </defs>

        {/* Oeil gauche : rond blanc sans contour */}
        <circle 
          cx="3570" 
          cy="840" 
          r="80" 
          fill="white" 
        />

        {/* Pupille oeil gauche : confinée avec sécurité clipPath */}
        <g clipPath="url(#left-eye-clip)">
          <circle 
            cx={3570 + eyeOffset.x} 
            cy={840 + eyeOffset.y} 
            r="30" 
            fill="#111111" 
          />
        </g>

        {/* Oeil droit : rond blanc sans contour */}
        <circle 
          cx="3850" 
          cy="840" 
          r="80" 
          fill="white" 
        />

        {/* Pupille oeil droit : confinée avec sécurité clipPath */}
        <g clipPath="url(#right-eye-clip)">
          <circle 
            cx={3850 + eyeOffset.x} 
            cy={840 + eyeOffset.y} 
            r="30" 
            fill="#111111" 
          />
        </g>
      </svg>
    </div>
  );
}
