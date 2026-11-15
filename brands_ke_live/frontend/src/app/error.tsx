"use client";

export default function StorefrontError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="bk-status">
      <p className="bk-status-mark">Brands KE</p>
      <h1>The shop could not be loaded</h1>
      <p>Check the connection and try again.</p>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
