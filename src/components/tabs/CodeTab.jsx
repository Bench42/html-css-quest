// Вкладка с кодом (HTML или CSS по пропу lang). Наполнится в шаге 7.
export default function CodeTab({ lang }) {
  return <p>Вкладка «{lang === 'css' ? 'CSS' : 'HTML'}» — скоро.</p>;
}
