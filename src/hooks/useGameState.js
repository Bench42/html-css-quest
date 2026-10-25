import { useState } from 'react';
import { ECONOMY } from '../data/economyConfig.js';

const SAVE_KEY = 'hcq_save_city';

function freshState() {
  return {
    sceneId: 'gates',
    step: 'training', // training | exam | done — фаза цикла сцены (вкладку «Наставник» можно смотреть всегда)
    trainingIndex: 0,
    examPartIndex: 0, // для экзаменов в несколько частей (например HTML-часть, потом CSS-часть)
    hp: ECONOMY.startHp,
    coins: 0,
    passedBlocks: [], // блок стоит на месте, чёрно-белый (greyedIn)
    coloredBlocks: [], // блок в цвете (colored) — после сцены, которая его стилизует
  };
}

function loadInitial() {
  const fallback = freshState();
  try {
    const stored = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
    if (stored && typeof stored.sceneId === 'string') return Object.assign(fallback, stored);
  } catch {
    // повреждённое сохранение — начинаем с чистого состояния
  }
  return fallback;
}

function persist(state) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch {
    // localStorage недоступен — продолжаем без сохранения
  }
}

// Хранение состояния игрока (сцена, шаг цикла, HP, монеты). Правила экономики
// (штрафы, награды, покупка подсказки) добавятся в шаге 10 — здесь только хранение.
export function useGameState() {
  const [state, setState] = useState(loadInitial);

  function update(mutate) {
    setState((prev) => {
      const next = { ...prev, passedBlocks: [...prev.passedBlocks], coloredBlocks: [...prev.coloredBlocks] };
      mutate(next);
      persist(next);
      return next;
    });
  }

  function reset() {
    const fresh = freshState();
    persist(fresh);
    setState(fresh);
  }

  return { state, update, reset };
}
