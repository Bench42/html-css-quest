import { useEffect, useRef, useState } from 'react';
import ShadowPreview from '../common/ShadowPreview.jsx';
import CodeBlock from '../common/CodeBlock.jsx';
import TagButtons from '../master/TagButtons.jsx';
import HintBox from '../common/HintBox.jsx';
import ResultPanel from '../common/ResultPanel.jsx';
import { insertTag, exitTag, splitStarterCursor } from '../../engine/editorOps.js';
import { judge } from '../../engine/judge.js';
import { judgeCss } from '../../engine/cssJudge.js';
import { voiceFor } from '../../engine/voice.js';

const HTML_TAGS = ['h1', 'p', 'b'];

// Задание само говорит, какой вкладке принадлежит: если у него есть task.html
// (заданная, неизменная разметка) — это CSS-задание, иначе — HTML-задание.
function modeOf(task) {
  return task.html ? 'css' : 'html';
}

// Экзамен — одна часть (как в сцене 1) или несколько по разным вкладкам (scene.exam.html + scene.exam.css,
// как в сцене 2: сперва повесить class на HTML-вкладке, потом стилизовать на CSS-вкладке).
function examParts(scene) {
  if (scene.exam.html && scene.exam.css) return [scene.exam.html, scene.exam.css];
  return [scene.exam];
}

// Общий блок: задание + эталон/превью + редактор (textarea) + подсказки.
// allowHints=false — на экзамене (бесплатных подсказок там нет, покупка за монеты — шаг 10).
function Editor({ workbenchKey, task, mode, memory, masterName, allowHints, disabled, onResult, successLabel, onAdvance }) {
  const hasDraft = memory.getDraft(workbenchKey) !== undefined;
  const { text: starterText, cursor: starterCursor } = splitStarterCursor(task.starter);
  const initialDraft = memory.getDraft(workbenchKey) ?? starterText;
  const [code, setCode] = useState(initialDraft);
  const [hintsUsed, setHintsUsed] = useState(memory.getHints(workbenchKey) ?? 0);
  const [status, setStatus] = useState('idle'); // idle | bad | ok
  const [badInfo, setBadInfo] = useState(null);
  const taRef = useRef(null);

  useEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    // Заготовка задания: при первом открытии (нет сохранённого черновика) курсор
    // встаёт на маркер из starter (если он там есть) — например, внутрь { }.
    if (!hasDraft) {
      ta.setSelectionRange(starterCursor, starterCursor);
      ta.focus();
    }
    const handler = () => {
      const v = ta.value;
      setCode(v);
      memory.setDraft(workbenchKey, v);
      setStatus('idle');
      setBadInfo(null);
    };
    ta.addEventListener('input', handler);
    return () => ta.removeEventListener('input', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workbenchKey, memory]);

  function handleCheck() {
    const msg = mode === 'css' ? judgeCss(task.html, code, task.rule) : judge(code, task.rule);
    if (msg) {
      setStatus('bad');
      setBadInfo({ message: msg, voice: voiceFor(msg) });
      onResult && onResult(false);
      return;
    }
    setStatus('ok');
    setBadInfo(null);
    onResult && onResult(true, code);
  }

  function addHint() {
    if (hintsUsed >= task.hints.length) return;
    const next = hintsUsed + 1;
    setHintsUsed(next);
    memory.setHints(workbenchKey, next);
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[15px] text-text m-0">{task.task}</p>
      {mode === 'css' && <CodeBlock code={task.target} />}
      <div className="grid grid-cols-2 gap-2">
        {mode === 'css' ? (
          <>
            <ShadowPreview label="Эталон" html={task.html} css={task.target} />
            <ShadowPreview label="Твой код" html={task.html} css={code} cls={status === 'ok' ? 'ok' : ''} />
          </>
        ) : (
          <>
            <ShadowPreview label="Эталон" html={task.target} />
            <ShadowPreview label="Твой код" html={code} cls={status === 'ok' ? 'ok' : ''} />
          </>
        )}
      </div>
      <textarea
        ref={taRef}
        spellCheck="false"
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        aria-label="Код"
        placeholder={mode === 'css' ? 'Например: .имя { color: ...; }' : 'Тапни тег под полем, например <h1>'}
        defaultValue={code}
        disabled={disabled}
        className="block w-full min-h-[132px] resize-y font-mono text-base bg-panel-soft text-text border border-border rounded-game placeholder:text-text-muted p-2 disabled:opacity-60"
      />
      {mode === 'html' && (
        <TagButtons tags={HTML_TAGS} onInsert={(name) => insertTag(taRef.current, name)} onExit={() => exitTag(taRef.current)} />
      )}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleCheck}
          disabled={disabled}
          className="flex-[2] min-h-10 bg-primary text-primary-ink cursor-pointer rounded-game disabled:opacity-50"
        >
          Проверить
        </button>
        {allowHints && (
          <button
            type="button"
            onClick={addHint}
            disabled={hintsUsed >= task.hints.length}
            className="flex-1 min-h-10 bg-panel border-2 border-accent text-accent cursor-pointer rounded-game disabled:opacity-50"
          >
            {'Подсказка ' + hintsUsed + '/' + task.hints.length}
          </button>
        )}
      </div>
      {allowHints && <HintBox hints={task.hints} used={hintsUsed} />}
      {status === 'bad' && <ResultPanel masterName={masterName} voice={badInfo.voice} message={badInfo.message} />}
      {status === 'ok' && (
        <div className="flex flex-col gap-2">
          <p className="text-ok font-bold m-0">Задание выполнено!</p>
          {onAdvance && (
            <button
              type="button"
              onClick={onAdvance}
              className="self-start min-h-10 px-4 bg-primary text-primary-ink cursor-pointer rounded-game"
            >
              {successLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function OtherTabNotice({ mode }) {
  const label = mode === 'css' ? 'CSS' : 'HTML';
  return <p className="m-0 text-text-muted">Сейчас работаем на вкладке «{label}» — открой её.</p>;
}

// Просмотр прошлой сцены: только принятый код экзамена, без редактора и без наград —
// тренировка сюда не входит, это не часть итогового сайта.
function ReadOnlySolution({ scene, lang, state }) {
  const label = lang === 'css' ? 'CSS' : 'HTML';
  const part = examParts(scene).find((p) => modeOf(p) === lang);
  if (!part) {
    return <p className="m-0 text-text-muted">В этой сцене вкладка «{label}» не использовалась.</p>;
  }
  const saved = state.solutions[scene.id] && state.solutions[scene.id][lang];
  if (!saved) {
    return <p className="m-0 text-text-muted">Код этой сцены не сохранился (пройдена до обновления).</p>;
  }
  return (
    <div className="flex flex-col gap-3">
      <p className="m-0 text-text-muted">Принятый код — только просмотр:</p>
      <CodeBlock code={saved} />
      {lang === 'css' ? <ShadowPreview label="Результат" html={part.html} css={saved} /> : <ShadowPreview label="Результат" html={saved} />}
    </div>
  );
}

function TrainingStage({ scene, memory, state, update, lang }) {
  const idx = state.trainingIndex;
  const task = scene.training[idx];
  const mode = modeOf(task);
  if (mode !== lang) return <OtherTabNotice mode={mode} />;

  const isLast = idx === scene.training.length - 1;
  const workbenchKey = scene.id + '-training-' + idx;

  function handleAdvance() {
    update((s) => {
      if (isLast) {
        s.step = 'exam';
        s.examPartIndex = 0;
      } else {
        s.trainingIndex = idx + 1;
      }
    });
  }

  return (
    <Editor
      key={workbenchKey}
      workbenchKey={workbenchKey}
      task={task}
      mode={mode}
      memory={memory}
      masterName={scene.mentor.name}
      allowHints
      successLabel={isLast ? 'Понял — к экзамену' : 'Следующее задание'}
      onAdvance={handleAdvance}
    />
  );
}

function ExamStage({ scene, memory, state, update, lang }) {
  const parts = examParts(scene);
  const idx = Math.min(state.examPartIndex ?? 0, parts.length - 1);
  const part = parts[idx];
  const mode = modeOf(part);
  if (mode !== lang) return <OtherTabNotice mode={mode} />;

  const isLastPart = idx === parts.length - 1;
  const workbenchKey = scene.id + '-exam-' + idx;
  const disabled = state.hp <= 0;
  const otherTabLabel = mode === 'html' ? 'CSS' : 'HTML';

  function handleResult(ok, code) {
    if (!ok) {
      update((s) => {
        s.hp = Math.max(0, s.hp - scene.exam.penalty.hp);
      });
      return;
    }
    // Принятый код экзамена сохраняем сразу при успехе — пригодится для просмотра
    // прошлых сцен и для будущей сборки сайта в zip.
    update((s) => {
      s.solutions = { ...s.solutions, [scene.id]: { ...(s.solutions[scene.id] || {}), [mode]: code } };
    });
  }

  function handleAdvance() {
    if (!isLastPart) {
      update((s) => {
        s.examPartIndex = idx + 1;
      });
      return;
    }
    update((s) => {
      s.coins += scene.exam.reward.coins;
      s.step = 'done';
      if (!s.passedBlocks.includes(scene.landingBlockId)) s.passedBlocks.push(scene.landingBlockId);
      if (mode === 'css' && !s.coloredBlocks.includes(scene.landingBlockId)) s.coloredBlocks.push(scene.landingBlockId);
    });
  }

  return (
    <div className="flex flex-col gap-3">
      {disabled && (
        <p className="text-bad font-bold m-0">
          HP на нуле — проверка недоступна. (Восстановление за монеты и мелкий заказ появятся позже.)
        </p>
      )}
      <Editor
        key={workbenchKey}
        workbenchKey={workbenchKey}
        task={part}
        mode={mode}
        memory={memory}
        masterName={scene.mentor.name}
        allowHints={false}
        disabled={disabled}
        onResult={handleResult}
        successLabel={isLastPart ? 'Экзамен сдан' : 'Дальше: вкладка ' + otherTabLabel}
        onAdvance={handleAdvance}
      />
    </div>
  );
}

function DoneStage({ scene }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-ok font-bold m-0">Экзамен сдан!</p>
      {scene.outro.map((line, i) => (
        <p key={i} className="m-0 text-text-muted">
          <b>{line.speaker === 'mentor' ? scene.mentor.name : scene.resident.name}:</b> «{line.text}»
        </p>
      ))}
      <p className="m-0 text-text-muted">Загляни на вкладку «Лендинг» — блок обновился.</p>
    </div>
  );
}

export default function CodeTab({ lang, scene, memory, state, update, isLive }) {
  if (!isLive) return <ReadOnlySolution scene={scene} lang={lang} state={state} />;
  if (state.step === 'training') return <TrainingStage scene={scene} memory={memory} state={state} update={update} lang={lang} />;
  if (state.step === 'exam') return <ExamStage scene={scene} memory={memory} state={state} update={update} lang={lang} />;
  return <DoneStage scene={scene} />;
}
