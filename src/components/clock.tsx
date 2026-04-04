import { useEffect, useState } from 'react'

const getNewYorkTime = () => {
  const time = Temporal.Now.zonedDateTimeISO('America/New_York')
  const hour = time.hour % 12 || 12
  const minute = String(time.minute).padStart(2, '0')
  const second = String(time.second).padStart(2, '0')
  const period = time.hour >= 12 ? 'PM' : 'AM'
  return `${hour}:${minute}:${second} ${period}`
}

export const Clock = () => {
  const [display, setDisplay] = useState(getNewYorkTime)

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplay(getNewYorkTime())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span className="tabular-nums tracking-tighter">
      {display}
    </span>
  )
}
