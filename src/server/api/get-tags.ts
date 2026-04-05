import { createServerFn } from '@tanstack/react-start'
import { db } from '../db'
import { tags } from '../db/schema'

export const getTags = createServerFn({
  method: 'GET',
}).handler(async () => {
  const rows = await db
    .selectDistinct({ label: tags.label })
    .from(tags)
    .orderBy(tags.label)

  return rows.map((r) => r.label)
})
