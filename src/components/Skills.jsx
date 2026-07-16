import { motion } from 'framer-motion'
import { skills } from '../data/portfolio'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const pillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
}

export default function Skills() {
  const categories = Object.entries(skills)

  return (
    <div>
      <div className="text-center mb-16!">
        <div className="font-[JetBrains_Mono] text-[12px] font-bold leading-none tracking-[0.1em] text-[#b3c5ff] mb-2! uppercase">
          Toolkit
        </div>
        <h2 className="font-[Sora] text-[32px] font-semibold leading-[1.3] text-[#e5e2e1]">
          Technical Skills
        </h2>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {categories.map(([category, skillList]) => (
          <motion.div
            key={category}
            className="glass-panel rounded-[0.5rem] p-6! hover:-translate-y-1 transition-transform duration-300"
            variants={itemVariants}
          >
            <div className="font-[JetBrains_Mono] text-[12px] font-bold leading-none tracking-[0.1em] text-[#b3c5ff] mb-4! uppercase">
              {category}
            </div>
            <motion.div
              className="flex flex-wrap gap-2"
              variants={containerVariants}
            >
              {skillList.map((skill) => (
                <motion.span
                  key={skill}
                  className="glass-panel px-3! py-1.5! rounded-[0.125rem] font-[JetBrains_Mono] text-[14px] leading-[1.5] text-xs text-[#e5e2e1] hover:border-[#b3c5ff]/30 transition-colors duration-200"
                  variants={pillVariants}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
