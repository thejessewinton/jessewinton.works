import React from 'react';

import NextHead from 'next/head';
import { useRouter } from 'next/router';

import { config } from '../../site.config';

interface SEOProps {
  title: string;
  description?: string;
  banner?: string;
  canonical?: string;
}

export const Head = ({ title, description }: SEOProps) => {
  const { asPath } = useRouter();
  const { siteUrl, siteTitle, favicon, metaDescription } = config;

  const seo = {
    title: title || siteTitle,
    url: `${siteUrl}${asPath || ''}`,
    description: description || metaDescription,
  };

  return (
    <>
      <NextHead>
        <title>{`${siteTitle} – ${title}`}</title>
        <link rel="shortcut icon" href={favicon} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={seo.description}></meta>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:site_name" content={seo.title} />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:title" content={seo.title} />
        <meta property="twitter:description" content={seo.description} />
      </NextHead>
    </>
  );
};
