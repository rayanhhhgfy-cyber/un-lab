import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Share2, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { usePwaInstallPrompt } from "@/components/pwa/PwaInstallPromptContext";

const DISMISS_KEY = "unlab-pwa-banner-dismiss";
const DISMISS_MS = 7 * 24 * 60 * 60 * 1000;

function readDismissed(): boolean {
  try {
    const raw = localStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    const t0 = parseInt(raw, 10);
    return !Number.isNaN(t0) && Date.now() - t0 < DISMISS_MS;
  } catch {
    return false;
  }
}

export default function PwaInstallBanner() {
  const { t, i18n } = useTranslation();
  const { ready, canInstall, install, isStandalone, isIosSafari } = usePwaInstallPrompt();
  const [dismissed, setDismissed] = useState(readDismissed);
  const [iosDelayShown, setIosDelayShown] = useState(false);

  useEffect(() => {
    if (!isIosSafari) return;
    const id = window.setTimeout(() => setIosDelayShown(true), 2200);
    return () => window.clearTimeout(id);
  }, [isIosSafari]);

  const showBanner = useMemo(
    () =>
      ready &&
      !isStandalone &&
      !dismissed &&
      (canInstall || (isIosSafari && iosDelayShown)),
    [ready, isStandalone, dismissed, canInstall, isIosSafari, iosDelayShown]
  );

  const dismiss = useCallback(() => {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
  }, []);

  const runInstall = useCallback(async () => {
    await install();
    dismiss();
  }, [install, dismiss]);

  const dir = i18n.dir();
  const iosHint = isIosSafari;

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          role="complementary"
          aria-label={t("pwa.banner_aria") as string}
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          className="fixed z-[60] inset-x-0 bottom-0 pb-[max(0.75rem,env(safe-area-inset-bottom))] px-3 sm:px-4 pointer-events-none"
          dir={dir}
        >
          <div className="pointer-events-auto mx-auto max-w-lg rounded-2xl border border-white/[0.12] bg-black/80 backdrop-blur-2xl shadow-[0_-8px_40px_-10px_rgba(34,211,238,0.25)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.12] via-transparent to-violet-600/[0.1] pointer-events-none" />
            <div className="relative p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0 pt-0.5">
                  <p className="text-sm sm:text-base font-semibold text-white leading-snug">
                    {iosHint ? t("pwa.ios_title") : t("pwa.title")}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5 leading-relaxed">
                    {iosHint ? t("pwa.ios_body") : t("pwa.body")}
                  </p>
                  {iosHint && (
                    <p className="flex items-center gap-1.5 text-[11px] sm:text-xs text-cyan-300/90 mt-2 font-medium">
                      <Share2 className="w-3.5 h-3.5 flex-shrink-0" aria-hidden />
                      {t("pwa.ios_steps")}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 sm:flex-col sm:items-stretch sm:min-w-[7.5rem]">
                {!iosHint && canInstall && (
                  <button
                    type="button"
                    onClick={() => void runInstall()}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:brightness-110 active:scale-[0.98] transition shadow-md shadow-cyan-500/20"
                  >
                    <Download className="w-4 h-4 shrink-0" aria-hidden />
                    {t("pwa.install")}
                  </button>
                )}
                <button
                  type="button"
                  onClick={dismiss}
                  className="inline-flex h-10 w-10 sm:h-auto sm:w-full sm:min-h-[42px] sm:px-3 items-center justify-center rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.06] transition text-xs font-medium gap-1.5"
                  aria-label={t("pwa.dismiss_aria") as string}
                >
                  <X className="w-4 h-4 sm:hidden shrink-0" aria-hidden />
                  <span className="hidden sm:inline">{t("pwa.later")}</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
