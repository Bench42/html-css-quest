import { ALL_MASTERS } from '../../data/masters/index.js';

export default function LockedMastersList() {
  return (
    <div className="flex flex-col gap-1.5">
      {ALL_MASTERS.slice(1).map((m, i) => (
        <div className="flex items-center gap-2.5 px-3 py-2 border-2 border-line bg-panel opacity-[0.55]" key={m.id}>
          <div className="shrink-0 w-7 h-7 border-2 border-line flex items-center justify-center font-mono text-xs">{i + 2}</div>
          <div className="font-bold flex-1 min-w-0 text-ink">{m.name}</div>
          <div className="font-mono text-xs text-muted">{m.topic}</div>
        </div>
      ))}
    </div>
  );
}
