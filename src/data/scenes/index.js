import gates from './gates.js';
import dyer from './dyer.js';

// Список всех 13 сцен по порядку. Наполнены пока сцены 1 («Ворота») и 2 («Красильня»);
// 3-13 — заглушки, ждут своего шага (locked: true).
export const SCENES = [
  { id: 'gates', title: 'Ворота', locked: false, data: gates },
  { id: 'dyer', title: 'Красильня', locked: false, data: dyer },
  { id: 'square', title: 'Площадь', locked: true },
  { id: 'signs', title: 'Указатели', locked: true },
  { id: 'artist', title: 'Лавка художника', locked: true },
  { id: 'frame', title: 'Каркас', locked: true },
  { id: 'orders', title: 'Окно заказов', locked: true },
  { id: 'mason', title: 'Каменщик', locked: true },
  { id: 'caravan', title: 'Караван', locked: true },
  { id: 'workshop', title: 'Мастерская шаблонов', locked: true },
  { id: 'warehouse', title: 'Склад', locked: true },
  { id: 'road', title: 'Дорога', locked: true },
  { id: 'council', title: 'Совет города', locked: true },
];
