// Фон-картинка на весь блок. Если файл ещё не положен в public/art — виден
// просто сплошной цвет (--color-canvas задан на body), без картинки.
export default function SceneBackground({ src, className, children }) {
  return (
    <div
      className={'bg-cover bg-center ' + (className || '')}
      style={{ backgroundImage: `url(${src})` }}
    >
      {children}
    </div>
  );
}
