import CodeBlock from './CodeBlock.jsx';

export default function HintBox({ hints, used }) {
  if (!used) return null;
  return (
    <div className="flex flex-col gap-1.5">
      {Array.from({ length: used }).map((_, n) =>
        n === 2 ? (
          <div className="bg-ember-soft text-ink px-2.5 py-2 text-sm" key={n}>
            <b>Решение:</b>
            <div className="mt-1.5">
              <CodeBlock code={hints[2]} />
            </div>
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
