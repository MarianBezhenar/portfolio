import { useEffect, useState } from 'react'

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
    }, 40)
    return () => clearInterval(interval)
  }, [started, text])

  return <span>{displayed}</span>
}

export default function About() {
  return (
    <section
      id="about"
      className="relative py-32 px-12 bg-black overflow-hidden"
    >
      {/* Section label */}
      <div className="flex items-center gap-4 font-mono text-xs tracking-widest text-gray-text uppercase mb-16 animate-fadeIn">
        <span className="block w-10 h-px bg-gray-text" />
        About / Me
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">

        {/* LEFT: TEXT */}
        <div className="animate-fadeUp">
          <h2 className="font-display text-5xl md:text-6xl font-extrabold mb-8">
            <span className="text-white">Who I</span>{' '}
            <span className="text-orange italic">Am.</span>
          </h2>

          <p className="font-mono text-sm text-gray-text leading-relaxed mb-6">
            <TypewriterText
              text="I’m a backend-focused developer specializing in building scalable systems and clean REST APIs using Spring Boot."
              delay={200}
            />
          </p>

          <p className="font-mono text-sm text-gray-text leading-relaxed mb-6">
            I focus on writing structured, maintainable code and solving real
            business problems — from authentication systems to API integrations.
          </p>

          <p className="font-mono text-sm text-gray-text leading-relaxed">
            Currently open to freelance opportunities where I can deliver
            reliable backend solutions and collaborate on meaningful products.
          </p>
        </div>

        {/* RIGHT: CARDS */}
        <div className="grid gap-6 animate-fadeUp" style={{ animationDelay: '0.3s' }}>
          
          {/* Card 1 */}
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-orange transition-all duration-300">
            <p className="font-mono text-xs text-orange mb-2">
              // Focus
            </p>
            <p className="text-sm text-gray-text">
              Backend development with Spring Boot, building REST APIs,
              authentication systems, and database-driven applications.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-orange transition-all duration-300">
            <p className="font-mono text-xs text-orange mb-2">
              // Strengths
            </p>
            <p className="text-sm text-gray-text">
              Clean architecture, API design, debugging, and fast problem
              solving in real-world development scenarios.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-orange transition-all duration-300">
            <p className="font-mono text-xs text-orange mb-2">
              // Goal
            </p>
            <p className="text-sm text-gray-text">
              To work on impactful projects, improve system performance, and
              grow into a high-level backend engineer.
            </p>
          </div>

        </div>
      </div>

      {/* Bottom gradient line */}
      <div
        className="absolute bottom-0 left-12 right-12 h-px"
        style={{
          background: 'linear-gradient(to right, var(--orange), transparent)'
        }}
      />
    </section>
  )
}