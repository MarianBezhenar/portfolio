import { useState, useEffect, useContext } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'
import { ThemeContext } from '../App'

const navLinks = [
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useContext(ThemeContext)

  useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > window.innerHeight)

  window.addEventListener('scroll', onScroll)
  return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-12 py-5 transition-all duration-500 ${
      scrolled
          ? 'bg-black/40 backdrop-blur-xl border-b border-white/10'
          : 'bg-black/10 backdrop-blur-md border-b border-white/5'
    }`}>
      <div className="flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="font-display font-extrabold text-xl tracking-tight text-white">
          MB<span className="text-orange">.</span>
        </a>

        {/* Desktop links */}
        <ul className="nav-desktop hidden md:flex gap-10 list-none m-0">
          <li>
            <a href="#home" className="font-mono text-xs tracking-widest uppercase text-gray-text hover:text-orange transition-colors">
              Home
            </a>
          </li>
          {navLinks.map(link => (
            <li key={link.href}>
              <a href={link.href} className="font-mono text-xs tracking-widest uppercase text-gray-text hover:text-orange transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-mid transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <FiSun className="w-5 h-5 text-gray-text hover:text-orange transition-colors" />
            ) : (
              <FiMoon className="w-5 h-5 text-gray-text hover:text-orange transition-colors" />
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="nav-hamburger md:hidden flex flex-col gap-1.5 p-1"
            aria-label="Toggle menu"
          >
            {[0,1,2].map(i => (
              <span key={i} className="block w-5.5 h-0.5 bg-white transition-all" />
            ))}
          </button>
        </div>
      </div>
    </nav>
  )
}