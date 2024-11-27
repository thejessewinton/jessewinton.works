import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMarkdown } from '@content-collections/markdown'

const index = defineCollection({
  name: 'index',
  directory: 'src/content',
  include: 'index.md',
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    tech: z.array(z.string()),
    works: z.array(
      z.object({
        dates: z.string(),
        company: z.string(),
        title: z.string(),
        description: z.string(),
        url: z.string(),
      }),
    ),
    projects: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        url: z.string().optional(),
      }),
    ),
  }),
  transform: async (document, context) => {
    const html = await compileMarkdown(context, document)
    return {
      ...document,
      html,
    }
  },
})

export default defineConfig({
  collections: [index],
})
