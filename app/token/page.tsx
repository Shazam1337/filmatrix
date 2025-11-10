'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AnimatedGrid from '@/components/AnimatedGrid'

interface TokenMetrics {
  currentPrice: number
  circulatingSupply: number
  holders: number
  networkActivity: number
  totalSupply: number
}

const distributionData = [
  { name: 'Ecosystem', value: 40, color: '#00F5D4' },
  { name: 'Team', value: 20, color: '#C8FF00' },
  { name: 'Community', value: 25, color: '#00F5D4' },
  { name: 'Reserve', value: 15, color: '#9AA0A6' },
]

export default function TokenPage() {
  const [metrics, setMetrics] = useState<TokenMetrics>({
    currentPrice: 0.042,
    circulatingSupply: 12500000,
    holders: 8500,
    networkActivity: 92,
    totalSupply: 100000000,
  })

  useEffect(() => {
    // Simulate live updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        currentPrice: Number((prev.currentPrice + (Math.random() * 0.002 - 0.001)).toFixed(4)),
        holders: prev.holders + Math.floor(Math.random() * 5) - 2,
        networkActivity: Math.max(0, Math.min(100, prev.networkActivity + Math.floor(Math.random() * 3) - 1)),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toLocaleString()
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Header />
      <AnimatedGrid />
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Token Symbol Visual */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-48 h-48 border-4 border-filecoin-blue rounded-lg flex items-center justify-center hover-glow">
              <div className="absolute inset-0 grid-pattern opacity-30"></div>
              <span className="text-6xl font-bold text-filecoin-blue relative z-10 terminal-text">$FILM</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 terminal-text">
            <span className="text-filecoin-blue">$FILM</span> TOKEN
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto font-sans mb-8">
            $FILM powers the FILMATRIX ecosystem — a tokenized gateway to verified data, analytics, and network signals.
          </p>
        </motion.div>

        {/* Token Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <MetricCard
            title="CURRENT PRICE"
            value={`$${metrics.currentPrice.toFixed(4)}`}
            color="filecoin-blue"
          />
          <MetricCard
            title="CIRCULATING SUPPLY"
            value={formatNumber(metrics.circulatingSupply)}
            color="filecoin-blue"
          />
          <MetricCard
            title="HOLDERS"
            value={formatNumber(metrics.holders)}
            color="lime-glow"
          />
          <MetricCard
            title="NETWORK ACTIVITY"
            value={`${metrics.networkActivity}%`}
            color="lime-glow"
          />
        </div>

        {/* Token Utility & Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Token Utility */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-black/40 border border-filecoin-blue/30 p-8 hover-glow"
          >
            <h2 className="text-3xl font-bold mb-6 terminal-text text-filecoin-blue">TOKEN UTILITY</h2>
            <ul className="space-y-4 font-sans">
              <li className="flex items-start gap-3">
                <span className="text-filecoin-blue mt-1">▸</span>
                <span className="text-text-primary">
                  <strong className="text-filecoin-blue">Access to Analytics:</strong> Unlock premium data insights and network metrics
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-filecoin-blue mt-1">▸</span>
                <span className="text-text-primary">
                  <strong className="text-filecoin-blue">Project Priority:</strong> Get featured placement for your Filecoin project
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-filecoin-blue mt-1">▸</span>
                <span className="text-text-primary">
                  <strong className="text-filecoin-blue">API Tokens:</strong> Access to FILMATRIX API for real-time data feeds
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-filecoin-blue mt-1">▸</span>
                <span className="text-text-primary">
                  <strong className="text-filecoin-blue">Governance:</strong> Participate in platform decisions and upgrades
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Distribution Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-black/40 border border-filecoin-blue/30 p-8 hover-glow"
          >
            <h2 className="text-3xl font-bold mb-6 terminal-text text-filecoin-blue">TOKEN DISTRIBUTION</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#050505', border: '1px solid #00F5D4', borderRadius: '4px' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <a
            href="https://solscan.io"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-filecoin-blue text-bg-dark font-semibold hover:glow-border transition-all duration-300 uppercase tracking-wider terminal-text hover-glow"
          >
            View on Solscan
          </a>
          <a
            href="#"
            className="px-8 py-4 border-2 border-filecoin-blue text-filecoin-blue font-semibold hover:bg-filecoin-blue hover:text-bg-dark transition-all duration-300 uppercase tracking-wider terminal-text hover-glow"
          >
            Trade $FILM
          </a>
        </motion.div>
      </div>
      <Footer />
    </main>
  )
}

interface MetricCardProps {
  title: string
  value: string
  color: 'filecoin-blue' | 'lime-glow'
}

function MetricCard({ title, value, color }: MetricCardProps) {
  const colorClass = color === 'filecoin-blue' ? 'text-filecoin-blue' : 'text-lime-glow'
  const borderClass = color === 'filecoin-blue' ? 'border-filecoin-blue/30' : 'border-lime-glow/30'
  const hoverClass = color === 'filecoin-blue' ? 'hover:border-filecoin-blue' : 'hover:border-lime-glow'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`bg-black/40 border ${borderClass} p-6 hover-glow ${hoverClass} transition-all`}
    >
      <div className="text-text-secondary text-xs mb-2 terminal-text">{title}</div>
      <div className={`text-3xl font-bold ${colorClass}`}>{value}</div>
    </motion.div>
  )
}

