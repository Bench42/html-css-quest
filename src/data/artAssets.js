// Картинки новой концепции «Город Кода». Файлы лежат в public/art/ (имена — как в
// исходниках reference/art/cut/, не переименовываем). Пустая строка — картинки пока
// нет (будет сгенерирована позже); компоненты рисуют цветную заглушку, если путь пуст.
// import.meta.env.BASE_URL — это настройка base из vite.config.js (сейчас /html-css-quest/,
// в dev — /). Без неё пути вида '/art/...' при публикации на GitHub Pages ведут в корень
// домена, а не в подпапку сайта, и картинки не грузятся.
const BASE = import.meta.env.BASE_URL;

export const ART = {
  gatesClosedBg: BASE + 'art/gates-closed.png',
  gatesOpenBg: BASE + 'art/gates-open.png',
  mentorPortrait: BASE + 'art/mentor-calm.png',
  guardPortrait: '',
  guardFull: BASE + 'art/guard.png',
  noviceFull: BASE + 'art/novice.png',
  dyerGreyBg: '',
  dyerColorBg: '',
  dyerPortrait: '',
};
