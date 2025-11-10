'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface FilmatrixLogoProps {
  variant?: 'full' | 'symbol'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function FilmatrixLogo({ variant = 'full', size = 'md', className = '' }: FilmatrixLogoProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
  }

  const textSizes = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl',
  }

  return (
    <motion.div 
      className={`flex items-center gap-3 ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className={sizeClasses[size]}
        whileHover={{ filter: 'drop-shadow(0 0 10px rgba(0, 245, 212, 0.5))' }}
      >
        <Image
          src="/logo.png"
          alt="FILMATRIX"
          width={size === 'sm' ? 48 : size === 'md' ? 80 : 128}
          height={size === 'sm' ? 48 : size === 'md' ? 80 : 128}
          className="object-contain"
          priority
        />
      </motion.div>

      {variant === 'full' && (
        <motion.span
          className={`font-bold text-filecoin-blue ${textSizes[size]} terminal-text`}
          whileHover={{ textShadow: '0 0 10px #00F5D4' }}
        >
          FILMATRIX
        </motion.span>
      )}
    </motion.div>
  )
}
