import { useCallback, useRef } from 'react';

function useDebounce(callback, delay = 500) {
  const timeoutRef = useRef(null);

  // useCallback으로 감싸서 반환하여 사용 시 바로 debounce를 적용
  return useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;

      callback();
    }, delay);
  }, [callback, delay]);
}

export default useDebounce;
