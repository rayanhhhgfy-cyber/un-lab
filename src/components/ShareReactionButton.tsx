import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Link as LinkIcon, Check, Twitter, Facebook, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import type { Reaction } from "@/data/reactions";

interface Props {
  reaction: Reaction;
  className?: string;
}

function buildShareUrl(reaction: Reaction): { app: string; share: string } {
  const reactants = reaction.reactants.join(",");
  const origin =
    typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : "";
  const app = `${origin}/chemistry?r=${encodeURIComponent(reactants)}&auto=1`;
  // Server-rendered share landing page with proper OG tags + dynamic image
  const share = `${origin}/share/reaction?r=${encodeURIComponent(reactants)}`;
  return { app, share };
}

export default function ShareReactionButton({ reaction, className = "" }: Props) {
  const { t } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const { app, share } = buildShareUrl(reaction);
  const shareUrl = share;
  const shareText = `${t("share.share_text")} ${reaction.eq}`;

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `UN Lab — ${reaction.eq}`,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (e) {
        // user canceled or error → fall back to menu
      }
    }
    setShowMenu(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success(t("share.copied") as string, {
        description: t("share.copied_desc") as string,
      });
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // legacy fallback
      const ta = document.createElement("textarea");
      ta.value = shareUrl;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        toast.success(t("share.copied") as string);
      } finally {
        document.body.removeChild(ta);
      }
    }
  };

  const socials: Array<{ id: string; label: string; url: string; Icon: typeof Twitter; color: string }> = [
    {
      id: "twitter",
      label: "X / Twitter",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      Icon: Twitter,
      color: "hover:text-sky-400 hover:border-sky-500/40 hover:bg-sky-500/10",
    },
    {
      id: "facebook",
      label: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      Icon: Facebook,
      color: "hover:text-blue-400 hover:border-blue-500/40 hover:bg-blue-500/10",
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      url: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
      Icon: MessageCircle,
      color: "hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-500/10",
    },
    {
      id: "telegram",
      label: "Telegram",
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      Icon: Send,
      color: "hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/10",
    },
  ];

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center gap-2 flex-wrap">
        <motion.button
          type="button"
          onClick={handleNativeShare}
          whileHover={{ y: -2, scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-cyan-500/30 border border-cyan-300/30"
          title={t("share.title") as string}
        >
          <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>{t("share.button")}</span>
        </motion.button>
        <motion.button
          type="button"
          onClick={handleCopy}
          whileHover={{ y: -2, scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs sm:text-sm font-semibold transition-colors ${
            copied
              ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-200"
              : "border-white/15 bg-white/[0.04] text-slate-200 hover:bg-white/[0.08] hover:border-white/25"
          }`}
          title={t("share.copy") as string}
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          ) : (
            <LinkIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          )}
          <span>
            {copied ? t("share.copied") : t("share.copy")}
          </span>
        </motion.button>
      </div>

      <AnimatePresence>
        {showMenu && (
          <>
            <motion.div
              className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMenu(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              className="fixed left-1/2 top-1/2 z-[81] w-[min(92vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-[#0b0b14]/95 p-5 shadow-2xl backdrop-blur-xl"
              initial={{ opacity: 0, scale: 0.94, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
            >
              <div className="pointer-events-none absolute -top-16 -left-12 h-40 w-40 rounded-full bg-cyan-500/15 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -right-12 h-40 w-40 rounded-full bg-violet-500/15 blur-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 shadow-lg shadow-cyan-500/30">
                      <Share2 className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">
                        {t("share.title")}
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono">
                        {reaction.eq}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowMenu(false)}
                    className="text-slate-500 hover:text-white transition text-xs"
                  >
                    ✕
                  </button>
                </div>

                <div
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2 mb-3 cursor-pointer hover:border-cyan-500/30 transition"
                  onClick={handleCopy}
                  title={t("share.copy") as string}
                >
                  <LinkIcon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="flex-1 truncate text-[11px] sm:text-xs text-slate-300 font-mono">
                    {shareUrl}
                  </span>
                  <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider shrink-0">
                    {copied ? t("share.copied") : t("share.copy")}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {socials.map(({ id, label, url, Icon, color }) => (
                    <a
                      key={id}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-[12px] sm:text-xs text-slate-200 transition ${color}`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{label}</span>
                    </a>
                  ))}
                </div>

                <p className="mt-4 text-[10px] text-slate-500 leading-relaxed">
                  {t("share.copied_desc")}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Re-exported helper so other places can build the same shareable URL
export function getReactionShareUrl(reaction: Reaction) {
  return buildShareUrl(reaction);
}
