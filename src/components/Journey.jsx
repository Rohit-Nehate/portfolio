import { motion } from 'framer-motion'
import { journey } from '../data/portfolio'

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

export default function Journey() {
  return (
    <div>
      <div className="text-center !mb-16">
        <div className="font-[JetBrains_Mono] text-[12px] font-bold leading-none tracking-[0.1em] text-[#b3c5ff] !mb-2 uppercase">
          Journey
        </div>
        <h2 className="font-[Sora] text-[32px] font-semibold leading-[1.3] text-[#e5e2e1]">
          Learning Path
        </h2>
      </div>

      <motion.div
        className="max-w-3xl !mx-auto space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {journey.map((item, index) => (
          <motion.div
            key={index}
            className={`relative flex items-center justify-between md:justify-normal ${
              index % 2 !== 0 ? 'md:flex-row-reverse' : ''
            } group`}
            variants={itemVariants}
          >
            {/* Center dot */}
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border ${
                item.active
                  ? 'border-[#b3c5ff]/50 text-[#b3c5ff]'
                  : 'border-white/10 text-[#c2c6d8]'
              } bg-[#131313] shadow shrink-0 md:order-1 ${
                index % 2 === 0
                  ? 'md:group-odd:-translate-x-1/2'
                  : 'md:group-even:translate-x-1/2'
              } transition-colors duration-300 group-hover:border-[#b3c5ff]/50`}
            >
              <i className={`${item.icon} text-[20px]`}></i>
            </div>

            {/* Card */}
            <div
              className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel !p-6 rounded-[0.5rem] hover:-translate-y-1 transition-transform duration-300 ${
                item.active ? 'border-l-2 border-l-[#b3c5ff]/50' : ''
              }`}
            >
              <div className="flex flex-col !mb-2">
                <span className="font-[JetBrains_Mono] text-[#b3c5ff] text-xs font-bold tracking-widest uppercase !mb-1">
                  {item.period}
                </span>
                <h3 className="font-[Sora] text-lg text-[#e5e2e1] font-semibold">
                  {item.title}
                </h3>
              </div>
              <p className="font-[Inter] text-[#c2c6d8]/80 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
