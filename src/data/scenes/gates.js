import { ART } from '../artAssets.js';

// Сцена 1 «Ворота». Форма данных закладываем сейчас, содержание (тексты, задания) — в шаге 5.
export default {
  id: 'gates',
  place: 'Ворота Города Кода',
  landingBlockId: 'hero',
  background: { closed: ART.gatesClosedBg, open: ART.gatesOpenBg },
  mentor: { name: 'Дух Перемен', portrait: ART.mentorPortrait },
  resident: { name: 'Стражник', portrait: ART.guardPortrait },

  intro: [],

  lesson: {
    explain: '',
    examples: [],
  },

  training: [],

  exam: {
    task: '',
    prefilled: '',
    rule: () => null,
    reward: { coins: 0 },
    penalty: { hp: 0 },
  },

  outro: [],
};
