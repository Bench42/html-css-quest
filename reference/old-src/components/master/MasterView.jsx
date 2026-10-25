import StepsTabs from './StepsTabs.jsx';
import LessonView from './LessonView.jsx';
import TrainView from './TrainView.jsx';
import BuildView from './BuildView.jsx';
import SceneBackground from '../art/SceneBackground.jsx';

export default function MasterView({
  master,
  progress,
  ui,
  memory,
  onGoCity,
  onGoScene,
  onStep,
  onLessonPrev,
  onLessonNext,
  onSelectTrainTask,
  onAfterLastTrain,
  onGoTrainFromBuild,
  markTrainDone,
  markBuilt,
}) {
  const trainDone = progress.train.filter(Boolean).length;
  return (
    <div className="flex flex-col gap-3">
      {/* Фон мастерской — баннер сверху (не на весь экран), чтобы код ниже было удобно читать */}
      <SceneBackground src={master.workshopBg} className="relative h-[34vh] min-h-[200px] max-h-[300px] flex items-end -mx-4 w-[calc(100%+32px)]">
        <div className="w-full flex items-center justify-between gap-2.5 bg-panel/90 px-4 py-2 border-t-2 border-line">
          <button
            type="button"
            onClick={onGoCity}
            className="font-body text-ink bg-panel border-2 border-line min-h-9 px-2.5 py-1 text-[13px] cursor-pointer focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            ← В город
          </button>
          <h2 className="font-body font-bold text-xl m-0 text-ink">{master.name}</h2>
        </div>
      </SceneBackground>
      <StepsTabs step={ui.step} onStep={onStep} lessonDone={progress.lesson} trainDone={trainDone} built={!!progress.built} />
      {ui.step === 'lesson' && <LessonView master={master} card={ui.card} onPrev={onLessonPrev} onNext={onLessonNext} />}
      {ui.step === 'train' && (
        <TrainView
          master={master}
          progress={progress}
          task={ui.task}
          memory={memory}
          markTrainDone={markTrainDone}
          onSelectTask={onSelectTrainTask}
          onAfterLast={onAfterLastTrain}
        />
      )}
      {ui.step === 'build' && (
        <BuildView
          master={master}
          progress={progress}
          trainDone={trainDone}
          memory={memory}
          markBuilt={markBuilt}
          onGoTrain={onGoTrainFromBuild}
          onGoCity={onGoCity}
          onGoScene={onGoScene}
        />
      )}
    </div>
  );
}
