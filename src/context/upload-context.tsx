import { type ReactNode, createContext, useContext, useState } from 'react'

interface UploadContextValue {
  isUploading: boolean
  setIsUploading: (isUploading: boolean) => void
  progress: number
  setProgress: (progress: number) => void
}

export const UploadContext = createContext<UploadContextValue>({
  isUploading: false,
  setIsUploading: () => {},
  progress: 0,
  setProgress: () => {},
})

export const UploadProvider = ({ children }: { children: ReactNode }) => {
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  return (
    <UploadContext.Provider
      value={{ isUploading, setIsUploading, progress, setProgress }}
    >
      {children}
    </UploadContext.Provider>
  )
}

export const useUploadContext = () => {
  const context = useContext(UploadContext)
  if (!context) {
    throw new Error('useUploadContext must be used within a UploadProvider')
  }

  return useContext(UploadContext)
}
