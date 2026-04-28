import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

type BranchKey = "All" | "Mechanics" | "E&M" | "Thermo" | "Waves" | "Modern";

interface Term {
  term: string;
  def: string;
  branch: Exclude<BranchKey, "All">;
}

const terms: Record<"en" | "ar", Term[]> = {
  en: [
    { term: "Acceleration", def: "Rate of change of velocity with respect to time.", branch: "Mechanics" },
    { term: "Amplitude", def: "Maximum displacement of a wave from its equilibrium position.", branch: "Waves" },
    { term: "Angular Momentum", def: "Product of moment of inertia and angular velocity; L = Iω.", branch: "Mechanics" },
    { term: "Capacitance", def: "Ability of a system to store electric charge per unit voltage; C = Q/V.", branch: "E&M" },
    { term: "Centripetal Force", def: "Force directed toward the center of circular motion; F = mv²/r.", branch: "Mechanics" },
    { term: "Conductivity", def: "Measure of a material's ability to conduct electric current.", branch: "E&M" },
    { term: "Conservation of Energy", def: "Total energy in an isolated system remains constant.", branch: "Mechanics" },
    { term: "Coulomb's Law", def: "Electric force between two charges is proportional to q₁q₂/r².", branch: "E&M" },
    { term: "Diffraction", def: "Bending of waves around obstacles or through openings.", branch: "Waves" },
    { term: "Electric Field", def: "Force per unit charge exerted on a test charge; E = F/q.", branch: "E&M" },
    { term: "Electromagnetic Induction", def: "Generation of EMF by changing magnetic flux through a circuit.", branch: "E&M" },
    { term: "Entropy", def: "Measure of disorder or randomness in a thermodynamic system.", branch: "Thermo" },
    { term: "Equilibrium", def: "State where net force and net torque on a system are zero.", branch: "Mechanics" },
    { term: "Frequency", def: "Number of oscillations or wave cycles per unit time.", branch: "Waves" },
    { term: "Gravitational Field", def: "Region where a mass experiences a gravitational force; g = F/m.", branch: "Mechanics" },
    { term: "Half-life", def: "Time for half the atoms in a radioactive sample to decay.", branch: "Modern" },
    { term: "Heat Capacity", def: "Energy required to raise the temperature of a substance by 1K.", branch: "Thermo" },
    { term: "Heisenberg Uncertainty", def: "Fundamental limit: ΔxΔp ≥ ℏ/2. Cannot know both exactly.", branch: "Modern" },
    { term: "Impedance", def: "Total opposition to AC current in a circuit; Z = V/I.", branch: "E&M" },
    { term: "Interference", def: "Superposition of waves creating constructive or destructive patterns.", branch: "Waves" },
    { term: "Isotope", def: "Atoms of same element with different neutron numbers.", branch: "Modern" },
    { term: "Kinetic Energy", def: "Energy of motion; KE = ½mv².", branch: "Mechanics" },
    { term: "Lorentz Factor", def: "Relativistic scaling factor γ = 1/√(1 - v²/c²).", branch: "Modern" },
    { term: "Magnetic Flux", def: "Total magnetic field passing through a surface; Φ = B·A.", branch: "E&M" },
    { term: "Momentum", def: "Product of mass and velocity; p = mv. Conserved in collisions.", branch: "Mechanics" },
    { term: "Newton's Laws", def: "Three fundamental laws governing classical mechanics.", branch: "Mechanics" },
    { term: "Ohm's Law", def: "Voltage equals current times resistance; V = IR.", branch: "E&M" },
    { term: "Photoelectric Effect", def: "Emission of electrons when light hits a material surface.", branch: "Modern" },
    { term: "Planck's Constant", def: "Fundamental quantum of action; h = 6.626 × 10⁻³⁴ J·s.", branch: "Modern" },
    { term: "Potential Energy", def: "Energy stored in position or configuration of a system.", branch: "Mechanics" },
    { term: "Quantum Tunneling", def: "Particle passing through a potential barrier it classically cannot.", branch: "Modern" },
    { term: "Refraction", def: "Change in wave direction when passing between media.", branch: "Waves" },
    { term: "Resistance", def: "Opposition to electric current flow; R = V/I.", branch: "E&M" },
    { term: "Simple Harmonic Motion", def: "Oscillation where restoring force is proportional to displacement.", branch: "Mechanics" },
    { term: "Snell's Law", def: "n₁ sin θ₁ = n₂ sin θ₂. Relates angles of refraction.", branch: "Waves" },
    { term: "Specific Heat", def: "Heat required to raise 1kg of substance by 1K.", branch: "Thermo" },
    { term: "Superposition", def: "Net response is the sum of individual responses.", branch: "Waves" },
    { term: "Thermodynamic Laws", def: "Four laws governing energy, entropy, and temperature.", branch: "Thermo" },
    { term: "Time Dilation", def: "Moving clocks run slower; Δt' = γΔt.", branch: "Modern" },
    { term: "Torque", def: "Rotational force; τ = r × F.", branch: "Mechanics" },
    { term: "Wave-Particle Duality", def: "Quantum objects exhibit both wave and particle properties.", branch: "Modern" },
    { term: "Work", def: "Energy transfer by force over displacement; W = F·d·cos θ.", branch: "Mechanics" },
  ],
  ar: [
    { term: "التسارع", def: "معدل تغير السرعة بالنسبة للزمن.", branch: "Mechanics" },
    { term: "السعة", def: "أقصى إزاحة للموجة من موضع الاتزان.", branch: "Waves" },
    { term: "العزم الزاوي", def: "ناتج عزم القصور الذاتي والسرعة الزاوية; L = Iω.", branch: "Mechanics" },
    { term: "السعة الكهربائية", def: "قدرة النظام على تخزين الشحنة الكهربائية لكل وحدة جهد; C = Q/V.", branch: "E&M" },
    { term: "القوة المركزية", def: "القوة الموجهة نحو مركز الحركة الدائرية; F = mv²/r.", branch: "Mechanics" },
    { term: "الموصلية", def: "قياس قدرة المادة على توصيل التيار الكهربائي.", branch: "E&M" },
    { term: "حفظ الطاقة", def: "مجموع الطاقة في نظام معزول يبقى ثابتاً.", branch: "Mechanics" },
    { term: "قانون كولوم", def: "القوة الكهربائية بين شحنتين تتناسب مع q₁q₂/r².", branch: "E&M" },
    { term: "الحيود", def: "انحناء الموجات حول العوائق أو من خلال الفتحات.", branch: "Waves" },
    { term: "المجال الكهربائي", def: "القوة لكل وحدة شحنة مطبقة على شحنة الاختبار; E = F/q.", branch: "E&M" },
    { term: "الحث الكهرومغناطيسي", def: "توليد القوة الدافعة الكهربائية بتغيير التدفق المغناطيسي.", branch: "E&M" },
    { term: "الإنتروبيا", def: "مقياس اضطراب أو عشوائية النظام الديناميكي الحراري.", branch: "Thermo" },
    { term: "الاتزان", def: "حالة حيث القوة الصافية والعزم الصافي على النظام يساويان صفر.", branch: "Mechanics" },
    { term: "التردد", def: "عدد التذبذبات أو دورات الموجة لكل وحدة زمن.", branch: "Waves" },
    { term: "المجال الجاذبي", def: "المنطقة التي تختبر فيها الكتلة قوة جاذبية; g = F/m.", branch: "Mechanics" },
    { term: "عمر النصف", def: "الوقت اللازم لتحلل نصف ذرات العينة المشعة.", branch: "Modern" },
    { term: "الحرارة النوعية", def: "الطاقة اللازمة لرفع درجة حرارة المادة بمقدار 1 كلفن.", branch: "Thermo" },
    { term: "مبدأ عدم اليقين", def: "الحد الأساسي: ΔxΔp ≥ ℏ/2. لا يمكن معرفة كليهما بدقة.", branch: "Modern" },
    { term: "المعاوقة", def: "المقاومة الكلية للتيار المتردد في الدائرة; Z = V/I.", branch: "E&M" },
    { term: "التداخل", def: "تراكب الموجات مما يخلق أنماطاً بنائية أو هدامة.", branch: "Waves" },
    { term: "النظير", def: "ذرات نفس العنصر بأعداد مختلفة من النيوترونات.", branch: "Modern" },
    { term: "الطاقة الحركية", def: "طاقة الحركة; KE = ½mv².", branch: "Mechanics" },
    { term: "عامل لورنتز", def: "عامل القياس النسبي γ = 1/√(1 - v²/c²).", branch: "Modern" },
    { term: "التدفق المغناطيسي", def: "مجموع المجال المغناطيسي المار عبر السطح; Φ = B·A.", branch: "E&M" },
    { term: "الزخم", def: "ناتج الكتلة والسرعة; p = mv. محفوظ في التصادمات.", branch: "Mechanics" },
    { term: "قوانين نيوتن", def: "ثلاثة قوانين أساسية تحكم الميكانيكا الكلاسيكية.", branch: "Mechanics" },
    { term: "قانون أوم", def: "الجهد يساوي التيار مضروباً في المقاومة; V = IR.", branch: "E&M" },
    { term: "التأثير الكهروضوئي", def: "انبعاث الإلكترونات عندما يضيء الضوء سطح المادة.", branch: "Modern" },
    { term: "ثابت بلانك", def: "كم الفعل الأساسي; h = 6.626 × 10⁻³⁴ جول·ثانية.", branch: "Modern" },
    { term: "الطاقة الكامنة", def: "الطاقة المخزنة في موضع أو تكوين النظام.", branch: "Mechanics" },
    { term: "النفق الكمومي", def: "جسيم يمر عبر حاجز جهد لا يمكنه عبوره كلاسيكياً.", branch: "Modern" },
    { term: "الانكسار", def: "تغير اتجاه الموجة عند المرور بين وسطين.", branch: "Waves" },
    { term: "المقاومة", def: "مقاومة تدفق التيار الكهربائي; R = V/I.", branch: "E&M" },
    { term: "الحركة التوافقية البسيطة", def: "التذبذب حيث القوة المستعيدة تتناسب مع الإزاحة.", branch: "Mechanics" },
    { term: "قانون سنيل", def: "n₁ sin θ₁ = n₂ sin θ₂. يربط زوايا الانكسار.", branch: "Waves" },
    { term: "الحرارة النوعية للمادة", def: "الحرارة اللازمة لرفع 1 كجم من المادة بمقدار 1 كلفن.", branch: "Thermo" },
    { term: "التراكب", def: "الاستجابة الصافية هي مجموع الاستجابات الفردية.", branch: "Waves" },
    { term: "قوانين الديناميكا الحرارية", def: "أربعة قوانين تحكم الطاقة والإنتروبيا ودرجة الحرارة.", branch: "Thermo" },
    { term: "تمدد الزمن", def: "الساعات المتحركة تعمل ببطء; Δt' = γΔt.", branch: "Modern" },
    { term: "العزم", def: "القوة الدورانية; τ = r × F.", branch: "Mechanics" },
    { term: "ازدواجية الموجة-الجسيم", def: "الجسيمات الكمومية تظهر خصائص الموجة والجسيم معاً.", branch: "Modern" },
    { term: "الشغل", def: "انتقال الطاقة بالقوة عبر الإزاحة; W = F·d·cos θ.", branch: "Mechanics" },
  ],
};

const branchOrder: BranchKey[] = ["All", "Mechanics", "E&M", "Thermo", "Waves", "Modern"];

const branchLabels: Record<"en" | "ar", Record<BranchKey, string>> = {
  en: {
    All: "All",
    Mechanics: "Mechanics",
    "E&M": "E&M",
    Thermo: "Thermo",
    Waves: "Waves",
    Modern: "Modern",
  },
  ar: {
    All: "الكل",
    Mechanics: "الميكانيكا",
    "E&M": "كهرومغناطيسية",
    Thermo: "حرارة",
    Waves: "موجات",
    Modern: "حديثة",
  },
};

const branchAccents: Record<Exclude<BranchKey, "All">, { text: string; chip: string; ring: string }> = {
  Mechanics: { text: "text-cyan-300", chip: "bg-cyan-500/10 border-cyan-400/30 text-cyan-200", ring: "ring-cyan-400/40" },
  "E&M": { text: "text-violet-300", chip: "bg-violet-500/10 border-violet-400/30 text-violet-200", ring: "ring-violet-400/40" },
  Thermo: { text: "text-amber-300", chip: "bg-amber-500/10 border-amber-400/30 text-amber-200", ring: "ring-amber-400/40" },
  Waves: { text: "text-emerald-300", chip: "bg-emerald-500/10 border-emerald-400/30 text-emerald-200", ring: "ring-emerald-400/40" },
  Modern: { text: "text-rose-300", chip: "bg-rose-500/10 border-rose-400/30 text-rose-200", ring: "ring-rose-400/40" },
};

export default function GlossaryPage() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === "ar" ? "ar" : "en") as "en" | "ar";
  const isArabic = lang === "ar";

  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState<BranchKey>("All");

  const currentTerms = terms[lang];
  const labels = branchLabels[lang];
  const q = search.toLowerCase();

  const filtered = currentTerms.filter(
    (it) =>
      (branch === "All" || it.branch === branch) &&
      (it.term.toLowerCase().includes(q) || it.def.toLowerCase().includes(q))
  );

  return (
    <div
      className={`min-h-screen w-full pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 px-3 sm:px-6 md:px-8 lg:px-12 ${
        isArabic ? "rtl font-arabic" : ""
      }`}
    >
      <div className="w-full max-w-4xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 backdrop-blur-md mb-4">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 animate-ping opacity-70" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-cyan-200">
              {isArabic ? "مرجع · فيزياء" : "Reference · Physics"}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1] tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-cyan-100 to-cyan-300">
            {t("physics.glossary.page_title", isArabic ? "المسرد" : "Physics Glossary")}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            {currentTerms.length}{" "}
            {isArabic ? "مصطلح في جميع فروع الفيزياء" : "terms across all branches of physics"}.
          </p>
        </motion.div>

        {/* Search + filter */}
        <div className="flex flex-col gap-3 sm:gap-4 mb-6">
          <div className="relative">
            <Search
              className={`absolute ${
                isArabic ? "right-3" : "left-3"
              } top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500`}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isArabic ? "بحث في المصطلحات..." : "Search terms..."}
              className={`w-full ${
                isArabic ? "pr-10 pl-3" : "pl-10 pr-3"
              } py-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400/40 transition`}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {branchOrder.map((b) => {
              const isActive = branch === b;
              return (
                <button
                  key={b}
                  onClick={() => setBranch(b)}
                  className={`relative px-3.5 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs font-bold tracking-wide border transition-all ${
                    isActive
                      ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white border-cyan-400/60 shadow-[0_0_20px_-6px_rgba(34,211,238,0.6)]"
                      : "bg-white/[0.03] text-slate-300 border-white/10 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {labels[b]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-2.5"
        >
          {filtered.map((item, idx) => {
            const acc = branchAccents[item.branch];
            return (
              <motion.div
                key={`${item.term}-${idx}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: Math.min(idx * 0.015, 0.3) }}
                className={`group rounded-2xl p-4 sm:p-5 bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.18] hover:bg-white/[0.05] transition-all duration-200`}
              >
                <div className="flex items-start gap-3 flex-wrap sm:flex-nowrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className={`font-bold text-base sm:text-lg ${acc.text}`}>{item.term}</h3>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${acc.chip}`}
                      >
                        {labels[item.branch]}
                      </span>
                    </div>
                    <p className="text-sm text-slate-300/90 mt-1.5 leading-relaxed">{item.def}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-12 rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
              <p className="text-slate-400 text-sm">
                {t("physics.glossary.no_match", isArabic ? "لا توجد مصطلحات مطابقة." : "No matching terms found.")}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
