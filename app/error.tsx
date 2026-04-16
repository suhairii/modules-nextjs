"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
      <p className="text-slate-500 mb-6">{error.message || "An unexpected error occurred."}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all"
      >
        Try again
      </button>
    </div>
  );
}
