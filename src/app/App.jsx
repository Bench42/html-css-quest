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
  const { state, reset } = useGameState();
  const memory = useWorkbenchMemory();
  const [tab, setTab] = useState('mentor');
  const scene = SCENES.find((s) => s.id === state.sceneId).data;

  const lastIntroLine = scene.intro[scene.intro.length - 1];

  return (
    <div className="mx-auto max-w-[520px] p-4">
      <TopBar hp={state.hp} coins={state.coins} onReset={reset} />
      <SceneStage
        speakerName={lastIntroLine.speaker === 'mentor' ? scene.mentor.name : scene.resident.name}
        lines={lastIntroLine.text}
      />
      <TabBar active={tab} onChange={setTab} />
      {tab === 'mentor' && <MentorTab scene={scene} />}
      {tab === 'html' && <CodeTab lang="html" scene={scene} memory={memory} />}
      {tab === 'css' && <CodeTab lang="css" scene={scene} memory={memory} />}
      {tab === 'landing' && <LandingTab />}
    </div>
  );
}
