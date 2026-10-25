import { useResetConfirm } from '../../hooks/useResetConfirm.js';

export default function TopBar({ onReset }) {
  const { armed, handleClick } = useResetConfirm(onReset);
  return (
    <div className="flex items-center justify-between gap-2.5 mb-3">
      <h1 className="font-display text-lg tracking-wide m-0 text-ink">HTML/CSS Quest</h1>
      <button
        type="button"
        onClick={handleClick}
        className="font-body text-ink bg-panel border-2 border-line min-h-9 px-2.5 py-1 text-[13px] cursor-pointer focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      >
        {armed ? 'Точно сбросить?' : 'Начать заново'}
      </button>
    </div>
  );
}
