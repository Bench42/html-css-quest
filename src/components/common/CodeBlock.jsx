// Общий блок кода: моноширинный, с переносами как в строке (строки с отступом 2
// пробела задаются в данных сцены через \n — компонент просто их не схлопывает).
export default function CodeBlock({ code }) {
  return <pre className="font-mono text-sm whitespace-pre-wrap bg-panel-soft text-text border border-border p-2 m-0">{code}</pre>;
}
