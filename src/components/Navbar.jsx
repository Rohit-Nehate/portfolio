import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { personal } from '../data/portfolio'

const navLinks = [
  { to: 'about', label: 'About' },
  { to: 'projects', label: 'Projects' },
  { to: 'experience', label: 'Experience' },
  { to: 'stack', label: 'Stack' },
  { to: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-white/10 transition-all duration-300 ease-in-out ${scrolled ? 'shadow-[0_0_40px_rgba(0,102,255,0.08)]' : ''
        }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto! px-4! md:px-8! h-20">
        {/* Brand */}
        <span className="font-[JetBrains_Mono] text-[32px] font-medium text-[#e5e2e1]">
          <i className='ri-code-s-slash-line'></i>
        </span>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth={true}
              offset={-80}
              duration={100}
              className="text-[#c2c6d8] font-medium hover:text-[#e5e2e1] transition-colors duration-200 cursor-pointer text-sm uppercase tracking-widest"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Resume Button (Desktop) */}
        <a
          href="/files/resume.pdf"
          download="Rohit_Nehte_Resume.pdf"
          className="hidden md:inline-flex items-center justify-center px-6! py-3! bg-[#e5e2e1] text-[#131313] font-[JetBrains_Mono] text-[12px] font-bold leading-none tracking-widest hover:scale-105 transition-transform duration-200 rounded-xl"
        >
          Resume
        </a>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[#e5e2e1] hover:scale-105 transition-transform duration-200"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-white/10 bg-[#131313]/95 backdrop-blur-xl"
          >
            <div className="flex flex-col px-4! py-6! space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  smooth={true}
                  offset={-80}
                  duration={100}
                  className="text-[#c2c6d8] font-medium hover:text-[#e5e2e1] transition-colors duration-200 cursor-pointer text-sm uppercase tracking-widest py-2!"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6! py-3! bg-[#e5e2e1] text-[#131313] font-[JetBrains_Mono] text-[12px] font-bold leading-none tracking-widest rounded-xl mt-2!"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
