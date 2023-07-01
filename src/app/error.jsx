'use client'
import { useEffect } from 'react';

export default function Error({error,reset,}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h1>Something wrong!</h1>
      <button
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}