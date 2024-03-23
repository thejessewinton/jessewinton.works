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

const ExperienceIndex = defineDocumentType(() => ({
  name: 'ExperienceIndex',
  filePathPattern: 'experience.md',
  isSingleton: true,
  contentType: 'markdown',
  fields: {
    title: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string'
    }
  },
  computedFields
}))

const Experience = defineDocumentType(() => ({
  name: 'Experience',
  filePathPattern: 'experience/**/*.md',
  contentType: 'markdown',
  fields: {
    title: {
      type: 'string',
      required: true
    },
    role: {
      type: 'string',
      required: true
    },
    startDate: {
      type: 'string',
      required: true
    },
    endDate: {
      type: 'string',
      required: false
    }
  }
}))


export default makeSource({
  contentDirPath: './src/content',
  documentTypes: [Index, ExperienceIndex, Experience],
});
