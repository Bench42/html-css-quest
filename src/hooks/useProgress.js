import { useState } from 'react';

const SAVE_KEY = 'hcq_save1';

function loadInitial() {
  let s = { intro: false, lesson: false, train: [false, false, false], built: null };
  try {
    const stored = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
    if (stored && Array.isArray(stored.train)) s = Object.assign(s, stored);
  } catch {
    // повреждённое сохранение — начинаем с чистого состояния
  }
  if (s.lesson || s.built || s.train.some(Boolean)) s.intro = true;
  return s;
}

function persist(state) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch {
    // localStorage недоступен — продолжаем без сохранения
  }
}

export function useProgress() {
  const [progress, setProgress] = useState(loadInitial);

  function update(mutate) {
    setProgress((prev) => {
      const next = { ...prev, train: [...prev.train] };
      mutate(next);
      persist(next);
      return next;
    });
  }

  function reset() {
    const fresh = { intro: false, lesson: false, train: [false, false, false], built: null };
    persist(fresh);
    setProgress(fresh);
  }

  return { progress, update, reset };
}
