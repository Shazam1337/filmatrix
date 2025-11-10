'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface FilecoinProject {
  id: string
  name: string
  description: string
  logo?: string
  volume: number
  activity: number
  users: number
  status: 'ACTIVE' | 'BUILDING' | 'UPCOMING'
  category: 'Storage' | 'Compute' | 'AI' | 'DeFi' | 'Infra'
}

const mockProjects: FilecoinProject[] = [
  {
    id: '1',
    name: 'FILECOIN STORAGE',
    description: 'Decentralized storage network with verifiable proofs',
    volume: 1250000,
    activity: 88,
    users: 12500,
    status: 'ACTIVE',
    category: 'Storage',
  },
  {
    id: '2',
    name: 'FILECOIN VM',
    description: 'Compute layer for Filecoin network',
    volume: 890000,
    activity: 75,
    users: 8900,
    status: 'ACTIVE',
    category: 'Compute',
  },
  {
    id: '3',
    name: 'AI DATA LAKE',
    description: 'AI training data storage and access on Filecoin',
    volume: 2100000,
    activity: 92,
    users: 21000,
    status: 'ACTIVE',
    category: 'AI',
  },
  {
    id: '4',
    name: 'FILECOIN DEFI',
    description: 'DeFi protocols built on Filecoin infrastructure',
    volume: 0,
    activity: 0,
    users: 0,
    status: 'BUILDING',
    category: 'DeFi',
  },
  {
    id: '5',
    name: 'IPFS GATEWAY',
    description: 'High-performance IPFS gateway service',
    volume: 450000,
    activity: 65,
    users: 4500,
    status: 'ACTIVE',
    category: 'Infra',
  },
  {
    id: '6',
    name: 'DATA MARKETPLACE',
    description: 'Decentralized data marketplace on Filecoin',
    volume: 0,
    activity: 0,
    users: 0,
    status: 'UPCOMING',
    category: 'Storage',
  },
]

type CategoryFilter = 'All' | 'Storage' | 'Compute' | 'AI' | 'DeFi' | 'Infra'
type StatusFilter = 'All' | 'ACTIVE' | 'BUILDING' | 'UPCOMING'

export default function Projects() {
  const [projects, setProjects] = useState<FilecoinProject[]>(mockProjects)
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('All')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All')

  useEffect(() => {
    // Simulate live updates
    const interval = setInterval(() => {
      setProjects(prev => prev.map(project => {
        if (project.status === 'ACTIVE') {
          return {
            ...project,
            volume: project.volume + Math.floor(Math.random() * 1000) - 500,
            activity: Math.max(0, Math.min(100, project.activity + Math.floor(Math.random() * 3) - 1)),
            users: project.users + Math.floor(Math.random() * 10) - 5,
          }
        }
        return project
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const filteredProjects = projects.filter(project => {
    const matchesCategory = categoryFilter === 'All' || project.category === categoryFilter
    const matchesStatus = statusFilter === 'All' || project.status === statusFilter
    return matchesCategory && matchesStatus
  })

  const formatVolume = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`
    return `$${value}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'text-filecoin-blue'
      case 'BUILDING':
        return 'text-lime-glow'
      case 'UPCOMING':
        return 'text-text-secondary'
      default:
        return 'text-text-secondary'
    }
  }

  const categories: CategoryFilter[] = ['All', 'Storage', 'Compute', 'AI', 'DeFi', 'Infra']
  const statuses: StatusFilter[] = ['All', 'ACTIVE', 'BUILDING', 'UPCOMING']

  return (
    <section id="projects" className="py-24 container mx-auto px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 terminal-text">
          <span className="text-filecoin-blue">PROJECTS</span> ON FILECOIN
        </h2>
        <p className="text-text-secondary text-center font-sans max-w-2xl mx-auto">
          Discover projects building on the Filecoin network
        </p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center mb-12">
        <div className="flex gap-2 border border-filecoin-blue/30 p-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 uppercase terminal-text text-xs transition-all ${
                categoryFilter === cat
                  ? 'bg-filecoin-blue text-bg-dark'
                  : 'text-text-secondary hover:text-filecoin-blue'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex gap-2 border border-filecoin-blue/30 p-1">
          {statuses.map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 uppercase terminal-text text-xs transition-all ${
                statusFilter === status
                  ? 'bg-filecoin-blue text-bg-dark'
                  : 'text-text-secondary hover:text-filecoin-blue'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="border border-filecoin-blue/30 p-6 hover:border-filecoin-blue hover-glow transition-all duration-300 bg-black/40 group"
          >
            {/* Logo placeholder */}
            <div className="w-16 h-16 bg-filecoin-blue/10 border border-filecoin-blue/30 mb-4 flex items-center justify-center group-hover:border-filecoin-blue transition-colors">
              <span className="text-filecoin-blue text-2xl font-bold">{project.name.charAt(0)}</span>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2 terminal-text">{project.name}</h3>
              <p className="text-sm text-text-secondary mb-4 font-sans">{project.description}</p>
            </div>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary terminal-text">Volume:</span>
                <motion.span
                  key={project.volume}
                  initial={{ scale: 1.1, color: '#00F5D4' }}
                  animate={{ scale: 1, color: '#EDEDED' }}
                  className="font-mono"
                >
                  {formatVolume(project.volume)}
                </motion.span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary terminal-text">Activity:</span>
                <motion.span
                  key={project.activity}
                  initial={{ scale: 1.1, color: '#00F5D4' }}
                  animate={{ scale: 1, color: '#EDEDED' }}
                  className="font-mono"
                >
                  {project.activity}%
                </motion.span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary terminal-text">Users:</span>
                <motion.span
                  key={project.users}
                  initial={{ scale: 1.1, color: '#00F5D4' }}
                  animate={{ scale: 1, color: '#EDEDED' }}
                  className="font-mono"
                >
                  {project.users.toLocaleString()}
                </motion.span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs uppercase tracking-wider terminal-text ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
              <span className="text-xs text-text-secondary terminal-text">{project.category}</span>
            </div>

            <Link
              href={`/project/${project.id}`}
              className="block w-full px-4 py-2 border border-filecoin-blue text-filecoin-blue text-sm hover:bg-filecoin-blue hover:text-bg-dark transition-all duration-300 text-center uppercase tracking-wider terminal-text"
            >
              View Project
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Submit Project CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <a
          href="#"
          className="inline-block px-8 py-4 border-2 border-filecoin-blue text-filecoin-blue hover:bg-filecoin-blue hover:text-bg-dark transition-all duration-300 uppercase tracking-wider terminal-text hover-glow"
        >
          Submit Your Project →
        </a>
      </motion.div>
    </section>
  )
}

