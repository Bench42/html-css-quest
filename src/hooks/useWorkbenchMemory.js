import { useRef } from 'react';

// Черновики кода и счётчики подсказок не сохраняются в localStorage, но должны
// переживать переключение между заданиями в рамках одной сессии — поэтому refs,
// а не state (чтобы их изменение не перерисовывало всё дерево).
export function useWorkbenchMemory() {
  const drafts = useRef({});
  const hints = useRef({});

  return {
    getDraft: (key) => drafts.current[key],
    setDraft: (key, value) => {
      drafts.current[key] = value;
    },
    getHints: (key) => hints.current[key],
    setHints: (key, value) => {
      hints.current[key] = value;
    },
    resetAll() {
      drafts.current = {};
      hints.current = {};
    },
  };
}
