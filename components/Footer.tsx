'use client'

import { motion } from 'framer-motion'
import FilmatrixLogo from './FilmatrixLogo'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative border-t border-filecoin-blue/30 py-12 mt-24 overflow-hidden">
      {/* Pulsing gradient line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-filecoin-blue to-transparent"
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          <div>
            <FilmatrixLogo variant="full" size="sm" className="mb-4" />
            <p className="text-sm text-text-secondary font-sans">
              Part of the 402 Network
            </p>
          </div>
          
          <div className="flex flex-wrap gap-6 text-sm">
            <Link href="#dashboard" className="text-text-secondary hover:text-filecoin-blue transition-colors terminal-text">
              Dashboard
            </Link>
            <Link href="#projects" className="text-text-secondary hover:text-filecoin-blue transition-colors terminal-text">
              Projects
            </Link>
            <Link href="/token" className="text-text-secondary hover:text-filecoin-blue transition-colors terminal-text">
              Token
            </Link>
            <Link href="/docs" className="text-text-secondary hover:text-filecoin-blue transition-colors terminal-text">
              Docs
            </Link>
            <a
              href="https://x.com/FILmatrix_on"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-filecoin-blue transition-colors terminal-text"
            >
              Twitter
            </a>
            <a
              href="https://github.com/filmatrix"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-filecoin-blue transition-colors terminal-text"
            >
              GitHub
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-filecoin-blue/10 text-center">
          <p className="text-xs text-text-secondary terminal-text">
            © 2025 FILMATRIX — Part of the 402 Network.
          </p>
        </div>
      </div>
    </footer>
  )
}
