import { fetchWeatherApi } from '~/api/weather'

const convertTemp = (unit: 'c' | 'f', temp: number) => {
  return unit === 'c' ? temp.toFixed() : ((temp * 9) / 5 + 32).toFixed()
}

export const Weather = async () => {
  const data = await fetchWeatherApi()

  return (
    <span className="block animate-fade-blur focus-visible:text-neutral-400">
      <span className="font-mono tabular-nums tracking-tighter">
        {convertTemp('f', data!.current.temperature_2m)}
      </span>
      ° F
    </span>
  )
}
