export default function isOverflowing(el: HTMLElement): boolean {
  return el.offsetHeight < el.scrollHeight || el.offsetWidth < el.scrollWidth;
}
