export const utilService = {
  isElFocused,
};

function isElFocused(el: HTMLElement) {
  return document.activeElement === el;
}
