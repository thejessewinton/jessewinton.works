import { createFileRoute, Link } from "@tanstack/react-router";
import { Suspense } from "react";

import { Clock } from "~/components/ds/clock";
import { NowPlaying } from "~/components/ds/now-playing";
import { site } from "~/data/site";
import { getNowPlaying } from "~/utils/now-playing.functions";

export const Route = createFileRoute("/")({
	loader: () => {
		return { nowPlaying: getNowPlaying() };
	},
	component: Index,
});

function Index() {
	const { nowPlaying } = Route.useLoaderData();

	return (
		<div className="m-0 flex h-full max-w-120 flex-1 flex-col gap-20">
			<div className="flex flex-col">
				<span className="block uppercase">Jesse Winton</span>
				<span className="block uppercase">
					{site.now.title} ~{" "}
					<Link to={site.now.url} target="_blank">
						{site.now.company}
					</Link>
				</span>
				<span className="block uppercase">
					NYC ~ <Clock />
				</span>
			</div>

			<p dangerouslySetInnerHTML={{ __html: site.bio }} />

			<div className="flex flex-col">
				{site.connections.map((connection) => {
					return (
						<Link
							to={connection.url}
							target="_blank"
							key={connection.title}
							className="w-fit py-1"
						>
							{connection.title}
						</Link>
					);
				})}
			</div>

			<div className="mt-auto mb-0">
				<Suspense>
					<NowPlaying track={nowPlaying} />
				</Suspense>
			</div>
		</div>
	);
}
