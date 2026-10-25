import { useState } from 'react';
import { useGameState } from '../hooks/useGameState.js';
import { useWorkbenchMemory } from '../hooks/useWorkbenchMemory.js';
import { SCENES } from '../data/scenes/index.js';
import TopBar from '../components/layout/TopBar.jsx';
import SceneStage from '../components/scene/SceneStage.jsx';
import TabBar from '../components/tabs/TabBar.jsx';
import MentorTab from '../components/tabs/MentorTab.jsx';
import CodeTab from '../components/tabs/CodeTab.jsx';
import LandingTab from '../components/tabs/LandingTab.jsx';

export default function App() {
  const { state, update, reset } = useGameState();
  const memory = useWorkbenchMemory();
  const [tab, setTab] = useState('mentor');
  const [tabSceneId, setTabSceneId] = useState(state.sceneId);
  const sceneIndex = SCENES.findIndex((s) => s.id === state.sceneId);
  const scene = SCENES[sceneIndex].data;
  const nextEntry = SCENES[sceneIndex + 1];

  // Смена сцены сбрасывает открытую вкладку на «Наставник» — паттерн React
  // для сброса состояния при смене «предмета» без эффекта (react.dev/learn/you-might-not-need-an-effect).
  if (tabSceneId !== state.sceneId) {
    setTabSceneId(state.sceneId);
    setTab('mentor');
  }

  const done = state.step === 'done';
  const stageLine = done ? scene.outro[scene.outro.length - 1] : scene.intro[scene.intro.length - 1];

  function goNext() {
    if (!nextEntry || nextEntry.locked) return;
    update((s) => {
      s.sceneId = nextEntry.id;
      s.step = 'training';
      s.trainingIndex = 0;
      s.examPartIndex = 0;
    });
  }

  return (
    <div className="mx-auto max-w-[520px] p-4">
      <TopBar hp={state.hp} coins={state.coins} onReset={reset} />
      <SceneStage
        speakerName={stageLine.speaker === 'mentor' ? scene.mentor.name : scene.resident.name}
        lines={stageLine.text}
        nextLabel={done && nextEntry ? 'Дальше: ' + nextEntry.title : undefined}
        nextDisabled={!nextEntry || nextEntry.locked}
        onNext={goNext}
      />
      <TabBar active={tab} onChange={setTab} />
      {tab === 'mentor' && <MentorTab scene={scene} />}
      {tab === 'html' && <CodeTab lang="html" scene={scene} memory={memory} state={state} update={update} />}
      {tab === 'css' && <CodeTab lang="css" scene={scene} memory={memory} state={state} update={update} />}
      {tab === 'landing' && <LandingTab passedBlocks={state.passedBlocks} coloredBlocks={state.coloredBlocks} />}
    </div>
  );
}
