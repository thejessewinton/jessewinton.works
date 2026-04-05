import { createPortal } from 'react-dom'
import { useIsServer } from '~/hooks/use-is-server'

interface TeleportProps {
  children: React.ReactNode
}

export const Teleport = ({ children }: TeleportProps) => {
  const isServer = useIsServer()

  if (isServer) return null

  return createPortal(children, document.body)
}
