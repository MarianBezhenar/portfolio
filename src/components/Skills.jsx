import { useEffect, useRef } from 'react'

const skills = [
  {
    name: 'Spring Boot',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z"/>
        <path d="M12 6v2M12 16v2M6 12h2M16 12h2"/>
      </svg>
    ),
  },
  {
    name: 'React',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
        <ellipse cx="12" cy="12" rx="2" ry="2"/>
        <ellipse cx="12" cy="12" rx="10" ry="4"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
        <ellipse cx="12" cy="6" rx="8" ry="3"/>
        <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"/>
        <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/>
      </svg>
    ),
  },
  {
    name: 'REST API',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
        <path d="M4 6h16M4 12h10M4 18h7"/>
        <circle cx="18" cy="18" r="3"/>
        <path d="M21 21l-1.5-1.5"/>
      </svg>
    ),
  },
  {
  name: 'MySQL',
  icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
        <ellipse cx="12" cy="6" rx="8" ry="3"/>
        <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"/>
        <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/>
      </svg>
  ),
  },
  
  {
    name: 'Git',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
        <circle cx="6" cy="6" r="2"/>
        <circle cx="18" cy="6" r="2"/>
        <circle cx="6" cy="18" r="2"/>
        <path d="M8 6h8M6 8v8M8 18h4a4 4 0 000-8h-2"/>
      </svg>
    ),
  },
  {
    name: 'Postman',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 12h8M14 8l4 4-4 4"/>
      </svg>
    ),
  },
  {
  name: 'PHP',
  icon: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-4 6h3c2 0 3 1 3 3s-1 3-3 3h-1v2H8V8zm8 0h3c2 0 3 1 3 3s-1 3-3 3h-1v2h-2V8z"/>
    </svg>
  ),
},
{
  name: 'Vercel',
  icon: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
      <path d="M12 2l10 20H2L12 2z"/>
    </svg>
  ),
},
{
  name: 'Railway',
  icon: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
      <path d="M3 12h18v2H3v-2zm2-4h14v2H5V8zm2 8h10v2H7v-2z"/>
      <circle cx="6" cy="6" r="1.5"/>
      <circle cx="18" cy="6" r="1.5"/>
    </svg>
  ),
},
{
  name: 'Docker',
  icon: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
      <path d="M2 13h2v2H2v-2zm3 0h2v2H5v-2zm3 0h2v2H8v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zM7 10h2v2H7v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2z"/>
    </svg>
  ),
}
]

function SkillCard({ skill, index }) {
  return (
    <div
      className="skill-card p-8 border border-gray-mid bg-gray hover:border-orange hover:bg-orange-dim hover:-translate-y-1 transition-all duration-300 flex flex-col items-center gap-4 cursor-default animate-fadeUp"
      style={{animationDelay: `${index * 0.1}s`}}
    >
      <div className="text-orange">
        {skill.icon}
      </div>
      <span className="font-mono text-xs tracking-widest uppercase text-gray-text">
        {skill.name}
      </span>
    </div>
  )
}

function useFadeOnScroll(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref])
}

export default function Skills() {
  const titleRef = useRef(null)
  useFadeOnScroll(titleRef)

  return (
    <section id="skills" className="py-32 bg-black relative">
      <div className="max-w-6xl mx-auto px-12 mb-12">
        {/* header stays centered */}
        <div className="font-mono text-xs tracking-widest uppercase text-orange mb-4">
          // 01 — Skills
        </div>

        <h2 className="font-display font-extrabold text-5xl tracking-tight leading-tight">
          Tech Stack<span className="text-orange">.</span>
        </h2>
      </div>

      {/* FULL WIDTH TICKER */}
      <div className="max-w-6xl mx-auto px-12 overflow-hidden border-y border-gray-mid bg-gray-mid mask-fade">
        <div className="flex w-max animate-scroll">
          {[...skills, ...skills].map((skill, i) => (
            <div key={i} className="min-w-[200px]">
              <SkillCard skill={skill} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}