import { useEffect, useRef } from 'react';
import { clean } from '../../engine/sanitize.js';

// React управляет только внешней оболочкой (.pv/.pvlabel/.pvhost). Всё внутри
// shadow root — чистый императивный DOM через clean(), не React-рендер, не iframe.
export default function ShadowPreview({ label, cls, html }) {
  const hostRef = useRef(null);
  const pageRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || host.shadowRoot) return; // защита от повторного attachShadow в StrictMode
    const root = host.attachShadow({ mode: 'open' });
    root.innerHTML =
      '<style>:host{display:block}.page{box-sizing:border-box;padding:10px 12px;min-height:92px;background:#fff;color:#14181f;font:16px/1.45 "Times New Roman",Times,serif;overflow:auto;overflow-wrap:anywhere}</style><div class="page"></div>';
    const page = root.querySelector('.page');
    page.addEventListener('click', (e) => {
      if (e.target.closest && e.target.closest('a')) e.preventDefault();
    });
    pageRef.current = page;
  }, []);

  useEffect(() => {
    if (pageRef.current) pageRef.current.replaceChildren(clean(html));
  }, [html]);

  const borderCls = cls === 'blue' ? 'border-accent border-dashed' : cls === 'ok' ? 'border-ok' : 'border-line';
  const labelCls = cls === 'blue' ? 'text-accent' : cls === 'ok' ? 'text-ok' : 'text-muted';

  return (
    <div className={'border-2 overflow-hidden bg-panel min-w-0 ' + borderCls}>
      {label && <div className={'font-mono text-[11px] px-2 py-1 border-b-2 border-line ' + labelCls}>{label}</div>}
      <div className="block" ref={hostRef} />
    </div>
  );
}
