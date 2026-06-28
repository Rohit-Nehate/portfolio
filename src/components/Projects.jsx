import { motion } from 'framer-motion'
import { Code2, ExternalLink } from 'lucide-react'
import { projects } from '../data/portfolio'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function Projects() {
  return (
    <div>
      <div className="text-center !mb-16">
        <div className="font-[JetBrains_Mono] text-[12px] font-bold leading-none tracking-[0.1em] text-[#b3c5ff] !mb-2 uppercase">
          Work
        </div>
        <h2 className="font-[Sora] text-[32px] font-semibold leading-[1.3] text-[#e5e2e1]">
          Selected Projects
        </h2>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="glass-panel rounded-[0.5rem] overflow-hidden group flex flex-col"
            variants={cardVariants}
            whileHover={{ y: -4 }}
          >
            {/* Image placeholder area */}
            <div
              className="h-56 overflow-hidden relative flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${project.color}20, #2a2a2a)`,
              }}
            >
              {project.imageUrl ? (
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              ) : (
                <span className="font-[Sora] text-3xl text-[#e5e2e1]/10 select-none font-semibold group-hover:text-[#e5e2e1]/20 transition-all duration-500">
                  {project.title}
                </span>
              )}
              <div className="absolute inset-0 bg-[#b3c5ff]/10 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500" />
            </div>

            {/* Body */}
            <div className="!p-6 flex-grow flex flex-col">
              <h3 className="font-[Sora] text-xl text-[#e5e2e1] !mb-2 font-semibold">
                {project.title}
              </h3>
              <p className="font-[Inter] text-[16px] leading-[1.6] text-[#c2c6d8] !mb-4 flex-grow">
                {project.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="!px-3 !py-1 rounded-[0.125rem] bg-[#353534] text-[#e5e2e1] font-[JetBrains_Mono] text-[14px] leading-[1.5] text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="!mt-auto !pt-4 flex items-center gap-3">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={project.codeUrl}
                  className="glass-panel !p-2 rounded-[0.125rem] hover:border-[#b3c5ff]/50 transition-colors"
                  aria-label="View code"
                >
                  <Code2 size={16} className="text-[#c2c6d8]" />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={project.liveUrl}
                  className="glass-panel !p-2 rounded-[0.125rem] hover:border-[#b3c5ff]/50 transition-colors"
                  aria-label="View live"
                >
                  <ExternalLink size={16} className="text-[#c2c6d8]" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
