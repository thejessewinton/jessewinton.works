import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'
import { getCookie } from '@tanstack/react-start/server'
import { db } from '../db'
import { tags } from '../db/schema'

export const updateImageTags = createServerFn({
  method: 'POST',
})
  .inputValidator((data: { imageId: string; tags: string[] }) => data)
  .handler(async ({ data }) => {
    const token = getCookie('upload_token')

    if (token !== process.env.UPLOAD_TOKEN) {
      throw new Error('Unauthorized')
    }

    await db.transaction(async (tx) => {
      await tx.delete(tags).where(eq(tags.imageId, data.imageId))

      if (data.tags.length > 0) {
        await tx.insert(tags).values(
          data.tags.map((label) => ({
            imageId: data.imageId,
            label,
          })),
        )
      }
    })

    return { success: true }
  })
