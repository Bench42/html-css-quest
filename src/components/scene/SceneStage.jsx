// Верх экрана: фон сцены под ситуацию + облачко реплики персонажа.
// Фон пока цветная заглушка — картинки появятся позже (см. CLAUDE.md).
export default function SceneStage({ speakerName, lines }) {
  return (
    <div className="mb-3 border border-gray-300 bg-slate-700 text-white p-4 min-h-[140px] flex flex-col justify-end gap-2">
      {speakerName && (
        <div className="self-start max-w-full bg-white text-gray-900 text-sm px-3 py-2">
          <b>{speakerName}:</b> {[].concat(lines).join(' ')}
        </div>
      )}
    </div>
  );
}
