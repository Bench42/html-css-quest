import { useEffect, useRef, useState } from 'react';
import ShadowPreview from '../common/ShadowPreview.jsx';
import TagButtons from '../master/TagButtons.jsx';
import HintBox from '../common/HintBox.jsx';
import ResultPanel from '../common/ResultPanel.jsx';
import { insertTag, exitTag } from '../../engine/editorOps.js';
import { judge } from '../../engine/judge.js';
import { voiceFor } from '../../engine/voice.js';

const HTML_TAGS = ['h1', 'p', 'b'];

// Пока на HTML-вкладке живёт только первое тренировочное задание сцены 1 (шаг 7).
// Остальные тренировки, экзамен и переключение по циклу сцены — шаг 8.
function HtmlTraining({ scene, memory }) {
  const task = scene.training[0];
  const workbenchKey = scene.id + '-training-0';

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
      return;
    }
    setStatus('ok');
    setBadInfo(null);
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
        className="block w-full min-h-[132px] resize-y font-mono text-base bg-gray-100 p-2"
      />
      <TagButtons tags={HTML_TAGS} onInsert={(name) => insertTag(taRef.current, name)} onExit={() => exitTag(taRef.current)} />
      <div className="flex gap-2">
        <button type="button" onClick={handleCheck} className="flex-[2] min-h-10 bg-gray-800 text-white cursor-pointer">
          Проверить
        </button>
        <button
          type="button"
          onClick={addHint}
          disabled={hintsUsed >= task.hints.length}
          className="flex-1 min-h-10 bg-gray-200 cursor-pointer disabled:opacity-50"
        >
          {'Подсказка ' + hintsUsed + '/' + task.hints.length}
        </button>
      </div>
      <HintBox hints={task.hints} used={hintsUsed} />
      {status === 'bad' && <ResultPanel masterName={scene.mentor.name} voice={badInfo.voice} message={badInfo.message} />}
      {status === 'ok' && <p className="text-green-700 font-bold m-0">Задание выполнено!</p>}
    </div>
  );
}

export default function CodeTab({ lang, scene, memory }) {
  if (lang === 'css') return <p>Вкладка «CSS» — скоро.</p>;
  return <HtmlTraining scene={scene} memory={memory} />;
}
