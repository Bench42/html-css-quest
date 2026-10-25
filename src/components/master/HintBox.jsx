export default function HintBox({ hints, used }) {
  if (!used) return null;
  return (
    <div className="flex flex-col gap-1.5">
      {Array.from({ length: used }).map((_, n) =>
        n === 2 ? (
          <div className="bg-ember-soft text-ink px-2.5 py-2 text-sm" key={n}>
            <b>Решение:</b>
            <pre className="mt-1.5 font-mono text-sm leading-normal whitespace-pre-wrap">{hints[2]}</pre>
          </div>
        ) : (
          <div className="bg-ember-soft text-ink px-2.5 py-2 text-sm" key={n}>
            {hints[n]}
          </div>
        ),
      )}
    </div>
  );
}
