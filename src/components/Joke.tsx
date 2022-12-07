'use client';

import { useEffect, useState } from 'react';

export const Joke = () => {
  const [showCumHeading, setShowCumHeading] = useState(false);
  const [showSubCumHeading, setShowSubCumHeading] = useState(false);
  const [showMan, setShowMan] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowCumHeading(true);
    }, 3000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowSubCumHeading(true);
    }, 6000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowMan(true);
    }, 7000);
  }, []);

  return (
    <>
      {showCumHeading ? (
        <h1 className="leading-tight mb-6 text-[33vw]">CUM.</h1>
      ) : null}
      <p
        className={
          showSubCumHeading
            ? 'transition-all text-white text-lg'
            : 'transition-all text-neutral-900 text-lg'
        }
      >
        And, know me better...
        <span
          className={
            showMan
              ? 'transition-all text-white'
              : 'transition-all text-neutral-900'
          }
        >
          {' '}
          man.
        </span>
      </p>
    </>
  );
};
