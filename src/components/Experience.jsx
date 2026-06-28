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
      <div className="text-center !mb-16">
        <div className="font-[JetBrains_Mono] text-[12px] font-bold leading-none tracking-[0.1em] text-[#b3c5ff] !mb-2 uppercase">
          Experience
        </div>
        <h2 className="font-[Sora] text-[32px] font-semibold leading-[1.3] text-[#e5e2e1]">
          Where I've Worked
        </h2>
      </div>

      <motion.div
        className="max-w-3xl !mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {experience.map((job, index) => (
          <motion.div
            key={index}
            className={`glass-panel !p-8 rounded-[0.5rem] hover:-translate-y-1 transition-transform duration-300 ${
              job.active ? 'border-l-2 border-l-[#b3c5ff]/50' : ''
            }`}
            variants={itemVariants}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 !mb-5">
              <div>
                <h3 className="font-[Sora] text-xl text-[#e5e2e1] font-semibold">
                  {job.role}
                </h3>
                <div className="flex items-center gap-2 !mt-1">
                  <span className="font-[Inter] text-[#b3c5ff] text-sm font-medium">
                    {job.company}
                  </span>
                  {job.url && (
                    <>
                      <span className="text-[#c2c6d8]/30">·</span>
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-[JetBrains_Mono] text-[#c2c6d8]/70 text-xs hover:text-[#b3c5ff] transition-colors duration-200"
                      >
                        {job.urlLabel}
                      </a>
                    </>
                  )}
                </div>
              </div>
              <span className="font-[JetBrains_Mono] text-[#b3c5ff] text-xs font-bold tracking-widest uppercase whitespace-nowrap md:!mt-1">
                {job.period}
              </span>
            </div>

            <ul className="space-y-3">
              {job.points.map((point, i) => (
                <li
                  key={i}
                  className="flex gap-3 font-[Inter] text-[#c2c6d8]/80 text-sm leading-relaxed"
                >
                  <span className="text-[#b3c5ff] shrink-0">▹</span>
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
