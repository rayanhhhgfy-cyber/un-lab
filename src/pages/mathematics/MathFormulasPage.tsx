import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Search } from "lucide-react";
import { mathFormulaCategories } from "@/data/mathFormulas";
import { Input } from "@/components/ui/input";

export default function MathFormulasPage() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return mathFormulaCategories;
    return mathFormulaCategories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (it) =>
            it.expr.toLowerCase().includes(s) ||
            it.noteEn.toLowerCase().includes(s) ||
            it.noteAr.includes(q) ||
            (ar ? cat.titleAr : cat.titleEn).toLowerCase().includes(s)
        ),
      }))
      .filter((c) => c.items.length > 0);
  }, [q, ar]);

  return (
    <div className={`min-h-screen bg-black text-white ${ar ? "rtl font-arabic" : "font-sans"}`}>
      <div className="max-w-4xl mx-auto px-3 sm:px-6 md:px-10 pt-6 sm:pt-8 pb-20">
        <Link to="/mathematics" className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-violet-300 mb-6">
          <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
          {ar ? "الرئيسية" : "Hub"}
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-fuchsia-500/15 border border-fuchsia-400/25 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-fuchsia-300" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{ar ? "موسوعة الصيغ" : "Formula library"}</h1>
            <p className="text-xs text-slate-500 mt-0.5">{ar ? "مرجع سريع قابل للبحث" : "Searchable quick reference"}</p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 mb-6">
          <div className="glass rounded-xl border border-fuchsia-400/15 bg-fuchsia-500/[0.04] p-4">
            <p className="text-[10px] font-bold text-fuchsia-400 uppercase tracking-widest mb-2">English</p>
            <p className="text-sm text-slate-300 leading-relaxed" dir="ltr">
              Browse identities and formulas by category. Use the search box to filter by equation or note text. Each row shows the expression and a short reminder of what it means.
            </p>
          </div>
          <div className="glass rounded-xl border border-fuchsia-400/15 bg-fuchsia-500/[0.04] p-4">
            <p className="text-[10px] font-bold text-fuchsia-400 uppercase tracking-widest mb-2">العربية</p>
            <p className="text-sm text-slate-300 leading-relaxed font-arabic" dir="rtl">
              تصفّح الصيغ حسب الفئة، واستخدم البحث لتصفية المعادلة أو الملاحظة. كل سطر يعرض التعبير وتذكيرًا قصيرًا بمعناه.
            </p>
          </div>
        </div>

        <div className="relative mb-8">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={ar ? "ابحث في الصيغ أو الوصف..." : "Search formulas or notes..."}
            className="ps-10 bg-white/[0.04] border-white/10 h-11"
          />
        </div>

        <div className="space-y-10">
          {filtered.map((cat) => (
            <section key={cat.id}>
              <h2 className="text-sm font-bold text-violet-300 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
                {ar ? cat.titleAr : cat.titleEn}
              </h2>
              <ul className="space-y-3">
                {cat.items.map((it) => (
                  <li key={it.id} className="glass rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <p className="font-mono text-sm text-slate-100 leading-relaxed break-words">{it.expr}</p>
                    <p className="text-xs text-slate-500 mt-2">{ar ? it.noteAr : it.noteEn}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
