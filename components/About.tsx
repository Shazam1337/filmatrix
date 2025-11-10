'use client'

import { motion } from 'framer-motion'
import AnimatedGrid from './AnimatedGrid'

export default function About() {
  return (
    <section id="about" className="relative py-24 container mx-auto px-4 overflow-hidden">
      <AnimatedGrid />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 terminal-text">
            <span className="text-filecoin-blue">ABOUT</span> FILMATRIX
          </h2>
          <p className="text-xl text-text-secondary font-sans leading-relaxed">
            A decentralized data visualization platform built to empower the Filecoin ecosystem.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-black/40 border border-filecoin-blue/30 p-8 hover-glow"
        >
          <div className="space-y-6 font-sans text-text-primary leading-relaxed">
            <p>
              FILMATRIX connects the decentralized storage network of Filecoin with real-time analytics and visual data flows. 
              Our platform makes Filecoin understandable, accessible, and inspiring through dynamic visualizations of network activity.
            </p>
            <p>
              By combining Filecoin's storage infrastructure with the 402 network's velocity metrics, FILMATRIX provides 
              a comprehensive view of the decentralized storage ecosystem. Track storage growth, monitor network health, 
              discover active projects, and understand the flow of data across the network.
            </p>
            <p className="text-filecoin-blue terminal-text">
              "The decentralized matrix of storage and flow."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

