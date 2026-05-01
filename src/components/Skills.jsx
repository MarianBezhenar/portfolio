import { useEffect, useRef, useMemo } from 'react'

const skills = [
  { name: 'Spring', icon: '/spring.png' },
  { name: 'React', icon: '/react.png' },
  { name: 'Railway', icon: '/railway.png' },
  { name: 'Git', icon: '/git.png' },
  { name: 'PostgreSQL', icon: '/postgresql.png' },
  { name: 'MySQL', icon: '/mysql.webp' },
  { name: 'REST API', icon: '/rest-api.svg' },
  { name: 'Postman', icon: '/postman.svg' },
  { name: 'PHP', icon: '/php.png' },
  { name: 'Vercel', icon: '/vercel.webp' },
  { name: 'Docker', icon: '/docker.png' },
  { name: 'Figma', icon: '/figma.webp' },
  { name: 'GSAP', icon: '/gsap.png' },
]

function SkillCard({ skill, index }) {
  // Generates a consistent but "random" rotation between -4 and 4 degrees
  const randomRotation = useMemo(() => {
    const angles = [-4, -2, 3, 1, -3, 2, 4, -1]
    return angles[index % angles.length]
  }, [index])

  return (
    <div
      className="flex flex-col items-center gap-4 group"
      style={{ 
        transform: `rotate(${randomRotation}deg)`,
      }}
    >
      <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-[2.5rem] flex items-center justify-center p-8 shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-0 group-hover:shadow-orange/20">
        <img 
          src={skill.icon} 
          alt={skill.name} 
          className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Icon' }}
        />
      </div>
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-gray-text opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {skill.name}
      </span>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-32 bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-12 mb-20">
        <div className="font-mono text-xs tracking-widest uppercase text-orange mb-4">
          // 02 — Technical Arsenal
        </div>

        <h2 className="font-display font-extrabold text-5xl md:text-7xl tracking-tight leading-tight text-white">
          Tech Stack<span className="text-orange">.</span>
        </h2>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative flex flex-col gap-10">
        {/* First Row: Scrolling Left */}
        <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
          {[...skills, ...skills].map((skill, i) => (
            <div key={i} className="px-6">
              <SkillCard skill={skill} index={i} />
            </div>
          ))}
        </div>

        {/* Optional decorative line */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -z-10" />
      </div>

      {/* CSS for the animation (add to your global CSS if not present) */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </section>
  )
}