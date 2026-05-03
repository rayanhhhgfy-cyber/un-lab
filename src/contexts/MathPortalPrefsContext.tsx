import { createContext, useCallback, useContext, useMemo, useState } from "react";

const PREFS_KEY = "un-lab:math-portal-prefs";
const BOOKMARKS_KEY = "un-lab:math-bookmarks";

export interface MathPortalPrefs {
  decimals: number;
  angleMode: "deg" | "rad";
  compactNumbers: boolean;
}

const defaultPrefs: MathPortalPrefs = {
  decimals: 6,
  angleMode: "rad",
  compactNumbers: false,
};

function loadPrefs(): MathPortalPrefs {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (!raw) return defaultPrefs;
    const p = JSON.parse(raw) as Partial<MathPortalPrefs>;
    return { ...defaultPrefs, ...p };
  } catch {
    return defaultPrefs;
  }
}

function loadBookmarks(): string[] {
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    if (!raw) return [];
    const b = JSON.parse(raw);
    return Array.isArray(b) ? b.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

interface MathPortalPrefsContextValue {
  prefs: MathPortalPrefs;
  setPrefs: (p: Partial<MathPortalPrefs>) => void;
  formatNum: (x: number) => string;
  bookmarks: string[];
  toggleBookmark: (slug: string) => void;
  isBookmarked: (slug: string) => boolean;
  clearBookmarks: () => void;
}

const MathPortalPrefsContext = createContext<MathPortalPrefsContextValue | null>(null);

export function MathPortalPrefsProvider({ children }: { children: React.ReactNode }) {
  const [prefs, setPrefsState] = useState<MathPortalPrefs>(loadPrefs);
  const [bookmarks, setBookmarks] = useState<string[]>(loadBookmarks);

  const setPrefs = useCallback((p: Partial<MathPortalPrefs>) => {
    setPrefsState((prev) => {
      const n = { ...prev, ...p };
      try {
        localStorage.setItem(PREFS_KEY, JSON.stringify(n));
      } catch {
        /* ignore */
      }
      return n;
    });
  }, []);

  const formatNum = useCallback(
    (x: number) => {
      if (!Number.isFinite(x)) return "—";
      const d = Math.max(0, Math.min(12, prefs.decimals));
      if (prefs.compactNumbers && (Math.abs(x) >= 1e6 || (Math.abs(x) > 0 && Math.abs(x) < 1e-4))) {
        return x.toExponential(Math.min(6, d));
      }
      return x.toFixed(d);
    },
    [prefs.compactNumbers, prefs.decimals]
  );

  const toggleBookmark = useCallback((slug: string) => {
    setBookmarks((prev) => {
      const n = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      try {
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(n));
      } catch {
        /* ignore */
      }
      return n;
    });
  }, []);

  const isBookmarked = useCallback((slug: string) => bookmarks.includes(slug), [bookmarks]);

  const clearBookmarks = useCallback(() => {
    setBookmarks([]);
    try {
      localStorage.removeItem(BOOKMARKS_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({ prefs, setPrefs, formatNum, bookmarks, toggleBookmark, isBookmarked, clearBookmarks }),
    [prefs, setPrefs, formatNum, bookmarks, toggleBookmark, isBookmarked, clearBookmarks]
  );

  return <MathPortalPrefsContext.Provider value={value}>{children}</MathPortalPrefsContext.Provider>;
}

export function useMathPortalPrefs() {
  const ctx = useContext(MathPortalPrefsContext);
  if (!ctx) throw new Error("useMathPortalPrefs must be used within MathPortalPrefsProvider");
  return ctx;
}
