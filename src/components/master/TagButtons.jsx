export default function TagButtons({ tags, onInsert, onExit }) {
  return (
    <div className="flex gap-1.5 flex-wrap" onMouseDown={(e) => e.preventDefault()}>
      {tags.map((name) => (
        <button
          key={name}
          type="button"
          aria-label={'Вставить тег ' + name}
          onClick={() => onInsert(name)}
          className="font-mono min-h-10 min-w-[52px] px-3 py-1.5 bg-panel text-text border-2 border-border cursor-pointer focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          {'<' + name + '>'}
        </button>
      ))}
      <button
        type="button"
        onClick={onExit}
        className="font-mono min-h-10 min-w-[52px] px-3 py-1.5 bg-panel text-text border-2 border-border cursor-pointer focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      >
        ↵ выйти
      </button>
    </div>
  );
}
