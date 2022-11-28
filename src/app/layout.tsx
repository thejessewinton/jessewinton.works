import { ReactNode } from 'react';

import { Inter } from '@next/font/google';
import '../styles/globals.css';
import classNames from 'classnames';

const inter = Inter();

const Layout = ({ children }: { children: ReactNode }) => {
  const title = 'Jesse Winton';
  const description =
    'Full-stack web developer with a passion for building beautiful, performant, and accessible websites. Head of engineering at VeroSkills.com';
  return (
    <html
      className={classNames(
        inter.className,
        'min-h-screen bg-neutral-900 font-sans text-base lg:text-lg selection:bg-gray-400 selection:text-gray-100 w-screen overflow-x-hidden overflow-y-scroll box-border antialiased'
      )}
    >
      <head>
        <title>{title}</title>
        <link rel="shortcut icon" href="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description}></meta>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content={title} />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </head>

      <body className="relative m-0 w-screen text-white leading-6">
        <main>
          <div className="min-h-screen flex flex-col items-center justify-center">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
};

export default Layout;
