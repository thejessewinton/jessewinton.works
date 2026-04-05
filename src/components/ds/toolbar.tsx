import { Toolbar as ToolbarPrimitive } from '@base-ui/react/toolbar'
import { motion } from 'motion/react'
import { Tags } from './tags'

export const Toolbar = () => {
  return (
    <ToolbarPrimitive.Root
      className="fixed bottom-8 left-8 flex h-16 items-center justify-between gap-2 rounded-full bg-neutral-800 px-8 shadow-black/20 shadow-lg ring ring-neutral-600/50"
      render={
        <motion.div
          initial={{ scale: 0.98, opacity: 0, filter: 'blur(4px)', y: 10 }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{
            type: 'spring',
            delay: 0.25,
          }}
        />
      }
    >
      <Tags />
    </ToolbarPrimitive.Root>
  )
}
