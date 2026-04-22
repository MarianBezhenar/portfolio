import { useEffect, useRef } from 'react'

const contacts = [
  {
    label: 'Email',
    value: 'bezhenarmarian@gmail.com',
    href: 'mailto:bezhenarmarian@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M2 7l10 7 10-7"/>
      </svg>
    ),
  },
  // href="https://www.instagram.com/ma.rian8307/"
  {
  label: 'Instagram',
  value: '@ma.rian8307',
  href: 'https://instagram.com/ma.rian8307',
  icon: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9z"/>
      <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2A3 3 0 1 0 12 15a3 3 0 0 0 0-6z"/>
      <circle cx="17.5" cy="6.5" r="1.2"/>
    </svg>
  ),
  },
  {
    label: 'Telegram',
    value: '@Kaizokuo0',
    href: 'https://t.me/Kaizokuo0',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
        <path d="M21 5L2 12.5l7 1M21 5l-4 15-8-5.5M21 5L9 13.5m0 0V19l3-3"/>
      </svg>
    ),
  },
]

function ContactLink({ item, index }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <a
      ref={ref}
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="opacity-0 translate-y-8 transition-all duration-600 flex items-center gap-6 p-8 border border-gray-mid bg-gray hover:border-orange hover:bg-orange-dim"
      style={{transitionDelay: `${index * 0.12}s`}}
    >
      <div className="text-orange flex-shrink-0 flex items-center">
        {item.icon}
      </div>

      <div>
        <div className="font-mono text-xs tracking-widest uppercase text-gray-text mb-1">
          {item.label}
        </div>
        <div className="font-display font-semibold text-base text-white tracking-tight">
          {item.value}
        </div>
      </div>

      <div className="ml-auto text-orange text-xl opacity-60">
        →
      </div>
    </a>
  )
}

export default function Contact() {
  const titleRef = useRef(null)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="contact" className="py-32 px-12 bg-black border-t border-gray">
      <div className="max-w-6xl mx-auto px-12">
        <div className="font-mono text-xs tracking-widest uppercase text-orange mb-4">
          // 03 — Contact
        </div>

        <h2
          ref={titleRef}
          className="fade-up font-display font-extrabold text-5xl tracking-tight mb-6 leading-tight"
        >
          Contact<span className="text-orange">.</span>
        </h2>

        <p className="font-mono text-sm text-gray-text mb-12 leading-relaxed max-w-md">
          Open to new opportunities and collaborations. Feel free to reach out through any channel below.
        </p>

        <div className="flex flex-col gap-px bg-gray-mid border border-gray-mid max-w-2xl">
          {contacts.map((item, i) => (
            <ContactLink key={item.label} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}