// contentlayer.config.ts
import {
  defineDocumentType,
  makeSource,
  defineNestedType
} from "contentlayer/source-files";
var computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`
  }
};
var Index = defineDocumentType(() => ({
  name: "Index",
  filePathPattern: "index.md",
  contentType: "markdown",
  fields: {
    title: {
      type: "string",
      required: true
    },
    description: {
      type: "string"
    },
    works: {
      type: "list",
      of: defineNestedType(() => ({
        name: "Works",
        fields: {
          label: { type: "string", required: true },
          title: { type: "string", required: true },
          description: {
            type: "string",
            required: true
          },
          url: {
            type: "string",
            required: false
          }
        }
      }))
    }
  },
  computedFields
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "./src/content",
  documentTypes: [Index]
});
export {
  Index,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-7BQNC5IW.mjs.map
