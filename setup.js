import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// 1. Опис структури та вмісту всіх файлів проєкту
const files = {
  '.gitignore': `node_modules/
.DS_Storenode setup.js
Thumbs.db
*.log
`,

  'package.json': JSON.stringify({
    "name": "furnishop-lab2",
    "version": "1.0.0",
    "description": "FurniShop - Системи Зберігання (Лабораторна робота №2)",
    "type": "module",
    "main": "scripts/build-cards.js",
    "scripts": {
      "scss:build": "sass src/scss/main.scss css/style.css --no-source-map --style=compressed",
      "scss:watch": "sass --watch src/scss/main.scss:css/style.css",
      "build:cards": "node scripts/build-cards.js",
      "build": "npm run build:cards && npm run scss:build"
    },
    "author": "Студент",
    "license": "ISC",
    "devDependencies": {
      "sass": "^1.77.0"
    }
  }, null, 2),

  'src/scss/_variables.scss': `// Змінні теми (Варіант 8)
$color-accent: #5F6B63;
$color-accent-hover: #4a544d;
$color-bg-main: #ffffff;
$color-bg-secondary: #f4f5f4;
$color-text-main: #2b2b2b;
$color-text-muted: #6c757d;
$color-footer-bg: #1e2421;
$color-footer-text: #e0e0e0;

$font-heading: 'Playfair Display', serif;
$font-body: 'Roboto', sans-serif;

$radius-sm: 0.25rem;
$radius-md: 0.5rem;
$container-width: 1200px;
`,

  'src/scss/_mixins.scss': `@mixin mobile {
  @media (max-width: 767px) {
    @content;
  }
}

@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
`,

  'src/scss/_header.scss': `@use "variables" as v;
@use "mixins" as m;

.header {
  background-color: v.$color-bg-main;
  border-bottom: 1px solid #e9ecef;

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-block: 1.25rem;
  }
}

.logo {
  font-family: v.$font-heading;
  font-size: 1.75rem;
  font-weight: 700;
  color: v.$color-text-main;
}

.nav {
  &__list {
    display: none;
    gap: 2rem;

    @media (min-width: 768px) {
      display: flex;
    }
  }

  &__link {
    font-weight: 500;
    transition: color 0.2s;

    &:hover {
      color: v.$color-accent;
    }
  }
}
`,

  'src/scss/main.scss': `@use "variables" as v;
@use "mixins" as m;
@use "header";

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: v.$font-body;
  color: v.$color-text-main;
  background-color: v.$color-bg-main;
  line-height: 1.6;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

ul { list-style: none; }
a { text-decoration: none; color: inherit; }

.container {
  max-width: v.$container-width;
  margin-inline: auto;
  padding-inline: 1.25rem;
}

h1, .hero__title {
  font-family: v.$font-heading;
  font-size: clamp(2rem, 1.2rem + 3.5vw, 3.5rem);
  line-height: 1.2;
  margin-bottom: 1rem;
}

h2 {
  font-family: v.$font-heading;
  font-size: clamp(1.5rem, 1rem + 2.5vw, 2.5rem);
  line-height: 1.3;
}

h3 {
  font-size: clamp(1.125rem, 0.9rem + 1vw, 1.5rem);
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: v.$radius-sm;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &--primary {
    background-color: v.$color-accent;
    color: #ffffff;

    &:hover {
      background-color: v.$color-accent-hover;
    }
  }

  &--secondary {
    background-color: transparent;
    border: 1px solid v.$color-accent;
    color: v.$color-accent;

    &:hover {
      background-color: v.$color-accent;
      color: #ffffff;
    }
  }
}

/* Hero Section */
.hero {
  padding-block: 3rem;
  background-color: v.$color-bg-secondary;

  &__container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;

    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  &__content, &__media {
    width: 100%;

    @media (min-width: 768px) {
      flex: 1 1 0;
    }
  }

  &__text {
    color: v.$color-text-muted;
    margin-bottom: 1.5rem;
    font-size: 1.125rem;
  }

  &__media {
    border-radius: v.$radius-md;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

    img {
      width: 100%;
      height: 350px;

      @media (min-width: 768px) {
        height: 420px;
      }
    }
  }
}

/* Статистика */
.stats {
  padding-block: 2rem;

  &__container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 1.5rem;
    padding: 2rem;
    background-color: v.$color-accent;
    color: #ffffff;
    border-radius: v.$radius-md;
  }
}

.stat-card {
  text-align: center;

  &__number {
    font-size: 2.25rem;
    font-weight: 700;
    display: block;
  }

  &__label {
    font-size: 0.875rem;
    opacity: 0.9;
  }
}

/* Секція Про нас */
.about {
  padding-block: 4rem;

  &__container {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    align-items: center;

    @media (min-width: 768px) {
      flex-direction: row;
    }
  }

  &__media, &__content {
    width: 100%;

    @media (min-width: 768px) {
      flex: 1 1 0;
    }
  }

  &__media {
    border-radius: v.$radius-md;
    overflow: hidden;
  }

  &__content p {
    margin-block: 1rem;
    color: v.$color-text-muted;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1.5rem;

    li {
      padding-left: 1.5rem;
      position: relative;

      &::before {
        content: "✓";
        position: absolute;
        left: 0;
        color: v.$color-accent;
        font-weight: bold;
      }
    }
  }
}

/* Каталог та картки */
.catalog {
  padding-block: 4rem;
  background-color: v.$color-bg-secondary;

  &__title, &__subtitle {
    text-align: center;
  }

  &__subtitle {
    color: v.$color-text-muted;
    margin-bottom: 2.5rem;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: v.$radius-md;
  padding: 1.25rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  }

  &__image {
    border-radius: v.$radius-sm;
    overflow: hidden;
    margin-bottom: 1rem;
    height: 220px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__title {
    margin-bottom: 0.5rem;
  }

  &__price {
    font-size: 1.25rem;
    font-weight: 700;
    color: v.$color-accent;
    margin-bottom: 1.25rem;
  }
}

/* Підвал */
.footer {
  background-color: v.$color-footer-bg;
  color: v.$color-footer-text;
  padding-block: 4rem 1.5rem;

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 3rem;

    @media (min-width: 768px) {
      grid-template-columns: 2fr repeat(3, 1fr);
    }
  }

  &__col {
    h3 {
      color: #ffffff;
      margin-bottom: 1.25rem;
    }

    p {
      color: #a0a0a0;
      font-size: 0.9375rem;
    }

    ul li {
      margin-bottom: 0.625rem;
    }

    a {
      color: #a0a0a0;
      transition: color 0.2s;

      &:hover {
        color: #ffffff;
      }
    }
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 1.5rem;
    font-size: 0.875rem;
    color: #a0a0a0;

    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  &__socials {
    display: flex;
    gap: 1.25rem;

    a:hover {
      color: #ffffff;
    }
  }
}
`,

  'data/products.json': JSON.stringify([
    {
      "id": 1,
      "title": "Гардеробна система \"Modula\"",
      "price": "14 500 ₴",
      "image": "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80",
      "description": "Модульна гардеробна система для зберігання речей.",
      "link": "#"
    },
    {
      "id": 2,
      "title": "Стелаж металевий \"Loft Storage\"",
      "price": "6 800 ₴",
      "image": "https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&w=600&q=80",
      "description": "Відкритий стелаж у стилі лофт.",
      "link": "#"
    },
    {
      "id": 3,
      "title": "Комод-органайзер \"Nordic\"",
      "price": "9 200 ₴",
      "image": "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80",
      "description": "Дерев'яний комод із зручними органайзерами.",
      "link": "#"
    },
    {
      "id": 4,
      "title": "Обувниця \"Slim Concept\"",
      "price": "4 300 ₴",
      "image": "https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&w=600&q=80",
      "description": "Компактна шафа для взуття з підвісною системою.",
      "link": "#"
    },
    {
      "id": 5,
      "title": "Набір органайзерів \"Boxes Set\"",
      "price": "1 250 ₴",
      "image": "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80",
      "description": "Модульні коробки та текстильні органайзери.",
      "link": "#"
    },
    {
      "id": 6,
      "title": "Шафа настінна \"Wall Modern\"",
      "price": "3 100 ₴",
      "image": "https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&w=600&q=80",
      "description": "Настінна відкрита полиця для швидкого доступу.",
      "link": "#"
    }
  ], null, 2),

  'scripts/build-cards.js': `import fs from "node:fs";

const DATA_PATH = "data/products.json";
const PAGE_PATH = "index.html";
const START_MARKER = "<!-- cards:start -->";
const END_MARKER = "<!-- cards:end -->";

function readProducts(path) {
  try {
    const rawData = fs.readFileSync(path, "utf8");
    return JSON.parse(rawData);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error(\`❌ Помилка: Файл даних "\${path}" не знайдено.\`);
    } else if (error instanceof SyntaxError) {
      console.error(\`❌ Помилка: Некоректний синтаксис JSON у файлі "\${path}".\`);
    } else {
      console.error(\`❌ Помилка читання файлу "\${path}":\`, error.message);
    }
    process.exit(1);
  }
}

function renderCard(product) {
  return \`
          <!-- Картка \${product.id} -->
          <article class="product-card">
            <div class="product-card__image">
              <img src="\${product.image}" alt="\${product.title}" loading="lazy">
            </div>
            <h3 class="product-card__title">\${product.title}</h3>
            <span class="product-card__price">\${product.price}</span>
            <button class="btn btn--secondary product-card__btn" type="button">Додати в кошик</button>
          </article>\`.trim();
}

function injectMarkup(html, markup) {
  const startIndex = html.indexOf(START_MARKER);
  const endIndex = html.indexOf(END_MARKER);

  if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
    console.error("❌ Помилка: У файлі index.html відсутні маркери <!-- cards:start --> та <!-- cards:end -->.");
    process.exit(1);
  }

  const before = html.slice(0, startIndex + START_MARKER.length);
  const after = html.slice(endIndex);

  return \`\${before}\\n\${markup}\\n          \${after}\`;
}

function main() {
  const products = readProducts(DATA_PATH);

  if (!Array.isArray(products)) {
    console.error(\`❌ Помилка: Дані у "\${DATA_PATH}" мають бути масивом.\`);
    process.exit(1);
  }

  const markup = products.map(renderCard).join("\\n\\n");

  let html;
  try {
    html = fs.readFileSync(PAGE_PATH, "utf8");
  } catch (error) {
    console.error(\`❌ Помилка: Не вдалося прочитати "\${PAGE_PATH}".\`);
    process.exit(1);
  }

  const updatedHtml = injectMarkup(html, markup);

  try {
    fs.writeFileSync(PAGE_PATH, updatedHtml, "utf8");
    console.log(\`✅ Згенеровано карток: \${products.length}\`);
  } catch (error) {
    console.error(\`❌ Помилка запису в "\${PAGE_PATH}":\`, error.message);
    process.exit(1);
  }
}

main();
`,

  'index.html': `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Системи Зберігання — FurniShop</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <!-- Шапка сайту -->
  <header class="header">
    <div class="container header__container">
      <a href="#" class="logo">FurniShop</a>
      <nav class="nav">
        <ul class="nav__list">
          <li><a href="#hero" class="nav__link">Головна</a></li>
          <li><a href="#about" class="nav__link">Про нас</a></li>
          <li><a href="#catalog" class="nav__link">Каталог</a></li>
          <li><a href="#footer" class="nav__link">Контакти</a></li>
        </ul>
      </nav>
      <button class="btn btn--primary" type="button">Замовити</button>
    </div>
  </header>

  <main>
    <!-- Головний екран -->
    <section id="hero" class="hero">
      <div class="container hero__container">
        <div class="hero__content">
          <h1 class="hero__title">Створіть ідеальний порядок у домі</h1>
          <p class="hero__text">Сучасні та ергономічні системи зберігання для вашого гардероба, вітальні та робочого простору.</p>
          <a href="#catalog" class="btn btn--primary">Обрати рішення</a>
        </div>
        <div class="hero__media">
          <img src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80" alt="Сучасний стильний гардероб із системами зберігання" width="600" height="420">
        </div>
      </div>
    </section>

    <!-- Переваги -->
    <section class="stats">
      <div class="container">
        <div class="stats__container">
          <article class="stat-card">
            <span class="stat-card__number">7+</span>
            <span class="stat-card__label">Років досвіду</span>
          </article>
          <article class="stat-card">
            <span class="stat-card__number">2</span>
            <span class="stat-card__label">Шоуруми в Україні</span>
          </article>
          <article class="stat-card">
            <span class="stat-card__number">10k+</span>
            <span class="stat-card__label">Шаф продано</span>
          </article>
          <article class="stat-card">
            <span class="stat-card__number">260+</span>
            <span class="stat-card__label">Варіантів модулів</span>
          </article>
        </div>
      </div>
    </section>

    <!-- Про нас -->
    <section id="about" class="about">
      <div class="container about__container">
        <div class="about__media">
          <img src="https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&w=800&q=80" alt="Організація речей у закритих та відкритих стелажах" loading="lazy" width="600" height="400">
        </div>
        <div class="about__content">
          <h2>Ми робимо ваш простір більш функціональним</h2>
          <p>Наші системи зберігання покликані раціонально використати кожен квадратний сантиметр вашої оселі.</p>
          <ul class="about__list">
            <li><strong>Оцінка та замір простору:</strong> Допомагаємо підібрати деталі за індивідуальними розмірами.</li>
            <li><strong>Модульні рішення:</strong> Можливість трансформувати та доповнювати полиці з часом.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Каталог -->
    <section id="catalog" class="catalog">
      <div class="container">
        <h2 class="catalog__title">Системи зберігання</h2>
        <p class="catalog__subtitle">Продукція найвищої якості для вашого комфорту</p>

        <div class="catalog__grid">
<!-- cards:start -->
<!-- cards:end -->
        </div>
      </div>
    </section>
  </main>

  <!-- Підвал сайту -->
  <footer id="footer" class="footer">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__col">
          <h3>FurniShop</h3>
          <p>Сучасні індивідуальні рішення для ефективного та естетичного зберігання речей у домі.</p>
        </div>
        <nav class="footer__col">
          <h3>Продукція</h3>
          <ul>
            <li><a href="#">Гардеробні</a></li>
            <li><a href="#">Стелажі</a></li>
            <li><a href="#">Комоди</a></li>
          </ul>
        </nav>
        <nav class="footer__col">
          <h3>Компанія</h3>
          <ul>
            <li><a href="#">Про нас</a></li>
            <li><a href="#">Портфоліо</a></li>
            <li><a href="#">Контакти</a></li>
          </ul>
        </nav>
        <nav class="footer__col">
          <h3>Клієнтам</h3>
          <ul>
            <li><a href="#">Доставка і оплата</a></li>
            <li><a href="#">Гарантія</a></li>
          </ul>
        </nav>
      </div>

      <div class="footer__bottom">
        <p>&copy; 2026 FurniShop. Всі права захищені.</p>
        <div class="footer__socials">
          <a href="#" aria-label="Facebook">Facebook</a>
          <a href="#" aria-label="Instagram">Instagram</a>
          <a href="#" aria-label="Pinterest">Pinterest</a>
        </div>
      </div>
    </div>
  </footer>

</body>
</html>
`,

  'README.md': `# Лабораторна робота №2. npm, Sass, Node.js (FurniShop)

## 1. Середовище розробки
- **Node.js:** v20.11.0
- **npm:** 10.2.4

## 2. Перелік команд
- \`npm install\` — встановлює розробницькі залежності (\`devDependencies\`).
- \`npm run scss:build\` — одноразова компіляція SCSS у стиснутий \`css/style.css\` без source map.
- \`npm run scss:watch\` — відстежує зміни у SCSS файлах і компілює CSS на льоту.
- \`npm run build:cards\` — зчитує \`data/products.json\` та вставляє HTML-картки в \`index.html\`.
- \`npm run build\` — повна збірка проєкту (генерація карток + компіляція CSS).

## 3. Обґрунтування вибору модульної системи
У проєкті використано систему **ESM (ECMAScript Modules)** завдяки налаштуванню \`"type": "module"\` у \`package.json\`.
*Обґрунтування:* ESM є офіційним сучасним стандартом мови JavaScript (\`import\`/\`export\`), який природно підтримується сучасними версіями Node.js та браузерами.

## 4. Структура проєкту
- \`css/style.css\` — згенерований CSS-файл.
- \`src/scss/\` — вихідні SCSS стилі, розділені на partials (\`_variables.scss\`, \`_mixins.scss\`, \`_header.scss\`, \`main.scss\`).
- \`data/products.json\` — дані карток товарів у форматі JSON.
- \`scripts/build-cards.js\` — Node.js скрипт автоматичної генерації HTML-розмітки.
- \`index.html\` — головна сторінка з маркерами \`<!-- cards:start -->\` та \`<!-- cards:end -->\`.

## 5. Публікація
Посилання на опубліковану сторінку: \`https://<ваш-логін>.github.io/<назва-репозиторію>/\`
`
};

// 2. Логіка створення всіх структур
console.log("🚀 Створення файлів та папок проєкту...");

Object.entries(files).forEach(([filePath, content]) => {
  const dir = path.dirname(filePath);
  if (dir !== '.' && !fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  └─ Створено: ${filePath}`);
});

console.log("\n📦 Встановлення залежностей (npm install)...");
execSync("npm install", { stdio: "inherit" });

console.log("\n⚡ Виконання збірки (npm run build)...");
execSync("npm run build", { stdio: "inherit" });

console.log("\n🎉 Проєкт успішно створено та зібрано! Тепер можна видалити setup.js.");