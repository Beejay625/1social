import { useEffect, useRef, useState } from 'react';

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  const [prevValue, setPrevValue] = useState<T | undefined>(undefined);
  
  useEffect(() => {
    setPrevValue(ref.current);
    ref.current = value;
  }, [value]);
  
  return prevValue;
}

export function useIsFirstRender(): boolean {
  const [isFirst, setIsFirst] = useState(true);
  
  useEffect(() => {
    if (isFirst) {
      setIsFirst(false);
    }
  }, [isFirst]);
  
  return isFirst;
}


