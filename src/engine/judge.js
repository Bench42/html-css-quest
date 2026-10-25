import { balance } from './textRules.js';

export function judge(code, rule) {
  if (!code.trim()) return 'Редактор пока пуст. Тапни кнопку тега, чтобы начать.';
  const bal = balance(code);
  if (bal) return bal;
  const doc = new DOMParser().parseFromString(code, 'text/html');
  return rule(doc.body);
}
