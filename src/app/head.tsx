const Head = () => {
  const title = 'Jesse Winton';
  const description =
    'Full-stack web developer with a passion for building beautiful, performant, and accessible websites and apps. Looking for the next gig.';
  return (
    <>
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
    </>
  );
};

export default Head;
