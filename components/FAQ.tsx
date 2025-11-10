'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: 'WHAT IS FILMATRIX?',
    answer: 'FILMATRIX is a decentralized data visualization platform built to empower the Filecoin ecosystem. It provides real-time analytics, network metrics, and project tracking for the Filecoin storage network.',
  },
  {
    question: 'HOW DOES IT CONNECT TO FILECOIN?',
    answer: 'FILMATRIX integrates directly with Filecoin network APIs to display live data including storage capacity, active deals, network power, and token metrics. All data is sourced from the Filecoin blockchain and network nodes.',
  },
  {
    question: 'WHAT DATA DOES IT SHOW?',
    answer: 'FILMATRIX displays real-time Filecoin metrics including FIL price, total storage capacity (EiB), active storage deals, network nodes, miner activity, and project analytics. It also includes Velocity_402 metrics for project performance tracking.',
  },
  {
    question: 'HOW CAN I LIST MY PROJECT?',
    answer: 'Projects built on Filecoin can be submitted through our project submission form. We review projects based on their Filecoin integration, activity metrics, and contribution to the ecosystem.',
  },
  {
    question: 'WHAT IS VELOCITY_402?',
    answer: 'Velocity_402 is a performance metric that combines transaction frequency, user activity, storage volume, and network engagement into a single normalized score (0-100) for projects on the Filecoin network.',
  },
  {
    question: 'IS THE DATA REAL-TIME?',
    answer: 'Yes, FILMATRIX updates data every 5 seconds from Filecoin network APIs. All metrics are live and reflect current network state, including price movements, storage growth, and deal activity.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 container mx-auto px-4 relative">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 terminal-text">
          <span className="text-filecoin-blue">FAQ</span>
        </h2>
        <p className="text-text-secondary text-center font-sans max-w-2xl mx-auto">
          Frequently asked questions about FILMATRIX
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-2 relative z-10">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border-l-2 border-filecoin-blue/30 hover:border-filecoin-blue transition-colors duration-300 cursor-crosshair interactive"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="pl-4 py-4 bg-black/30 hover:bg-black/50 transition-colors duration-300">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold uppercase tracking-wider terminal-text">
                  {item.question}
                </h3>
                <motion.span
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-filecoin-blue text-2xl font-light"
                >
                  +
                </motion.span>
              </div>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pt-4 text-text-secondary leading-relaxed font-sans">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
