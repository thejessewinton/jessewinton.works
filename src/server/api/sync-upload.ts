import { createServerFn } from '@tanstack/react-start'
import { db } from '../db'
import { images } from '../db/schema'

export const syncUpload = createServerFn({
  method: 'POST',
})
  .inputValidator(
    (data: { url: string; key: string; width: number; height: number }) => data,
  )
  .handler(async ({ data }) => {
    await db.insert(images).values({
      url: data.url,
      key: data.key,
      width: data.width,
      height: data.height,
    })

    return {
      success: true,
    }
  })
