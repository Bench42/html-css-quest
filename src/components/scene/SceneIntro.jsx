import { useState } from 'react';

// Разовая сценка-пролог перед сценой 1. Шаги лежат в данных сцены (scene.cutscene):
// narrator (текст + клик по воротам), line (реплика персонажа, вариант text или
// textByChoice по выбору), choice (две кнопки вместо «Дальше»). Прогресс самой сценки
// не сохраняется — если страница перезагрузится посередине, сценка начнётся сначала;
// готовность (больше не показывать) ставит onDone() на последнем шаге.
export default function SceneIntro({ scene, onDone }) {
  const steps = scene.cutscene;
  const [stepIndex, setStepIndex] = useState(0);
  const [choice, setChoice] = useState(null);

  const step = steps[stepIndex];
  const guardVisible = stepIndex >= 1;
  // На шаге выбора кнопки заменяют «Дальше», но реплика (вопрос стражника) остаётся на экране.
  const bubbleStep = step.kind === 'choice' ? steps[stepIndex - 1] : step;
  const bubbleSpeaker = bubbleStep.kind === 'narrator' ? null : (bubbleStep.speaker === 'mentor' ? scene.mentor : scene.resident);
  const bubbleText = bubbleStep.kind === 'narrator' ? bubbleStep.text : bubbleStep.textByChoice ? bubbleStep.textByChoice[choice] : bubbleStep.text;

  function handleGateClick() {
    if (step.kind === 'narrator') setStepIndex(stepIndex + 1);
  }

  function handleChoice(id) {
    setChoice(id);
    setStepIndex(stepIndex + 1);
  }

  function handleNext() {
    if (stepIndex + 1 >= steps.length) {
      onDone();
      return;
    }
    setStepIndex(stepIndex + 1);
  }

  const hasBg = Boolean(scene.background.closed);

  return (
    <div className="relative overflow-hidden border border-border aspect-[4/3] flex flex-col justify-start bg-panel">
      {hasBg && <img src={scene.background.closed} alt="" className="absolute inset-0 w-full h-full object-cover object-top" />}

      {guardVisible && scene.resident.fullBody && (
        <img src={scene.resident.fullBody} alt="" className="absolute bottom-0 left-[8%] h-[52%] object-contain" />
      )}

      {step.kind === 'narrator' && (
        <button
          type="button"
          onClick={handleGateClick}
          aria-label="Нажми на ворота"
          className="absolute inset-0 w-full h-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
      )}

      {bubbleText && (
        <div className="relative m-2 max-w-[78%] md:max-w-[340px] max-h-28 md:max-h-36 overflow-y-auto flex items-start gap-2 bg-panel text-text text-xs px-2 py-1.5 border border-border">
          {bubbleSpeaker && bubbleSpeaker.portrait && (
            <img src={bubbleSpeaker.portrait} alt="" className="w-10 h-10 object-cover shrink-0" />
          )}
          <div>
            {bubbleSpeaker && <b>{bubbleSpeaker.name}:</b>} {bubbleText}
          </div>
        </div>
      )}

      {step.kind === 'narrator' && (
        <p className="relative m-2 mt-0 text-text-muted text-xs">{step.hint}</p>
      )}

      {step.kind === 'choice' && (
        <div className="relative flex gap-2 self-end mt-auto m-3">
          {step.options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleChoice(opt.id)}
              className="min-h-9 px-3 py-1.5 text-sm bg-primary text-primary-ink cursor-pointer"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {step.kind === 'line' && (
        <button
          type="button"
          onClick={handleNext}
          className="relative self-end mt-auto m-3 min-h-9 px-3 py-1.5 text-sm bg-primary text-primary-ink cursor-pointer"
        >
          Дальше ▸
        </button>
      )}
    </div>
  );
}
