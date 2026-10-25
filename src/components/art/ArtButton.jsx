import { ART } from '../../data/artAssets.js';

// primary — круглая зелёная кнопка на CSS (градиент + тень), без картинки.
// secondary — деревянная плашка как background-image (не border-image: плашка
// неправильной формы, 9-срез давал светлые квадраты по углам).
export default function ArtButton({ variant = 'secondary', type = 'button', className, disabled, children, ...rest }) {
  if (variant === 'primary') {
    return (
      <button
        type={type}
        disabled={disabled}
        className={
          'font-body text-white font-bold min-h-11 px-5 py-2.5 cursor-pointer rounded-full border-2 border-[#1f4d2a] ' +
          'bg-gradient-to-b from-[#7bd98c] to-[#3f8f52] shadow-[0_4px_0_0_#1f4d2a] ' +
          'active:translate-y-[2px] active:shadow-[0_2px_0_0_#1f4d2a] ' +
          'disabled:opacity-50 disabled:cursor-not-allowed ' +
          'focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 ' +
          (className || '')
        }
        {...rest}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      type={type}
      disabled={disabled}
      className={
        'font-body text-code-ink font-medium min-h-11 px-6 py-3 cursor-pointer bg-no-repeat border-0 ' +
        'disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 ' +
        (className || '')
      }
      style={{ backgroundImage: `url(${ART.buttonSecondary})`, backgroundSize: '100% 100%' }}
      {...rest}
    >
      {children}
    </button>
  );
}
