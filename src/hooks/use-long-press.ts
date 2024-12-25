import { useCallback, useEffect, useRef, useState } from 'react'

interface UseLongPressOptions {
  callback: () => void
  duration?: number
  onStart?: () => void
  onCancel?: () => void
  progress?: boolean
}

export const useLongPress = ({
  callback,
  duration = 500,
  onStart,
  onCancel,
  progress,
}: UseLongPressOptions) => {
  const [progressValue, setProgressValue] = useState<number>(0)
  const timerRef = useRef<NodeJS.Timeout>(setTimeout(() => {}, 0))
  const animationFrameRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)
  const isLongPress = useRef<boolean>(false)
  const isCanceled = useRef<boolean>(false)

  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  const updateProgress = useCallback(() => {
    if (!startTimeRef.current || isCanceled.current) return

    const elapsedTime = Date.now() - startTimeRef.current
    const newProgress = Math.min((elapsedTime / duration) * 100, 100)
    setProgressValue(newProgress)

    if (newProgress < 100 && !isCanceled.current) {
      animationFrameRef.current = requestAnimationFrame(updateProgress)
    }
  }, [duration])

  const startPressTimer = useCallback(() => {
    isLongPress.current = false
    isCanceled.current = false
    startTimeRef.current = Date.now()
    onStart?.()

    updateProgress()

    timerRef.current = setTimeout(() => {
      if (!isCanceled.current) {
        isLongPress.current = true
        callback()
      }
    }, duration)
  }, [callback, duration, updateProgress, onStart])

  const handleOnUp = useCallback(() => {
    isCanceled.current = true
    clearTimers()
    startTimeRef.current = 0
    setProgressValue(0)
    if (!isLongPress.current) {
      onCancel?.()
    }
  }, [clearTimers, onCancel])

  const handleOnDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault()
      startPressTimer()
    },
    [startPressTimer],
  )

  const cleanup = useCallback(() => {
    isCanceled.current = true
    clearTimers()
    setProgressValue(0)
  }, [clearTimers])

  useEffect(() => cleanup, [cleanup])

  return {
    onMouseDown: handleOnDown,
    onMouseUp: handleOnUp,
    onMouseLeave: handleOnUp,
    onTouchStart: handleOnDown,
    onTouchEnd: handleOnUp,
    progress: progress ? progressValue : null,
  }
}
