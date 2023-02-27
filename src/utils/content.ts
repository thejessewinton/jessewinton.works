import { allDocuments, type Index } from 'content';

export const getIndex = () => {
  return allDocuments.find((doc) => doc.slug === '/') as Index;
};
