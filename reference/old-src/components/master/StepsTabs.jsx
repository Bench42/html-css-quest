export default function StepsTabs({ step, onStep, lessonDone, trainDone, built }) {
  const items = [
    ['lesson', 'Урок', lessonDone],
    ['train', 'Тренировка ' + trainDone + '/3', trainDone === 3],
    ['build', 'Стройка', built],
  ];
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {items.map(([id, label, done]) => {
        const active = step === id;
        const textCls = done ? 'text-ok' : active ? 'text-accent' : 'text-ink';
        const borderCls = active ? 'border-accent' : 'border-line';
        return (
          <button
            key={id}
            type="button"
            onClick={() => onStep(id)}
            className={
              'min-h-10 px-1 py-1.5 text-[13px] text-center bg-panel border-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 ' +
              textCls + ' ' + borderCls + (active ? ' font-bold' : '')
            }
          >
            {(done ? '✓ ' : '') + label}
          </button>
        );
      })}
    </div>
  );
}
