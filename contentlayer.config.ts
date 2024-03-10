import {
  defineDocumentType,
  makeSource,
  defineNestedType,
  type ComputedFields,
} from 'contentlayer/source-files';

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
  isSingleton: true,
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
    },
    works: {
      type: 'list',
      of: defineNestedType(() => ({
        name: 'Works',
        fields: {
          label: { type: 'string', required: true },
          title: { type: 'string', required: true },
          description: {
            type: 'string',
            required: true,
          },
          url: {
            type: 'string',
            required: false,
          },
        },
      })),
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: './src/content',
  documentTypes: [Index],
});
