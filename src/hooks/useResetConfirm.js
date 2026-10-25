import { useRef, useState } from 'react';

export function useResetConfirm(onConfirm, delay = 3000) {
  const [armed, setArmed] = useState(false);
  const timerRef = useRef(null);

  function handleClick() {
    if (armed) {
      clearTimeout(timerRef.current);
      setArmed(false);
      onConfirm();
      return;
    }
    setArmed(true);
    timerRef.current = setTimeout(() => setArmed(false), delay);
  }

  return { armed, handleClick };
}
