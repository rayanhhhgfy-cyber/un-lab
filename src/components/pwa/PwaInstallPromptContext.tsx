import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function readStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

export function isIosSafariClient(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  const iOS = /iPad|iPhone|iPod/.test(ua);
  const webkit = /WebKit/.test(ua);
  const noChrome = !/CriOS|FxiOS|EdgiOS/.test(ua);
  return iOS && webkit && noChrome;
}

type Ctx = {
  /** True after mount + env detected */
  ready: boolean;
  canInstall: boolean;
  isStandalone: boolean;
  isIosSafari: boolean;
  install: () => Promise<void>;
};

const PwaInstallPromptContext = createContext<Ctx | null>(null);

export function PwaInstallPromptProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIosSafari, setIsIosSafari] = useState(false);

  useEffect(() => {
    setIsStandalone(readStandalone());
    setIsIosSafari(isIosSafariClient());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || isStandalone) return;
    const onBip = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onBip);
    return () => window.removeEventListener("beforeinstallprompt", onBip);
  }, [ready, isStandalone]);

  const install = useCallback(async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
  }, [deferred]);

  const value = useMemo<Ctx>(
    () => ({
      ready,
      canInstall: !!deferred,
      isStandalone,
      isIosSafari,
      install,
    }),
    [ready, deferred, isStandalone, isIosSafari, install]
  );

  return <PwaInstallPromptContext.Provider value={value}>{children}</PwaInstallPromptContext.Provider>;
}

export function usePwaInstallPrompt(): Ctx {
  const ctx = useContext(PwaInstallPromptContext);
  if (!ctx) {
    throw new Error("usePwaInstallPrompt must be used within PwaInstallPromptProvider");
  }
  return ctx;
}
