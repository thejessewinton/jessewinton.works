'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

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
  const animationFrameId = useRef<number>(0)
  const lastUpdateTime = useRef<number>(0)

  const SNOWFLAKE_COUNT = 40
  const BASE_SPEED = 50 // pixels per second
  const SPEED_VARIANCE = 30
  const HORIZONTAL_SPEED_RANGE = 20
  const OSCILLATION_SPEED_RANGE = 2
  const OSCILLATION_DISTANCE_RANGE = 75

  const createSnowflakes = useCallback(() => {
    return Array.from({ length: SNOWFLAKE_COUNT }, (_, index) => ({
      x: Math.random(),
      y: index / SNOWFLAKE_COUNT - 1,
      radius: Math.random() * 2.25 + 0.2,
      speed: BASE_SPEED + Math.random() * SPEED_VARIANCE,
      horizontalSpeed: (Math.random() * 2 - 1) * HORIZONTAL_SPEED_RANGE,
      oscillationSpeed: Math.random() * OSCILLATION_SPEED_RANGE,
      oscillationDistance: Math.random() * OSCILLATION_DISTANCE_RANGE,
      oscillationProgress: Math.random() * Math.PI * 2,
    }))
  }, [])

  const handleResize = useCallback(() => {
    if (canvasRef.current) {
      const width = window.innerWidth
      const height = window.innerHeight
      setDimensions({ width, height })
      canvasRef.current.width = width
      canvasRef.current.height = height
    }
  }, [])

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)

    if (snowflakes.current.length === 0) {
      snowflakes.current = createSnowflakes()
    }

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize, createSnowflakes])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const updateSnowflakes = (deltaTime: number) => {
      for (const flake of snowflakes.current) {
        flake.y += (flake.speed * deltaTime) / dimensions.height

        flake.x +=
          (flake.horizontalSpeed * deltaTime) / dimensions.width +
          (Math.sin(flake.oscillationProgress) *
            flake.oscillationDistance *
            deltaTime) /
            dimensions.width

        flake.oscillationProgress += flake.oscillationSpeed * deltaTime

        if (flake.x > 1) {
          flake.x = 0
        } else if (flake.x < 0) {
          flake.x = 1
        }

        if (flake.y > 1) {
          flake.y = -flake.radius / dimensions.height
          flake.x = Math.random()
        }
      }
    }

    const drawSnowflakes = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)
      ctx.fillStyle = 'white'

      for (const flake of snowflakes.current) {
        ctx.beginPath()
        ctx.arc(
          flake.x * dimensions.width,
          flake.y * dimensions.height,
          flake.radius,
          0,
          Math.PI * 2,
        )
        ctx.fill()
      }
    }

    const animate = (currentTime: number) => {
      if (!lastUpdateTime.current) {
        lastUpdateTime.current = currentTime
      }

      const deltaTime = (currentTime - lastUpdateTime.current) / 1000
      lastUpdateTime.current = currentTime

      updateSnowflakes(deltaTime)
      drawSnowflakes()
      animationFrameId.current = requestAnimationFrame(animate)
    }

    animationFrameId.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [dimensions])

  return (
    <canvas
      className="pointer-events-none hidden fixed inset-0 z-9999 md:block"
      height={dimensions.height}
      width={dimensions.width}
      ref={canvasRef}
    />
  )
}
