const KEY = "jp_dev_study_log_items_v1";

export function loadItems() {
  try {
    const raw = localStorage.getItem(KEY);
    const data = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function saveItems(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function addItem(items, text) {
  const trimmed = (text || "").trim();
  if (!trimmed) return items;

  const next = [
    {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      text: trimmed,
      createdAt: new Date().toISOString(),
    },
    ...items,
  ];
  saveItems(next);
  return next;
}

export function removeItem(items, id) {
  const next = items.filter((x) => x.id !== id);
  saveItems(next);
  return next;
}
