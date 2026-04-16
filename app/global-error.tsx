"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">A Global Error Occurred</h2>
          <p className="text-slate-500 mb-6">{error.message}</p>
          <button
            onClick={() => reset()}
            className="px-6 py-2 bg-black text-white rounded-full font-medium"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
