import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Atom,
  FlaskConical,
  Activity,
  Globe,
  Zap,
  ArrowRight,
  Beaker,
  Microscope,
  Mountain,
  Cloud,
  Droplet,
  Map as MapIcon,
  Brain,
  Dna,
  Heart,
  Sparkles,
  Calculator,
  BookOpen,
  Repeat,
  History,
  Command as CommandIcon,
  Cpu,
  TestTube,
  Flame,
} from "lucide-react";
import { elements } from "@/data/elements";
import { reactions, preAddedCompounds } from "@/data/reactions";

type ResultGroupKey =
  | "recent"
  | "actions"
  | "labs"
  | "reactions"
  | "elements"
  | "compounds"
  | "tools";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

interface RecentItem {
  id: string;
  label: string;
  group: ResultGroupKey;
  href: string;
  hint?: string;
}

const RECENT_KEY = "un-lab:cmdk-recent";
const RECENT_MAX = 6;

function loadRecents(): RecentItem[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.slice(0, RECENT_MAX);
  } catch {
    return [];
  }
}

function saveRecent(item: RecentItem) {
  try {
    const list = loadRecents().filter((r) => r.id !== item.id);
    list.unshift(item);
    localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, RECENT_MAX)));
  } catch {
    // ignore storage errors
  }
}

const labRoutes: Array<{
  id: string;
  label: string;
  hint: string;
  href: string;
  Icon: typeof FlaskConical;
  color: string;
}> = [
  { id: "lab-chemistry", label: "Chemistry Lab", hint: "Periodic table, reactions & calculators", href: "/chemistry", Icon: FlaskConical, color: "from-cyan-400 to-blue-500" },
  { id: "lab-physics", label: "Physics Lab", hint: "Mechanics, waves, optics, modern physics", href: "/physics", Icon: Activity, color: "from-violet-400 to-purple-500" },
  { id: "lab-biology", label: "Biology Lab", hint: "Genetics, anatomy, neuroscience", href: "/biology", Icon: Microscope, color: "from-emerald-400 to-green-500" },
  { id: "lab-earth", label: "Earth Sciences", hint: "Geology, meteorology, volcanology", href: "/earth-science", Icon: Globe, color: "from-amber-400 to-orange-500" },
  { id: "lab-bio-genetics", label: "Genetics", hint: "DNA & inheritance", href: "/biology/genetics", Icon: Dna, color: "from-emerald-400 to-teal-500" },
  { id: "lab-bio-anatomy", label: "Anatomy", hint: "Human body systems", href: "/biology/anatomy", Icon: Heart, color: "from-rose-400 to-pink-500" },
  { id: "lab-bio-microbiology", label: "Microbiology", hint: "Bacteria, viruses, microbes", href: "/biology/microbiology", Icon: TestTube, color: "from-lime-400 to-green-500" },
  { id: "lab-bio-ecology", label: "Ecology", hint: "Ecosystems & environment", href: "/biology/ecology", Icon: Sparkles, color: "from-green-400 to-emerald-500" },
  { id: "lab-bio-cells", label: "Cell Biology", hint: "Cellular structures", href: "/biology/cells", Icon: Beaker, color: "from-teal-400 to-cyan-500" },
  { id: "lab-bio-neuro", label: "Neuroscience", hint: "Brain & nervous system", href: "/biology/neuroscience", Icon: Brain, color: "from-fuchsia-400 to-pink-500" },
  { id: "lab-earth-geology", label: "Geology", hint: "Plate tectonics & rocks", href: "/earth-science/geology", Icon: Mountain, color: "from-stone-400 to-amber-500" },
  { id: "lab-earth-meteorology", label: "Meteorology", hint: "Weather systems", href: "/earth-science/meteorology", Icon: Cloud, color: "from-sky-400 to-blue-500" },
  { id: "lab-earth-volcanology", label: "Volcanology", hint: "Volcanoes & magma", href: "/earth-science/volcanology", Icon: Flame, color: "from-orange-400 to-red-500" },
  { id: "lab-earth-hydrology", label: "Hydrology", hint: "Water cycle & rivers", href: "/earth-science/hydrology", Icon: Droplet, color: "from-cyan-400 to-blue-500" },
  { id: "lab-earth-climatology", label: "Climatology", hint: "Climate change & trends", href: "/earth-science/climatology", Icon: Cloud, color: "from-indigo-400 to-blue-500" },
  { id: "lab-earth-cartography", label: "Cartography", hint: "Maps & geography", href: "/earth-science/cartography", Icon: MapIcon, color: "from-teal-400 to-emerald-500" },
  { id: "lab-physics-mechanics", label: "Mechanics", hint: "Forces & motion", href: "/physics/mechanics", Icon: Cpu, color: "from-blue-400 to-indigo-500" },
  { id: "lab-physics-em", label: "Electromagnetism", hint: "Fields & circuits", href: "/physics/electromagnetism", Icon: Zap, color: "from-yellow-400 to-amber-500" },
  { id: "lab-physics-thermo", label: "Thermodynamics", hint: "Heat & energy", href: "/physics/thermodynamics", Icon: Flame, color: "from-orange-400 to-red-500" },
  { id: "lab-physics-waves", label: "Waves", hint: "Sound & light waves", href: "/physics/waves", Icon: Activity, color: "from-cyan-400 to-blue-500" },
  { id: "lab-physics-optics", label: "Optics", hint: "Light & lenses", href: "/physics/optics", Icon: Sparkles, color: "from-fuchsia-400 to-purple-500" },
  { id: "lab-physics-modern", label: "Modern Physics", hint: "Quantum & relativity", href: "/physics/modern", Icon: Atom, color: "from-violet-400 to-purple-500" },
];

const toolRoutes: Array<{ id: string; label: string; hint: string; href: string; Icon: typeof Calculator }> = [
  { id: "tool-converter", label: "Unit Converter", hint: "Convert any unit", href: "/physics/converter", Icon: Repeat },
  { id: "tool-calculator", label: "Formula Calculator", hint: "Physics & chemistry formulas", href: "/physics/calculator", Icon: Calculator },
  { id: "tool-glossary", label: "Glossary", hint: "Browse science terms", href: "/physics/glossary", Icon: BookOpen },
  { id: "tool-library", label: "Physics Library", hint: "Lessons & references", href: "/physics/library", Icon: BookOpen },
  { id: "tool-challenges", label: "Challenges", hint: "Test your knowledge", href: "/physics/challenges", Icon: Sparkles },
  { id: "tool-vr", label: "VR Labs", hint: "Immersive experiences", href: "/vr-labs", Icon: Sparkles },
];

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [query, setQuery] = useState("");
  const [recents, setRecents] = useState<RecentItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setRecents(loadRecents());
      setQuery("");
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const handleSelect = (item: RecentItem) => {
    saveRecent(item);
    onClose();
    navigate(item.href);
  };

  // Build filtered indexes only when needed (cheap because cmdk filters internally,
  // but we cap reactions/elements/compounds rendered to prevent huge DOM).
  const indexedReactions = useMemo(
    () =>
      reactions.map((r) => ({
        id: `rxn-${r.id}`,
        label: r.eq,
        balanced: r.balanced,
        searchable: `${r.eq} ${r.balanced} ${r.reactants.join(" ")} ${r.products.join(" ")} ${r.type} ${r.desc}`,
        href: `/chemistry?r=${encodeURIComponent(r.reactants.join(","))}&auto=1`,
        type: r.type,
        exo: r.enthalpy < 0,
      })),
    []
  );

  const indexedElements = useMemo(
    () =>
      elements.map((e) => ({
        id: `el-${e.sym}`,
        label: `${e.sym} · ${e.name}`,
        searchable: `${e.sym} ${e.name} ${e.cat} ${e.z}`,
        sym: e.sym,
        name: e.name,
        z: e.z,
        cat: e.cat,
        href: `/chemistry?focus=${encodeURIComponent(e.sym)}`,
      })),
    []
  );

  const indexedCompounds = useMemo(
    () =>
      preAddedCompounds.map((c) => ({
        id: `cmp-${c.formula}`,
        label: `${c.formula} · ${c.name}`,
        searchable: `${c.formula} ${c.name}`,
        formula: c.formula,
        name: c.name,
        href: `/chemistry?compound=${encodeURIComponent(c.formula)}`,
      })),
    []
  );

  const trimmedQuery = query.trim();
  const showRecent = !trimmedQuery && recents.length > 0;
  const showHeavyResults = trimmedQuery.length > 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center px-3 sm:px-6 pt-[8vh] sm:pt-[10vh]"
          dir={isRTL ? "rtl" : "ltr"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close search"
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md cursor-default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Palette */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t("search.aria_label") as string}
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative z-10 w-full max-w-[680px] overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0b0b14]/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-2xl"
          >
            {/* Aurora glow */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -top-32 -left-20 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
              <div className="absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
            </div>

            <Command
              loop
              shouldFilter
              className="relative z-10 flex max-h-[80vh] sm:max-h-[70vh] flex-col"
            >
              {/* Search input */}
              <div className="flex items-center gap-3 border-b border-white/10 px-4 sm:px-5 py-3.5 sm:py-4">
                <Search className="h-5 w-5 shrink-0 text-cyan-400" />
                <Command.Input
                  ref={inputRef}
                  value={query}
                  onValueChange={setQuery}
                  placeholder={t("search.placeholder") as string}
                  className="h-8 flex-1 bg-transparent text-base sm:text-[15px] text-white placeholder:text-slate-500 outline-none"
                />
                <div className="hidden sm:flex items-center gap-1 text-[10px] text-slate-500">
                  <kbd className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono">
                    ESC
                  </kbd>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="sm:hidden inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-300 active:scale-95 transition"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Results */}
              <Command.List className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar p-2 sm:p-3">
                <Command.Empty className="flex flex-col items-center justify-center gap-2 py-12 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                    <Search className="h-5 w-5 text-slate-500" />
                  </div>
                  <p className="text-sm text-slate-300 font-medium">
                    {t("search.no_results")}
                  </p>
                  <p className="text-xs text-slate-500">
                    {t("search.try_different")}
                  </p>
                </Command.Empty>

                {showRecent && (
                  <Section title={t("search.groups.recent") as string} icon={<History className="h-3.5 w-3.5" />}>
                    {recents.map((r) => (
                      <Command.Item
                        key={`recent-${r.id}`}
                        value={`recent ${r.label} ${r.hint || ""}`}
                        onSelect={() => handleSelect(r)}
                      >
                        <Row
                          icon={<History className="h-4 w-4 text-slate-400" />}
                          label={r.label}
                          hint={r.hint}
                          tagColor="bg-white/[0.04] text-slate-400 border-white/10"
                          tag={t(`search.groups.${r.group}`) as string}
                        />
                      </Command.Item>
                    ))}
                  </Section>
                )}

                {/* Quick actions (only when no query) */}
                {!query.trim() && (
                  <Section title={t("search.groups.actions") as string} icon={<Sparkles className="h-3.5 w-3.5" />}>
                    <Command.Item
                      value="quick action open chemistry simulator"
                      onSelect={() =>
                        handleSelect({
                          id: "act-open-chemistry",
                          group: "actions",
                          label: t("search.actions.open_chemistry") as string,
                          href: "/chemistry",
                        })
                      }
                    >
                      <Row
                        icon={<FlaskConical className="h-4 w-4 text-cyan-300" />}
                        label={t("search.actions.open_chemistry") as string}
                        hint={t("search.actions.open_chemistry_hint") as string}
                      />
                    </Command.Item>
                    <Command.Item
                      value="quick action try water reaction"
                      onSelect={() =>
                        handleSelect({
                          id: "act-try-water",
                          group: "actions",
                          label: t("search.actions.try_water") as string,
                          href: "/chemistry?r=H2,O2&auto=1",
                        })
                      }
                    >
                      <Row
                        icon={<Beaker className="h-4 w-4 text-blue-300" />}
                        label={t("search.actions.try_water") as string}
                        hint="H₂ + O₂ → H₂O"
                      />
                    </Command.Item>
                    <Command.Item
                      value="quick action go home"
                      onSelect={() =>
                        handleSelect({
                          id: "act-home",
                          group: "actions",
                          label: t("search.actions.go_home") as string,
                          href: "/",
                        })
                      }
                    >
                      <Row
                        icon={<ArrowRight className="h-4 w-4 text-emerald-300" />}
                        label={t("search.actions.go_home") as string}
                        hint={t("search.actions.go_home_hint") as string}
                      />
                    </Command.Item>
                  </Section>
                )}

                <Section title={t("search.groups.labs") as string} icon={<Atom className="h-3.5 w-3.5" />}>
                  {labRoutes.map(({ id, label, hint, href, Icon, color }) => (
                    <Command.Item
                      key={id}
                      value={`lab ${label} ${hint}`}
                      onSelect={() => handleSelect({ id, group: "labs", label, hint, href })}
                    >
                      <Row
                        icon={
                          <span
                            className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br ${color} shadow-md`}
                          >
                            <Icon className="h-3.5 w-3.5 text-white" />
                          </span>
                        }
                        label={label}
                        hint={hint}
                      />
                    </Command.Item>
                  ))}
                </Section>

                <Section title={t("search.groups.tools") as string} icon={<Calculator className="h-3.5 w-3.5" />}>
                  {toolRoutes.map(({ id, label, hint, href, Icon }) => (
                    <Command.Item
                      key={id}
                      value={`tool ${label} ${hint}`}
                      onSelect={() => handleSelect({ id, group: "tools", label, hint, href })}
                    >
                      <Row
                        icon={<Icon className="h-4 w-4 text-violet-300" />}
                        label={label}
                        hint={hint}
                      />
                    </Command.Item>
                  ))}
                </Section>

                {showHeavyResults && (
                <Section
                  title={`${t("search.groups.reactions")} · ${reactions.length}`}
                  icon={<Zap className="h-3.5 w-3.5" />}
                >
                  {indexedReactions.map((r) => (
                    <Command.Item
                      key={r.id}
                      value={`reaction ${r.searchable}`}
                      onSelect={() =>
                        handleSelect({
                          id: r.id,
                          group: "reactions",
                          label: r.label,
                          hint: r.balanced,
                          href: r.href,
                        })
                      }
                    >
                      <Row
                        icon={
                          <span
                            className={`flex h-7 w-7 items-center justify-center rounded-lg border ${
                              r.exo
                                ? "border-orange-500/30 bg-orange-500/10 text-orange-300"
                                : "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                            }`}
                          >
                            <Zap className="h-3.5 w-3.5" />
                          </span>
                        }
                        label={r.label}
                        hint={r.balanced}
                        tag={r.type}
                        tagColor="bg-white/[0.04] text-slate-300 border-white/10"
                      />
                    </Command.Item>
                  ))}
                </Section>
                )}

                {showHeavyResults && (
                <Section
                  title={`${t("search.groups.elements")} · ${elements.length}`}
                  icon={<Atom className="h-3.5 w-3.5" />}
                >
                  {indexedElements.map((e) => (
                    <Command.Item
                      key={e.id}
                      value={`element ${e.searchable}`}
                      onSelect={() =>
                        handleSelect({
                          id: e.id,
                          group: "elements",
                          label: e.label,
                          hint: e.cat,
                          href: e.href,
                        })
                      }
                    >
                      <Row
                        icon={
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[11px] font-bold text-cyan-200">
                            {e.sym}
                          </span>
                        }
                        label={e.name}
                        hint={`#${e.z} · ${e.cat}`}
                        tag={e.sym}
                        tagColor="bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                      />
                    </Command.Item>
                  ))}
                </Section>
                )}

                {showHeavyResults && (
                <Section
                  title={`${t("search.groups.compounds")} · ${preAddedCompounds.length}`}
                  icon={<Beaker className="h-3.5 w-3.5" />}
                >
                  {indexedCompounds.map((c) => (
                    <Command.Item
                      key={c.id}
                      value={`compound ${c.searchable}`}
                      onSelect={() =>
                        handleSelect({
                          id: c.id,
                          group: "compounds",
                          label: c.label,
                          href: c.href,
                        })
                      }
                    >
                      <Row
                        icon={
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-purple-500/30 bg-purple-500/10 text-purple-300">
                            <Beaker className="h-3.5 w-3.5" />
                          </span>
                        }
                        label={c.name}
                        hint={c.formula}
                      />
                    </Command.Item>
                  ))}
                </Section>
                )}

                {!showHeavyResults && (
                  <div className="mx-2 mb-2 mt-1 flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[11px] text-slate-500">
                    <Search className="h-3.5 w-3.5 text-cyan-400/60" />
                    <span>{t("search.type_for_more")}</span>
                  </div>
                )}
              </Command.List>

              {/* Footer */}
              <div className="flex items-center justify-between gap-3 border-t border-white/[0.06] bg-black/40 px-3 sm:px-4 py-2.5 text-[10px] sm:text-[11px] text-slate-500">
                <div className="flex items-center gap-2">
                  <CommandIcon className="h-3 w-3" />
                  <span className="hidden sm:inline">UN Lab Search</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <KbdHint label="↑↓" hint={t("search.hints.navigate") as string} />
                  <KbdHint label="↵" hint={t("search.hints.select") as string} />
                  <KbdHint label="esc" hint={t("search.hints.close") as string} />
                </div>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Command.Group
      heading={
        <span className="flex items-center gap-2 px-2 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
          {icon}
          {title}
        </span>
      }
      className="[&_[cmdk-group-items]]:flex [&_[cmdk-group-items]]:flex-col [&_[cmdk-group-items]]:gap-1 mb-1"
    >
      {children}
    </Command.Group>
  );
}

function Row({
  icon,
  label,
  hint,
  tag,
  tagColor = "bg-white/[0.04] text-slate-300 border-white/10",
}: {
  icon: React.ReactNode;
  label: string;
  hint?: string;
  tag?: string;
  tagColor?: string;
}) {
  return (
    <div
      className="group flex w-full items-center gap-3 rounded-xl border border-transparent px-2.5 sm:px-3 py-2 sm:py-2.5 text-left transition data-[selected=true]:border-cyan-400/30 data-[selected=true]:bg-gradient-to-r data-[selected=true]:from-cyan-500/10 data-[selected=true]:via-blue-500/10 data-[selected=true]:to-violet-500/10 data-[selected=true]:shadow-[0_0_0_1px_rgba(56,189,248,0.18),0_8px_30px_-10px_rgba(56,189,248,0.35)]"
      data-search-row
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl">
        {icon}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-[13px] sm:text-sm font-medium text-white">
          {label}
        </span>
        {hint && (
          <span className="truncate text-[11px] sm:text-xs text-slate-500">
            {hint}
          </span>
        )}
      </div>
      {tag && (
        <span
          className={`hidden sm:inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tagColor}`}
        >
          {tag}
        </span>
      )}
      <ArrowRight className="hidden sm:block h-3.5 w-3.5 shrink-0 text-slate-600 transition group-data-[selected=true]:text-cyan-300 group-data-[selected=true]:translate-x-0.5" />
    </div>
  );
}

function KbdHint({ label, hint }: { label: string; hint: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <kbd className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-slate-300">
        {label}
      </kbd>
      <span className="hidden sm:inline">{hint}</span>
    </span>
  );
}
