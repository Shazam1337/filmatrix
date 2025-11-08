'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { UserData } from '@/types'

export default function PortalAuth({ onAuth }: { onAuth: (data: UserData) => void }) {
  const [authMethod, setAuthMethod] = useState<'email' | 'wallet'>('email')
  const [email, setEmail] = useState('')
  const [wallet, setWallet] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock authentication
    onAuth({
      method: authMethod,
      identifier: authMethod === 'email' ? email : wallet,
      signal: 0,
      referrals: 0,
      whitelistStatus: 'PENDING',
      rewards: 0,
    })
  }

  return (
    <main className="min-h-screen flex items-center justify-center container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full border border-neon-lime/30 p-8 bg-black/50"
      >
        <h1 className="text-4xl font-bold mb-2 text-center">LAUNCH PORTAL</h1>
        <p className="text-text-secondary text-center mb-8">Access your dashboard</p>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setAuthMethod('email')}
            className={`flex-1 py-3 border-2 transition-all duration-120 uppercase tracking-wider ${
              authMethod === 'email'
                ? 'border-neon-lime bg-neon-lime text-bg-dark'
                : 'border-neon-lime text-neon-lime hover:glow-border'
            }`}
          >
            Email
          </button>
          <button
            onClick={() => setAuthMethod('wallet')}
            className={`flex-1 py-3 border-2 transition-all duration-120 uppercase tracking-wider ${
              authMethod === 'wallet'
                ? 'border-neon-lime bg-neon-lime text-bg-dark'
                : 'border-neon-lime text-neon-lime hover:glow-border'
            }`}
          >
            Wallet
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {authMethod === 'email' ? (
            <div>
              <label className="block text-sm text-text-secondary mb-2 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-neon-lime/30 text-text-primary focus:border-neon-lime focus:outline-none transition-all duration-120"
                required
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm text-text-secondary mb-2 uppercase tracking-wider">
                Wallet Address
              </label>
              <input
                type="text"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                placeholder="0x..."
                className="w-full px-4 py-3 bg-black border border-neon-lime/30 text-text-primary focus:border-neon-lime focus:outline-none transition-all duration-120 font-mono"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-neon-lime text-bg-dark font-semibold hover:glow-border transition-all duration-120 uppercase tracking-wider"
          >
            Connect
          </button>
        </form>
      </motion.div>
    </main>
  )
}

