"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import { cn } from "~/utils/classnames";

export const InteractiveInput = () => {
	const [value, setValue] = useState("");
	const [elementRef, bounds] = useMeasure();
	const [isFocused, setIsFocused] = useState(false);

	const [activePrompt, setActivePrompt] = useState(0);
	const prompts = [
		`What's the weather going to be like today?`,
		"What movie won Best Picture in 1994?",
		'Who is the author of "The Great Gatsby"?',
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setActivePrompt((prev) => (prev + 1) % prompts.length);
		}, 2500);
		return () => clearInterval(interval);
	}, []);

	return (
		<MotionConfig
			transition={{
				duration: 1,
				ease: "easeInOut",
			}}
		>
			<div className="group relative flex w-full max-w-md items-center overflow-hidden rounded-md border border-neutral-700/40 px-2 transition-colors focus-within:border-neutral-700">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="pointer-events-none size-4 shrink-0 text-neutral-600"
				>
					<title>Search</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
					/>
				</svg>

				<motion.div
					className="pointer-events-none absolute left-8 flex min-w-full items-center text-neutral-400"
					animate={{ width: bounds.width }}
				>
					<motion.div className="relative" ref={elementRef}>
						<AnimatePresence mode="popLayout">
							<motion.span
								key={prompts[activePrompt]}
								className={cn("block w-full whitespace-nowrap", {
									hidden: value.length,
								})}
								initial={{ opacity: 0, filter: "blur(5px)", y: -10 }}
								animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
								exit={{ opacity: 0, filter: "blur(5px)", y: 10 }}
							>
								{prompts[activePrompt]}
							</motion.span>
						</AnimatePresence>
					</motion.div>
				</motion.div>
				<motion.div
					className={cn("h-4 w-px animate-caret-blink bg-neutral-300", {
						hidden: value.length,
					})}
					animate={{
						x: isFocused ? 6 : bounds.width + 8,
					}}
					transition={{
						x: {
							duration: 0.75,
							ease: "easeInOut",
						},
					}}
				/>

				<input
					type="email"
					value={value}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					onChange={(e) => setValue(e.target.value)}
					className={cn(
						"left-0 ml-1 w-full appearance-none bg-transparent py-2 pr-2 pl-1 caret-transparent outline-hidden placeholder:opacity-0",
						{
							"caret-neutral-300": value.length,
						},
					)}
					placeholder="Invite by Email"
				/>
			</div>
		</MotionConfig>
	);
};
