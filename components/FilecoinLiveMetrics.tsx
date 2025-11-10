'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FilecoinMetrics {
  filPrice: number
  totalStorage: number // in EiB
  activeDeals: number // in millions
  nodes: number
}

export default function FilecoinLiveMetrics() {
  const [metrics, setMetrics] = useState<FilecoinMetrics>({
    filPrice: 4.82,
    totalStorage: 11.2,
    activeDeals: 2.3,
    nodes: 4500,
  })
  const [isConnected, setIsConnected] = useState(true)

  useEffect(() => {
    // Simulate live updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        filPrice: Number((prev.filPrice + (Math.random() * 0.2 - 0.1)).toFixed(2)),
        totalStorage: Number((prev.totalStorage + (Math.random() * 0.1 - 0.05)).toFixed(1)),
        activeDeals: Number((prev.activeDeals + (Math.random() * 0.1 - 0.05)).toFixed(1)),
        nodes: prev.nodes + Math.floor(Math.random() * 10) - 5,
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative bg-black/80 backdrop-blur border-t border-filecoin-blue/30 py-4">
      <div className="container mx-auto px-4">
        <AnimatePresence>
          {!isConnected && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center text-error mb-2 text-sm terminal-text"
            >
              NO SIGNAL FROM MATRIX ▪ ATTEMPTING RECONNECTION...
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base">
          <motion.div
            key="live"
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="w-2 h-2 bg-filecoin-blue rounded-full animate-pulse"></span>
            <span className="text-filecoin-blue font-semibold terminal-text">LIVE FILECOIN FEED</span>
          </motion.div>
          
          <motion.span
            key={`price-${metrics.filPrice}`}
            initial={{ scale: 1.2, color: '#00F5D4' }}
            animate={{ scale: 1, color: '#EDEDED' }}
            transition={{ duration: 0.3 }}
            className="terminal-text"
          >
            FIL PRICE: ${metrics.filPrice}
          </motion.span>
          
          <motion.span
            key={`storage-${metrics.totalStorage}`}
            initial={{ scale: 1.2, color: '#00F5D4' }}
            animate={{ scale: 1, color: '#EDEDED' }}
            transition={{ duration: 0.3 }}
            className="terminal-text"
          >
            TOTAL STORAGE: {metrics.totalStorage} EiB
          </motion.span>
          
          <motion.span
            key={`deals-${metrics.activeDeals}`}
            initial={{ scale: 1.2, color: '#00F5D4' }}
            animate={{ scale: 1, color: '#EDEDED' }}
            transition={{ duration: 0.3 }}
            className="terminal-text"
          >
            ACTIVE DEALS: {metrics.activeDeals}M
          </motion.span>
          
          <motion.span
            key={`nodes-${metrics.nodes}`}
            initial={{ scale: 1.2, color: '#00F5D4' }}
            animate={{ scale: 1, color: '#EDEDED' }}
            transition={{ duration: 0.3 }}
            className="terminal-text"
          >
            NODES: {metrics.nodes.toLocaleString()}
          </motion.span>
        </div>
      </div>
    </div>
  )
}

