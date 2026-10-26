import ShadowPreview from '../common/ShadowPreview.jsx';
import CodeBlock from '../common/CodeBlock.jsx';

// Текст в обратных кавычках (`<p>`, class, .hero-title) выводим моноширинным шрифтом,
// как в блоке кода — без dangerouslySetInnerHTML, просто разбираем строку на части.
function withInlineCode(text) {
  return text.split(/`([^`]+)`/g).map((part, i) =>
    i % 2 === 1 ? (
      <code key={i} className="font-mono bg-panel-soft text-text px-1">
        {part}
      </code>
    ) : (
      part
    )
  );
}

export default function MentorTab({ scene }) {
  // lesson.explain — массив абзацев (строка или { text, muted } для приглушённого цвета);
  // старый формат (explain — одна строка) тоже поддержан.
  const paragraphs = Array.isArray(scene.lesson.explain) ? scene.lesson.explain : [scene.lesson.explain];

  return (
    <div className="flex flex-col gap-3 text-sm">
      <div className="flex flex-col gap-1.5">
        {scene.intro.map((line, i) => (
          <p key={i} className="m-0">
            <b>{line.speaker === 'mentor' ? scene.mentor.name : scene.resident.name}:</b> «{line.text}»
          </p>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {paragraphs.map((p, i) => {
          const muted = typeof p === 'object' && p.muted;
          const text = typeof p === 'object' ? p.text : p;
          return (
            <p key={i} className={muted ? 'm-0 text-text-muted' : 'm-0'}>
              {withInlineCode(text)}
            </p>
          );
        })}
      </div>

      {scene.lesson.examples.map((ex, i) => (
        <div key={i} className="flex flex-col gap-1.5">
          {ex.title && <p className="m-0 font-bold">{ex.title}</p>}
          <ShadowPreview label="Как это выглядит" html={ex.code} css={ex.css} />
          <CodeBlock code={ex.code} />
          {ex.css && <CodeBlock code={ex.css} />}
          {ex.note && <p className="m-0 text-text-muted">{ex.note}</p>}
        </div>
      ))}
    </div>
  );
}
