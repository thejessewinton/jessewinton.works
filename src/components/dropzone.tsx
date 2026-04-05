import { useDropzone } from '@uploadthing/react'
import { useCallback, useEffect, useState } from 'react'
import {
  generateClientDropzoneAccept,
  generatePermittedFileTypes,
} from 'uploadthing/client'
import { syncUpload } from '~/server/api/sync-upload'
import { cn } from '~/utils/cn'
import { useUploadThing } from '~/utils/uploadthing'

const getImageDimensions = (
  url: string,
): Promise<{ width: number; height: number }> =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () =>
      resolve({ width: img.naturalWidth, height: img.naturalHeight })
    img.onerror = reject
    img.src = url
  })

const isFileDrag = (e: DragEvent) =>
  e.dataTransfer?.types.includes('Files') ?? false

export const Dropzone = () => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  if (!ready) {
    return null
  }

  return <DropzoneInner />
}

const DropzoneInner = () => {
  const [fileDragDepth, setFileDragDepth] = useState(0)

  useEffect(() => {
    let depth = 0

    const onDragEnter = (e: DragEvent) => {
      if (!isFileDrag(e)) {
        return
      }
      e.preventDefault()
      depth += 1
      setFileDragDepth(depth)
    }

    const onDragLeave = (e: DragEvent) => {
      if (!isFileDrag(e)) {
        return
      }
      e.preventDefault()
      depth = Math.max(0, depth - 1)
      setFileDragDepth(depth)
    }

    const onDropWindow = () => {
      depth = 0
      setFileDragDepth(0)
    }

    const onDragOver = (e: DragEvent) => {
      if (!isFileDrag(e)) {
        return
      }
      e.preventDefault()
    }

    document.addEventListener('dragenter', onDragEnter, true)
    document.addEventListener('dragleave', onDragLeave, true)
    document.addEventListener('drop', onDropWindow, true)
    document.addEventListener('dragover', onDragOver, true)

    return () => {
      document.removeEventListener('dragenter', onDragEnter, true)
      document.removeEventListener('dragleave', onDragLeave, true)
      document.removeEventListener('drop', onDropWindow, true)
      document.removeEventListener('dragover', onDragOver, true)
    }
  }, [])

  const { startUpload, routeConfig } = useUploadThing('imageUploader', {
    onClientUploadComplete: async (res) => {
      for (const file of res) {
        const { width, height } = await getImageDimensions(file.ufsUrl)
        void syncUpload({
          data: { url: file.ufsUrl, key: file.key, width, height },
        })
      }
    },
  })

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        void startUpload(acceptedFiles)
      }
    },
    [startUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: routeConfig
      ? generateClientDropzoneAccept(
          generatePermittedFileTypes(routeConfig).fileTypes,
        )
      : undefined,
  })

  const showOverlay = fileDragDepth > 0 || isDragActive
  const rootProps = getRootProps()

  return (
    <div
      aria-hidden
      {...rootProps}
      className={cn(
        'fixed inset-0 z-100 transition-[background-color,backdrop-filter]',
        showOverlay
          ? 'pointer-events-auto bg-neutral-950/40 backdrop-blur-[2px]'
          : 'pointer-events-none bg-transparent',
        rootProps.className,
      )}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      <input className="sr-only" {...getInputProps()} />
      {showOverlay ? (
        <div className="pointer-events-none flex size-full items-center justify-center p-8">
          <p className="rounded-lg border border-white/20 bg-neutral-900/80 px-6 py-4 text-sm text-white/90 shadow-lg">
            Drop image to upload
          </p>
        </div>
      ) : null}
    </div>
  )
}
