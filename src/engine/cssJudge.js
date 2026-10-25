import { clean } from './sanitize.js';

// Защита CSS игрока: без внешних подключений и без побега за рамки превью.
// Это не разбор в AST, а текстовые замены — для учебных работ этого достаточно.
export function sanitizeCss(css) {
  let out = String(css);
  out = out.replace(/\/\*[\s\S]*?\*\//g, ''); // сначала убрать комментарии, иначе в них можно спрятать обход
  out = out.replace(/@import[^;]*;?/gi, ''); // грузит чужую таблицу стилей
  out = out.replace(/url\([^)]*\)/gi, 'none'); // внешние адреса; картинки через CSS — урок позже
  out = out.replace(/position\s*:\s*(fixed|sticky)\b/gi, 'position: static'); // не даём вылезти за рамки превью
  return out;
}

// Рендерит html+css вместе в скрытом shadow root (вне экрана, но в документе —
// иначе getComputedStyle не посчитает реальные значения) и отдаёт обёртку в fn.
function withRendered(html, css, fn) {
  const host = document.createElement('div');
  host.style.cssText = 'position:fixed;left:-9999px;top:0;width:360px;overflow:hidden;';
  document.body.appendChild(host);
  const root = host.attachShadow({ mode: 'open' });
  const style = document.createElement('style');
  style.textContent = sanitizeCss(css);
  root.appendChild(style);
  const wrapper = document.createElement('div');
  wrapper.style.position = 'relative'; // чтобы abs-позиционированные дети не сбежали из обёртки
  wrapper.appendChild(clean(html));
  root.appendChild(wrapper);
  try {
    return fn(wrapper);
  } finally {
    document.body.removeChild(host);
  }
}

// Браузер сам приводит любой формат цвета к rgb() — сравниваем через него,
// чтобы color: red и color: #ff0000 считались одинаковыми.
function toRgb(colorValue) {
  const probe = document.createElement('div');
  probe.style.color = colorValue;
  document.body.appendChild(probe);
  const rgb = getComputedStyle(probe).color;
  document.body.removeChild(probe);
  return rgb;
}

// prop — имя в JS-стиле вычисленных стилей: 'color' или 'backgroundColor'
// (а не CSS-текст 'background') — так работает и шорткат background, и background-color.
export function needColor(wrapper, selector, prop, expected, label) {
  const el = wrapper.querySelector(selector);
  if (!el) return 'Не нашёл на странице элемент «' + selector + '». Проверь, что в HTML есть нужный class.';
  const got = getComputedStyle(el)[prop];
  if (got !== toRgb(expected)) {
    return 'У «' + selector + '» сейчас не тот ' + (label || prop) + '. Проверь значение в CSS.';
  }
  return null;
}

export function needFontFamily(wrapper, selector, expectedName) {
  const el = wrapper.querySelector(selector);
  if (!el) return 'Не нашёл на странице элемент «' + selector + '». Проверь, что в HTML есть нужный class.';
  const got = getComputedStyle(el).fontFamily.toLowerCase();
  if (!got.includes(expectedName.toLowerCase())) {
    return 'У «' + selector + '» не тот шрифт. Нужен «' + expectedName + '».';
  }
  return null;
}

// Проверка CSS по вычисленным стилям: rule(wrapper) видит реальный DOM с применённым CSS.
export function judgeCss(html, css, rule) {
  if (!css.trim()) return 'Стиль пока пуст. Начни с .имя { }';
  return withRendered(html, css, (wrapper) => rule(wrapper));
}
