'use client'
import {} from 'react'
import { useWeather } from '~/hooks/use-weather'
import { newYorkTime } from './clock'

const getDefaultUnit = (): 'c' | 'f' => {
  const userTime = new Date()
  const nyTime = newYorkTime()
  const hourDiff = Math.abs(userTime.getHours() - nyTime.getHours())

  return hourDiff >= 6 && hourDiff <= 18 ? 'c' : 'f'
}

export const Weather = () => {
  const { data, isLoading } = useWeather()
  const unit = getDefaultUnit()

  if (isLoading) return <span />

  return (
    <span className="block animate-fade-blur tabular-nums focus-visible:text-neutral-400">
      {unit === 'c'
        ? `${data!.current.temperature_2m.toFixed()}° C`
        : `${((data!.current.temperature_2m * 9) / 5 + 32).toFixed()}° F`}
    </span>
  )
}
