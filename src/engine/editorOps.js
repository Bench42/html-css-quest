// Маркер места курсора в task.starter: при первом открытии задания курсор встаёт
// сюда, сам символ убирается. Нет маркера в starter — курсор просто в конце текста.
// Так заготовку (например «.имя { | }») можно включать/выключать настройкой данных,
// без правок кода редактора.
export const CURSOR_MARK = '\u0001';

export function splitStarterCursor(starter) {
  const idx = starter.indexOf(CURSOR_MARK);
  if (idx === -1) return { text: starter, cursor: starter.length };
  return { text: starter.slice(0, idx) + starter.slice(idx + CURSOR_MARK.length), cursor: idx };
}

export function insertTag(ta, name) {
  const s = ta.selectionStart;
  const e = ta.selectionEnd;
  const sel = ta.value.slice(s, e);
  const open = '<' + name + '>';
  const close = '</' + name + '>';
  ta.setRangeText(open + sel + close, s, e, 'end');
  const pos = s + open.length + sel.length;
  ta.setSelectionRange(pos, pos);
  ta.focus();
  ta.dispatchEvent(new Event('input'));
}

export function exitTag(ta) {
  const v = ta.value;
  const p = ta.selectionEnd;
  const i = v.indexOf('</', p);
  let pos = v.length;
  if (i >= 0) {
    const j = v.indexOf('>', i);
    pos = j < 0 ? v.length : j + 1;
  }
  ta.setSelectionRange(pos, pos);
  ta.focus();
}
