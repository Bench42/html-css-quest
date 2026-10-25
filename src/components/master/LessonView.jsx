import Say from '../common/Say.jsx';
import ShadowPreview from '../common/ShadowPreview.jsx';
import ArtPanel from '../art/ArtPanel.jsx';
import ArtButton from '../art/ArtButton.jsx';

export default function LessonView({ master, card, onPrev, onNext }) {
  const L = master.lesson;
  const c = L[card];
  const last = card === L.length - 1;
  return (
    <div className="flex flex-col gap-3">
      <Say name={master.name} portrait={master.portrait} lines={c.say} />
      <ArtPanel variant="parchment" className="flex flex-col gap-3 px-6 py-5">
        <div className="font-mono text-xs text-muted">{'Карточка ' + (card + 1) + ' из ' + L.length}</div>
        <h2 className="font-body font-bold text-lg m-0 text-ink">{c.t}</h2>
        <p className="m-0" dangerouslySetInnerHTML={{ __html: c.text }} />
        {c.parts ? (
          <div className="flex gap-1.5 flex-wrap">
            {c.parts.map((part, i) => (
              <div className="border-2 border-line bg-code text-code-ink px-2.5 py-1.5 text-center" key={i}>
                <b className="block font-medium font-mono text-sm">{part[0]}</b>
                <span className="text-xs text-muted">{part[1]}</span>
              </div>
            ))}
          </div>
        ) : (
          <pre className="font-mono text-sm leading-normal bg-code text-code-ink border-2 border-line p-2.5 whitespace-pre-wrap overflow-x-auto m-0">{c.code}</pre>
        )}
        {c.show && <ShadowPreview label="Получится" html={c.code} />}
        {c.bad && (
          <div className="border-2 border-bad bg-bad-soft px-2.5 py-2">
            <pre className="font-mono text-sm leading-normal bg-transparent border-0 p-0 whitespace-pre-wrap overflow-x-auto m-0">{c.bad}</pre>
            <p className="text-[13px] text-muted mt-1.5">{c.badNote}</p>
          </div>
        )}
      </ArtPanel>
      <div className="flex gap-2">
        {card > 0 && (
          <ArtButton variant="secondary" onClick={onPrev} className="flex-1">
            Назад
          </ArtButton>
        )}
        <ArtButton variant="primary" onClick={onNext} className="flex-[2]">
          {last ? 'К тренировке' : 'Дальше'}
        </ArtButton>
      </div>
    </div>
  );
}
