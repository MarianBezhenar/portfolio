import { useEffect, useRef } from 'react'

const projects = [
  {
    number: '01',
    title: 'TaskFlow API',
    description: 'A robust task management REST API with JWT authentication, role-based access control, and real-time notifications via WebSocket.',
    tags: ['Spring Boot', 'PostgreSQL', 'JWT', 'WebSocket'],
    demo: '#',
    github: '#',
  },
  {
    number: '02',
    title: 'StoreFront',
    description: 'Full-stack e-commerce platform with product catalog, cart management, and payment integration. Built with React frontend and Spring Boot backend.',
    tags: ['React', 'Spring Boot', 'PostgreSQL', 'REST API'],
    demo: '#',
    github: '#',
  },
]

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className="opacity-0 translate-y-10 transition-all duration-700 border border-white/10 bg-white/5 backdrop-blur-lg hover:border-orange/50 hover:bg-orange/10 hover:backdrop-blur-xl p-10 flex flex-col gap-6 relative overflow-hidden cursor-default shadow-lg hover:shadow-orange/20"
      style={{transitionDelay: `${index * 0.15}s`}}
    >
      {/* Project number */}
      <span className="font-mono text-xs text-orange tracking-widest">
        {project.number}
      </span>

      {/* Title */}
      <h3 className="font-display font-bold text-2xl tracking-tight leading-tight text-white">
        {project.title}
      </h3>

      {/* Description */}
      <p className="font-mono text-sm text-gray-text leading-relaxed flex-1">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {project.tags.map(tag => (
          <span key={tag} className="px-3 py-0.5 border border-gray-mid font-mono text-xs tracking-widest text-gray-text uppercase">
            {tag}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <a
          href={project.demo}
          className="px-3.5 py-2.4 bg-orange text-black font-mono text-xs font-bold tracking-widest uppercase border border-orange hover:bg-transparent hover:text-orange transition-all duration-200"
        >
          Live Demo ↗
        </a>
        <a
          href={project.github}
          className="px-3.5 py-2.4 bg-transparent text-white font-mono text-xs font-bold tracking-widest uppercase border border-gray-mid hover:border-orange hover:text-orange transition-all duration-200"
        >
          GitHub →
        </a>
      </div>
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

export default function Projects() {
  const titleRef = useRef(null)
  useFadeOnScroll(titleRef)

  return (
    <section id="projects" className="py-32 px-12 bg-black border-t border-gray">
      <div className="max-w-6xl mx-auto px-12">
        <div className="font-mono text-xs tracking-widest uppercase text-orange mb-4">
          // 02 — Work
        </div>

        <h2
          ref={titleRef}
          className="fade-up font-display font-extrabold text-5xl tracking-tight mb-16 leading-tight"
        >
          My Projects<span className="text-orange">.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.number} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}