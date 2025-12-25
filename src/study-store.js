export const STORAGE_KEY = "study_logs_v1";

export function loadLogs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function saveLogs(logs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

export function clearLogs() {
  localStorage.removeItem(STORAGE_KEY);
}
