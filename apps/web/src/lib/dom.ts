export function isDesktop(): boolean {
  // Tauri injects window.__TAURI_INTERNALS__ or similar, 
  // but a safer check in v1/v2 is checking if the window has the __TAURI__ object.
  return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
}
