import type { ComputedFields } from 'contentlayer/source-files';
import { defineDocumentType, makeSource } from 'contentlayer/source-files';

const computedFields: ComputedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
};

export const Index = defineDocumentType(() => ({
  name: 'Index',
  filePathPattern: 'index.md',
  contentType: 'markdown',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: './src/content',
  documentTypes: [Index],
});
