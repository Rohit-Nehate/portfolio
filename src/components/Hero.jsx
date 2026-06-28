import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { ChevronDown } from 'lucide-react'
import ThreeBackground from './ThreeBackground'
import { personal } from '../data/portfolio'

const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}

export default function Hero() {

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Three.js Background */}
      <ThreeBackground />

      {/* Radial glow blobs */}
      <div className="absolute w-96 h-96 bg-[#b3c5ff]/10 blur-[150px] rounded-full top-1/4 left-1/4 z-[1]" />
      <div className="absolute w-64 h-64 bg-[#7928ca]/10 blur-[120px] rounded-full bottom-1/3 right-1/4 z-[1]" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center !px-4 max-w-4xl !mx-auto"
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow badge */}
        <motion.div variants={{ ...fadeInDown, visible: { ...fadeInDown.visible, transition: { duration: 0.6, delay: 0.1 } } }}>
          <span className="glass-panel inline-flex items-center gap-2 !px-4 !py-1.5 rounded-[0.75rem] text-xs font-[JetBrains_Mono] font-bold leading-none tracking-[0.1em] text-[#b3c5ff]">
            I AM
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="font-[Sora] text-[32px] md:text-[72px] font-semibold leading-[1.1] tracking-[-0.04em] text-[#e5e2e1] !mt-8 !mb-6 hero-title-gradient"
          variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { duration: 0.7, delay: 0.2 } } }}
        >
          {personal.name}.
        </motion.h1>

        {/* Subline */}
        <motion.p
          className="font-[Inter] text-[18px] leading-[1.6] text-[#c2c6d8] max-w-2xl !mx-auto !mb-12"
          variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { duration: 0.7, delay: 0.35 } } }}
        >
          I AM ALL YOU NEED!
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex gap-4 justify-center flex-wrap"
          variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { duration: 0.7, delay: 0.5 } } }}
        >
          <Link to="projects" smooth={true} offset={-80} duration={100}>
            <button className="bg-[#b3c5ff] text-[#002b75] font-[JetBrains_Mono] text-[12px] font-bold leading-none tracking-[0.1em] !px-8 !py-4 rounded-[0.75rem] hover:scale-105 hover:shadow-[0_0_30px_rgba(179,197,255,0.3)] transition-all duration-300 cursor-pointer">
              View Projects
            </button>
          </Link>
          <Link to="contact" smooth={true} offset={-80} duration={100}>
            <button className="ghost-border text-[#e5e2e1] font-[JetBrains_Mono] text-[12px] font-bold leading-none tracking-[0.1em] !px-8 !py-4 rounded-[0.75rem] hover:scale-105 hover:bg-white/5 transition-all duration-300 cursor-pointer">
              Contact Me
            </button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
      >
        <Link
          to="about"
          smooth={true}
          offset={-80}
          duration={100}
          className="glass-panel !px-6 !py-3 rounded-[0.75rem] flex items-center gap-2 font-[JetBrains_Mono] text-[12px] font-bold leading-none tracking-[0.1em] text-[#e5e2e1] cursor-pointer"
        >
          Scroll to Explore
          <ChevronDown size={14} />
        </Link>
      </motion.div>
    </section>
  )
}
