import { useState } from 'react';

// Разовая сценка-пролог перед сценой 1. Шаги лежат в данных сцены (scene.cutscene):
// narrator (текст-массив абзацев + клик по воротам), line (реплика; text или
// textByChoice по выбору, тоже массив абзацев), choice (две кнопки вместо «Дальше»).
// Прогресс самой сценки не сохраняется — если страница перезагрузится посередине,
// сценка начнётся сначала; готовность (больше не показывать) ставит onDone() в конце.
//
// Раскладка отзывчивая: на телефоне картинка — обычный блок сверху, реплика и кнопки
// идут под ней в обычном потоке (ничего не перекрывает ворота); на md: и шире контейнер
// снова aspect-[4/3], а блок с репликой и кнопками (через display:contents) возвращается
// к оверлею поверх картинки — как было раньше.
export default function SceneIntro({ scene, onDone }) {
  const steps = scene.cutscene;
  const [stepIndex, setStepIndex] = useState(0);
  const [choice, setChoice] = useState(null);

  const step = steps[stepIndex];
  const guardVisible = stepIndex >= 1;
  // На шаге выбора кнопки заменяют «Дальше», но реплика (вопрос стражника) остаётся на экране.
  const bubbleStep = step.kind === 'choice' ? steps[stepIndex - 1] : step;
  const bubbleSpeaker = bubbleStep.kind === 'narrator' ? null : (bubbleStep.speaker === 'mentor' ? scene.mentor : scene.resident);
  const bubbleParagraphs = bubbleStep.kind === 'narrator' ? bubbleStep.text : bubbleStep.textByChoice ? bubbleStep.textByChoice[choice] : bubbleStep.text;

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
  const buttonCls = 'min-h-10 px-3 py-1.5 text-sm bg-primary text-primary-ink cursor-pointer rounded-game';

  return (
    <div className="border border-border overflow-hidden bg-panel flex flex-col md:relative md:aspect-[4/3]">
      <div className="relative aspect-[4/3] md:absolute md:inset-0">
        {hasBg && (
          <img
            src={scene.background.closed}
            alt=""
            // Клик по воротам работает, но без фокуса клавиатуры — основной способ
            // (и единственный, доступный с клавиатуры) — кнопка-пилюля с подсказкой ниже.
            aria-hidden="true"
            tabIndex={-1}
            onClick={handleGateClick}
            className={'absolute inset-0 w-full h-full object-cover object-top' + (step.kind === 'narrator' ? ' cursor-pointer' : '')}
          />
        )}
        {guardVisible && scene.resident.fullBody && (
          <img src={scene.resident.fullBody} alt="" className="absolute bottom-0 left-[8%] h-[52%] object-contain" />
        )}
      </div>

      <div className="flex flex-col gap-2 p-2 md:contents">
        {bubbleParagraphs && bubbleParagraphs.length > 0 && (
          <div className="flex items-start gap-2 bg-panel text-text text-xs px-2 py-1.5 border border-border md:absolute md:top-0 md:left-0 md:m-2 md:max-w-[340px] md:max-h-36 md:overflow-y-auto">
            {bubbleSpeaker && bubbleSpeaker.portrait && (
              <img src={bubbleSpeaker.portrait} alt="" className="w-10 h-10 object-cover shrink-0" />
            )}
            <div className="flex flex-col gap-1.5">
              {bubbleSpeaker && <p className="m-0 font-bold">{bubbleSpeaker.name}:</p>}
              {bubbleParagraphs.map((p, i) => (
                <p key={i} className="m-0">
                  {p}
                </p>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 md:absolute md:bottom-0 md:right-0 md:m-3">
          {step.kind === 'narrator' && (
            <button
              type="button"
              onClick={handleGateClick}
              className="min-h-10 px-4 py-1.5 text-sm font-bold bg-panel border-2 border-accent text-text cursor-pointer rounded-game animate-pill-glow focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              {step.hint} →
            </button>
          )}
          {step.kind === 'choice' &&
            step.options.map((opt) => (
              <button key={opt.id} type="button" onClick={() => handleChoice(opt.id)} className={buttonCls}>
                {opt.label}
              </button>
            ))}
          {step.kind === 'line' && (
            <button type="button" onClick={handleNext} className={buttonCls}>
              Дальше ▸
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
