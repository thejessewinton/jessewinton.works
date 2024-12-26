'use client'

import { useEffect, useRef, useState } from 'react'

interface Raindrop {
  x: number
  y: number
  length: number
  speed: number
  opacity: number
}

export const Rainfall = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const raindrops = useRef<Raindrop[]>([])
  const animationFrameId = useRef<number>()

  const RAINDROP_COUNT = 150
  const BASE_SPEED = 3
  const SPEED_VARIANCE = 2
  const MIN_LENGTH = 5
  const MAX_LENGTH = 10

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const { width, height } = canvasRef.current.getBoundingClientRect()
        setDimensions({ width, height })
        canvasRef.current.width = width
        canvasRef.current.height = height
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const createRaindrops = () => {
      raindrops.current = Array.from({ length: RAINDROP_COUNT }, () => ({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        length: Math.random() * (MAX_LENGTH - MIN_LENGTH) + MIN_LENGTH,
        speed: BASE_SPEED + Math.random() * SPEED_VARIANCE,
        opacity: Math.random() * 0.3 + 0.1,
      }))
    }

    const updateRaindrops = () => {
      for (const drop of raindrops.current) {
        drop.y += drop.speed

        if (drop.y > dimensions.height) {
          drop.y = -drop.length
          drop.x = Math.random() * dimensions.width
        }
      }
    }

    const drawRaindrops = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)
      for (const drop of raindrops.current) {
        ctx.beginPath()
        ctx.moveTo(drop.x, drop.y)
        ctx.lineTo(drop.x, drop.y + drop.length)
        ctx.strokeStyle = `rgba(174, 194, 224, ${drop.opacity})`
        ctx.lineWidth = 0.5
        ctx.lineCap = 'round'
        ctx.stroke()
      }
    }

    const animate = () => {
      updateRaindrops()
      drawRaindrops()
      animationFrameId.current = requestAnimationFrame(animate)
    }

    createRaindrops()
    animate()

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [dimensions])

  return (
    <canvas
      className="pointer-events-none fixed top-0 left-0 z-9999 h-screen w-screen"
      ref={canvasRef}
    />
  )
}
