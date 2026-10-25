// Реестр блоков лендинга «Торг-Хаб». Состояния: placeholder (эталона нет) ->
// greyedIn (эталон стоит на месте, чёрно-белый) -> colored (цветной, после стилей).
// Содержание (HTML/CSS-эталон) появится по ходу шагов — пока только карта блок<->сцена.
export const LANDING_BLOCKS = [
  { id: 'hero', label: 'Вывеска и слоган', sceneId: 'gates', state: 'placeholder' },
  { id: 'about', label: 'О рынке', sceneId: 'square', state: 'placeholder' },
  { id: 'header', label: 'Промо-полоска и меню', sceneId: 'signs', state: 'placeholder' },
  { id: 'banner', label: 'Баннер и картинки', sceneId: 'artist', state: 'placeholder' },
  { id: 'structure', label: 'Разделы страницы', sceneId: 'frame', state: 'placeholder' },
  { id: 'order-form', label: 'Форма заказа', sceneId: 'orders', state: 'placeholder' },
  { id: 'goods-cards', label: 'Карточки товаров', sceneId: 'mason', state: 'placeholder' },
  { id: 'stats-categories', label: 'Полоса цифр и категории', sceneId: 'caravan', state: 'placeholder' },
  { id: 'goods-reviews', label: 'Товары и отзывы', sceneId: 'workshop', state: 'placeholder' },
  { id: 'catalog-grid', label: 'Витрина сеткой', sceneId: 'warehouse', state: 'placeholder' },
  { id: 'mobile', label: 'Мобильная версия', sceneId: 'road', state: 'placeholder' },
  { id: 'faq-footer', label: 'FAQ и подвал', sceneId: 'council', state: 'placeholder' },
];
