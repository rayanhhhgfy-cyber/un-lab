import { Link, Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BookOpen, Settings2, Star } from "lucide-react";
import LabShell from "@/components/layout/LabShell";
import ExperimentTabs from "@/components/ui/ExperimentTabs";
import { getMathBranchBySlug } from "@/data/mathModules";
import { useMathPortalPrefs } from "@/contexts/MathPortalPrefsContext";

export default function MathBranchLab() {
  const { branch } = useParams();
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const b = getMathBranchBySlug(branch);
  const { toggleBookmark, isBookmarked } = useMathPortalPrefs();

  if (!b) return <Navigate to="/mathematics" replace />;

  const starred = isBookmarked(b.slug);

  return (
    <LabShell
      backHref="/mathematics"
      backLabelEn="Mathematics hub"
      backLabelAr="مركز الرياضيات"
      sectorEn="Sector · Mathematical sciences"
      sectorAr="قطاع · العلوم الرياضية"
      titleEn={b.title}
      titleAr={b.titleAr}
      descriptionEn={b.details}
      descriptionAr={b.detailsAr}
      theme="violet"
    >
      <div className="flex flex-wrap items-center justify-end gap-2 mb-6">
        <Link
          to="/mathematics/workspace"
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border border-white/10 bg-white/[0.04] text-slate-300 hover:text-white hover:border-violet-400/30 transition-colors"
        >
          <Settings2 className="w-3.5 h-3.5" />
          {isAr ? "التخصيص" : "Workspace"}
        </Link>
        <button
          type="button"
          onClick={() => toggleBookmark(b.slug)}
          className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
            starred ? "border-amber-400/40 bg-amber-500/15 text-amber-200" : "border-white/10 bg-white/[0.04] text-slate-300 hover:text-white"
          }`}
        >
          <Star className={`w-3.5 h-3.5 ${starred ? "fill-amber-300 text-amber-200" : ""}`} />
          {starred ? (isAr ? "مفضل" : "Starred") : isAr ? "أضف للمفضلة" : "Star branch"}
        </button>
      </div>
      <ExperimentTabs
        tabs={b.experiments.map((e) => ({
          id: e.id,
          label: isAr ? e.titleAr : e.titleEn,
        }))}
      >
        {(active) => {
          const exp = b.experiments.find((x) => x.id === active);
          if (!exp) return null;
          const C = exp.Component;
          return (
            <div className="space-y-4">
              <div className="rounded-2xl border border-violet-400/20 bg-violet-500/[0.06] px-4 py-4 sm:px-5 sm:py-5">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/15">
                    <BookOpen className="h-4 w-4 text-violet-200" />
                  </span>
                  <div className="min-w-0 space-y-3 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-violet-300/90">
                      {isAr ? "شرح مبسّط" : "Plain explanation"}
                    </p>
                    <div className="rounded-xl border border-white/[0.06] bg-black/20 p-3">
                      <p
                        className={`text-sm text-slate-200/95 leading-relaxed ${
                          isAr ? "font-arabic text-right" : ""
                        }`}
                        dir={isAr ? "rtl" : "ltr"}
                      >
                        {isAr ? exp.explanationAr : exp.explanationEn}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <C />
            </div>
          );
        }}
      </ExperimentTabs>
    </LabShell>
  );
}
