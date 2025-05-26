'use client'

import { createMap } from '~/utils/map'

export const DottedMap = () => {
  const { points } = createMap({
    width: 150,
    height: 75,
    mapSamples: 6000,
  })
  return (
    <div className="h-full w-full">
      <svg viewBox="0 0 150 75" style={{ width: '100%', height: '100%' }}>
        {points.map((point) => {
          return (
            <circle
              cx={point.x}
              cy={point.y}
              r={0.25}
              fill="#ccc"
              key={`${point.y}-${point.x}`}
            />
          )
        })}
        {/* {markers.map((marker) => {
          return (
            <circle
              cx={marker.x}
              cy={marker.y}
              r={marker.size ?? 0.25}
              fill="#000"
              key={marker.x}
            />
          )
        })} */}
      </svg>
    </div>
  )
}
