'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ChartDataPoint } from '@/types'

interface Metrics {
  tx_per_min: number
  volume_24h: number
  unique_posters_24h: number
  ctr_social: number
  velocity_402: number
}

export default function ProjectMetrics({ projectId }: { projectId: string }) {
  const [metrics, setMetrics] = useState<Metrics | null>(null)
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])

  useEffect(() => {
    // Fetch metrics
    const fetchMetrics = async () => {
      try {
        const res = await fetch(`/api/402/metrics?scope=project:${projectId}`)
        const data = await res.json()
        setMetrics(data)
      } catch (error) {
        console.error('Failed to fetch metrics:', error)
      }
    }

    fetchMetrics()
    const interval = setInterval(fetchMetrics, 5000)

    // Generate chart data
    const generateChartData = () => {
      const data = []
      const now = Date.now()
      for (let i = 23; i >= 0; i--) {
        data.push({
          time: new Date(now - i * 3600000).getHours() + ':00',
          velocity: 70 + Math.random() * 20,
          volume: Math.random() * 100000,
        })
      }
      setChartData(data)
    }

    generateChartData()
    const chartInterval = setInterval(generateChartData, 10000)

    return () => {
      clearInterval(interval)
      clearInterval(chartInterval)
    }
  }, [projectId])

  if (!metrics) {
    return (
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 uppercase tracking-wider">Metrics (402)</h2>
        <div className="text-text-secondary">Loading metrics...</div>
      </section>
    )
  }

  return (
    <section className="py-16 container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 uppercase tracking-wider">Metrics (402)</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="border border-neon-lime/30 p-6 bg-black/50">
          <div className="text-sm text-text-secondary mb-2">TX/MIN</div>
          <motion.div
            key={metrics.tx_per_min}
            initial={{ scale: 1.1, color: '#D4FF3D' }}
            animate={{ scale: 1, color: '#EDEDED' }}
            className="text-3xl font-bold font-mono"
          >
            {metrics.tx_per_min}
          </motion.div>
        </div>
        
        <div className="border border-neon-lime/30 p-6 bg-black/50">
          <div className="text-sm text-text-secondary mb-2">VOLUME 24H</div>
          <motion.div
            key={metrics.volume_24h}
            initial={{ scale: 1.1, color: '#D4FF3D' }}
            animate={{ scale: 1, color: '#EDEDED' }}
            className="text-3xl font-bold font-mono"
          >
            ${(metrics.volume_24h / 1000000).toFixed(2)}M
          </motion.div>
        </div>
        
        <div className="border border-neon-lime/30 p-6 bg-black/50">
          <div className="text-sm text-text-secondary mb-2">VELOCITY_402</div>
          <motion.div
            key={metrics.velocity_402}
            initial={{ scale: 1.1, color: '#D4FF3D' }}
            animate={{ scale: 1, color: '#EDEDED' }}
            className="text-3xl font-bold font-mono"
          >
            {metrics.velocity_402}
          </motion.div>
        </div>
        
        <div className="border border-neon-lime/30 p-6 bg-black/50">
          <div className="text-sm text-text-secondary mb-2">ACTIVE USERS</div>
          <motion.div
            key={metrics.unique_posters_24h}
            initial={{ scale: 1.1, color: '#D4FF3D' }}
            animate={{ scale: 1, color: '#EDEDED' }}
            className="text-3xl font-bold font-mono"
          >
            {metrics.unique_posters_24h}
          </motion.div>
        </div>
        
        <div className="border border-neon-lime/30 p-6 bg-black/50">
          <div className="text-sm text-text-secondary mb-2">CTR SOCIAL</div>
          <motion.div
            key={metrics.ctr_social}
            initial={{ scale: 1.1, color: '#D4FF3D' }}
            animate={{ scale: 1, color: '#EDEDED' }}
            className="text-3xl font-bold font-mono"
          >
            {metrics.ctr_social}%
          </motion.div>
        </div>
      </div>

      <div className="border border-neon-lime/30 p-6 bg-black/50">
        <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">Velocity Chart (24H)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#D4FF3D" opacity={0.2} />
            <XAxis dataKey="time" stroke="#8A8A8A" />
            <YAxis stroke="#8A8A8A" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0A0A0A',
                border: '1px solid #D4FF3D',
                color: '#EDEDED',
              }}
            />
            <Line
              type="monotone"
              dataKey="velocity"
              stroke="#D4FF3D"
              strokeWidth={2}
              dot={{ fill: '#D4FF3D', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

