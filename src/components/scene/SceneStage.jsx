// Верх экрана: фон сцены под ситуацию + облачко реплики персонажа.
// Фон пока цветная заглушка — картинки появятся позже (см. CLAUDE.md).
// После верного решения сцена меняется и появляется кнопка перехода на следующую (nextLabel).
export default function SceneStage({ speakerName, lines, nextLabel, nextDisabled, onNext, className }) {
  return (
    <div
      className={
        'border border-gray-300 bg-slate-700 text-white p-4 min-h-[140px] flex flex-col justify-end gap-2' +
        (className ? ' ' + className : '')
      }
    >
      {speakerName && (
        <div className="self-start max-w-full bg-white text-gray-900 text-sm px-3 py-2">
          <b>{speakerName}:</b> {[].concat(lines).join(' ')}
        </div>
      )}
      {nextLabel && (
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className="self-end min-h-9 px-3 py-1.5 text-sm bg-white text-gray-900 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {nextLabel}
          {nextDisabled && ' (скоро)'}
        </button>
      )}
    </div>
  );
}
