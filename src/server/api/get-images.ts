import { createServerFn } from '@tanstack/react-start'
import { desc } from 'drizzle-orm'
import { db } from '../db'
import { images } from '../db/schema'

export const getImages = createServerFn({
  method: 'GET',
}).handler(async () => {
  return await db.select().from(images).orderBy(desc(images.createdAt))
})
