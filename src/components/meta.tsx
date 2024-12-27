import { Clock } from './shared/clock'
import { Weather } from './shared/weather'

export const Meta = () => {
  return (
    <div className="absolute top-4 left-4 flex items-center gap-2">
      <Weather />
      <Clock />
    </div>
  )
}
