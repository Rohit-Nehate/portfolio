import { motion } from 'framer-motion'
import { techStack } from '../data/portfolio'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const badgeVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
}

// Remix Icon class mapping for each tech
const techIconClass = {
  HTML5: 'ri-html5-fill',
  CSS3: 'ri-css3-fill',
  JavaScript: 'ri-javascript-fill',
  React: 'ri-reactjs-line',
  Redux: 'ri-database-2-line',
  Tailwind: 'ri-tailwind-css-fill',
  'Node.js': 'ri-nodejs-fill',
  Express: 'ri-server-line',
  'Three.js': 'ri-box-3-line',
  Git: 'ri-git-branch-fill',
}

export default function TechStack() {
  return (
    <div className="relative z-[45]">
      <div className="text-center !mb-16">
        <div className="font-[JetBrains_Mono] text-[12px] font-bold leading-none tracking-[0.1em] text-[#b3c5ff] !mb-2 uppercase">
          Arsenal
        </div>
        <h2 className="font-[Sora] text-[32px] font-semibold leading-[1.3] text-[#e5e2e1]">
          Tech Stack
        </h2>
      </div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {techStack.map((tech) => (
          <motion.div
            key={tech.name}
            className="glass-panel rounded-[0.25rem] !p-6 flex flex-col items-center justify-center gap-3 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(179,197,255,0.15)] transition-all duration-300"
            variants={badgeVariants}
          >
            <i className={`${techIconClass[tech.name] || 'ri-code-line'} text-[32px] text-[#c2c6d8]`}></i>
            <span className="font-[JetBrains_Mono] text-[14px] leading-[1.5] text-[#e5e2e1]">
              {tech.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
