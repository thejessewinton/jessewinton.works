'use client'

import { useEffect, useRef, useState } from 'react'

interface Snowflake {
  x: number
  y: number
  radius: number
  speed: number
  horizontalSpeed: number
  oscillationSpeed: number
  oscillationDistance: number
  oscillationProgress: number
}

export const Snowfall = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const snowflakes = useRef<Snowflake[]>([])
  const animationFrameId = useRef<number>()

  const SNOWFLAKE_COUNT = 50
  const BASE_SPEED = 0.5
  const SPEED_VARIANCE = 0.5
  const HORIZONTAL_SPEED_RANGE = 0.3
  const OSCILLATION_SPEED_RANGE = 0.02
  const OSCILLATION_DISTANCE_RANGE = 50

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

    const createSnowflakes = () => {
      snowflakes.current = Array.from({ length: SNOWFLAKE_COUNT }, () => ({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        radius: Math.random() * 3 + 1,
        speed: BASE_SPEED + Math.random() * SPEED_VARIANCE,
        horizontalSpeed: (Math.random() * 2 - 1) * HORIZONTAL_SPEED_RANGE,
        oscillationSpeed: Math.random() * OSCILLATION_SPEED_RANGE,
        oscillationDistance: Math.random() * OSCILLATION_DISTANCE_RANGE,
        oscillationProgress: Math.random() * Math.PI * 2,
      }))
    }

    const updateSnowflakes = () => {
      snowflakes.current.forEach((flake) => {
        flake.y += flake.speed
        flake.x +=
          flake.horizontalSpeed +
          Math.sin(flake.oscillationProgress) * flake.oscillationSpeed
        flake.oscillationProgress += flake.oscillationSpeed

        if (flake.y > dimensions.height) {
          flake.y = 0
          flake.x = Math.random() * dimensions.width
        }

        if (flake.x > dimensions.width) {
          flake.x = 0
        } else if (flake.x < 0) {
          flake.x = dimensions.width
        }
      })
    }

    const drawSnowflakes = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)
      ctx.fillStyle = 'white'
      snowflakes.current.forEach((flake) => {
        ctx.beginPath()
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    const animate = () => {
      updateSnowflakes()
      drawSnowflakes()
      animationFrameId.current = requestAnimationFrame(animate)
    }

    createSnowflakes()
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
