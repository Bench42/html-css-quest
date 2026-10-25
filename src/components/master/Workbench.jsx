import { useEffect, useRef, useState } from 'react';
import ShadowPreview from '../common/ShadowPreview.jsx';
import TagButtons from './TagButtons.jsx';
import HintBox from '../common/HintBox.jsx';
import ResultPanel from '../common/ResultPanel.jsx';
import ArtPanel from '../art/ArtPanel.jsx';
import ArtButton from '../art/ArtButton.jsx';
import { insertTag, exitTag } from '../../engine/editorOps.js';
import { judge } from '../../engine/judge.js';
import { voiceFor } from '../../engine/voice.js';

export default function Workbench({
  workbenchKey,
  taskHtml,
  starter,
  target,
  labels,
  blueprint,
  tags,
  rule,
  hints,
  masterName,
  memory,
  onPass,
}) {
  const initialDraft = memory.getDraft(workbenchKey) ?? starter;
  const [code, setCode] = useState(initialDraft);
  const [hintsUsed, setHintsUsed] = useState(memory.getHints(workbenchKey) ?? 0);
  const [status, setStatus] = useState('idle'); // idle | bad | ok
  const [badInfo, setBadInfo] = useState(null);
  const [successNode, setSuccessNode] = useState(null);
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
      setSuccessNode(null);
    };
    ta.addEventListener('input', handler);
    return () => ta.removeEventListener('input', handler);
  }, [workbenchKey, memory]);

  function handleCheck() {
    const msg = judge(code, rule);
    if (msg) {
      setStatus('bad');
      setBadInfo({ message: msg, voice: voiceFor(msg) });
      setSuccessNode(null);
      return;
    }
    setStatus('ok');
    setBadInfo(null);
    setSuccessNode(onPass(code));
  }

  function handleReset() {
    const ta = taRef.current;
    ta.value = starter;
    ta.dispatchEvent(new Event('input'));
  }

  function addHint() {
    if (hintsUsed >= 3) return;
    const next = hintsUsed + 1;
    setHintsUsed(next);
    memory.setHints(workbenchKey, next);
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[15px]" dangerouslySetInnerHTML={{ __html: taskHtml }} />
      <ArtPanel variant="parchment" className="grid grid-cols-2 gap-2 p-3">
        <ShadowPreview label={labels[0]} cls={blueprint ? 'blue' : ''} html={target} />
        <ShadowPreview label={labels[1]} cls={status === 'ok' ? 'ok' : ''} html={code} />
      </ArtPanel>
      <ArtPanel variant="chalkboard" className="p-2">
        <textarea
          ref={taRef}
          spellCheck="false"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          aria-label="Код"
          placeholder="Тапни тег под полем, например <h1>"
          defaultValue={code}
          className="block w-full min-h-[132px] resize-y font-mono text-base [line-height:1.5] [tab-size:2] bg-transparent text-code-ink border-0 p-2 placeholder:text-muted focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        />
      </ArtPanel>
      <TagButtons tags={tags} onInsert={(name) => insertTag(taRef.current, name)} onExit={() => exitTag(taRef.current)} />
      <div className="flex gap-2">
        <ArtButton variant="primary" onClick={handleCheck} className="flex-[2]">
          Проверить
        </ArtButton>
        <ArtButton variant="secondary" onClick={addHint} disabled={hintsUsed >= 3} className="flex-1 disabled:opacity-50">
          {'Подсказка ' + hintsUsed + '/3'}
        </ArtButton>
        <ArtButton variant="secondary" onClick={handleReset} className="flex-1">
          Заново
        </ArtButton>
      </div>
      <HintBox hints={hints} used={hintsUsed} />
      {status === 'bad' && <ResultPanel masterName={masterName} voice={badInfo.voice} message={badInfo.message} />}
      {status === 'ok' && successNode}
    </div>
  );
}
