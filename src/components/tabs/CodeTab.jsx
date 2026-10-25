import { useEffect, useRef, useState } from 'react';
import ShadowPreview from '../common/ShadowPreview.jsx';
import TagButtons from '../master/TagButtons.jsx';
import HintBox from '../common/HintBox.jsx';
import ResultPanel from '../common/ResultPanel.jsx';
import { insertTag, exitTag } from '../../engine/editorOps.js';
import { judge } from '../../engine/judge.js';
import { voiceFor } from '../../engine/voice.js';

const HTML_TAGS = ['h1', 'p', 'b'];

// Общий блок: задание + эталон/превью + textarea + кнопки тегов + подсказки.
// allowHints=false — на экзамене (бесплатных подсказок там нет, покупка за монеты — шаг 10).
function Editor({ workbenchKey, task, memory, masterName, allowHints, disabled, onResult, successLabel, onAdvance }) {
  const initialDraft = memory.getDraft(workbenchKey) ?? task.starter;
  const [code, setCode] = useState(initialDraft);
  const [hintsUsed, setHintsUsed] = useState(memory.getHints(workbenchKey) ?? 0);
  const [status, setStatus] = useState('idle'); // idle | bad | ok
  const [badInfo, setBadInfo] = useState(null);
  const taRef = useRef(null);

  useEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    const handler = () => {
      const v = ta.value;
      setCode(v);
      memory.setDraft(workbenchKey, v);
      setStatus('idle');
      setBadInfo(null);
    };
    ta.addEventListener('input', handler);
    return () => ta.removeEventListener('input', handler);
  }, [workbenchKey, memory]);

  function handleCheck() {
    const msg = judge(code, task.rule);
    if (msg) {
      setStatus('bad');
      setBadInfo({ message: msg, voice: voiceFor(msg) });
      onResult && onResult(false);
      return;
    }
    setStatus('ok');
    setBadInfo(null);
    onResult && onResult(true);
  }

  function addHint() {
    if (hintsUsed >= task.hints.length) return;
    const next = hintsUsed + 1;
    setHintsUsed(next);
    memory.setHints(workbenchKey, next);
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[15px] m-0">{task.task}</p>
      <div className="grid grid-cols-2 gap-2">
        <ShadowPreview label="Эталон" html={task.target} />
        <ShadowPreview label="Твой код" cls={status === 'ok' ? 'ok' : ''} html={code} />
      </div>
      <textarea
        ref={taRef}
        spellCheck="false"
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        aria-label="Код"
        placeholder="Тапни тег под полем, например <h1>"
        defaultValue={code}
        disabled={disabled}
        className="block w-full min-h-[132px] resize-y font-mono text-base bg-gray-100 p-2 disabled:opacity-60"
      />
      <TagButtons tags={HTML_TAGS} onInsert={(name) => insertTag(taRef.current, name)} onExit={() => exitTag(taRef.current)} />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleCheck}
          disabled={disabled}
          className="flex-[2] min-h-10 bg-gray-800 text-white cursor-pointer disabled:opacity-50"
        >
          Проверить
        </button>
        {allowHints && (
          <button
            type="button"
            onClick={addHint}
            disabled={hintsUsed >= task.hints.length}
            className="flex-1 min-h-10 bg-gray-200 cursor-pointer disabled:opacity-50"
          >
            {'Подсказка ' + hintsUsed + '/' + task.hints.length}
          </button>
        )}
      </div>
      {allowHints && <HintBox hints={task.hints} used={hintsUsed} />}
      {status === 'bad' && <ResultPanel masterName={masterName} voice={badInfo.voice} message={badInfo.message} />}
      {status === 'ok' && (
        <div className="flex flex-col gap-2">
          <p className="text-green-700 font-bold m-0">Задание выполнено!</p>
          {onAdvance && (
            <button
              type="button"
              onClick={onAdvance}
              className="self-start min-h-10 px-4 bg-gray-800 text-white cursor-pointer"
            >
              {successLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function TrainingStage({ scene, memory, state, update }) {
  const idx = state.trainingIndex;
  const task = scene.training[idx];
  const isLast = idx === scene.training.length - 1;
  const workbenchKey = scene.id + '-training-' + idx;

  function handleAdvance() {
    update((s) => {
      if (isLast) s.step = 'exam';
      else s.trainingIndex = idx + 1;
    });
  }

  return (
    <Editor
      key={workbenchKey}
      workbenchKey={workbenchKey}
      task={task}
      memory={memory}
      masterName={scene.mentor.name}
      allowHints
      successLabel={isLast ? 'Понял — к экзамену' : 'Следующее задание'}
      onAdvance={handleAdvance}
    />
  );
}

function ExamStage({ scene, memory, state, update }) {
  const workbenchKey = scene.id + '-exam';
  const disabled = state.hp <= 0;

  function handleResult(ok) {
    if (ok) {
      update((s) => {
        s.coins += scene.exam.reward.coins;
        s.step = 'done';
        if (!s.passedBlocks.includes(scene.landingBlockId)) s.passedBlocks.push(scene.landingBlockId);
      });
    } else {
      update((s) => {
        s.hp = Math.max(0, s.hp - scene.exam.penalty.hp);
      });
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {disabled && (
        <p className="text-red-700 font-bold m-0">
          HP на нуле — проверка недоступна. (Восстановление за монеты и мелкий заказ появятся позже.)
        </p>
      )}
      <Editor
        key={workbenchKey}
        workbenchKey={workbenchKey}
        task={scene.exam}
        memory={memory}
        masterName={scene.mentor.name}
        allowHints={false}
        disabled={disabled}
        onResult={handleResult}
      />
    </div>
  );
}

function DoneStage({ scene }) {
  const line = scene.outro[0];
  return (
    <div className="flex flex-col gap-2">
      <p className="text-green-700 font-bold m-0">Экзамен сдан!</p>
      {line && (
        <p className="m-0 text-gray-600">
          <b>{scene.mentor.name}:</b> «{line.text}»
        </p>
      )}
      <p className="m-0 text-gray-600">Загляни на вкладку «Лендинг» — блок встал на место.</p>
    </div>
  );
}

export default function CodeTab({ lang, scene, memory, state, update }) {
  if (lang === 'css') return <p>Вкладка «CSS» — скоро.</p>;
  if (state.step === 'training') return <TrainingStage scene={scene} memory={memory} state={state} update={update} />;
  if (state.step === 'exam') return <ExamStage scene={scene} memory={memory} state={state} update={update} />;
  return <DoneStage scene={scene} />;
}
