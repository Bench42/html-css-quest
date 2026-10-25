// Реестр блоков лендинга «Торг-Хаб»: статика (какой блок за какой сценой, эталонный HTML).
// Живое состояние блока (placeholder/greyedIn/colored) считает LandingTab из passedBlocks
// в useGameState — здесь его не храним, чтобы не было двух источников правды.
export const LANDING_BLOCKS = [
  {
    id: 'hero',
    label: 'Вывеска и слоган',
    sceneId: 'gates',
    html: '<h1 class="hero-title">Торг-Хаб</h1>\n<p>Всё для жителей <b>Города Кода</b></p>',
    css: '.hero-title {\n  color: #14b8a6;\n  background: #1e293b;\n  font-family: sans-serif;\n}',
  },
  { id: 'about', label: 'О рынке', sceneId: 'square' },
  { id: 'header', label: 'Промо-полоска и меню', sceneId: 'signs' },
  { id: 'banner', label: 'Баннер и картинки', sceneId: 'artist' },
  { id: 'structure', label: 'Разделы страницы', sceneId: 'frame' },
  { id: 'order-form', label: 'Форма заказа', sceneId: 'orders' },
  { id: 'goods-cards', label: 'Карточки товаров', sceneId: 'mason' },
  { id: 'stats-categories', label: 'Полоса цифр и категории', sceneId: 'caravan' },
  { id: 'goods-reviews', label: 'Товары и отзывы', sceneId: 'workshop' },
  { id: 'catalog-grid', label: 'Витрина сеткой', sceneId: 'warehouse' },
  { id: 'mobile', label: 'Мобильная версия', sceneId: 'road' },
  { id: 'faq-footer', label: 'FAQ и подвал', sceneId: 'council' },
];
