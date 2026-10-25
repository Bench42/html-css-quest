import { ART } from '../../data/artAssets.js';

// Рамка через border-image (CSS-приём: края картинки растягиваются/повторяются,
// углы остаются как есть). Числа среза (slice) подобраны под реальные размеры
// файлов — если картинки ещё нет, остаётся обычная сплошная рамка запасного цвета.
const VARIANTS = {
  parchment: {
    src: ART.parchmentPanel,
    slice: '28',
    width: '28px',
    fallbackBorder: 'border-line',
    fallbackBg: 'bg-panel',
    text: 'text-ink',
  },
  chalkboard: {
    src: ART.chalkboardPanel,
    slice: '70 60 56 60',
    width: '26px 22px 20px 22px',
    fallbackBorder: 'border-frame',
    fallbackBg: 'bg-code',
    text: 'text-code-ink',
  },
};

export default function ArtPanel({ variant = 'parchment', className, children }) {
  const v = VARIANTS[variant];
  return (
    <div
      className={v.fallbackBorder + ' ' + v.fallbackBg + ' ' + v.text + ' ' + (className || '')}
      style={{
        // borderWidth резервирует место под содержимым — border-image-width сам по
        // себе этого не делает, только рисует картинку, без него текст подлезал под рамку.
        borderStyle: 'solid',
        borderWidth: v.width,
        borderImageSource: `url(${v.src})`,
        borderImageSlice: v.slice,
        borderImageWidth: v.width,
        borderImageRepeat: 'stretch',
      }}
    >
      {children}
    </div>
  );
}
