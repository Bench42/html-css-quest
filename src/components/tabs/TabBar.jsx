const TABS = [
  { id: 'mentor', label: 'Наставник' },
  { id: 'html', label: 'HTML' },
  { id: 'css', label: 'CSS' },
  { id: 'landing', label: 'Лендинг' },
];

export default function TabBar({ active, onChange }) {
  return (
    <div className="flex mb-3 border-b border-border">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          aria-pressed={active === tab.id}
          className={
            'flex-1 min-h-10 px-2 py-2 text-sm cursor-pointer border-b-2 ' +
            (active === tab.id ? 'border-accent text-text font-bold' : 'border-transparent text-text-muted')
          }
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
