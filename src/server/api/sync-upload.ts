import { createServerFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'
import { db } from '../db'
import { images } from '../db/schema'

export const syncUpload = createServerFn({
  method: 'POST',
})
  .inputValidator(
    (data: { url: string; key: string; width: number; height: number }) => data,
  )
  .handler(async ({ data }) => {
    const token = getCookie('upload_token')

    if (token !== process.env.UPLOAD_TOKEN) {
      throw new Error('Unauthorized')
    }

    const [row] = await db
      .insert(images)
      .values({
        url: data.url,
        key: data.key,
        width: data.width,
        height: data.height,
      })
      .returning({ id: images.id })

    return {
      success: true,
      id: row!.id,
    }
  })
