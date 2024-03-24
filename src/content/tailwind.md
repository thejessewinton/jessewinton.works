---
title: 'Tailwind Labs'
description: 'NYC based full-stack engineer, specializing in creating exceptional UI & UX with modern frameworks'
---

Hello Tailwind Labs team! My name is Jesse Winton, and in case you've skipped the [homepage](https://jessewinton.works), I'm a Design Engineer based in New York City. I specialize in building exception user experiences with modern frameworks, and I'm a diehard for Typescript and for Tailwind.

## About Me

There's going to be a lot here about my experience as an engineer, so I'll give you a quick breakdown of who I am outside of that work.

- I have a BA in Musical Theatre, and since leaving school in 2021 I've worked professionaly almost non-stop, although I'm on a long-term hiatus to focus on playwriting, and getting produced. I'm a member of two theatrical unions, the Dramatist's Guild, and Actor's Equity Association.
- I love Olympic weightlifting, and I've been training for about 10 years now. I have yet to compete, but I'm hoping to do so in the future.
- I love the abstraction of Design Engineer; the idea of being able to work on both the design and the development of a project is really appealing to me, and has been a great way to leverage my skills in both areas.
- I can do a killer impression of [Hugh Jackman](https://www.youtube.com/watch?v=DfjhzV1Sd14&ab_channel=Rodgers%26Hammerstein) in the 1999 West End revival of Rodger's and Hammerstein's classic "Oklahoma!"

## Recent Projects

Up until just a few weeks ago, I was a Senior Design Engineer at PlanetScale, helping to design and develop our home on the web at [planetscale.com](https://planetscale.com). A couple of the particular projects I got to build:

- **Global search**: if you hit `⌘+K` anywehre on the site, you'll see PlanetScale's global search, which I was in charge of. It's built using Tailwind (as is all of planetscale.com), the [`cmdk`](https://cmdk.paco.me) package, and a shit ton of server-side code to automatically extract content from our docs, blog posts, and courses, which were made with Markdoc, and generate an index of records that could be searched. Since that went live, there have been upwards of 40,000 monthly searches across 13,000 individual records.
- **Resources**: The last project I got to build at PlanetScale, prior to the layoffs, was the [Resources hub](https://planetscale.com/resources). This was a replacement for a third-party service that we had been using, and was built with many of the same principles from the Global search. The initial design was done by [Yuri Hong](https://yurihong.com), a Brand Designer on the team, and through iterating on the experience, like always, we did a fair bit of design in code to create the best possible in-browser experience.

If you want to get a better feel for all of my recent experience, checkout [the homepage](https://jessewinton.works), or browse through [my resume](https://jessewinton.works/docs/resume.pdf)!

## Something I'm Proud Of

One of the most exciting things I've built over the last two years has been my developer website, here at jessewinton.works. The repo is public, (you can check it out [here](https://github.com/thejessewinton/jessewinton.works)), and is built with Next.js, Tailwind, Contentlayer, and markdown. In case it's not obvious, the design is very minimal, but when I was building it out, I wanted to provide a level of interactivity that was in keeping with a minimal style.

The first idea that came to mind was to animate everything in from a blurred state, as if you were pulling focus on a camera to reveal the content of the site. I spent a few hours tweaking it using Framer motion, but I couldn't get something that felt pixel perfect, it was stuttering, and the overhead of the client-side JS bundle was more than I needed for a simple static site like this. I ended rebuilding the animations in Tailwind, adding a custom plugin to my Tailwind config that gave me an animation-delay property so different elements would stagger in, and I shipped it. I ended up applying the exact same animations to [my personal website](https://jessewinton.com), and I haven't changed the style of either site since I shipped them, nor do I plan to any time soon. It just feels too smooth.

## Conclusion

I hope that this gives you a good sense of my experience, the kind of work that I'm passionate about, and what I could bring to the Tailwind Labs team, I think it's a lot. If you have any questions, or if you'd like to see more of my work, please don't hesitate to reach out to me!
