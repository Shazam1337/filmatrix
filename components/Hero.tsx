'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import FilecoinLiveMetrics from './FilecoinLiveMetrics'
import AnimatedGrid from './AnimatedGrid'
import FilmatrixLogo from './FilmatrixLogo'

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <AnimatedGrid />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          {/* Logo */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <FilmatrixLogo variant="full" size="lg" />
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight terminal-text"
            animate={isLoaded ? {} : { 
              x: [0, -2, 2, -1, 1, 0],
              transition: { duration: 0.3, delay: 0.5 }
            }}
          >
            <span className="block text-text-primary">FILMATRIX</span>
            <span className="block text-filecoin-blue glow-text mt-2">
              THE DECENTRALIZED MATRIX
            </span>
            <span className="block text-text-primary mt-2">
              OF STORAGE AND FLOW
            </span>
          </motion.h1>
          
          <motion.p
            className="text-lg md:text-xl text-text-secondary mt-6 mb-12 max-w-2xl mx-auto font-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Track Filecoin storage, data flow, and on-chain activity — all in one place.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex gap-4 justify-center flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <a
            href="#dashboard"
            className="px-8 py-4 bg-filecoin-blue text-bg-dark font-semibold hover:glow-border transition-all duration-300 uppercase tracking-wider terminal-text hover-glow"
          >
            Explore the Matrix
          </a>
          <a
            href="#projects"
            className="px-8 py-4 border-2 border-filecoin-blue text-filecoin-blue font-semibold hover:bg-filecoin-blue hover:text-bg-dark transition-all duration-300 uppercase tracking-wider terminal-text hover-glow"
          >
            View Projects
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <FilecoinLiveMetrics />
      </div>
    </section>
  )
}
