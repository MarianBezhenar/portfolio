import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// Keep the Bold Particle Background logic
function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    const particles = []
    const particleCount = 100

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.8
        this.vy = (Math.random() - 0.5) * 0.8
        this.radius = Math.random() * 2 + 1
      }
      update() {
        this.x += this.vx
        this.y += this.vy
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 122, 0, 0.7)'
        ctx.fill()
      }
    }

    const init = () => {
      resize()
      for (let i = 0; i < particleCount; i++) particles.push(new Particle())
    }

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 180) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255, 122, 0, ${0.4 - dist / 400})`
            ctx.lineWidth = 1.2
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(); p.draw(); })
      drawLines()
      animId = requestAnimationFrame(animate)
    }

    init()
    animate()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />
}

const SplitText = ({ text, className }) => {
  return text.split("").map((char, index) => (
    <span key={index} className={`${className} inline-block opacity-0 translate-y-4`}>
      {char === " " ? "\u00A0" : char}
    </span>
  ))
}

export default function Hero() {
  const container = useRef()

  useGSAP(() => {
    const tl = gsap.timeline()

    tl.to(".char-marian, .char-bezhenar", {
      opacity: 1,
      y: 0,
      duration: 0.1,
      stagger: {
        each: 0.05,
        from: "random"
      },
      ease: "power2.out",
    })
    
    tl.to(".char-marian, .char-bezhenar", {
        color: (i, el) => el.classList.contains('char-marian') ? "currentColor" : "#ff7a00",
        duration: 0.3,
        stagger: 0.05
    }, 0)

    tl.from(".gsap-reveal", {
      opacity: 0,
      y: 20,
      duration: 1,
      stagger: 0.2,
      ease: "expo.out"
    }, "-=0.5")

  }, { scope: container })

  return (
    <section 
      ref={container}
      id="home" 
      className="relative min-h-screen flex items-center px-6 md:px-12 overflow-hidden bg-black"
    >
      <ParticleCanvas />
      
      {/* Labels */}
      <div className="gsap-reveal absolute top-12 md:top-24 left-6 md:left-12 flex items-center gap-4 font-mono text-[10px] md:text-xs tracking-widest text-gray-text uppercase z-10">
        <span className="block w-6 md:w-10 h-px bg-gray-text" />
        PORTFOLIO / 2026
      </div>

      <div className="gsap-reveal absolute top-12 md:top-24 right-6 md:right-12 flex items-center gap-2 font-mono text-[10px] md:text-xs tracking-widest text-gray-text uppercase z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-orange shadow-lg" />
        Available
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto pt-20">
        {/* Responsive Name Layout */}
        <h1 className="font-display font-extrabold mb-10 select-none flex md:block gap-4">
          {/* Column 1: MARIAN */}
          <span className="flex flex-col md:block text-6xl sm:text-8xl md:text-9xl text-white tracking-tighter uppercase md:normal-case">
            <SplitText text="Marian" className="char-marian" />
          </span>
          
          {/* Column 2: BEZHENAR */}
          <span className="flex flex-col md:block text-6xl sm:text-8xl md:text-9xl text-orange italic tracking-tighter uppercase md:normal-case">
            <SplitText text="Bezhenar" className="char-bezhenar" />
          </span>
        </h1>

        <div className="gsap-reveal flex md:justify-end mb-14">
          <div className="max-w-96">
            <p className="font-mono text-xs md:text-sm text-orange tracking-wider mb-3">
              // Java Backend Developer | Spring Boot
            </p>
            <p className="font-mono text-xs md:text-sm text-gray-text leading-relaxed">
              I build scalable backend systems and REST APIs.
            </p>
          </div>
        </div>

        <div className="gsap-reveal flex flex-col sm:flex-row gap-4">
          <a href="#projects" className="text-center px-8 py-3.5 bg-orange text-black font-mono text-[10px] font-bold tracking-widest uppercase border border-orange hover:bg-transparent hover:text-orange transition-all duration-250">
            View Projects ↗
          </a>
          <a href="#contact" className="text-center px-8 py-3.5 bg-transparent text-white font-mono text-[10px] font-bold tracking-widest uppercase border border-gray-mid hover:border-orange hover:text-orange transition-all duration-250">
            Get in Touch ↓
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-6 md:left-12 right-6 md:right-12 h-px z-10" style={{background: 'linear-gradient(to right, var(--orange), transparent)'}} />
    </section>
  )
}