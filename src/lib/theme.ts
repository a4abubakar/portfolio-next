export const THEME_STORAGE_KEY = "theme";

export type ThemePreference = "light" | "dark";

/**
 * Runs inline in <head> before first paint so there is no flash of the wrong theme.
 * Order of precedence: saved choice, then the operating system preference.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem("${THEME_STORAGE_KEY}");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

export function isThemePreference(value: unknown): value is ThemePreference {
  return value === "light" || value === "dark";
}

export function nextTheme(isDark: boolean): ThemePreference {
  return isDark ? "light" : "dark";
}

export function readStoredTheme(storage: Pick<Storage, "getItem"> | undefined): ThemePreference | null {
  try {
    const value = storage?.getItem(THEME_STORAGE_KEY);
    return isThemePreference(value) ? value : null;
  } catch {
    return null;
  }
}
