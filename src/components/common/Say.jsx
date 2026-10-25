import ArtPanel from '../art/ArtPanel.jsx';

export default function Say({ name, portrait, lines }) {
  const list = [].concat(lines);
  return (
    <div className="flex items-start gap-3 text-sm">
      <img src={portrait} alt={name} className="shrink-0 block w-24 h-24 object-cover border-2 border-frame bg-panel" />
      <ArtPanel variant="parchment" className="flex-1 min-w-0 px-5 py-3">
        {list.map((l, i) => (
          <p key={i} className={'m-0' + (i > 0 ? ' mt-1.5' : '')}>
            {(i === 0 ? name + ': ' : '') + '«' + l + '»'}
          </p>
        ))}
      </ArtPanel>
    </div>
  );
}
