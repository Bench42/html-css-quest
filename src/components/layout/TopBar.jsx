import { useResetConfirm } from '../../hooks/useResetConfirm.js';

export default function TopBar({ hp, coins, onReset }) {
  const { armed, handleClick } = useResetConfirm(onReset);
  return (
    <div className="flex items-center justify-between gap-2.5 mb-3">
      <h1 className="text-lg font-bold m-0">Город Кода</h1>
      <div className="flex items-center gap-3 text-sm">
        <span aria-label="Здоровье">❤ {hp}</span>
        <span aria-label="Монеты">🪙 {coins}</span>
        <button
          type="button"
          onClick={handleClick}
          className="bg-gray-100 border border-gray-400 min-h-9 px-2.5 py-1 text-[13px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {armed ? 'Точно сбросить?' : 'Начать заново'}
        </button>
      </div>
    </div>
  );
}
