import { ART } from '../../data/artAssets.js';
import { signParts } from '../../data/townScene.js';
import SceneBackground from '../art/SceneBackground.jsx';

export default function TownPlot({ built, fresh }) {
  const sign = built ? signParts(built) : null;
  return (
    <section className="border-2 border-line overflow-hidden">
      <div className="flex justify-between gap-2 font-mono text-xs text-accent px-3 py-2 border-b-2 border-line bg-panel">
        <span>Боксбург · участок у моста</span>
        <span>{'Деталей: ' + (built ? 1 : 0) + ' из 10'}</span>
      </div>
      {/* Позиция вывески (left/top ниже) подобрана на глаз под столбик на картинке
          участка — донастроим, когда увидим результат на экране. */}
      <SceneBackground src={ART.plotSceneBg} className="relative w-full aspect-[896/598] bg-canvas">
        {sign && (
          <div
            className={'absolute w-[52%] aspect-[783/531] bg-contain bg-no-repeat bg-center ' + (fresh ? 'animate-drop' : '')}
            style={{ backgroundImage: `url(${ART.signFrame})`, left: '24%', top: '20%' }}
          >
            {/* Текст кладём только на деревянную доску вывески, не на весь крюк с цепями */}
            <div className="absolute inset-x-[14%] top-[32%] bottom-[8%] flex flex-col items-center justify-center text-center gap-1">
              <div className="font-bold text-code-ink text-[clamp(11px,3.4vw,20px)] leading-tight">{sign.title}</div>
              <div className="text-code-ink text-[clamp(9px,2.6vw,15px)] leading-tight" dangerouslySetInnerHTML={{ __html: sign.line }} />
            </div>
          </div>
        )}
      </SceneBackground>
    </section>
  );
}
