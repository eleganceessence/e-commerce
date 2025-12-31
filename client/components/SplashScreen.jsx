"use client";


import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useState, useRef, useEffect } from "react";

export default function SplashScreen() {
  const [hide, setHide] = useState(false);
  const [particles, setParticles] = useState([]);

  const containerRef = useRef(null);
  const brandRef = useRef(null);
  const subBrandRef = useRef(null);
  const taglineRef = useRef(null);
  const flameRingRef = useRef(null);

  // Responsive particle generation
  useEffect(() => {
    const count = window.innerWidth < 640 ? 25 : 50;

    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 1,
      opacity: Math.random() * 0.5 + 0.3,
    }));

    setParticles(generated);
  }, []);

  useGSAP(
    (context) => {
      // Guard clause to prevent animation from running before particles are generated
      if (particles.length === 0) {
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => setTimeout(() => setHide(true), 400),
      });

      gsap.set(brandRef.current, {
        scale: 0.3,
        opacity: 0,
        y: 100,
        rotationX: -90,
        transformPerspective: 1000,
      });

      gsap.set(subBrandRef.current, {
        scale: 0.3,
        opacity: 0,
        y: 80,
        rotationX: 90,
        transformPerspective: 1000,
      });

      gsap.set(taglineRef.current, { opacity: 0, y: 30, scale: 0.8 });
      gsap.set(flameRingRef.current, { scale: 0, opacity: 0, rotation: -180 });
      gsap.set(".particle", { opacity: 0, scale: 0 });
      gsap.set(".letter", { opacity: 0, y: 50, rotationX: -90 });

      tl.to(flameRingRef.current, {
        scale: 1,
        opacity: 0.6,
        rotation: 0,
        duration: 1.5,
        ease: "power2.out",
      })
        .to(
          ".particle",
          {
            opacity: 0.7,
            scale: 1,
            stagger: { each: 0.03, from: "random" },
            duration: 1.2,
          },
          "-=1"
        )
        .to(
          brandRef.current,
          {
            scale: 1,
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1.4,
          },
          "-=0.8"
        )
        .to(
          subBrandRef.current,
          {
            scale: 1,
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1.2,
          },
          "-=1"
        )
        .to(
          ".letter",
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            stagger: 0.05,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.8"
        )
        .to(taglineRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
        })
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
        });

      context.add(() => {
        gsap.to(".particle", {
          x: "random(-20,20)",
          y: "random(-20,20)",
          repeat: -1,
          yoyo: true,
          duration: "random(2,4)",
          ease: "sine.inOut",
        });
      });
    },
    { scope: containerRef, dependencies: [particles], revertOnUpdate: true }
  );

  if (hide) return null;

  const blaze = "BLAZE".split("");
  const exiliar = "EXILIAR".split("");

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, #1a0a0a 0%, #0a0000 100%)",
      }}
    >
      {/* Flame Ring */}
      <div
        ref={flameRingRef}
        className="absolute rounded-full blur-sm"
        style={{
          width: "min(90vw, 600px)",
          height: "min(90vw, 600px)",
          background:
            "radial-gradient(circle, transparent 40%, rgba(255,69,0,.2) 60%, transparent 70%)",
          boxShadow: "0 0 100px rgba(255,69,0,.5)",
        }}
      />

      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: "orange",
            opacity: p.opacity,
            boxShadow: "0 0 10px orange",
          }}
        />
      ))}

      {/* Text */}
      <div className="relative z-10 text-center px-4">
        <h1
          ref={brandRef}
          className="flex justify-center font-bold"
          style={{
            fontSize: "clamp(2.5rem, 8vw, 6rem)",
            letterSpacing: "0.2em",
          }}
        >
          {blaze.map((letter, i) => (
            <span
              key={i}
              className="letter"
              style={{
                color: "transparent",
                WebkitTextStroke: "2px orange",
                textShadow: "0 0 20px rgba(255,69,0,0.8)",
              }}
            >
              {letter}
            </span>
          ))}
        </h1>

        <h2
          ref={subBrandRef}
          className="flex justify-center font-light mt-4"
          style={{
            fontSize: "clamp(1.8rem, 6vw, 4rem)",
            letterSpacing: "0.25em",
          }}
        >
          {exiliar.map((letter, i) => (
            <span
              key={i}
              className="letter"
              style={{
                color: "white",
                textShadow: "0 0 15px rgba(255,255,255,0.5)",
              }}
            >
              {letter}
            </span>
          ))}
        </h2>

        <p
          ref={taglineRef}
          className="text-orange-300 uppercase mt-6"
          style={{
            fontSize: "clamp(0.65rem, 2vw, 0.9rem)",
            letterSpacing: "0.35em",
          }}
        >
          Ignite Your Essence
        </p>
      </div>
    </div>
  );
}
