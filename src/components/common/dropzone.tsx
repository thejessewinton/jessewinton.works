import { useDropzone } from '@uploadthing/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  generateClientDropzoneAccept,
  generatePermittedFileTypes,
} from 'uploadthing/client'
import { useUploadContext } from '~/context/upload-context'
import { syncUpload } from '~/server/api/sync-upload'
import { cn } from '~/utils/cn'
import { useUploadThing } from '~/utils/uploadthing'

const getImageDimensions = (
  file: File,
): Promise<{ width: number; height: number }> =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight })
      URL.revokeObjectURL(url)
    }
    img.onerror = (err) => {
      URL.revokeObjectURL(url)
      reject(err)
    }
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
  const { setIsUploading, setProgress } = useUploadContext()

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

  const dimensionsRef = useRef<Map<string, { width: number; height: number }>>(
    new Map(),
  )

  const { startUpload, routeConfig } = useUploadThing('imageUploader', {
    onUploadProgress(progress) {
      setProgress(progress)
    },
    onClientUploadComplete: (res) => {
      for (const file of res) {
        const dimensions = dimensionsRef.current.get(file.name)
        if (!dimensions) continue
        dimensionsRef.current.delete(file.name)
        void syncUpload({
          data: { url: file.ufsUrl, key: file.key, ...dimensions },
        })
      }
    },
  })

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return
      setIsUploading(true)
      const entries = await Promise.all(
        acceptedFiles.map(async (file) => {
          const dims = await getImageDimensions(file)
          return [file.name, dims] as const
        }),
      )
      for (const [name, dims] of entries) {
        dimensionsRef.current.set(name, dims)
      }
      void startUpload(acceptedFiles)
    },
    [startUpload, setIsUploading],
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
        <div className="pointer-events-none flex size-full items-center justify-center bg-black/5 p-8 backdrop-blur-lg" />
      ) : null}
    </div>
  )
}
