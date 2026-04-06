import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from 'react'

type UploadState =
  | { status: 'idle' }
  | { status: 'uploading'; progress: number }
  | { status: 'complete'; src: string; imageId: string }

type UploadAction =
  | { type: 'start' }
  | { type: 'progress'; progress: number }
  | { type: 'complete'; src: string; imageId: string }
  | { type: 'reset' }

const initialState: UploadState = { status: 'idle' }

const reducer = (state: UploadState, action: UploadAction): UploadState => {
  switch (action.type) {
    case 'start':
      return { status: 'uploading', progress: 0 }
    case 'progress':
      if (state.status !== 'uploading') return state
      return { ...state, progress: action.progress }
    case 'complete':
      return { status: 'complete', src: action.src, imageId: action.imageId }
    case 'reset':
      return initialState
  }
}

interface UploadContextValue {
  upload: UploadState
  start: () => void
  setProgress: (progress: number) => void
  complete: (src: string, imageId: string) => void
  reset: () => void
}

const UploadContext = createContext<UploadContextValue | null>(null)

export const UploadProvider = ({ children }: { children: ReactNode }) => {
  const [upload, dispatch] = useReducer(reducer, initialState)

  const start = useCallback(() => dispatch({ type: 'start' }), [])
  const setProgress = useCallback(
    (progress: number) => dispatch({ type: 'progress', progress }),
    [],
  )
  const complete = useCallback(
    (src: string, imageId: string) =>
      dispatch({ type: 'complete', src, imageId }),
    [],
  )
  const reset = useCallback(() => dispatch({ type: 'reset' }), [])

  return (
    <UploadContext.Provider
      value={{ upload, start, setProgress, complete, reset }}
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
  return context
}
