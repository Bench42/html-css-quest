export default function ResultPanel({ masterName, voice, message }) {
  return (
    <div className="px-3 py-2.5 text-sm bg-bad-soft border-2 border-bad">
      {voice && <div className="font-bold mb-1">{masterName + ': «' + voice + '»'}</div>}
      <div className="text-text-muted">{message}</div>
    </div>
  );
}
