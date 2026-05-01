import { useState, useEffect, useContext, useRef } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'
import { ThemeContext } from '../App'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useContext(ThemeContext)
  
  const menuRef = useRef(null)
  const tl = useRef(null)

  // GSAP Animation setup
  useGSAP(() => {
    // We set up the timeline in a paused state
    tl.current = gsap.timeline({ paused: true })
      .to(menuRef.current, {
        y: 0, // Slide down to view
        duration: 0.6,
        ease: 'power4.inOut',
      })
      .from('.mobile-link', {
        y: 30,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1, // Sequential popping effect
        ease: 'back.out(1.7)',
      }, "-=0.3") // Start slightly before the background finishes sliding
  }, [])

  // Trigger GSAP timeline when menuOpen state changes
  useEffect(() => {
    if (menuOpen) {
      tl.current.play()
    } else {
      tl.current.reverse()
    }
  }, [menuOpen])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu when a link is clicked
  const handleLinkClick = () => {
    setMenuOpen(false)
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 px-12 py-5 transition-all duration-500 ${
        scrolled
            ? 'bg-black/40 backdrop-blur-xl border-b border-white/10'
            : 'bg-black/10 backdrop-blur-md border-b border-white/5'
      }`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="font-display font-extrabold text-xl tracking-tight text-white relative z-50">
            MB<span className="text-orange">.</span>
          </a>

          {/* Desktop links */}
          <ul className="nav-desktop hidden md:flex gap-10 list-none m-0">
            {navLinks.map(link => (
              <li key={link.href}>
                <a href={link.href} className="font-mono text-xs tracking-widest uppercase text-gray-text hover:text-orange transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-4 relative z-50">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <FiSun className="w-5 h-5 text-white hover:text-orange transition-colors" />
              ) : (
                <FiMoon className="w-5 h-5 text-white hover:text-orange transition-colors" />
              )}
            </button>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="nav-hamburger md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-[2px] bg-white transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
              <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? 'opacity-0 translate-x-2' : ''}`} />
              <span className={`block w-6 h-[2px] bg-white transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu Overlay */}
      <div 
        ref={menuRef}
        className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-40 flex flex-col justify-center items-center -translate-y-full"
      >
        <ul className="flex flex-col gap-8 text-center list-none p-0">
          {navLinks.map((link) => (
            <li key={link.href} className="overflow-hidden">
              <a 
                href={link.href}
                onClick={handleLinkClick}
                className="mobile-link block font-display font-bold text-4xl text-white hover:text-orange transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}