'use client'

import { useWeather } from '~/hooks/use-weather'
import { Rainfall } from '../lab/rainfall'
import { Snowfall } from '../lab/snowfall'

export const Precipitation = () => {
  const { data, isLoading } = useWeather()

  if (isLoading || !data) return null

  return data.current.snowfall ? (
    <Snowfall />
  ) : data.current.precipitation ? (
    <Rainfall />
  ) : null
}
