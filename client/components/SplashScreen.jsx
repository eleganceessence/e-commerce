"use client"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useState, useRef, useEffect } from "react";

gsap.registerPlugin(useGSAP);

export default function SplashScreen() {
    const [hide, setHide] = useState(false);
    const containerRef = useRef(null);
    const brandRef = useRef(null);
    const subBrandRef = useRef(null);
    const taglineRef = useRef(null);
    const flameRingRef = useRef(null);
    const particlesRef = useRef([]);

    // Create enhanced particle elements with more variety
    useEffect(() => {
        const particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 6 + 1,
                duration: Math.random() * 3 + 2,
                delay: Math.random() * 2,
                opacity: Math.random() * 0.5 + 0.3
            });
        }
        particlesRef.current = particles;
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => setTimeout(() => setHide(true), 400)
        });

        // Set initial states
        gsap.set(brandRef.current, {
            scale: 0.3,
            opacity: 0,
            y: 100,
            rotationX: -90,
            transformOrigin: "center center",
            transformPerspective: 1000
        });

        gsap.set(subBrandRef.current, {
            scale: 0.3,
            opacity: 0,
            y: 80,
            rotationX: 90,
            transformOrigin: "center center",
            transformPerspective: 1000
        });

        gsap.set(taglineRef.current, {
            opacity: 0,
            y: 30,
            scale: 0.8
        });

        gsap.set(flameRingRef.current, {
            scale: 0,
            opacity: 0,
            rotation: -180
        });

        gsap.set('.particle', {
            opacity: 0,
            scale: 0
        });

        gsap.set('.letter', {
            opacity: 0,
            y: 50,
            rotationX: -90
        });

        // Animation sequence
        tl
            // Flame ring appears
            .to(flameRingRef.current, {
                scale: 1,
                opacity: 0.6,
                rotation: 0,
                duration: 1.5,
                ease: "power2.out"
            })
            // Particles burst in
            .to('.particle', {
                opacity: (i, target) => parseFloat(target.style.getPropertyValue('--particle-opacity') || 0.6),
                scale: 1,
                duration: 1.2,
                stagger: {
                    each: 0.03,
                    from: "random"
                },
                ease: "power2.out"
            }, "-=1")
            // Brand name dramatic entrance with 3D rotation
            .to(brandRef.current, {
                scale: 1,
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 1.5,
                ease: "power4.out"
            }, "-=0.8")
            // Sub-brand entrance
            .to(subBrandRef.current, {
                scale: 1,
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 1.3,
                ease: "power4.out"
            }, "-=1.1")
            // Letter stagger animation
            .to('.letter', {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 0.6,
                stagger: 0.05,
                ease: "back.out(1.7)"
            }, "-=0.8")
            // Tagline entrance
            .to(taglineRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: "power2.out"
            }, "-=0.5")
            // Breathing and glow effect
            .to([brandRef.current, subBrandRef.current], {
                scale: 1.08,
                duration: 1.2,
                yoyo: true,
                repeat: 1,
                ease: "sine.inOut"
            })
            .to(flameRingRef.current, {
                scale: 1.2,
                opacity: 0.8,
                duration: 1.2,
                yoyo: true,
                repeat: 1,
                ease: "sine.inOut"
            }, "-=1.2")
            // Exit animations - dramatic zoom out
            .to([brandRef.current, subBrandRef.current], {
                scale: 1.5,
                opacity: 0,
                y: -50,
                rotationX: 90,
                duration: 0.8,
                ease: "power2.in"
            })
            .to(taglineRef.current, {
                opacity: 0,
                y: -20,
                scale: 0.5,
                duration: 0.6,
                ease: "power2.in"
            }, "-=0.6")
            .to(flameRingRef.current, {
                scale: 2,
                opacity: 0,
                rotation: 180,
                duration: 0.8,
                ease: "power2.in"
            }, "-=0.8")
            .to('.particle', {
                opacity: 0,
                scale: 0,
                duration: 0.6,
                stagger: {
                    each: 0.01,
                    from: "random"
                },
                ease: "power2.in"
            }, "-=0.6")
            .to(containerRef.current, {
                opacity: 0,
                duration: 0.6,
                ease: "power2.inOut"
            }, "-=0.3");

        // Continuous particle floating animation
        gsap.to('.particle', {
            y: "random(-20, 20)",
            x: "random(-20, 20)",
            duration: "random(2, 4)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: {
                each: 0.1,
                from: "random"
            }
        });

    }, { scope: containerRef });

    if (hide) return null;

    const blazeLetters = "BLAZE".split("");
    const exiliarLetters = "EXILIAR".split("");

    return (
        <div
            ref={containerRef}
            id="splash"
            className="w-screen h-dvh z-[1000] fixed top-0 left-0 flex justify-center items-center overflow-hidden"
            style={{
                background: 'radial-gradient(ellipse at center, #1a0a0a 0%, #0a0000 100%)'
            }}
        >
            {/* Multiple animated gradient overlays for depth */}
            <div
                className="absolute inset-0 opacity-40"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(255, 69, 0, 0.4) 0%, transparent 60%)',
                    animation: 'pulse 3s ease-in-out infinite'
                }}
            />
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    background: 'radial-gradient(circle at 30% 70%, rgba(255, 140, 0, 0.3) 0%, transparent 50%)',
                    animation: 'pulse 4s ease-in-out infinite reverse'
                }}
            />
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    background: 'radial-gradient(circle at 70% 30%, rgba(255, 215, 0, 0.2) 0%, transparent 50%)',
                    animation: 'pulse 5s ease-in-out infinite'
                }}
            />

            {/* Flame ring effect */}
            <div
                ref={flameRingRef}
                className="absolute"
                style={{
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, transparent 40%, rgba(255, 69, 0, 0.1) 50%, rgba(255, 140, 0, 0.2) 60%, transparent 70%)',
                    boxShadow: '0 0 100px rgba(255, 69, 0, 0.4), inset 0 0 100px rgba(255, 140, 0, 0.2)',
                    filter: 'blur(2px)'
                }}
            />

            {/* Enhanced Particles */}
            {particlesRef.current.map((particle) => (
                <div
                    key={particle.id}
                    className="particle absolute rounded-full pointer-events-none"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        background: particle.size > 4
                            ? `radial-gradient(circle, rgba(255, 215, 0, 0.9) 0%, rgba(255, 140, 0, 0.6) 50%, rgba(255, 69, 0, 0.3) 100%)`
                            : `radial-gradient(circle, rgba(255, 140, 0, 0.8) 0%, rgba(255, 69, 0, 0.4) 100%)`,
                        boxShadow: particle.size > 4
                            ? '0 0 20px rgba(255, 140, 0, 0.8), 0 0 40px rgba(255, 69, 0, 0.4)'
                            : '0 0 10px rgba(255, 69, 0, 0.5)',
                        '--particle-opacity': particle.opacity,
                        filter: 'blur(0.5px)'
                    }}
                />
            ))}

            {/* Main content */}
            <div className="relative z-10 text-center">
                {/* Brand name with letter animation */}
                <div ref={brandRef} className="mb-4">
                    <h1
                        className="text-8xl md:text-9xl font-bold tracking-wider flex justify-center gap-1"
                        style={{
                            fontFamily: "'Cinzel', serif",
                            letterSpacing: '0.2em',
                            filter: 'drop-shadow(0 0 30px rgba(255, 69, 0, 0.6))'
                        }}
                    >
                        {blazeLetters.map((letter, index) => (
                            <span
                                key={index}
                                className="letter inline-block"
                                style={{
                                    background: 'linear-gradient(180deg, #ffd700 0%, #ff8c00 40%, #ff4500 70%, #ff6347 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    textShadow: '0 0 60px rgba(255, 69, 0, 0.8)',
                                }}
                            >
                                {letter}
                            </span>
                        ))}
                    </h1>
                </div>

                {/* Sub-brand */}
                <div ref={subBrandRef} className="mb-8">
                    <h2
                        className="text-5xl md:text-6xl font-light tracking-widest"
                        style={{
                            background: 'linear-gradient(135deg, #ffd700 0%, #ffb347 50%, #ff8c00 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            fontFamily: "'Cinzel', serif",
                            letterSpacing: '0.4em',
                            filter: 'drop-shadow(0 0 20px rgba(255, 140, 0, 0.5))'
                        }}
                    >
                        {exiliarLetters.map((letter, index) => (
                            <span
                                key={index}
                                className="letter inline-block"
                            >
                                {letter}
                            </span>
                        ))}
                    </h2>
                </div>

                {/* Decorative line */}
                <div className="flex justify-center items-center gap-4 mb-6">
                    <div
                        style={{
                            width: '60px',
                            height: '1px',
                            background: 'linear-gradient(to right, transparent, #ff8c00, transparent)',
                            boxShadow: '0 0 10px rgba(255, 140, 0, 0.5)'
                        }}
                    />
                    <div
                        style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, #ffd700 0%, #ff8c00 100%)',
                            boxShadow: '0 0 15px rgba(255, 140, 0, 0.8)'
                        }}
                    />
                    <div
                        style={{
                            width: '60px',
                            height: '1px',
                            background: 'linear-gradient(to right, transparent, #ff8c00, transparent)',
                            boxShadow: '0 0 10px rgba(255, 140, 0, 0.5)'
                        }}
                    />
                </div>

                {/* Enhanced Tagline */}
                <div ref={taglineRef}>
                    <p
                        className="text-base md:text-lg tracking-[0.4em] uppercase"
                        style={{
                            background: 'linear-gradient(90deg, #ff8c00 0%, #ffd700 50%, #ff8c00 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 300,
                            textShadow: '0 0 30px rgba(255, 140, 0, 0.5)',
                            filter: 'drop-shadow(0 0 10px rgba(255, 140, 0, 0.3))'
                        }}
                    >
                        Ignite Your Essence
                    </p>
                </div>
            </div>

            {/* Google Fonts */}
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Montserrat:wght@300;400&display=swap');
                
                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 0.4;
                    }
                    50% {
                        transform: scale(1.15);
                        opacity: 0.6;
                    }
                }
            `}</style>
        </div>
    );
}