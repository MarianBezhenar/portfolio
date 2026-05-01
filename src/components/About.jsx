import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// Helper to wrap characters in spans for the wave effect
const SplitText = ({ text, charClass }) => {
  return text.split("").map((char, i) => (
    <span key={i} className={`${charClass} inline-block whitespace-pre`}>
      {char}
    </span>
  ))
}

export default function About() {
  const container = useRef()
  const cardsRef = useRef([])

  useGSAP(() => {
    // 1. REVEAL ANIMATION (Entrance/Exit on Scroll)
    gsap.from(".about-reveal", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse",
      },
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out"
    })

    // 2. THE WAVE JUMP SEQUENCE
    // Configured to repeat every 6s with a 0.8s initial delay
    // THE PHYSICAL WAVE JUMP
    gsap.timeline({ 
      repeat: -1, 
      repeatDelay: 6, 
      delay: 0.8 
    })
    .to(".jump-char", {
      y: -30,           // The peak of the wave
      duration: 0.4,    // Time to go UP
      stagger: {
        each: 0.1,      // Time between the start of each letter
        from: "start"
      },
      ease: "power2.out",
      yoyo: true,       // This makes it go back DOWN
      repeat: 1         // Repeat once (the yoyo part)
    })

    // 3. SPACE SWIM ANIMATION
    const swimmers = [".swim-1", ".swim-2"]
    swimmers.forEach((selector) => {
      gsap.to(selector, {
        x: "random(-50, 50)",
        y: "random(-30, 30)",
        rotation: "random(-15, 15)",
        duration: "random(4, 7)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })
    })

    // 4. CARD DRIFT
    cardsRef.current.forEach((card, i) => {
      gsap.to(card, {
        x: i % 2 === 0 ? 8 : -8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })
    })

  }, { scope: container })

  const addToCards = (el) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el)
  }

  return (
    <section
      ref={container}
      id="about"
      className="relative py-32 px-12 bg-black overflow-hidden"
    >
      {/* SWIMMING BLOCKS */}
      <div className="swim-1 absolute top-20 right-[15%] z-0 pointer-events-none">
        <div className="px-8 py-3 bg-orange text-black font-mono text-xs font-bold uppercase tracking-widest rounded-[24px] shadow-[0_0_30px_rgba(255,122,0,0.2)]">
          Creative Thinking
        </div>
      </div>
      
      <div className="swim-2 absolute bottom-32 left-[10%] z-0 pointer-events-none">
        <div className="px-8 py-3 border border-orange text-orange font-mono text-xs font-bold uppercase tracking-widest rounded-[24px]">
          Problem Solver
        </div>
      </div>

      <div className="about-reveal flex items-center gap-4 font-mono text-xs tracking-widest text-gray-text uppercase mb-16">
        <span className="block w-10 h-px bg-gray-text" />
        About / Me
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 relative z-10">

        {/* LEFT: TEXT CONTENT */}
        <div className="about-reveal">
          <h2 className="font-display text-6xl md:text-8xl font-extrabold mb-12 select-none leading-[0.9]">
            {/* First Line */}
            <span className="block text-white">
               <SplitText text="Who I " charClass="jump-char" />
            </span>
            {/* New Line for "AM." */}
            <span className="block text-orange italic">
               <SplitText text="AM." charClass="jump-char" />
            </span>
          </h2>

          <div className="space-y-6 max-w-lg">
            <p className="font-mono text-sm text-gray-text leading-relaxed">
              I’m a backend-focused developer specializing in building scalable systems and clean REST APIs using Spring Boot.
            </p>

            <p className="font-mono text-sm text-gray-text leading-relaxed">
              I focus on writing structured, maintainable code and solving real
              business problems — from authentication systems to API integrations.
            </p>
          </div>
        </div>

        {/* RIGHT: DRIFTING CARDS */}
        <div className="grid gap-6 about-reveal">
          <div ref={addToCards} className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-orange transition-all duration-500">
            <p className="font-mono text-xs text-orange mb-3">// Focus</p>
            <p className="text-sm text-gray-text leading-relaxed">
              Backend development with Spring Boot, building REST APIs, and database-driven applications.
            </p>
          </div>

          <div ref={addToCards} className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-orange transition-all duration-500">
            <p className="font-mono text-xs text-orange mb-3">// Strengths</p>
            <p className="text-sm text-gray-text leading-relaxed">
              Clean architecture, API design, debugging, and fast problem solving.
            </p>
          </div>

          <div ref={addToCards} className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-orange transition-all duration-500">
            <p className="font-mono text-xs text-orange mb-3">// Goal</p>
            <p className="text-sm text-gray-text leading-relaxed">
              To work on impactful projects, improve system performance, and grow into a high-level engineer.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-12 right-12 h-px bg-gradient-to-r from-orange to-transparent opacity-30" />
    </section>
  )
}