import { ART } from '../../data/artAssets.js';

export default function ActiveMasterCard({ master, lessonDone, trainDone, built, label, onEnter }) {
  return (
    <div className="border-2 border-accent bg-panel flex flex-col gap-3 px-3.5 py-3">
      <div className="flex items-center gap-2.5">
        <img src={master.portrait} alt={master.name} className="shrink-0 block w-12 h-12 object-cover border-2 border-frame bg-panel" />
        <div className="font-bold flex-1 min-w-0 text-ink">{master.name}</div>
        <div className="font-mono text-xs text-muted">{master.topic}</div>
      </div>
      <div className="flex gap-1 flex-wrap">
        {[
          ['Урок', lessonDone],
          ['Тренировка ' + trainDone + '/3', trainDone === 3],
          ['Стройка', built],
        ].map(([label2, done]) => (
          <span
            key={label2}
            className={'font-mono text-xs px-3 py-1.5 bg-no-repeat bg-center text-code-ink' + (done ? ' font-bold' : '')}
            style={{ backgroundImage: `url(${ART.tagWood})`, backgroundSize: '100% 100%' }}
          >
            {(done ? '✓ ' : '') + label2}
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={onEnter}
        className="font-body bg-accent text-accent-ink border-2 border-accent font-bold min-h-11 px-3.5 py-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      >
        {label}
      </button>
    </div>
  );
}
