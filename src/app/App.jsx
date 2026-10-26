import { useState } from 'react';
import { useGameState } from '../hooks/useGameState.js';
import { useWorkbenchMemory } from '../hooks/useWorkbenchMemory.js';
import { SCENES } from '../data/scenes/index.js';
import TopBar from '../components/layout/TopBar.jsx';
import SceneNav from '../components/scene/SceneNav.jsx';
import SceneStage from '../components/scene/SceneStage.jsx';
import SceneIntro from '../components/scene/SceneIntro.jsx';
import TabBar from '../components/tabs/TabBar.jsx';
import MentorTab from '../components/tabs/MentorTab.jsx';
import CodeTab from '../components/tabs/CodeTab.jsx';
import LandingTab from '../components/tabs/LandingTab.jsx';

export default function App() {
  const { state, update, reset } = useGameState();
  const memory = useWorkbenchMemory();
  const [tab, setTab] = useState('mentor');

  // Где игрок реально находится (прогресс) — против того, что он сейчас смотрит.
  // viewSceneId не сохраняется: это просто «куда сейчас смотрит экран», при перезагрузке
  // всегда возвращаемся к текущей сцене прогресса.
  const [viewSceneId, setViewSceneId] = useState(state.sceneId);
  const [tabViewId, setTabViewId] = useState(viewSceneId);

  const sceneIndex = SCENES.findIndex((s) => s.id === state.sceneId);
  const nextEntry = SCENES[sceneIndex + 1];

  const viewSceneIndex = SCENES.findIndex((s) => s.id === viewSceneId);
  const viewScene = SCENES[viewSceneIndex].data;
  const isLiveScene = viewSceneId === state.sceneId;
  const isPastScene = viewSceneIndex < sceneIndex;

  // Смена просматриваемой сцены сбрасывает открытую вкладку на «Наставник» — паттерн React
  // для сброса состояния при смене «предмета» без эффекта (react.dev/learn/you-might-not-need-an-effect).
  if (tabViewId !== viewSceneId) {
    setTabViewId(viewSceneId);
    setTab('mentor');
  }

  // Разовая сценка-пролог перед сценой 1: показывается один раз, вместо обычного экрана.
  const showIntro = isLiveScene && viewSceneId === 'gates' && !state.introSeen;

  const done = state.step === 'done';
  const open = isPastScene || (isLiveScene && done);
  const stageLine = open ? viewScene.outro[viewScene.outro.length - 1] : viewScene.intro[viewScene.intro.length - 1];
  const speaker = stageLine.speaker === 'mentor' ? viewScene.mentor : viewScene.resident;

  function goNext() {
    if (!nextEntry || nextEntry.locked) return;
    update((s) => {
      s.sceneId = nextEntry.id;
      s.step = 'training';
      s.trainingIndex = 0;
      s.examPartIndex = 0;
    });
    setViewSceneId(nextEntry.id);
  }

  return (
    <div className="mx-auto max-w-[520px] md:max-w-[1100px] p-4">
      <TopBar
        hp={state.hp}
        coins={state.coins}
        onReset={() => {
          reset();
          setViewSceneId('gates');
        }}
      />
      {showIntro ? (
        // Сценка занимает весь экран одна, без вкладок и навигации — пока она не кончится,
        // отвлекать нечем (это самое начало игры, прошлых сцен для навигации всё равно нет).
        <div className="mx-auto max-w-[460px]">
          <SceneIntro scene={viewScene} onDone={() => update((s) => { s.introSeen = true; })} />
        </div>
      ) : (
        /* Широкий экран: сцена слева (md:grid-cols-[460px_1fr]), вкладки справа. Узкий —
           без md:grid раскладка остаётся обычной колонкой, сцена на всю ширину. */
        <div className="md:grid md:grid-cols-[460px_1fr] md:gap-4 md:items-start">
          <div className="mb-3 md:mb-0 md:sticky md:top-4">
            <SceneNav scenes={SCENES} viewSceneId={viewSceneId} currentSceneId={state.sceneId} onChange={setViewSceneId} />
            <SceneStage
              backgroundClosed={viewScene.background.closed}
              backgroundOpen={viewScene.background.open}
              open={open}
              residentFullBody={viewScene.resident.fullBody}
              noviceFullBody={viewScene.novice && viewScene.novice.fullBody}
              speakerName={speaker.name}
              speakerPortrait={speaker.portrait}
              lines={stageLine.text}
              nextLabel={isLiveScene && done && nextEntry ? 'Дальше: ' + nextEntry.title : undefined}
              nextDisabled={!nextEntry || nextEntry.locked}
              onNext={goNext}
            />
          </div>
          <div>
            <TabBar active={tab} onChange={setTab} />
            {tab === 'mentor' && <MentorTab scene={viewScene} />}
            {tab === 'html' && <CodeTab lang="html" scene={viewScene} memory={memory} state={state} update={update} isLive={isLiveScene} />}
            {tab === 'css' && <CodeTab lang="css" scene={viewScene} memory={memory} state={state} update={update} isLive={isLiveScene} />}
            {tab === 'landing' && <LandingTab passedBlocks={state.passedBlocks} coloredBlocks={state.coloredBlocks} />}
          </div>
        </div>
      )}
    </div>
  );
}
