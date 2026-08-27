"use client";

import { useEffect } from "react";
import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const THEME_STORAGE_KEY = "marketing-theme";
const THEME_CHANGE_EVENT = "marketing-theme-change";

type Theme = "light" | "dark";

function isTheme(value: string | null | undefined): value is Theme {
  return value === "light" || value === "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

function readTheme(): Theme {
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (isTheme(storedTheme)) {
    return storedTheme;
  }

  const documentTheme = document.documentElement.dataset.theme;

  if (isTheme(documentTheme)) {
    return documentTheme;
  }

  return "light";
}

function subscribeToThemeChange(onStoreChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === THEME_STORAGE_KEY) {
      onStoreChange();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
  };
}

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  return readTheme();
}

function getServerThemeSnapshot(): Theme {
  return "light";
}

/**
 * Toggles the marketing site between the light and dark document themes.
 */
export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeToThemeChange,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const handleClick = () => {
    const nextTheme = theme === "light" ? "dark" : "light";

    applyTheme(nextTheme);
  };

  const label = theme === "light" ? "Switch to dark theme" : "Switch to light theme";
  const Icon = theme === "light" ? Moon : Sun;

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={handleClick}
      className="inline-flex size-11 items-center justify-center bg-page-offset text-secondary transition-colors hover:text-secondary-offset"
    >
      <Icon aria-hidden="true" className="size-6" strokeWidth={1.9} />
      <span className="sr-only">{label}</span>
    </button>
  );
}
