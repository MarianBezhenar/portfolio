import { useEffect, useRef, useState } from 'react'

function StarCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.2 + 0.2,
      alpha: Math.random(),
      speed: Math.random() * 0.005 + 0.002,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach(s => {
        s.alpha += s.speed
        if (s.alpha > 1 || s.alpha < 0) s.speed *= -1
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${Math.abs(Math.sin(s.alpha))})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
    />
  )
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
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center px-12 overflow-hidden bg-black"
    >
      <StarCanvas />

      {/* Top-left label */}
      <div className="absolute top-24 left-12 flex items-center gap-4 font-mono text-xs tracking-widest text-gray-text uppercase z-10 animate-fadeIn" style={{animationDelay: '0.2s'}}>
        <span className="block w-10 h-px bg-gray-text" />
        PORTFOLIO / 2026
      </div>

      {/* Top-right status */}
      <div className="absolute top-24 right-12 flex items-center gap-2 font-mono text-xs tracking-widest text-gray-text uppercase z-10 animate-fadeIn" style={{animationDelay: '0.3s'}}>
        <span className="w-1.5 h-1.5 rounded-full bg-orange shadow-lg" style={{boxShadow: '0 0 8px var(--orange)', animation: 'blink 2s ease-in-out infinite'}} />
        Available for Work
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-12">
        {/* Name */}
        <h1 className="font-display font-extrabold mb-10 animate-fadeUp" style={{animationDelay: '0.4s'}}>
          <span className="block text-9xl text-white tracking-tighter">
            Marian
          </span>
          <span className="block text-9xl text-orange italic tracking-tighter">
            Bezhenar<span className="text-orange">.</span>
          </span>
        </h1>

        {/* Right-aligned description */}
        <div className="flex justify-end mb-14 animate-fadeUp" style={{animationDelay: '0.7s'}}>
          <div className="max-w-96">
            <p className="font-mono text-sm text-orange tracking-wider mb-3">
              // Java Backend Developer | Spring Boot
            </p>
            <p className="font-mono text-sm text-gray-text leading-relaxed">
              <TypewriterText
                text="I build scalable backend systems and REST APIs."
                delay={900}
              />
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 animate-fadeUp" style={{animationDelay: '1s'}}>
          <a
            href="#projects"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-orange text-black font-mono text-xs font-bold tracking-widest uppercase border border-orange hover:bg-transparent hover:text-orange transition-all duration-250"
          >
            View Projects ↗
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-transparent text-white font-mono text-xs font-bold tracking-widest uppercase border border-gray-mid hover:border-orange hover:text-orange transition-all duration-250"
          >
            Get in Touch ↓
          </a>
        </div>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-12 right-12 h-px z-10" style={{background: 'linear-gradient(to right, var(--orange), transparent)'}} />
    </section>
  )
}