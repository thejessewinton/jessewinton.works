import { useSyncExternalStore } from 'react'

const emptySubscribe = () => () => {}

export const useIsServer = () => {
  return useSyncExternalStore(
    emptySubscribe,
    () => false,
    () => true,
  )
}
