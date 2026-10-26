import { useResetConfirm } from '../../hooks/useResetConfirm.js';

export default function TopBar({ hp, coins, onReset }) {
  const { armed, handleClick } = useResetConfirm(onReset);
  return (
    <div className="flex items-center justify-between gap-2.5 mb-3">
      <h1 className="font-display text-lg text-text m-0">Город Кода</h1>
      <div className="flex items-center gap-3 text-sm text-text">
        <span aria-label="Здоровье">❤ {hp}</span>
        <span aria-label="Монеты">🪙 {coins}</span>
        <button
          type="button"
          onClick={handleClick}
          className="bg-panel border-2 border-accent text-accent min-h-9 px-2.5 py-1 text-[13px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {armed ? 'Точно сбросить?' : 'Начать заново'}
        </button>
      </div>
    </div>
  );
}
