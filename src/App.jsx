import { createContext, useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'

export const ThemeContext = createContext()
export const ScrollContext = createContext()

function App() {
  const [theme, setTheme] = useState('dark')
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark'
    setTheme(savedTheme)
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light')
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    if (newTheme === 'light') {
      document.documentElement.classList.add('light')
    } else {
      document.documentElement.classList.remove('light')
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ScrollContext.Provider value={{ scrollY }}>
        <div className="app animate-glitch">
          <Navbar />
          <Hero />
          <Skills />
          <Projects />
          <Contact />
        <footer className="text-center py-8 text-gray-text font-mono text-xs border-t border-gray tracking-widest">
          © 2026 Marian Bezhenar
        </footer>
        </div>
      </ScrollContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App