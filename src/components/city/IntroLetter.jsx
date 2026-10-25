import { ART } from '../../data/artAssets.js';
import SceneBackground from '../art/SceneBackground.jsx';
import ArtPanel from '../art/ArtPanel.jsx';
import ArtButton from '../art/ArtButton.jsx';

export default function IntroLetter({ onStart }) {
  return (
    <SceneBackground src={ART.introSceneBg} className="flex flex-col justify-center min-h-[480px] p-3">
      <ArtPanel variant="parchment" className="flex flex-col gap-3 px-6 py-5">
        <div className="font-mono text-xs text-muted">Боксбург</div>
        <h2 className="font-body font-bold text-lg m-0 text-ink">Письмо из Боксбурга</h2>
        <p className="m-0">Дядя Флекс, старый трактирщик, оставил тебе участок у каменного моста и чертёж таверны.</p>
        <p className="m-0">Условие в завещании: открыть таверну можно, только построив её самому, с помощью мастеров города. Каждый из них когда-то остался в долгу перед Флексом.</p>
        <p className="m-0">В углу чертежа приписка: «Для главного. Откроешь последним».</p>
        <ArtButton variant="primary" onClick={onStart}>
          Отправиться на участок
        </ArtButton>
      </ArtPanel>
    </SceneBackground>
  );
}
