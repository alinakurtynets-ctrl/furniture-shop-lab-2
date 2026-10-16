# Лабораторна робота №2. npm, Sass, Node.js (FurniShop)

## 1. Середовище розробки
- **Node.js:** v20.11.0
- **npm:** 10.2.4

## 2. Перелік команд
- `npm install` — встановлює розробницькі залежності (`devDependencies`).
- `npm run scss:build` — одноразова компіляція SCSS у стиснутий `css/style.css` без source map.
- `npm run scss:watch` — відстежує зміни у SCSS файлах і компілює CSS на льоту.
- `npm run build:cards` — зчитує `data/products.json` та вставляє HTML-картки в `index.html`.
- `npm run build` — повна збірка проєкту (генерація карток + компіляція CSS).

## 3. Обґрунтування вибору модульної системи
У проєкті використано систему **ESM (ECMAScript Modules)** завдяки налаштуванню `"type": "module"` у `package.json`.
*Обґрунтування:* ESM є офіційним сучасним стандартом мови JavaScript (`import`/`export`), який природно підтримується сучасними версіями Node.js та браузерами.

## 4. Структура проєкту
- `css/style.css` — згенерований CSS-файл.
- `src/scss/` — вихідні SCSS стилі, розділені на partials (`_variables.scss`, `_mixins.scss`, `_header.scss`, `main.scss`).
- `data/products.json` — дані карток товарів у форматі JSON.
- `scripts/build-cards.js` — Node.js скрипт автоматичної генерації HTML-розмітки.
- `index.html` — головна сторінка з маркерами `<!-- cards:start -->` та `<!-- cards:end -->`.

## 5. Публікація
Посилання на опубліковану сторінку: `https://<ваш-логін>.github.io/<назва-репозиторію>/`
