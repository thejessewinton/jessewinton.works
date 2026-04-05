import { type FileRouter, createUploadthing } from 'uploadthing/server'

const f = createUploadthing()

export const uploadRouter = {
  imageUploader: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      return { userId: 'fakeId' }
    })
    .onUploadComplete(async ({ metadata }) => {
      return { uploadedBy: metadata.userId }
    }),
} satisfies FileRouter

export type UploadRouter = typeof uploadRouter
