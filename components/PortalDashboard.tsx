'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { UserData } from '@/types'

export default function PortalDashboard({ userData }: { userData: UserData }) {
  const [signal, setSignal] = useState(userData.signal || 0)
  const [referrals, setReferrals] = useState(userData.referrals || 0)

  useEffect(() => {
    // Simulate signal updates
    const interval = setInterval(() => {
      setSignal((prev: number) => prev + Math.floor(Math.random() * 2))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen py-16 container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">DASHBOARD</h1>
        <p className="text-text-secondary">
          Connected: {userData.method === 'email' ? userData.identifier : `${userData.identifier.slice(0, 6)}...${userData.identifier.slice(-4)}`}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="border border-neon-lime/30 p-6 bg-black/50">
          <div className="text-sm text-text-secondary mb-2 uppercase tracking-wider">My Signal</div>
          <motion.div
            key={signal}
            initial={{ scale: 1.1, color: '#D4FF3D' }}
            animate={{ scale: 1, color: '#EDEDED' }}
            className="text-3xl font-bold font-mono"
          >
            {signal}
          </motion.div>
          <div className="text-xs text-text-secondary mt-2">Posts/Clicks tracked</div>
        </div>

        <div className="border border-neon-lime/30 p-6 bg-black/50">
          <div className="text-sm text-text-secondary mb-2 uppercase tracking-wider">Referrals</div>
          <div className="text-3xl font-bold font-mono">{referrals}</div>
          <div className="text-xs text-text-secondary mt-2">Active referrals</div>
        </div>

        <div className="border border-neon-lime/30 p-6 bg-black/50">
          <div className="text-sm text-text-secondary mb-2 uppercase tracking-wider">Whitelist Status</div>
          <div className={`text-3xl font-bold uppercase ${userData.whitelistStatus === 'APPROVED' ? 'text-neon-lime' : 'text-text-secondary'}`}>
            {userData.whitelistStatus}
          </div>
          <div className="text-xs text-text-secondary mt-2">Current status</div>
        </div>

        <div className="border border-neon-lime/30 p-6 bg-black/50">
          <div className="text-sm text-text-secondary mb-2 uppercase tracking-wider">Rewards</div>
          <div className="text-3xl font-bold font-mono">{userData.rewards || 0}</div>
          <div className="text-xs text-text-secondary mt-2">Total earned</div>
        </div>
      </div>

      <div className="border border-neon-lime/30 p-6 bg-black/50">
        <h2 className="text-2xl font-bold mb-4 uppercase tracking-wider">Quick Actions</h2>
        <div className="flex gap-4 flex-wrap">
          <button className="px-6 py-3 border border-neon-lime text-neon-lime hover:bg-neon-lime hover:text-bg-dark transition-all duration-120 uppercase tracking-wider">
            Generate Referral Link
          </button>
          <button className="px-6 py-3 border border-neon-lime text-neon-lime hover:bg-neon-lime hover:text-bg-dark transition-all duration-120 uppercase tracking-wider">
            View Projects
          </button>
          <button className="px-6 py-3 border border-neon-lime text-neon-lime hover:bg-neon-lime hover:text-bg-dark transition-all duration-120 uppercase tracking-wider">
            Settings
          </button>
        </div>
      </div>
    </main>
  )
}

