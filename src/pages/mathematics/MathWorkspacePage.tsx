import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowLeft, Settings2, Star, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useMathPortalPrefs } from "@/contexts/MathPortalPrefsContext";
import { mathBranches } from "@/data/mathModules";

export default function MathWorkspacePage() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const { prefs, setPrefs, bookmarks, toggleBookmark, isBookmarked, clearBookmarks } = useMathPortalPrefs();

  return (
    <div className={`min-h-screen bg-black text-white ${ar ? "rtl font-arabic" : "font-sans"}`}>
      <div className="max-w-2xl mx-auto px-3 sm:px-6 md:px-10 pt-6 sm:pt-8 pb-20">
        <Link to="/mathematics" className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-violet-300 mb-6">
          <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
          {ar ? "الرئيسية" : "Hub"}
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-xl bg-violet-500/15 border border-violet-400/25 flex items-center justify-center">
            <Settings2 className="w-5 h-5 text-violet-300" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black">{ar ? "مساحة العمل" : "Workspace"}</h1>
            <p className="text-xs text-slate-500">{ar ? "خصّص العرض والمفضلة لكل الفروع" : "Display prefs & starred branches"}</p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 mb-6">
          <div className="glass rounded-xl border border-white/10 p-4">
            <p className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-2">English</p>
            <p className="text-sm text-slate-300 leading-relaxed" dir="ltr">
              This page controls how numbers look across solvers and converters (decimals, scientific notation, angle mode) and which math branches you starred for quick access.
            </p>
          </div>
          <div className="glass rounded-xl border border-white/10 p-4">
            <p className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-2">العربية</p>
            <p className="text-sm text-slate-300 leading-relaxed font-arabic" dir="rtl">
              من هنا تضبط شكل الأرقام في الحاسبات والمحولات (المنازل العشرية، التدوين العلمي، وضع الزاوية) والفروع التي تثبتها للوصول السريع.
            </p>
          </div>
        </div>

        <section className="glass rounded-2xl border border-white/10 p-5 mb-6 space-y-5">
          <h2 className="text-xs font-bold text-violet-300 uppercase tracking-widest">{ar ? "العرض العددي" : "Numeric display"}</h2>
          <div>
            <Label className="text-[11px] text-slate-400">{ar ? "منازل عشرية (للحلول والمحولات)" : "Decimal places (solver & converters)"}</Label>
            <input
              type="range"
              min={2}
              max={12}
              value={prefs.decimals}
              onChange={(e) => setPrefs({ decimals: parseInt(e.target.value, 10) })}
              className="w-full mt-2 accent-violet-500"
            />
            <p className="text-xs text-slate-500 mt-1">{prefs.decimals}</p>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={prefs.compactNumbers}
              onChange={(e) => setPrefs({ compactNumbers: e.target.checked })}
              className="rounded border-white/20 bg-black/50"
            />
            <span className="text-sm text-slate-300">{ar ? "استخدام التدوين العلمي للأعداد الصغيرة/الكبيرة" : "Scientific notation for tiny/huge values"}</span>
          </label>
          <div>
            <Label className="text-[11px] text-slate-400">{ar ? "وضع الزاوية الافتراضي (للمحاكيات التي تدعم ذلك)" : "Default angle mode (where sims support it)"}</Label>
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={() => setPrefs({ angleMode: "rad" })}
                className={`px-4 py-2 rounded-xl text-xs font-semibold ${prefs.angleMode === "rad" ? "bg-violet-500/25 text-violet-200 border border-violet-400/30" : "bg-white/5 text-slate-400"}`}
              >
                rad
              </button>
              <button
                type="button"
                onClick={() => setPrefs({ angleMode: "deg" })}
                className={`px-4 py-2 rounded-xl text-xs font-semibold ${prefs.angleMode === "deg" ? "bg-violet-500/25 text-violet-200 border border-violet-400/30" : "bg-white/5 text-slate-400"}`}
              >
                °
              </button>
            </div>
          </div>
        </section>

        <section className="glass rounded-2xl border border-white/10 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold text-fuchsia-300 uppercase tracking-widest flex items-center gap-2">
              <Star className="w-3.5 h-3.5" />
              {ar ? "فروع مفضلة" : "Starred branches"}
            </h2>
            {bookmarks.length > 0 && (
              <button
                type="button"
                onClick={clearBookmarks}
                className="text-[10px] text-slate-500 hover:text-rose-400 flex items-center gap-1 uppercase tracking-wider"
              >
                <Trash2 className="w-3 h-3" />
                {ar ? "مسح" : "Clear"}
              </button>
            )}
          </div>
          <ul className="space-y-2">
            {mathBranches.map((b) => {
              const on = isBookmarked(b.slug);
              return (
                <li key={b.slug} className="flex items-center justify-between gap-3 py-2 border-b border-white/[0.06] last:border-0">
                  <Link to={b.path} className="text-sm text-slate-200 hover:text-violet-300 flex-1 min-w-0 truncate">
                    {ar ? b.titleAr : b.title}
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleBookmark(b.slug)}
                    className={`shrink-0 p-2 rounded-lg border transition ${on ? "border-amber-400/40 bg-amber-500/10 text-amber-200" : "border-white/10 text-slate-500 hover:text-white"}`}
                    aria-pressed={on}
                  >
                    <Star className={`w-4 h-4 ${on ? "fill-amber-300" : ""}`} />
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="text-[11px] text-slate-600 mt-4 leading-relaxed">
            {ar
              ? "تُحفظ الإعدادات والمفضلة في متصفحك — لا تُرسل إلى خادم."
              : "Prefs & stars are stored in your browser only — nothing is sent to a server."}
          </p>
        </section>
      </div>
    </div>
  );
}
