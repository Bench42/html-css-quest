// Глава 1: читает построенный код вывески (h1/p/b) и достаёт из него текст
// для показа поверх картинки вывески (sign-frame.png). Когда появятся мастера
// 2-10 со своими частями постройки, им понадобится свой способ доставать текст —
// обобщать стоит по факту 2-3 реальных примеров, не раньше.
import { norm } from '../engine/textRules.js';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function signParts(code) {
  const d = new DOMParser().parseFromString(code, 'text/html');
  const h = d.querySelector('h1');
  const p = d.querySelector('p');
  let line = '';
  if (p) {
    p.childNodes.forEach((n) => {
      const t = n.textContent.replace(/\s+/g, ' ');
      if (!t) return;
      line += n.nodeName.toLowerCase() === 'b' ? '<b>' + esc(t) + '</b>' : esc(t);
    });
  }
  return { title: h ? norm(h.textContent) : '', line: line.trim() };
}
