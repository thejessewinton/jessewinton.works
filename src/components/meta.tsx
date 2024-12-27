import { Clock } from './shared/clock'
import { Weather } from './shared/weather'

export const Meta = () => {
  return (
    <div className="absolute top-4 z-10 flex h-12 w-full items-center justify-between gap-2 p-4 md:fixed">
      <Weather />
      <Clock />
    </div>
  )
}
