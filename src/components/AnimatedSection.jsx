import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function AnimatedSection({ children, id, className = '', delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`pt-32! ${className}`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay }}
    >
      {children}
    </motion.section>
  )
}
