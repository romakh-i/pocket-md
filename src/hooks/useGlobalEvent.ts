import { DependencyList, useCallback, useEffect } from 'react';

const useGlobalEvent = (
  event: keyof DocumentEventMap,
  callback: EventListener,
  dependencies?: DependencyList,
): void => {
  const deps = dependencies || [];
  /* eslint-disable-next-line react-hooks/exhaustive-deps -- handled properly */
  const globalCallback = useCallback(callback, deps);

  useEffect(() => {
    document.addEventListener(event, globalCallback);

    return () => {
      document.removeEventListener(event, globalCallback);
    };
  }, [event, globalCallback]);
};

export default useGlobalEvent;
