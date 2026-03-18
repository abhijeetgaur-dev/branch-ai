// apps/web/src/store/themeStore.ts
import { create } from 'zustand';

type Theme = 'light' | 'dark' | 'system';

interface ThemeStore {
  theme:    Theme;
  isDark:   boolean;
  setTheme: (theme: Theme) => void;
  toggle:   () => void;
}

function resolveIsDark(theme: Theme): boolean {
  if (theme === 'dark')  return true;
  if (theme === 'light') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyTheme(isDark: boolean) {
  document.documentElement.classList.toggle('dark', isDark);
}

const savedTheme   = (localStorage.getItem('branch-ai-theme') as Theme) ?? 'system';
const initialDark  = resolveIsDark(savedTheme);
applyTheme(initialDark);

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme:  savedTheme,
  isDark: initialDark,

  setTheme: (theme) => {
    const isDark = resolveIsDark(theme);
    localStorage.setItem('branch-ai-theme', theme);
    applyTheme(isDark);
    set({ theme, isDark });
  },

  toggle: () => {
    get().setTheme(get().isDark ? 'light' : 'dark');
  },
}));

// Sync with OS preference when set to 'system'
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  const { theme } = useThemeStore.getState();
  if (theme === 'system') {
    applyTheme(e.matches);
    useThemeStore.setState({ isDark: e.matches });
  }
});