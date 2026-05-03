import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowLeft, BookMarked, Search } from "lucide-react";
import { mathGlossary } from "@/data/mathGlossary";
import { Input } from "@/components/ui/input";

export default function MathGlossaryPage() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return mathGlossary;
    return mathGlossary.filter(
      (e) =>
        e.termEn.toLowerCase().includes(s) ||
        e.termAr.includes(q) ||
        e.defEn.toLowerCase().includes(s) ||
        e.tags.some((t) => t.includes(s))
    );
  }, [q]);

  return (
    <div className={`min-h-screen bg-black text-white ${ar ? "rtl font-arabic" : "font-sans"}`}>
      <div className="max-w-3xl mx-auto px-3 sm:px-6 md:px-10 pt-6 sm:pt-8 pb-20">
        <Link to="/mathematics" className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-violet-300 mb-6">
          <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
          {ar ? "الرئيسية" : "Hub"}
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-indigo-500/15 border border-indigo-400/25 flex items-center justify-center">
            <BookMarked className="w-5 h-5 text-indigo-300" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black">{ar ? "مسرد المصطلحات" : "Glossary"}</h1>
            <p className="text-xs text-slate-500">{ar ? "تعريفات مختصرة للتحليل والجبر والإحصاء" : "Short definitions across analysis, algebra, stats"}</p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 mb-6">
          <div className="glass rounded-xl border border-indigo-400/15 bg-indigo-500/[0.04] p-4">
            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">English</p>
            <p className="text-sm text-slate-300 leading-relaxed" dir="ltr">
              Each entry gives a term and a plain definition. Search matches English text or tags. Arabic and English names are shown together so you can link vocabulary both ways.
            </p>
          </div>
          <div className="glass rounded-xl border border-indigo-400/15 bg-indigo-500/[0.04] p-4">
            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">العربية</p>
            <p className="text-sm text-slate-300 leading-relaxed font-arabic" dir="rtl">
              كل عنصر يعرض المصطلح وتعريفًا مبسّطًا. البحث يطابق النص الإنجليزي أو الوسوم. نعرض الاسم بالعربية والإنجليزية معًا لربط المفردات.
            </p>
          </div>
        </div>

        <div className="relative mb-6">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={ar ? "ابحث..." : "Search..."}
            className="ps-10 bg-white/[0.04] border-white/10"
          />
        </div>

        <ul className="space-y-3">
          {list.map((e, i) => (
            <li key={i} className="glass rounded-xl border border-white/[0.06] p-4">
              <div className="flex flex-wrap items-baseline gap-2 mb-1">
                <span className="font-bold text-white">{ar ? e.termAr : e.termEn}</span>
                <span className="text-xs text-slate-500">/ {ar ? e.termEn : e.termAr}</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{ar ? e.defAr : e.defEn}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {e.tags.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-300 border border-violet-400/20">
                    {t}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
