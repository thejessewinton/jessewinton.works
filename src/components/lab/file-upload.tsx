import NumberFlow from '@number-flow/react'
import { CheckIcon, UploadIcon } from '@radix-ui/react-icons'
import { AnimatePresence, motion, stagger } from 'motion/react'
import { useEffect, useId, useRef, useState } from 'react'
import { TextMorph } from 'torph/react'

const UPLOAD_DURATION_MIN = 1000
const UPLOAD_DURATION_MAX = 5000

const ACCEPTED_TYPES = [
  'image/png',
  'image/jpeg',
  'image/gif',
  'image/webp',
  'image/avif',
  'image/svg+xml',
]

type UploadItem = {
  id: string
  file: File
  preview: string
  progress: number
  startedAt: number
  duration: number
  state: 'uploading' | 'completed'
}

const randomUploadDuration = () =>
  UPLOAD_DURATION_MIN +
  Math.random() * (UPLOAD_DURATION_MAX - UPLOAD_DURATION_MIN)

export const FileUpload = () => {
  const id = useId()
  const [items, setItems] = useState<UploadItem[]>([])
  const [dragging, setDragging] = useState(false)
  const itemsRef = useRef<UploadItem[]>([])
  const previewsRef = useRef<string[]>([])
  const frameRef = useRef<number | null>(null)

  const uploadingState =
    items.length === 0
      ? 'initial'
      : items.some((item) => item.state === 'uploading')
        ? 'uploading'
        : 'completed'

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
      for (const preview of previewsRef.current) URL.revokeObjectURL(preview)
    }
  }, [])

  const tick = (now: number) => {
    let pending = false

    const next = itemsRef.current.map((item) => {
      if (item.state === 'completed') return item

      const elapsed = Math.min((now - item.startedAt) / item.duration, 1)
      if (elapsed < 1) pending = true

      return {
        ...item,
        progress: Math.round(1 + elapsed * 99),
        state: elapsed < 1 ? ('uploading' as const) : ('completed' as const),
      }
    })

    itemsRef.current = next
    setItems(next)

    if (pending) {
      frameRef.current = requestAnimationFrame(tick)
      return
    }

    frameRef.current = null
  }

  const upload = (files: FileList | File[]) => {
    const accepted = Array.from(files).filter((file) =>
      ACCEPTED_TYPES.includes(file.type),
    )
    if (accepted.length === 0) return

    const startedAt = performance.now()
    const incoming = accepted.map((file) => {
      const preview = URL.createObjectURL(file)
      previewsRef.current.push(preview)

      return {
        id: crypto.randomUUID(),
        file,
        preview,
        progress: 1,
        startedAt,
        duration: randomUploadDuration(),
        state: 'uploading' as const,
      }
    })

    itemsRef.current = [...itemsRef.current, ...incoming]
    setItems(itemsRef.current)

    if (frameRef.current === null) {
      frameRef.current = requestAnimationFrame(tick)
    }
  }

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
        upload(event.dataTransfer.files)
      }}
      className="group -outline-offset-1 relative flex aspect-video min-w-1/2 cursor-pointer flex-col items-center justify-center gap-4 rounded-[inherit] border-[0.5px] border-neutral-800 border-dashed bg-white/2 bg-clip-padding p-4 outline-none backdrop-blur-sm transition-colors duration-150 ease-[ease] focus-within:outline-[0.5px] focus-within:outline-neutral-400 hover:bg-white/2 hover:bg-white/5 data-dragging:bg-white/4"
      data-dragging={dragging || undefined}
    >
      <div className="pointer-events-none flex w-72 flex-col items-center justify-center gap-4 text-center">
        <div className="flex flex-col items-center gap-3">
          <AnimatePresence initial={false} mode="popLayout">
            {uploadingState !== 'completed' ? (
              <motion.div
                key="initial"
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(2px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.9, filter: 'blur(2px)' }}
                transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
              >
                <UploadIcon className="motion-safe:group-data-dragging:-translate-y-0.5 size-5 text-neutral-400 transition-transform duration-200 ease-out" />
              </motion.div>
            ) : uploadingState === 'completed' ? (
              <motion.div
                key="completed"
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(2px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.9, filter: 'blur(2px)' }}
                transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
              >
                <CheckIcon className="size-5 text-neutral-400" />
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="flex flex-col gap-1">
            <span className="font-bold text-neutral-200 text-sm">
              <TextMorph>
                {uploadingState === 'uploading'
                  ? 'Uploading...'
                  : uploadingState === 'completed'
                    ? 'Upload completed'
                    : 'Upload files'}
              </TextMorph>
            </span>
          </div>
        </div>

        <motion.ul
          className="pointer-events-auto flex h-30 w-full flex-col gap-3 overflow-y-auto"
          transition={{ delayChildren: stagger(0.1, { from: 'first' }) }}
        >
          <AnimatePresence initial={false}>
            {items.map((item) => {
              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 4, filter: 'blur(2px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
                  className="inline-flex h-8 items-center gap-2.5"
                >
                  <img
                    src={item.preview}
                    alt=""
                    className="size-8 shrink-0 rounded-md object-cover"
                  />
                  <span className="min-w-0 flex-1 truncate text-left text-neutral-400 text-xs">
                    {item.file.name}
                  </span>
                  <span className="shrink-0 text-right text-neutral-400 text-xs tabular-nums">
                    <NumberFlow value={item.progress} suffix="%" />
                  </span>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </motion.ul>
      </div>

      <input
        id={id}
        type="file"
        multiple
        accept={ACCEPTED_TYPES.join(',')}
        className="sr-only"
        onChange={(event) => {
          if (event.target.files) upload(event.target.files)
          event.target.value = ''
        }}
      />
    </label>
  )
}
