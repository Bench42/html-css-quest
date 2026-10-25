import Say from '../common/Say.jsx';
import Workbench from './Workbench.jsx';

export default function TrainView({ master, progress, task, memory, markTrainDone, onSelectTask, onAfterLast }) {
  const t = master.train[task];
  const workbenchKey = 'train' + task;
  return (
    <div className="flex flex-col gap-3">
      <Say name={master.name} portrait={master.portrait} lines={t.say} />
      <div className="flex gap-1.5 flex-wrap">
        {master.train.map((_, i) => {
          const active = i === task;
          const done = progress.train[i];
          const textCls = done ? 'text-ok' : active ? 'text-accent' : 'text-ink';
          const borderCls = active ? 'border-accent' : 'border-line';
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelectTask(i)}
              className={
                'min-w-11 px-2.5 py-1.5 bg-panel border-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 ' +
                textCls + ' ' + borderCls + (active ? ' font-bold' : '')
              }
            >
              {(done ? '✓ ' : '') + (i + 1)}
            </button>
          );
        })}
      </div>
      <Workbench
        key={workbenchKey}
        workbenchKey={workbenchKey}
        taskHtml={t.task}
        starter={t.starter}
        target={t.target}
        labels={['Нужно', 'У тебя']}
        tags={master.tags}
        rule={t.rule}
        hints={t.hints}
        masterName={master.name}
        memory={memory}
        onPass={() => {
          markTrainDone(task);
          return (
            <div className="px-3 py-2.5 text-sm bg-ok-soft border-2 border-ok">
              <div>{task < 2 ? 'Верно.' : 'Верно. Тренировка пройдена.'}</div>
              <div className="font-bold mb-1">{master.name + ': «' + t.praise + '»'}</div>
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => (task < 2 ? onSelectTask(task + 1) : onAfterLast())}
                  className="flex-[2] font-body bg-accent text-accent-ink border-2 border-accent font-bold min-h-11 px-3.5 py-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                >
                  {task < 2 ? 'Следующее задание' : 'К стройке'}
                </button>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
