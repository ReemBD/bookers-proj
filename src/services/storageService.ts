export const storageService = {
  saveToStorage,
  loadFromStorage,
};

function saveToStorage(key: string, value: any) {
  var str = JSON.stringify(value);
  localStorage.setItem(key, str);
}

function loadFromStorage(key: string) {
  var str = localStorage.getItem(key);
  return str ? JSON.parse(str) : null;
}
