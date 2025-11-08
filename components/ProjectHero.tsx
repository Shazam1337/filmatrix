'use client'

import { motion } from 'framer-motion'
import { Project } from '@/types'

export default function ProjectHero({ project }: { project: Project }) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden border-b border-neon-lime/30">
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          <span className="text-neon-lime glow-text">{project.name}</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-text-secondary max-w-2xl mx-auto"
        >
          {project.description}
        </motion.p>
      </div>
    </section>
  )
}

