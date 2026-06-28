import { motion } from 'framer-motion'
import { personal } from '../data/portfolio'

export default function About() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left: Avatar */}
        <div className="md:col-span-5 relative group">
          <motion.div
            className="aspect-square rounded-[0.5rem] overflow-hidden glass-panel !p-2 relative z-10"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full h-full bg-[#2a2a2a] rounded-[0.25rem] overflow-hidden relative flex items-center justify-center">
              <img
                src="/images/rohit.png"
                alt="Rohit Nehte"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          {/* Decorative glow */}
          <div className="absolute inset-0 bg-[#b3c5ff] opacity-20 blur-[100px] rounded-full z-0 transform group-hover:scale-110 transition-transform duration-700" />
        </div>

        {/* Right: Content */}
        <div className="md:col-span-7 md:!pl-12">
          <div className="font-[JetBrains_Mono] text-[12px] font-bold leading-none tracking-[0.1em] text-[#b3c5ff] !mb-2 uppercase">
            The Developer
          </div>
          <h2 className="font-[Sora] text-[32px] font-semibold leading-[1.3] text-[#e5e2e1] !mb-6">
            Frontend-focused. Curiosity-driven. Building in public.
          </h2>
          <p className="font-[Inter] text-[18px] leading-[1.6] text-[#c2c6d8] !mb-6">
            {personal.bio1}
          </p>
          <p className="font-[Inter] text-[16px] leading-[1.6] text-[#c2c6d8]/80">
            {personal.bio2}
          </p>
          {/* Stat chips */}
          <div className="flex flex-wrap gap-3 !mt-8">
            {personal.stats.map((stat) => (
              <span
                key={stat}
                className="glass-panel !px-4 !py-2 rounded-[0.75rem] font-[JetBrains_Mono] text-[14px] leading-[1.5] text-xs text-[#e5e2e1]"
              >
                {stat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
