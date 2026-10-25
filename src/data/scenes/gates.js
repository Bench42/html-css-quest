import { ART } from '../artAssets.js';
import { needOne } from '../../engine/textRules.js';

// Сцена 1 «Ворота». Форма данных закладываем сейчас, содержание (тексты, задания) — в шаге 5.
export default {
  id: 'gates',
  place: 'Ворота Города Кода',
  landingBlockId: 'hero',
  background: { closed: ART.gatesClosedBg, open: ART.gatesOpenBg },
  mentor: { name: 'Дух Перемен', portrait: ART.mentorPortrait },
  resident: { name: 'Стражник', portrait: ART.guardPortrait },

  intro: [
    { speaker: 'resident', text: 'Стой! Без таблички над воротами Городской Совет чужих не пускает.' },
    {
      speaker: 'mentor',
      text: 'Я помогу тебе, Новичок. Город построен на двух языках: HTML — это скелет страницы, CSS — её одежда.',
    },
    { speaker: 'mentor', text: 'Сначала поставим скелет: имя рынка и короткую фразу о нём. Остальное наведём позже.' },
  ],

  lesson: {
    explain:
      'HTML описывает смысл частей страницы тегами. <h1> — главный заголовок, один на страницу. ' +
      '<p> — обычный текст, абзац. <b> делает слово внутри текста жирным, для акцента.',
    examples: [
      {
        title: 'Пример',
        code: '<h1>Кузница</h1>\n<p>Горячие <b>подковы</b> для коней.</p>',
        note: 'h1 — заголовок, p — абзац, b — жирный акцент внутри текста.',
      },
    ],
  },

  training: [
    {
      task: 'Напечатай вывеску: один тег <h1> со словом «Торг-Хаб».',
      starter: '',
      target: '<h1>Торг-Хаб</h1>',
      hints: [
        'Нужен ровно один тег <h1>.',
        'Внутри тега — слово «Торг-Хаб», больше ничего.',
        '<h1>Торг-Хаб</h1>',
      ],
      rule: (body) => needOne(body, 'h1', 'Торг-Хаб'),
    },
  ],

  exam: {
    task: '',
    prefilled: '',
    rule: () => null,
    reward: { coins: 0 },
    penalty: { hp: 0 },
  },

  outro: [],
};
