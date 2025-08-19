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

const convertTemp = (unit: 'c' | 'f', temp: number) => {
  return unit === 'c' ? temp.toFixed() : ((temp * 9) / 5 + 32).toFixed()
}

export const Weather = () => {
  const { data, isLoading } = useWeather()
  const unit = getDefaultUnit()
  const suffix = unit === 'c' ? '° C' : '° F'

  if (isLoading) return <span />

  return (
    <span className="block animate-fade-blur focus-visible:text-neutral-400">
      <span className="font-mono tabular-nums tracking-tighter">
        {convertTemp(unit, data!.current.temperature_2m)}
      </span>
      {suffix}
    </span>
  )
}
