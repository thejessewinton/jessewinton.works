'use client'

import { useQuery } from '@tanstack/react-query'

const getWeather = async () => {
  const res = await fetch(
    'https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&current=temperature_2m',
  )
  const json = await res.json()
  return json
}

export const Weather = () => {
  const { data } = useQuery({
    queryKey: ['weather'],
    queryFn: getWeather,
  })

  console.log(data)
  return <div className="text-sm">Weather here</div>
}
