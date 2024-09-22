'use client';

import { useEffect } from 'react';

type ErrorComponentProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorComponent({ error, reset }: ErrorComponentProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">문제가 발생했습니다!</h1>
      <p className="text-lg text-gray-700 mb-8">예기치 않은 오류가 발생했습니다. 다시 시도해 주세요.</p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-blue-500 text-white text-lg font-medium rounded hover:bg-blue-600 transition"
      >
        다시 시도하기
      </button>
    </div>
  );
}
