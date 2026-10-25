import { useEffect } from 'react';
import IntroLetter from './IntroLetter.jsx';
import TownPlot from './TownPlot.jsx';
import ActiveMasterCard from './ActiveMasterCard.jsx';
import LockedMastersList from './LockedMastersList.jsx';

export default function CityView({ master, progress, fresh, onFreshConsumed, onIntroDone, onEnterMaster }) {
  // "fresh" включает анимацию падения вывески один раз, сразу после стройки,
  // и гасится здесь же — как чтение-и-сброс в прототипе.
  useEffect(() => {
    if (fresh) onFreshConsumed();
  }, [fresh, onFreshConsumed]);

  if (!progress.intro) {
    return <IntroLetter onStart={onIntroDone} />;
  }

  const trainDone = progress.train.filter(Boolean).length;
  const label = progress.built ? 'Открыть мастерскую' : progress.lesson || trainDone ? 'Продолжить' : 'Войти в мастерскую';

  return (
    <div className="flex flex-col gap-3">
      <TownPlot built={progress.built} fresh={fresh} />
      <p className="text-[13px] text-muted m-0">
        {progress.built ? 'Вывеска повешена. Остальное пока только на чертеже.' : 'Пунктир это дядин чертёж. Каждый мастер строит свою часть.'}
      </p>
      <ActiveMasterCard
        master={master}
        lessonDone={progress.lesson}
        trainDone={trainDone}
        built={!!progress.built}
        label={label}
        onEnter={onEnterMaster}
      />
      <LockedMastersList />
      <p className="text-[13px] text-muted m-0">Остальные мастера откроются в следующих главах.</p>
    </div>
  );
}
