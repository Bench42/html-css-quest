// Полоса навигации по сценам: назад — к любой уже просмотренной, вперёд — не дальше
// сцены реального прогресса (её же нельзя перепрыгнуть). На телефоне названия скрыты —
// остаются стрелки и счётчик.
export default function SceneNav({ scenes, viewSceneId, currentSceneId, onChange }) {
  const viewIndex = scenes.findIndex((s) => s.id === viewSceneId);
  const currentIndex = scenes.findIndex((s) => s.id === currentSceneId);
  const prevScene = viewIndex > 0 ? scenes[viewIndex - 1] : null;
  const nextScene = viewIndex < currentIndex ? scenes[viewIndex + 1] : null;

  return (
    <div className="flex items-center justify-between gap-2 mb-3 text-sm text-text">
      <button
        type="button"
        aria-label="Предыдущая сцена"
        disabled={!prevScene}
        onClick={() => prevScene && onChange(prevScene.id)}
        className="min-h-10 px-3 bg-panel border-2 border-accent text-accent cursor-pointer rounded-game disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <span aria-hidden="true">←</span> <span className="hidden md:inline">{prevScene ? prevScene.title : ''}</span>
      </button>
      <span className="text-text-muted whitespace-nowrap">
        {viewIndex + 1} из {scenes.length}
      </span>
      <button
        type="button"
        aria-label="Следующая сцена"
        disabled={!nextScene}
        onClick={() => nextScene && onChange(nextScene.id)}
        className="min-h-10 px-3 bg-panel border-2 border-accent text-accent cursor-pointer rounded-game disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <span className="hidden md:inline">{nextScene ? nextScene.title : ''}</span> <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
