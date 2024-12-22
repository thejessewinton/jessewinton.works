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

  const SNOWFLAKE_COUNT = 40
  const BASE_SPEED = 0.75
  const SPEED_VARIANCE = 1
  const HORIZONTAL_SPEED_RANGE = 1.5
  const OSCILLATION_SPEED_RANGE = 0.075
  const OSCILLATION_DISTANCE_RANGE = 75

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
        y: Math.random() * -dimensions.height, // Start above the canvas
        radius: Math.random() * 2.5 + 0.2,
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
          Math.sin(flake.oscillationProgress) * flake.oscillationSpeed * 2

        flake.oscillationProgress += flake.oscillationSpeed

        // Wrap around horizontally
        if (flake.x > dimensions.width) {
          flake.x = 0
        } else if (flake.x < 0) {
          flake.x = dimensions.width
        }

        // Reset to top when falling off the bottom
        if (flake.y > dimensions.height) {
          flake.y = -flake.radius // Start just above the top of the canvas
          flake.x = Math.random() * dimensions.width
          flake.horizontalSpeed =
            (Math.random() * 2 - 1) * HORIZONTAL_SPEED_RANGE
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
