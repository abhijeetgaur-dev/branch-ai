import { openUrl } from '@tauri-apps/plugin-opener';
import { isDesktop } from './dom';

export function setupTauriListeners() {
  if (!isDesktop()) return;

  // Intercept all clicks on standard 'a' tags that should open externally
  document.addEventListener('click', async (e) => {
    const target = (e.target as HTMLElement).closest('a');
    if (!target) return;

    const href = target.getAttribute('href');
    const targetAttr = target.getAttribute('target');

    // If it's a real external link or opens in a new tab, intercept it
    if (href && (href.startsWith('http') || targetAttr === '_blank')) {
      e.preventDefault();
      await openUrl(href);
    }
  });
}
