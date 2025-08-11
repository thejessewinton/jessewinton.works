'use client'
import { ArrowsClockwiseIcon } from '@phosphor-icons/react'
import { useAnimate } from 'motion/react'
import { useCallback, useEffect } from 'react'

const ReplayButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="group/button absolute top-2 right-2 flex size-8 cursor-pointer items-center gap-2 rounded-lg bg-neutral-100 p-2 text-neutral-900 opacity-0 transition active:scale-90 group-hover:opacity-100 dark:bg-neutral-800 dark:text-neutral-400"
    >
      <ArrowsClockwiseIcon className="size-full transition-all ease-in-out group-hover/button:rotate-180" />
    </button>
  )
}

export const Cosmos = () => {
  const [scope, animate] = useAnimate()

  const handleReplay = useCallback(() => {
    animate(
      scope.current,
      {
        scale: [0, 1, 0.75, 1],
        rotate: [0, 720],
      },
      {
        times: [0, 4],
        duration: 4,
      },
    )
  }, [animate, scope.current])

  useEffect(() => {
    handleReplay()
  }, [handleReplay])

  return (
    <>
      <ReplayButton onClick={handleReplay} />
      {/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
      <video
        src="/video.mov"
        controls
        controlsList="nofullscreen"
        className="-translate-y-1/2 absolute inset-0 top-1/2 z-1 mt-[4.5px] ml-[0.5px] scale-50 opacity-50"
      />
      <div className="relative size-22">
        <svg
          width="61"
          height="68"
          viewBox="0 0 61 68"
          fill="none"
          className="size-full"
          xmlns="http://www.w3.org/2000/svg"
          ref={scope}
        >
          <path
            d="M30.9267 14.7297C34.797 14.7297 37.9345 11.5975 37.9345 7.73373C37.9345 3.86998 34.797 0.737793 30.9267 0.737793C27.0564 0.737793 23.9189 3.86998 23.9189 7.73373C23.9189 11.5975 27.0564 14.7297 30.9267 14.7297Z"
            fill="currentColor"
            transform="translate(1 14)"
          />
          <path
            d="M30.9267 67.738C34.797 67.738 37.9345 64.6058 37.9345 60.742C37.9345 56.8783 34.797 53.7461 30.9267 53.7461C27.0564 53.7461 23.9189 56.8783 23.9189 60.742C23.9189 64.6058 27.0564 67.738 30.9267 67.738Z"
            fill="currentColor"
          />
          <path
            d="M7.93478 27.9816C11.8051 27.9816 14.9426 24.8494 14.9426 20.9857C14.9426 17.1219 11.8051 13.9897 7.93478 13.9897C4.06449 13.9897 0.927002 17.1219 0.927002 20.9857C0.927002 24.8494 4.06449 27.9816 7.93478 27.9816Z"
            fill="currentColor"
          />
          <path
            d="M53.9189 54.4855C57.7892 54.4855 60.9267 51.3533 60.9267 47.4896C60.9267 43.6258 57.7892 40.4937 53.9189 40.4937C50.0486 40.4937 46.9111 43.6258 46.9111 47.4896C46.9111 51.3533 50.0486 54.4855 53.9189 54.4855Z"
            fill="currentColor"
          />
          <path
            d="M53.9189 27.9816C57.7892 27.9816 60.9267 24.8494 60.9267 20.9857C60.9267 17.1219 57.7892 13.9897 53.9189 13.9897C50.0486 13.9897 46.9111 17.1219 46.9111 20.9857C46.9111 24.8494 50.0486 27.9816 53.9189 27.9816Z"
            fill="currentColor"
          />
          <path
            d="M7.93478 54.4855C11.8051 54.4855 14.9426 51.3533 14.9426 47.4896C14.9426 43.6258 11.8051 40.4937 7.93478 40.4937C4.06449 40.4937 0.927002 43.6258 0.927002 47.4896C0.927002 51.3533 4.06449 54.4855 7.93478 54.4855Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </>
  )
}
