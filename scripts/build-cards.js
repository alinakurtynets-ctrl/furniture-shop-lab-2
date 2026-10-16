import fs from "node:fs";

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
      console.error(`❌ Помилка: Файл даних "${path}" не знайдено.`);
    } else if (error instanceof SyntaxError) {
      console.error(`❌ Помилка: Некоректний синтаксис JSON у файлі "${path}".`);
    } else {
      console.error(`❌ Помилка читання файлу "${path}":`, error.message);
    }
    process.exit(1);
  }
}

function renderCard(product) {
  return `
          <!-- Картка ${product.id} -->
          <article class="product-card">
            <div class="product-card__image">
              <img src="${product.image}" alt="${product.title}" loading="lazy">
            </div>
            <h3 class="product-card__title">${product.title}</h3>
            <span class="product-card__price">${product.price}</span>
            <button class="btn btn--secondary product-card__btn" type="button">Додати в кошик</button>
          </article>`.trim();
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

  return `${before}\n${markup}\n          ${after}`;
}

function main() {
  const products = readProducts(DATA_PATH);

  if (!Array.isArray(products)) {
    console.error(`❌ Помилка: Дані у "${DATA_PATH}" мають бути масивом.`);
    process.exit(1);
  }

  const markup = products.map(renderCard).join("\n\n");

  let html;
  try {
    html = fs.readFileSync(PAGE_PATH, "utf8");
  } catch (error) {
    console.error(`❌ Помилка: Не вдалося прочитати "${PAGE_PATH}".`);
    process.exit(1);
  }

  const updatedHtml = injectMarkup(html, markup);

  try {
    fs.writeFileSync(PAGE_PATH, updatedHtml, "utf8");
    console.log(`✅ Згенеровано карток: ${products.length}`);
  } catch (error) {
    console.error(`❌ Помилка запису в "${PAGE_PATH}":`, error.message);
    process.exit(1);
  }
}

main();
