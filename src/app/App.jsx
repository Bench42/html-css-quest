import { useState } from 'react';
import { useGameState } from '../hooks/useGameState.js';
import TopBar from '../components/layout/TopBar.jsx';
import SceneStage from '../components/scene/SceneStage.jsx';
import TabBar from '../components/tabs/TabBar.jsx';
import MentorTab from '../components/tabs/MentorTab.jsx';
import CodeTab from '../components/tabs/CodeTab.jsx';
import LandingTab from '../components/tabs/LandingTab.jsx';

export default function App() {
  const { state, reset } = useGameState();
  const [tab, setTab] = useState('mentor');

  return (
    <div className="mx-auto max-w-[520px] p-4">
      <TopBar hp={state.hp} coins={state.coins} onReset={reset} />
      <SceneStage speakerName="Дух Перемен" lines="Каркас новой концепции в разработке." />
      <TabBar active={tab} onChange={setTab} />
      {tab === 'mentor' && <MentorTab />}
      {tab === 'html' && <CodeTab lang="html" />}
      {tab === 'css' && <CodeTab lang="css" />}
      {tab === 'landing' && <LandingTab />}
    </div>
  );
}
