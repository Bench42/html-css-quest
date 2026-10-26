import { useState } from 'react';

// Верх экрана: фон сцены под ситуацию + персонажи + облачко реплики.
// После верного решения (open=true) фон переходит closed -> open с короткой вспышкой света,
// но только в момент самого перехода — если страница загрузилась уже в open, вспышки нет
// (паттерн: сравнение предыдущего и текущего значения прямо в рендере, без эффекта).
export default function SceneStage({
  backgroundClosed,
  backgroundOpen,
  open,
  residentFullBody,
  speakerName,
  speakerPortrait,
  lines,
  nextLabel,
  nextDisabled,
  onNext,
  className,
}) {
  const [prevOpen, setPrevOpen] = useState(open);
  const [flash, setFlash] = useState(false);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) setFlash(true);
  }

  const hasBg = Boolean(backgroundClosed);

  return (
    <div
      className={
        'relative overflow-hidden border border-border aspect-[4/3] flex flex-col justify-start' +
        (hasBg ? '' : ' bg-panel') +
        (className ? ' ' + className : '')
      }
    >
      {hasBg && (
        <img
          src={backgroundClosed}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      )}
      {hasBg && backgroundOpen && (
        <img
          src={backgroundOpen}
          alt=""
          className={'absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700' + (open ? ' opacity-100' : ' opacity-0')}
        />
      )}
      {flash && (
        <div
          className="absolute inset-0 bg-white animate-flash pointer-events-none"
          onAnimationEnd={() => setFlash(false)}
        />
      )}

      {residentFullBody && (
        <img src={residentFullBody} alt="" className="absolute bottom-0 left-[8%] h-[52%] object-contain" />
      )}

      {speakerName && (
        <div className="relative m-2 max-w-[78%] md:max-w-[340px] max-h-28 md:max-h-36 overflow-y-auto flex items-start gap-2 bg-panel text-text text-xs px-2 py-1.5 border border-border">
          {speakerPortrait && <img src={speakerPortrait} alt="" className="w-10 h-10 object-cover shrink-0" />}
          <div>
            <b>{speakerName}:</b> {[].concat(lines).join(' ')}
          </div>
        </div>
      )}

      {nextLabel && (
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className="relative self-end mt-auto m-3 min-h-9 px-3 py-1.5 text-sm bg-primary text-primary-ink disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {nextLabel}
          {nextDisabled && ' (скоро)'}
        </button>
      )}
    </div>
  );
}
