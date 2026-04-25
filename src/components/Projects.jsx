import { useEffect, useRef, useState } from 'react'

const projectsData = [
  {
    number: '01',
    title: 'FlashCards AI',
    shortDesc: 'SaaS made for studying using AI, using Spring as a framework for backend',
    fullDesc: 'Flashcards Al is a full-stack web app type Saas that generates personalized study decks using Al. Users can create, manage, and review flashcards tailored to specific subjects and topics. The platform Includes secure authentication, user-specific content, and automatic deck generation, providing a streamlined and efficient learning experience.',
    tags: ['React', 'Spring Boot', 'PostgreSQL', 'REST API'],
    images: ['/fc1.jpg', '/fc2.jpg', '/fc3.jpg', '/fc4.jpg'], 
    demo: 'https://flashcards-ai-orcin.vercel.app/',
    github: 'https://github.com/MarianBezhenar/flashcards-frontend',
  },
  {
    number: '02',
    title: 'Nexora - Smart Fridge',
    shortDesc: 'Group project IoT with website and two different backend structure (Microservice)',
    fullDesc: 'Smart Fridge (Nexora) IoT is a group full-stack project where my role was Project Coordinator that monitors temperature, humidity, and door status in real time using an Arduino device. Data is sent to a Java Spring Boot backend via REST APIs, processed, and stored in a PostgreSQL database. A simple frontend dashboard displays live data, while a PHP service handles user authentication. The system follows a layered, microservice-oriented architecture.',
    tags: ['Spring Boot', 'Hibernate', 'Arduino', 'PostgreSQL', 'PHP', 'Blender', 'REST API'],
    images: ['/nexora1.jpg', '/nexora2.1.jpg', '/nexora3.jpg', '/nexora2.2.jpg'],
    demo: 'https://progetto-frigorifero-lrcq.vercel.app/',
    github: '#',
  },
]

function ProjectSlideshow({ images }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [images.length])

  return (
    <div className="w-full mb-6">
      <div className="relative aspect-video w-full overflow-hidden border border-white/10 bg-gray-900 shadow-2xl">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Slide ${idx}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              current === idx ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
      {/* Slideshow Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              current === idx ? 'bg-orange w-6' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ project }) {
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef(null)

  return (
    <div className="border-b border-white/10 last:border-none py-10 transition-all duration-500">
      <div 
        className="flex items-start justify-between cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs text-orange/60 tracking-widest">{project.number}</span>
          <h3 className="font-display font-bold text-4xl tracking-tight text-white group-hover:text-orange transition-colors">
            {project.title}
          </h3>
          <p className={`font-mono text-sm text-gray-text transition-opacity duration-300 ${isOpen ? 'opacity-0 h-0' : 'opacity-100'}`}>
            {project.shortDesc}
          </p>
        </div>
        
        {/* Plausible Animation Arrow */}
        <div className={`mt-4 transform transition-transform duration-500 ease-in-out ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14m-7-7l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Expandable Content Container */}
      <div 
        ref={contentRef}
        className="overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px' }}
      >
        <div className="pt-8 flex flex-col gap-8">
          <ProjectSlideshow images={project.images} />

          <p className="font-mono text-sm text-gray-text leading-relaxed max-w-4xl">
            {project.fullDesc}
          </p>

          <div className="flex flex-wrap gap-3">
            {project.tags.map(tag => (
              <span key={tag} className="px-4 py-1 border border-white/20 font-mono text-[10px] tracking-widest text-white uppercase">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-6 pb-4">
            <a href={project.demo} target='_blank' className="bg-orange text-black px-8 py-3 font-mono text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors ">
              Live Demo ↗
            </a>
            <a href={project.github} target='_blank' className="border border-white text-white px-8 py-3 font-mono text-xs font-bold uppercase tracking-widest hover:bg-orange hover:border-orange hover:text-black transition-all">
              GitHub →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-12 bg-black border-t border-gray">
      <div className="max-w-6xl mx-auto px-12">
        <div className="font-mono text-xs tracking-widest uppercase text-orange mb-4 animate-fadeIn">
          // 01 — WORK
        </div>

        <h2 className="font-display font-extrabold text-7xl tracking-tight mb-20 leading-tight text-white animate-fadeUp">
          My Projects<span className="text-orange">.</span>
        </h2>

        <div className="flex flex-col">
          {projectsData.map((p) => (
            <ProjectCard key={p.number} project={p} />
          ))}
        </div>
        
        <div className="mt-12 font-mono text-[10px] text-gray-600 uppercase tracking-widest text-right">
          *click on a project to see details
        </div>
      </div>
    </section>
  )
}