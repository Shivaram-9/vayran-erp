'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div style={{ padding: '40px', backgroundColor: '#fee2e2', color: '#991b1b', fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Something went wrong!</h2>
      <p style={{ marginTop: '10px' }}><strong>Error Message:</strong> {error.message}</p>
      {error.stack && (
        <pre style={{ marginTop: '20px', padding: '10px', backgroundColor: '#fff', border: '1px solid #fca5a5', overflowX: 'auto' }}>
          {error.stack}
        </pre>
      )}
      <button
        style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
