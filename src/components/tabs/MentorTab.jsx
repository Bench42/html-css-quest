import ShadowPreview from '../common/ShadowPreview.jsx';

export default function MentorTab({ scene }) {
  return (
    <div className="flex flex-col gap-3 text-sm">
      <div className="flex flex-col gap-1.5">
        {scene.intro.map((line, i) => (
          <p key={i} className="m-0">
            <b>{line.speaker === 'mentor' ? scene.mentor.name : scene.resident.name}:</b> «{line.text}»
          </p>
        ))}
      </div>

      <p className="m-0">{scene.lesson.explain}</p>

      {scene.lesson.examples.map((ex, i) => (
        <div key={i} className="flex flex-col gap-1.5">
          {ex.title && <p className="m-0 font-bold">{ex.title}</p>}
          <ShadowPreview label="Как это выглядит" html={ex.code} />
          <pre className="font-mono text-sm whitespace-pre-wrap bg-gray-100 p-2 m-0">{ex.code}</pre>
          {ex.note && <p className="m-0 text-gray-600">{ex.note}</p>}
        </div>
      ))}
    </div>
  );
}
