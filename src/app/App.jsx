import { useEffect, useState } from 'react';
import TopBar from '../components/layout/TopBar.jsx';
import CityView from '../components/city/CityView.jsx';
import SceneView from '../components/scene/SceneView.jsx';
import MasterView from '../components/master/MasterView.jsx';
import { useProgress } from '../hooks/useProgress.js';
import { useWorkbenchMemory } from '../hooks/useWorkbenchMemory.js';
import { signmaker } from '../data/masters/index.js';

const INITIAL_UI = { screen: 'city', step: 'lesson', card: 0, task: 0, fresh: false };

function firstUndone(train) {
  const i = train.indexOf(false);
  return i < 0 ? 0 : i;
}

export default function App() {
  const { progress, update, reset } = useProgress();
  const memory = useWorkbenchMemory();
  const [ui, setUi] = useState(INITIAL_UI);

  function go(patch) {
    setUi((u) => ({ ...u, ...patch }));
  }

  // Скролл к началу при любом переходе — как scrollTo(0,0) в прототипе.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [ui]);

  function handleReset() {
    reset();
    memory.resetAll();
    setUi(INITIAL_UI);
  }

  function enterMaster() {
    const trainDone = progress.train.filter(Boolean).length;
    const step = !progress.lesson && !trainDone ? 'lesson' : trainDone === 3 ? 'build' : 'train';
    go({ screen: 'master', step, card: 0, task: firstUndone(progress.train) });
  }

  return (
    <div className="mx-auto max-w-[520px] font-body text-ink">
      <TopBar onReset={handleReset} />
      {ui.screen === 'city' && (
        <CityView
          master={signmaker}
          progress={progress}
          fresh={ui.fresh}
          onFreshConsumed={() => go({ fresh: false })}
          onIntroDone={() => update((s) => { s.intro = true; })}
          onEnterMaster={enterMaster}
        />
      )}
      {ui.screen === 'scene' && <SceneView master={signmaker} onBackToCity={() => go({ screen: 'city' })} />}
      {ui.screen === 'master' && (
        <MasterView
          master={signmaker}
          progress={progress}
          ui={ui}
          memory={memory}
          onGoCity={() => go({ screen: 'city' })}
          onGoScene={() => go({ screen: 'scene' })}
          onStep={(step) => go({ step })}
          onLessonPrev={() => go({ card: ui.card - 1 })}
          onLessonNext={() => {
            if (ui.card < signmaker.lesson.length - 1) {
              go({ card: ui.card + 1 });
            } else {
              update((s) => { s.lesson = true; });
              go({ step: 'train', task: firstUndone(progress.train) });
            }
          }}
          onSelectTrainTask={(i) => go({ task: i })}
          onAfterLastTrain={() => go({ step: 'build' })}
          onGoTrainFromBuild={() => go({ step: 'train', task: firstUndone(progress.train) })}
          markTrainDone={(i) => update((s) => { s.train[i] = true; })}
          markBuilt={(code) => {
            update((s) => { s.built = code; });
            go({ fresh: true });
          }}
        />
      )}
    </div>
  );
}
