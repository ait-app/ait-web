export function bindCodeCopy(button: HTMLButtonElement, code: HTMLElement, labels: HTMLElement) {
  const initialLabel = labels.dataset.copyLabel ?? 'Copy';
  let resetTimer: ReturnType<typeof setTimeout> | undefined;

  button.setAttribute('aria-live', 'polite');
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code.textContent ?? '');
      button.textContent = labels.dataset.copiedLabel ?? 'Copied';
    } catch {
      button.textContent = labels.dataset.copyError ?? 'Copy manually';
    }
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => { button.textContent = initialLabel; }, 2000);
  });
}
