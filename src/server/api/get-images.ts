import { createServerFn } from '@tanstack/react-start'
import { desc, inArray } from 'drizzle-orm'
import { db } from '../db'
import { images, tags } from '../db/schema'

export const getImages = createServerFn({
  method: 'GET',
})
  .inputValidator((input: { tags?: string[] }) => input)
  .handler(async ({ data }) => {
    if (data.tags && data.tags.length > 0) {
      const matchingImageIds = db
        .selectDistinct({ imageId: tags.imageId })
        .from(tags)
        .where(inArray(tags.label, data.tags))

      return await db
        .select()
        .from(images)
        .where(inArray(images.id, matchingImageIds))
        .orderBy(desc(images.createdAt))
    }

    return await db.select().from(images).orderBy(desc(images.createdAt))
  })
