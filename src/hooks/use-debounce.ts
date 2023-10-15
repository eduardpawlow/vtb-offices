import { useRef } from 'react';

export default function useDebounce(func: Function, delay: number) {
  const ref = useRef<NodeJS.Timeout>();

  return (...args: any) => {
    clearTimeout(ref.current!);
    ref.current = setTimeout(() => func(...args), delay);
  };
}
