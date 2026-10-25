import ShadowPreview from '../common/ShadowPreview.jsx';
import { LANDING_BLOCKS } from '../../data/landingBlocks.js';

// Лендинг-раскраска: весь сайт виден сразу. Блок без эталона — серая заглушка «скоро».
// Эталон на месте, но чёрно-белый (grayscale) — после экзамена сцены (greyedIn).
// В цвет блок перейдёт позже, когда появится сцена со стилями для него (colored) — пока нет ни одного.
export default function LandingTab({ passedBlocks }) {
  return (
    <div className="flex flex-col gap-2">
      {LANDING_BLOCKS.map((block) => {
        const greyedIn = passedBlocks.includes(block.id) && Boolean(block.html);
        return (
          <div key={block.id} className="border border-gray-300">
            {greyedIn ? (
              <div className="grayscale">
                <ShadowPreview label={block.label} html={block.html} />
              </div>
            ) : (
              <div className="bg-gray-200 text-gray-500 text-sm px-3 py-6 text-center">{block.label} — скоро</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
