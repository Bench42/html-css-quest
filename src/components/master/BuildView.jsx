import Say from '../common/Say.jsx';
import Workbench from './Workbench.jsx';
import ArtPanel from '../art/ArtPanel.jsx';
import ArtButton from '../art/ArtButton.jsx';

export default function BuildView({ master, progress, trainDone, memory, markBuilt, onGoTrain, onGoCity, onGoScene }) {
  if (trainDone < 3) {
    return (
      <div className="flex flex-col gap-3">
        <ArtPanel variant="parchment" className="flex flex-col gap-3 px-6 py-5">
          <p className="m-0">{'Стройка откроется, когда решишь три тренировочных задания. Сейчас: ' + trainDone + '/3.'}</p>
          <ArtButton variant="primary" onClick={onGoTrain}>
            К тренировке
          </ArtButton>
        </ArtPanel>
      </div>
    );
  }
  const b = master.build;
  return (
    <div className="flex flex-col gap-3">
      <Say name={master.name} portrait={master.portrait} lines={master.say.build} />
      <Workbench
        key="build"
        workbenchKey="build"
        taskHtml={b.task}
        starter={progress.built || ''}
        target={b.target}
        labels={['Чертёж', 'Твоя таверна']}
        blueprint
        tags={master.tags}
        rule={b.rule}
        hints={b.hints}
        masterName={master.name}
        memory={memory}
        onPass={(code) => {
          markBuilt(code);
          return (
            <div className="px-3 py-2.5 text-sm bg-ok-soft border-2 border-ok">
              <div>Деталь построена: вывеска встала на место.</div>
              <div className="font-bold mb-1">{master.name + ': «' + master.win + '»'}</div>
              <div className="flex gap-2 mt-2">
                <ArtButton variant="secondary" onClick={onGoCity} className="flex-1">
                  В город
                </ArtButton>
                <ArtButton variant="primary" onClick={onGoScene} className="flex-[2]">
                  Слушать дальше
                </ArtButton>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
