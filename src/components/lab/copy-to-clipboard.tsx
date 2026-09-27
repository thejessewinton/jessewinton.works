import { CheckIcon, CopyIcon } from '@radix-ui/react-icons'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { TextMorph } from 'torph/react'

export const CopyToClipboard = () => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText('What do you think, Jackson?')
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 4000)
  }

  return (
    <button
      onClick={handleCopy}
      type="button"
      className="group flex h-10 cursor-pointer items-center justify-center rounded-md border-[0.5px] border-neutral-800 bg-white/2 text-md transition-colors hover:bg-white/5"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={copied ? 'copied' : 'copy'}
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
          className="relative flex h-full w-10 items-center justify-center border-neutral-800 border-r-[0.5px] text-neutral-500 transition-colors duration-200 ease-out group-hover:text-neutral-400"
        >
          {copied ? (
            <CheckIcon className="size-6" strokeWidth={1} />
          ) : (
            <CopyIcon className="size-5" strokeWidth={1} />
          )}
        </motion.span>
      </AnimatePresence>
      <span className="px-3 font-normal text-white transition-colors duration-200 ease-out group-hover:text-neutral-200">
        <TextMorph>
          {copied ? 'Copied to clipboard' : 'Copy to clipboard '}
        </TextMorph>
      </span>
    </button>
  )
}
