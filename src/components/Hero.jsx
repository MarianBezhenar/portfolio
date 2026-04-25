import { useEffect, useRef, useState } from 'react'

// Bold Particle Background - Stays visible throughout
function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    const particles = []
    const particleCount = 90

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.7
        this.vy = (Math.random() - 0.5) * 0.7
        this.radius = Math.random() * 2 + 0.5
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
        ctx.fillStyle = 'rgba(255, 122, 0, 0.6)'
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
          if (dist < 150) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255, 122, 0, ${0.3 - dist / 500})`
            ctx.lineWidth = 1
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

function TypewriterText({ text, delay = 0 }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    let i = 0
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(interval)
    }, 55)
    return () => clearInterval(interval)
  }, [started, text])

  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block w-0.5 h-5 bg-orange ml-0.5 align-middle animate-blink" />
      )}
    </span>
  )
}

export default function Hero() {
  const [isIntro, setIsIntro] = useState(true)

  useEffect(() => {
    // Exact 3-second duration
    const timer = setTimeout(() => setIsIntro(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center px-12 overflow-hidden bg-black">
      <style>{`
        /* Quick 2-second Chaotic Flicker */
        @keyframes fast-flicker {
          0%, 20%, 40%, 60%, 80%, 100% { opacity: 1; }
          10%, 30%, 50%, 70%, 90% { opacity: 0; }
        }

        /* Subtle Tearing (No background color) */
        @keyframes fast-glitch {
          0% { clip-path: inset(20% 0 50% 0); transform: translateX(-4px); }
          25% { clip-path: inset(80% 0 1% 0); transform: translateX(4px); }
          50% { clip-path: inset(40% 0 40% 0); transform: translateX(-8px); }
          75% { clip-path: inset(10% 0 10% 0); transform: translateX(8px); }
          100% { clip-path: inset(0 0 0 0); transform: translateX(0); }
        }

        .intro-flicker {
          animation: fast-flicker 0.1s step-end infinite;
        }

        .intro-glitch {
          position: relative;
        }

        .intro-glitch::before,
        .intro-glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          opacity: 0.7;
        }

        .intro-glitch::before {
          color: #ff00c1;
          z-index: -1;
          animation: fast-glitch 0.2s contrast(200%) infinite;
        }

        .intro-glitch::after {
          color: #00fff9;
          z-index: -2;
          animation: fast-glitch 0.3s reverse infinite;
        }
      `}</style>

      <ParticleCanvas />
      
      {/* Texture Overlay (Grain) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none z-1" 
           style={{backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")'}} />

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-12">
        <h1 className="font-display font-extrabold mb-10">
          <span 
            data-text="Marian"
            className={`block text-9xl text-white tracking-tighter ${isIntro ? 'intro-flicker intro-glitch' : ''}`}
          >
            Marian
          </span>
          <span 
            data-text="Bezhenar."
            className={`block text-9xl text-orange italic tracking-tighter ${isIntro ? 'intro-flicker intro-glitch' : ''}`}
            style={isIntro ? { animationDelay: '0.05s' } : {}}
          >
            Bezhenar<span className="text-orange">.</span>
          </span>
        </h1>

        <div className="flex justify-end mb-14 animate-fadeUp" style={{animationDelay: '0.7s'}}>
          <div className="max-w-96">
            <p className="font-mono text-sm text-orange tracking-wider mb-3">
              // Java Backend Developer | Spring Boot
            </p>
            <p className="font-mono text-sm text-gray-text leading-relaxed">
              <TypewriterText text="I build scalable backend systems and REST APIs." delay={900} />
            </p>
          </div>
        </div>

        <div className="flex gap-4 animate-fadeUp" style={{animationDelay: '1s'}}>
          <a href="#projects" className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-orange text-black font-mono text-xs font-bold tracking-widest uppercase border border-orange hover:bg-transparent hover:text-orange transition-all duration-250">
            View Projects ↗
          </a>
          <a href="#contact" className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-transparent text-white font-mono text-xs font-bold tracking-widest uppercase border border-gray-mid hover:border-orange hover:text-orange transition-all duration-250">
            Get in Touch ↓
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-12 right-12 h-px z-10" style={{background: 'linear-gradient(to right, var(--orange), transparent)'}} />
    </section>
  )
}