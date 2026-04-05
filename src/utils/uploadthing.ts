import {
  generateReactHelpers,
  generateUploadDropzone,
} from '@uploadthing/react'

import type { UploadRouter } from '../server/uploadthing'

export const UploadDropzone = generateUploadDropzone<UploadRouter>()
export const { useUploadThing } = generateReactHelpers<UploadRouter>()
