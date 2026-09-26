import NumberFlow from '@number-flow/react'
import { UploadIcon } from '@radix-ui/react-icons'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useId, useRef, useState } from 'react'

const UPLOAD_DURATION = 2000

const ACCEPTED_TYPES = [
  'image/png',
  'image/jpeg',
  'image/gif',
  'image/webp',
  'image/avif',
  'image/svg+xml',
]

export const FileUpload = () => {
  const id = useId()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [dragging, setDragging] = useState(false)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  const upload = (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) return
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)

    setFile(file)
    setPreview(URL.createObjectURL(file))
    setProgress(1)

    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / UPLOAD_DURATION, 1)
      setProgress(Math.round(1 + elapsed * 99))

      if (elapsed < 1) {
        frameRef.current = requestAnimationFrame(tick)
        return
      }

      frameRef.current = null
    }

    frameRef.current = requestAnimationFrame(tick)
  }

  const uploading = progress > 0 && progress < 100

  return (
    <label
      htmlFor={id}
      onDragOver={(event) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'copy'
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault()
        setDragging(false)
        const file = event.dataTransfer.files[0]
        if (file) upload(file)
      }}
      className="group -outline-offset-1 relative flex size-full cursor-pointer flex-col items-center justify-center gap-4 rounded-[inherit] bg-clip-padding outline-none transition-colors duration-150 ease-[ease] focus-within:outline-[0.5px] focus-within:outline-neutral-400 hover:bg-white/2 data-dragging:bg-white/4"
      data-dragging={dragging || undefined}
    >
      {/* <div
        aria-hidden
        className="inset2 pointer-events-none absolute rounded-xl border-[0.5px] border-neutral-600 border-dashed opacity-0 transition-opacity duration-150 ease-[ease] group-hover:opacity-100 group-data-dragging:opacity-100"
      /> */}

      <div className="pointer-events-none flex flex-col items-center gap-4 px-6 text-center">
        <UploadIcon className="motion-safe:group-data-dragging:-translate-y-0.5 size-5 text-neutral-400 transition-transform duration-200 ease-out" />

        <div className="flex flex-col gap-1">
          <span className="font-bold text-neutral-200 text-sm">
            Drop to upload
          </span>
        </div>

        {file && preview ? (
          <div className="flex w-56 items-center gap-2.5">
            <img src={preview} alt={file.name} className="size-8 rounded-md" />
            <span className="relative flex-1 truncate text-left text-neutral-300 text-xs">
              <AnimatePresence mode="popLayout">
                {uploading ? (
                  <motion.span
                    key="uploading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Uploading...
                  </motion.span>
                ) : (
                  <motion.span
                    key="completed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Upload completed
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
            <span className="w-[4ch] text-right text-neutral-400 text-xs tabular-nums">
              <NumberFlow value={progress} suffix="%" />
            </span>
          </div>
        ) : null}
      </div>

      <input
        id={id}
        type="file"
        accept={ACCEPTED_TYPES.join(',')}
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (file) upload(file)
          event.target.value = ''
        }}
      />
    </label>
  )
}
