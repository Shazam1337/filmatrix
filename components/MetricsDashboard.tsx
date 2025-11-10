'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import AnimatedGrid from './AnimatedGrid'

interface FilecoinData {
  filPrice: number
  totalStorage: number
  activeDeals: number
  networkPower: number
  velocity402: number
  storageGrowth: number[]
  activeMiners: number
  activeClients: number
  dealsPerMinute: number
}

type ViewMode = 'FIL' | '402'

export default function MetricsDashboard() {
  const [viewMode, setViewMode] = useState<ViewMode>('FIL')
  const [data, setData] = useState<FilecoinData>({
    filPrice: 4.82,
    totalStorage: 11.2,
    activeDeals: 2.3,
    networkPower: 18.5,
    velocity402: 82,
    storageGrowth: [],
    activeMiners: 1850,
    activeClients: 12500,
    dealsPerMinute: 12,
  })

  useEffect(() => {
    // Generate historical data for charts
    const generateChartData = () => {
      const now = Date.now()
      const points = 30
      return Array.from({ length: points }, (_, i) => ({
        time: new Date(now - (points - i) * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        price: Number((4.5 + Math.random() * 1).toFixed(2)),
        storage: Number((10 + i * 0.1 + Math.random() * 0.2).toFixed(1)),
        velocity: Number((75 + Math.random() * 15).toFixed(0)),
      }))
    }

    setData(prev => ({
      ...prev,
      storageGrowth: generateChartData().map(d => d.storage),
    }))

    // Simulate live updates
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        filPrice: Number((prev.filPrice + (Math.random() * 0.2 - 0.1)).toFixed(2)),
        activeDeals: Number((prev.activeDeals + (Math.random() * 0.1 - 0.05)).toFixed(1)),
        dealsPerMinute: prev.dealsPerMinute + Math.floor(Math.random() * 3) - 1,
        velocity402: prev.velocity402 + Math.floor(Math.random() * 3) - 1,
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const chartData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (29 - i))
    return {
      time: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: Number((4.5 + Math.random() * 1).toFixed(2)),
      storage: Number((10 + i * 0.1 + Math.random() * 0.2).toFixed(1)),
      velocity: Number((75 + Math.random() * 15).toFixed(0)),
    }
  })

  return (
    <section id="dashboard" className="relative min-h-screen py-20 overflow-hidden">
      <AnimatedGrid />
      
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 terminal-text text-center">
            <span className="text-filecoin-blue">METRICS</span> DASHBOARD
          </h2>
          <p className="text-text-secondary text-center font-sans max-w-2xl mx-auto">
            Real-time Filecoin network analytics and data flow visualization
          </p>
        </motion.div>

        {/* View Mode Switch */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 border border-filecoin-blue/30 p-1">
            <button
              onClick={() => setViewMode('FIL')}
              className={`px-6 py-2 uppercase terminal-text text-sm transition-all ${
                viewMode === 'FIL'
                  ? 'bg-filecoin-blue text-bg-dark'
                  : 'text-text-secondary hover:text-filecoin-blue'
              }`}
            >
              FIL View
            </button>
            <button
              onClick={() => setViewMode('402')}
              className={`px-6 py-2 uppercase terminal-text text-sm transition-all ${
                viewMode === '402'
                  ? 'bg-filecoin-blue text-bg-dark'
                  : 'text-text-secondary hover:text-filecoin-blue'
              }`}
            >
              402 View
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <MetricCard
            title="FIL PRICE"
            value={`$${data.filPrice}`}
            change={Math.random() > 0.5 ? '+' : '-'}
            color="filecoin-blue"
          />
          <MetricCard
            title="TOTAL STORAGE"
            value={`${data.totalStorage} EiB`}
            change="+"
            color="filecoin-blue"
          />
          <MetricCard
            title="ACTIVE DEALS"
            value={`${data.activeDeals}M`}
            change="+"
            color="lime-glow"
          />
          <MetricCard
            title="NETWORK POWER"
            value={`${data.networkPower} PiB`}
            change="+"
            color="filecoin-blue"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* FIL Price Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-black/40 border border-filecoin-blue/30 p-6 hover-glow"
          >
            <h3 className="text-xl font-bold mb-4 terminal-text text-filecoin-blue">FIL PRICE TREND</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00F5D4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00F5D4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#00F5D4" opacity={0.2} />
                <XAxis dataKey="time" stroke="#9AA0A6" fontSize={12} />
                <YAxis stroke="#9AA0A6" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#050505', border: '1px solid #00F5D4', borderRadius: '4px' }}
                  labelStyle={{ color: '#00F5D4' }}
                />
                <Area type="monotone" dataKey="price" stroke="#00F5D4" fillOpacity={1} fill="url(#colorPrice)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Storage Growth Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-black/40 border border-filecoin-blue/30 p-6 hover-glow"
          >
            <h3 className="text-xl font-bold mb-4 terminal-text text-filecoin-blue">STORAGE GROWTH</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#00F5D4" opacity={0.2} />
                <XAxis dataKey="time" stroke="#9AA0A6" fontSize={12} />
                <YAxis stroke="#9AA0A6" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#050505', border: '1px solid #00F5D4', borderRadius: '4px' }}
                  labelStyle={{ color: '#00F5D4' }}
                />
                <Line type="monotone" dataKey="storage" stroke="#C8FF00" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* 402 Metrics Widget */}
        {viewMode === '402' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-black/40 border border-lime-glow/30 p-8 hover-glow"
          >
            <h3 className="text-2xl font-bold mb-6 terminal-text text-lime-glow">VELOCITY_402 WIDGET</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <div className="text-text-secondary text-sm mb-2 terminal-text">VELOCITY_402</div>
                <div className="text-3xl font-bold text-lime-glow">{data.velocity402}</div>
              </div>
              <div>
                <div className="text-text-secondary text-sm mb-2 terminal-text">ACTIVE MINERS</div>
                <div className="text-3xl font-bold text-filecoin-blue">{data.activeMiners.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-text-secondary text-sm mb-2 terminal-text">ACTIVE CLIENTS</div>
                <div className="text-3xl font-bold text-filecoin-blue">{data.activeClients.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-text-secondary text-sm mb-2 terminal-text">DEALS/MIN</div>
                <div className="text-3xl font-bold text-lime-glow">{data.dealsPerMinute}</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

interface MetricCardProps {
  title: string
  value: string
  change: string
  color: 'filecoin-blue' | 'lime-glow'
}

function MetricCard({ title, value, change, color }: MetricCardProps) {
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
      <div className={`text-3xl font-bold ${colorClass} mb-1`}>{value}</div>
      <div className="text-xs text-text-secondary terminal-text">{change}0.5% (24h)</div>
    </motion.div>
  )
}

