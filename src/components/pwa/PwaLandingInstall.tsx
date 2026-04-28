import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Download, Share2, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { usePwaInstallPrompt } from "@/components/pwa/PwaInstallPromptContext";

type Props = {
  itemVariants: Variants;
};

export default function PwaLandingInstall({ itemVariants }: Props) {
  const { t, i18n } = useTranslation();
  const { ready, canInstall, install, isStandalone, isIosSafari } = usePwaInstallPrompt();
  const [busy, setBusy] = useState(false);

  if (!ready || isStandalone) return null;

  const dir = i18n.dir();

  const runInstall = async () => {
    if (!canInstall || busy) return;
    setBusy(true);
    try {
      await install();
    } finally {
      setBusy(false);
    }
  };

  return (
    <motion.section
      className="w-full max-w-2xl mx-auto mt-14 sm:mt-16 md:mt-24 px-4 sm:px-5"
      variants={itemVariants}
      dir={dir}
      aria-labelledby="pwa-landing-heading"
    >
      <div className="group relative rounded-[1.35rem] sm:rounded-3xl overflow-hidden border border-white/[0.09] bg-black/50 backdrop-blur-2xl shadow-[0_24px_80px_-24px_rgba(0,0,0,0.85)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.55] sm:opacity-70"
          style={{
            background:
              "radial-gradient(120% 80% at 0% 0%, rgba(34,211,238,0.12), transparent 55%), radial-gradient(90% 70% at 100% 100%, rgba(139,92,246,0.1), transparent 50%)",
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent" />

        <div className="relative px-5 py-6 sm:px-7 sm:py-7 md:px-9 md:py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8 lg:gap-10">
            {/* Icon + copy */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 md:flex-1 md:min-w-0 text-center sm:text-start">
              <div className="flex justify-center sm:justify-start sm:pt-0.5 shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/30 to-violet-500/20 blur-xl scale-110 opacity-80" />
                  <div className="relative grid place-items-center w-[3.25rem] h-[3.25rem] sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-600/15 border border-white/10 shadow-inner">
                    <Sparkles className="w-[1.35rem] h-[1.35rem] sm:w-7 sm:h-7 text-cyan-200" strokeWidth={1.75} aria-hidden />
                  </div>
                </div>
              </div>

              <div className="space-y-2 md:space-y-2.5 min-w-0 flex-1">
                <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-400/90">
                  {t("pwa.landing_kicker")}
                </p>
                <h2
                  id="pwa-landing-heading"
                  className="text-xl sm:text-2xl md:text-[1.65rem] font-bold text-white tracking-tight leading-tight"
                >
                  {t("pwa.landing_title")}
                </h2>
                <p className="text-sm sm:text-[0.9375rem] text-slate-400 leading-relaxed max-w-prose mx-auto sm:mx-0">
                  {t("pwa.landing_subtitle")}
                </p>

                {isIosSafari && (
                  <div className="flex items-start justify-center sm:justify-start gap-2.5 pt-1 text-left sm:text-start rounded-xl bg-white/[0.03] border border-white/[0.06] px-3.5 py-3 sm:py-2.5 mt-1">
                    <Share2 className="w-4 h-4 shrink-0 text-cyan-300/90 mt-0.5" aria-hidden />
                    <p className="text-xs sm:text-sm text-slate-300/95 leading-snug">
                      {t("pwa.landing_ios")}
                    </p>
                  </div>
                )}

                {!isIosSafari && !canInstall && (
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-prose mx-auto sm:mx-0 pt-0.5">
                    {t("pwa.landing_chrome")}
                  </p>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-3 md:w-auto md:shrink-0 md:self-center w-full md:max-w-[220px]">
              {isIosSafari ? (
                <div className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-center">
                  <p className="text-[11px] sm:text-xs font-medium text-slate-200 leading-snug">
                    {t("pwa.landing_ios_badge")}
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => void runInstall()}
                  disabled={!canInstall || busy}
                  className="w-full min-h-[48px] inline-flex items-center justify-center gap-2.5 rounded-2xl px-6 text-[0.9375rem] font-semibold text-slate-950 bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 hover:from-cyan-200 hover:via-sky-200 hover:to-violet-200 active:scale-[0.99] transition-all duration-200 shadow-[0_14px_36px_-12px_rgba(34,211,238,0.45)] disabled:shadow-none disabled:from-white/10 disabled:via-white/10 disabled:to-white/10 disabled:text-slate-500 disabled:cursor-not-allowed border border-white/10 disabled:border-white/5"
                >
                  <Download className="w-[1.125rem] h-[1.125rem] shrink-0 opacity-90" aria-hidden />
                  {busy ? t("pwa.landing_installing") : t("pwa.landing_cta")}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
