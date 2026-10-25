export function norm(s) {
  return s.replace(/\s+/g, ' ').trim();
}

export function same(a, b) {
  const f = (s) => norm(s).replace(/ё/g, 'е').replace(/Ё/g, 'Е');
  return f(a) === f(b);
}

export const VOID = new Set(['img', 'br', 'hr', 'input', 'meta', 'link']);

export function balance(code) {
  const re = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g;
  const st = [];
  let m;
  while ((m = re.exec(code))) {
    const close = m[1] === '/';
    const name = m[2].toLowerCase();
    if (VOID.has(name)) continue;
    if (!close) {
      st.push(name);
      continue;
    }
    if (!st.length) return 'Лишний закрывающий тег </' + name + '>: перед ним нет открывающего.';
    const top = st[st.length - 1];
    if (top !== name) {
      return 'Ожидался </' + top + '>, а найден </' + name + '>. Теги закрывают в обратном порядке: сначала внутренний.';
    }
    st.pop();
  }
  if (st.length) {
    const t = st[st.length - 1];
    return 'Тег <' + t + '> не закрыт. Закрывающий тег пишется со слэшем: </' + t + '>.';
  }
  return null;
}

export function needOne(body, tag, text) {
  const list = [...body.querySelectorAll(tag)];
  if (!list.length) return 'Не нашёл тег <' + tag + '>.';
  if (list.length > 1) return 'У тебя ' + list.length + ' тегов <' + tag + '>, а нужен один.';
  const got = norm(list[0].textContent);
  if (!same(got, text)) return 'В теге <' + tag + '> должно быть «' + text + '», а у тебя «' + got + '».';
  return null;
}

export function needParagraphWithBold(body, pText, boldWord) {
  const ps = [...body.querySelectorAll('p')];
  if (!ps.length) return 'Не нашёл тег <p>.';
  if (ps.length > 1) return 'У тебя ' + ps.length + ' тегов <p>, а нужен один.';
  const p = ps[0];
  const got = norm(p.textContent);
  if (!same(got, pText)) return 'В теге <p> должно быть «' + pText + '», а у тебя «' + got + '».';
  const bolds = [...p.querySelectorAll('b')];
  if (!bolds.length) return 'Слово «' + boldWord + '» должно быть жирным — заверни его в <b>.';
  if (bolds.length > 1 || !same(bolds[0].textContent, boldWord)) return 'Жирным должно быть только «' + boldWord + '».';
  return null;
}

export function needClass(body, tag, className) {
  const list = [...body.querySelectorAll(tag)];
  if (!list.length) return 'Не нашёл тег <' + tag + '>.';
  if (list.length > 1) return 'У тебя ' + list.length + ' тегов <' + tag + '>, а нужен один.';
  if (!list[0].classList.contains(className)) {
    return 'На <' + tag + '> нет class="' + className + '". Допиши class прямо в открывающем теге.';
  }
  return null;
}

export function needOrder(body) {
  const h = body.querySelector('h1');
  const p = body.querySelector('p');
  if (h && p && !(h.compareDocumentPosition(p) & Node.DOCUMENT_POSITION_FOLLOWING)) {
    return 'Абзац должен идти под заголовком.';
  }
  return null;
}
