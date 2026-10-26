import { ART } from '../artAssets.js';
import { needOne, needClass, needParagraphWithBold } from '../../engine/textRules.js';
import { needColor, needFontFamily } from '../../engine/cssJudge.js';
import { CURSOR_MARK } from '../../engine/editorOps.js';
import { ECONOMY } from '../economyConfig.js';

// Сцена 2 «Красильня». Шрифт в экзамене пока обычный (sans-serif) — пиксельный
// подключим на отдельном визуальном проходе вместе с палитрой из reference/art/landing/.
export default {
  id: 'dyer',
  place: 'Красильня',
  landingBlockId: 'hero',
  background: { closed: ART.dyerGreyBg, open: ART.dyerColorBg },
  mentor: { name: 'Дух Перемен', portrait: ART.mentorPortrait },
  resident: { name: 'Красильщица', portrait: ART.dyerPortrait },

  intro: [
    {
      speaker: 'resident',
      text: 'О, горе! Вывеска стоит, а красок в ней ни капли! Это не вывеска, это трагедия в серых тонах!',
    },
    {
      speaker: 'mentor',
      text:
        'class — это бирка на вывеске. Кисть читает бирку и знает, что красить: пишешь class="hero-title" на теге, и CSS находит его по этой бирке. ' +
        'class пишется внутри открывающего тега, после его имени; закрывающий тег остаётся как был: </h1>.',
    },
    {
      speaker: 'mentor',
      text: 'В CSS бирку ищут через точку: .hero-title { color: значение; }.',
    },
    {
      speaker: 'mentor',
      text: '#14b8a6 — это запись цвета. Пока просто переписывай её как есть, разберёмся позже.',
    },
    {
      speaker: 'mentor',
      text: 'font-family: sans-serif — шрифт без засечек, простой.',
    },
  ],

  lesson: {
    explain: [
      '`class` — это имя-бирка на теге: `<h1 class="hero-title">`. Пишется внутри открывающего тега, после его имени; закрывающий тег остаётся как был: `</h1>`.',
      'В CSS к бирке обращаются через точку: `.hero-title { color: ...; }`.',
      'Внутри фигурных скобок можно написать несколько свойств: `color` — цвет текста, `background` — цвет фона, `font-family` — шрифт.',
    ],
    examples: [
      {
        title: 'Пример',
        code: '<h1 class="tea-title">Чайная</h1>',
        css: '.tea-title {\n  color: #b45309;\n}',
        note: 'class="tea-title" — бирка на заголовке. .tea-title { color: #b45309; } красит текст в охру.',
      },
    ],
  },

  training: [
    {
      task: 'Покрась заголовок «Чайная» такими значениями:',
      html: '<h1 class="tea-title">Чайная</h1>',
      starter: '.tea-title {\n  ' + CURSOR_MARK + '\n}',
      target: '.tea-title {\n  color: #b45309;\n}',
      hints: [
        'Селектор начинается с точки: .tea-title',
        'Внутри фигурных скобок — color: значение;',
        '.tea-title {\n  color: #b45309;\n}',
      ],
      rule: (wrapper) => needColor(wrapper, '.tea-title', 'color', '#b45309', 'цвет текста'),
    },
    {
      task: 'Теперь фон для «Кожевни» такими значениями:',
      html: '<h1 class="leather-title">Кожевня</h1>',
      starter: '.leather-title {\n  ' + CURSOR_MARK + '\n}',
      target: '.leather-title {\n  background: #5b3a21;\n}',
      hints: [
        'Свойство для фона — background (или background-color).',
        'Значение — тот же формат, что и у color: #5b3a21.',
        '.leather-title {\n  background: #5b3a21;\n}',
      ],
      rule: (wrapper) => needColor(wrapper, '.leather-title', 'backgroundColor', '#5b3a21', 'фон'),
    },
    {
      task: 'Собери всё вместе для «Пряностей» такими значениями:',
      html: '<h1 class="spice-title">Пряности</h1>',
      starter: '.spice-title {\n  ' + CURSOR_MARK + '\n}',
      target: '.spice-title {\n  color: #ffffff;\n  background: #b91c1c;\n  font-family: sans-serif;\n}',
      hints: [
        'Три свойства в одних фигурных скобках, каждое на своей строке с точкой с запятой.',
        'color — текст белый, background — красный, font-family — sans-serif.',
        '.spice-title {\n  color: #ffffff;\n  background: #b91c1c;\n  font-family: sans-serif;\n}',
      ],
      rule: (wrapper) =>
        needColor(wrapper, '.spice-title', 'color', '#ffffff', 'цвет текста') ||
        needColor(wrapper, '.spice-title', 'backgroundColor', '#b91c1c', 'фон') ||
        needFontFamily(wrapper, '.spice-title', 'sans-serif'),
    },
  ],

  // Экзамен в два касания: сперва повесить class на настоящий Hero (вкладка HTML),
  // потом одеть его в цвет (вкладка CSS). Ломать нечего — заголовок уже стоит на месте.
  exam: {
    html: {
      task: 'Повесь class="hero-title" на настоящий заголовок рынка — текст внутри не трогай.',
      starter: '<h1>Торг-Хаб</h1>\n<p>Всё для жителей <b>Города Кода</b></p>',
      target: '<h1 class="hero-title">Торг-Хаб</h1>\n<p>Всё для жителей <b>Города Кода</b></p>',
      hints: [],
      rule: (body) =>
        needOne(body, 'h1', 'Торг-Хаб') ||
        needClass(body, 'h1', 'hero-title') ||
        needParagraphWithBold(body, 'Всё для жителей Города Кода', 'Города Кода'),
    },
    css: {
      task: 'Одень вывеску такими значениями:',
      html: '<h1 class="hero-title">Торг-Хаб</h1>\n<p>Всё для жителей <b>Города Кода</b></p>',
      starter: '',
      target: '.hero-title {\n  color: #14b8a6;\n  background: #1e293b;\n  font-family: sans-serif;\n}',
      hints: [],
      rule: (wrapper) =>
        needColor(wrapper, '.hero-title', 'color', '#14b8a6', 'цвет текста') ||
        needColor(wrapper, '.hero-title', 'backgroundColor', '#1e293b', 'фон') ||
        needFontFamily(wrapper, '.hero-title', 'sans-serif'),
    },
    reward: { coins: ECONOMY.examRewardCoins },
    penalty: { hp: ECONOMY.examMistakePenaltyHp },
  },

  outro: [
    { speaker: 'resident', text: 'Вот это другое дело. Теперь вывеску видно издалека.' },
    { speaker: 'mentor', text: 'Дальше — Площадь: там расскажем рынку, чем он хорош.' },
  ],
};
