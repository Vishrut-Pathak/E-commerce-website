const fs = require('node:fs/promises');
const path = require('node:path');

const ITEMS_FILE = path.join(__dirname, '..', 'items.json');

async function getStoredItems() {
  const rawFileContent = await fs.readFile(ITEMS_FILE, { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedItems = data.items ?? [];
  return Array.isArray(storedItems) ? storedItems.flat(Infinity) : [];
}

function storeItems(items) {
  const flatItems = Array.isArray(items) ? items.flat(Infinity) : [];
  return fs.writeFile(ITEMS_FILE, JSON.stringify({ items: flatItems }, null, 2));
}

exports.getStoredItems = getStoredItems;
exports.storeItems = storeItems;