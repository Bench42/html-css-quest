import ShadowPreview from '../common/ShadowPreview.jsx';
import { LANDING_BLOCKS } from '../../data/landingBlocks.js';

// Лендинг-раскраска: весь сайт виден сразу. Блок без эталона — серая заглушка «скоро».
// Эталон на месте, но чёрно-белый (grayscale) — после экзамена сцены (greyedIn, passedBlocks).
// В цвет (colored, coloredBlocks) — после сцены, которая одевает этот блок в стиль.
export default function LandingTab({ passedBlocks, coloredBlocks }) {
  return (
    <div className="flex flex-col gap-2">
      {LANDING_BLOCKS.map((block) => {
        const started = passedBlocks.includes(block.id) && Boolean(block.html);
        const colored = coloredBlocks.includes(block.id) && Boolean(block.css);
        return (
          <div key={block.id} className="border border-border">
            {started ? (
              <div className={colored ? '' : 'grayscale'}>
                <ShadowPreview label={block.label} html={block.html} css={colored ? block.css : undefined} />
              </div>
            ) : (
              <div className="bg-panel-soft text-text-muted text-sm px-3 py-6 text-center">{block.label} — скоро</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
