'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Node {
  x: number
  y: number
  id: string
}

export default function AnimatedGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])
  const connectionsRef = useRef<Array<[number, number]>>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      // Generate nodes
      const nodeCount = 20
      nodesRef.current = Array.from({ length: nodeCount }, (_, i) => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        id: `node-${i}`,
      }))

      // Generate connections
      connectionsRef.current = []
      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const dist = Math.sqrt(
            Math.pow(nodesRef.current[i].x - nodesRef.current[j].x, 2) +
            Math.pow(nodesRef.current[i].y - nodesRef.current[j].y, 2)
          )
          if (dist < 300) {
            connectionsRef.current.push([i, j])
          }
        }
      }
    }

    resize()
    window.addEventListener('resize', resize)

    let animationFrame: number
    let pulse = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      ctx.strokeStyle = 'rgba(0, 245, 212, 0.2)'
      ctx.lineWidth = 1

      // Draw connections with pulse
      connectionsRef.current.forEach(([i, j]) => {
        const node1 = nodesRef.current[i]
        const node2 = nodesRef.current[j]
        
        const gradient = ctx.createLinearGradient(node1.x, node1.y, node2.x, node2.y)
        const alpha = 0.1 + Math.sin(pulse + i) * 0.1
        // Alternate between Filecoin blue and lime glow
        const color = i % 2 === 0 ? '0, 245, 212' : '200, 255, 0'
        gradient.addColorStop(0, `rgba(${color}, ${alpha})`)
        gradient.addColorStop(1, `rgba(${color}, ${alpha * 0.5})`)
        
        ctx.strokeStyle = gradient
        ctx.beginPath()
        ctx.moveTo(node1.x, node1.y)
        ctx.lineTo(node2.x, node2.y)
        ctx.stroke()
      })

      // Draw nodes
      nodesRef.current.forEach((node, i) => {
        const size = 3 + Math.sin(pulse + i) * 1
        // Alternate colors
        const color = i % 2 === 0 ? '#00F5D4' : '#C8FF00'
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2)
        ctx.fill()
        
        // Glow effect
        ctx.shadowBlur = 10
        ctx.shadowColor = color
        ctx.fill()
        ctx.shadowBlur = 0
      })

      pulse += 0.02
      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  )
}

