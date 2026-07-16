import { motion } from 'framer-motion'
import { experience } from '../data/portfolio'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function Experience() {
  return (
    <div>
      <div className="text-center mb-16!">
        <div className="font-[JetBrains_Mono] text-[12px] font-bold leading-none tracking-widest text-[#b3c5ff] mb-2! uppercase">
          Experience
        </div>
        <h2 className="font-[Sora] text-[32px] font-semibold leading-[1.3] text-[#e5e2e1]">
          Where I've Worked
        </h2>
      </div>

      <motion.div
        className="max-w-3xl mx-auto! space-y-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {experience.map((job, index) => (
          <motion.div
            key={index}
            className={`glass-panel relative p-8! rounded-lg group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(179,197,255,0.07)] ${
              job.active ? 'border-l-2 border-l-[#b3c5ff]/60' : ''
            }`}
            variants={itemVariants}
          >
            {/* Hover glow overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-linear-to-br from-[#b3c5ff]/4 to-transparent" />

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-6!">
              <div>
                <h3 className="font-[Sora] text-xl text-[#e5e2e1] font-semibold leading-snug">
                  {job.role}
                </h3>
                <div className="flex items-center flex-wrap gap-2 mt-2!">
                  <span className="font-[Inter] text-[#b3c5ff] text-sm font-semibold">
                    {job.company}
                  </span>
                  {job.url && (
                    <>
                      <span className="text-[#c2c6d8]/30">·</span>
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-[JetBrains_Mono] text-[#c2c6d8]/50 text-xs hover:text-[#b3c5ff] transition-colors duration-200"
                      >
                        {job.urlLabel}
                        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2.5 9.5L9.5 2.5M9.5 2.5H5.5M9.5 2.5V6.5" />
                        </svg>
                      </a>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 md:flex-col md:items-end shrink-0">
              
                <span className="font-[JetBrains_Mono] text-[#b3c5ff]/70 text-xs font-bold tracking-widest uppercase whitespace-nowrap">
                  {job.period}
                </span>
              </div>
            </div>

            <ul className="space-y-3">
              {job.points.map((point, i) => (
                <li
                  key={i}
                  className="flex gap-3 font-[Inter] text-[#c2c6d8]/80 text-sm leading-relaxed"
                >
                  <span className="text-[#b3c5ff]/70 shrink-0 mt-0.5!">▹</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
