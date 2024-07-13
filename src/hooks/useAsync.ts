import { useCallback, useState } from 'react';

type AsyncFunction = (...args: any[]) => Promise<any>;

export default function useAsync(
  asyncFunction: AsyncFunction
): [boolean, any, (...args: any[]) => Promise<any>] {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<any>(null);

  const wrappedFunction = useCallback(
    async (...args: any[]) => {
      try {
        setError(null);
        setPending(true);
        return await asyncFunction(...args);
      } catch (error) {
        setError(error);
        return;
      } finally {
        setPending(false);
      }
    },
    [asyncFunction]
  );

  return [pending, error, wrappedFunction];
}
