import { Link, useLocation, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Menu, X, ChevronDown, Sigma } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MathPortalPrefsProvider } from "@/contexts/MathPortalPrefsContext";
import { mathBranches } from "@/data/mathModules";

export default function MathematicsLayout() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const isAr = i18n.language === "ar";
  const [mobileOpen, setMobileOpen] = useState(false);

  const labLinks = mathBranches.map((b) => ({
    path: b.path,
    label: isAr ? b.titleAr : b.title,
  }));

  const toolRoutes = [
    { path: "/mathematics/tools/solver", label: isAr ? "حاسبة الحلول" : "Equation solver" },
    { path: "/mathematics/tools/formulas", label: isAr ? "موسوعة الصيغ" : "Formula library" },
    { path: "/mathematics/tools/converter", label: isAr ? "محولات رياضية" : "Math converters" },
  ];

  const moreLinks = [
    { path: "/mathematics/glossary", label: isAr ? "مسرد المصطلحات" : "Glossary" },
    { path: "/mathematics/workspace", label: isAr ? "مساحة العمل والتخصيص" : "Workspace & prefs" },
  ];

  const toolsActive = toolRoutes.some((x) => location.pathname === x.path);
  const isHub = location.pathname === "/mathematics" || location.pathname === "/mathematics/";

  return (
    <MathPortalPrefsProvider>
      <div className="min-h-screen w-full bg-black text-white">
        <nav className="fixed top-14 left-0 right-0 z-40 backdrop-blur-xl border-b border-white/[0.06] w-full bg-black/85">
          <div className="w-full flex items-center justify-between h-12 sm:h-14 px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <Link
                to="/"
                className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/[0.06] transition-colors flex-shrink-0"
                title={isAr ? "الرئيسية" : "Home"}
              >
                <Home className="w-4 h-4 text-slate-400 hover:text-white transition-colors" />
              </Link>
              <Link to="/mathematics" className="flex items-center gap-2 group flex-shrink-0 min-w-0">
                <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-violet-400 via-fuchsia-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                  <Sigma className="w-4 h-4 text-white" strokeWidth={2.5} />
                  <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet-400 to-indigo-600 opacity-50 blur-md -z-10" />
                </div>
                <span className="hidden sm:inline text-sm font-bold tracking-tight bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent truncate max-w-[200px]">
                  {isAr ? "بوابة الرياضيات" : "Math Portal"}
                </span>
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-0.5 flex-wrap justify-end max-w-[72%]">
              <Link
                to="/mathematics"
                className={`relative px-2.5 py-1.5 text-[11px] font-medium rounded-full transition-colors ${
                  isHub ? "text-violet-300" : "text-slate-400 hover:text-white"
                }`}
              >
                {isHub && (
                  <motion.div
                    layoutId="math-nav-hub"
                    className="absolute inset-0 rounded-full bg-violet-500/15 border border-violet-500/30"
                    transition={{ type: "spring", duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{isAr ? "الرئيسية" : "Hub"}</span>
              </Link>
              {labLinks.slice(0, 4).map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-2 py-1.5 text-[10px] font-medium transition-colors max-w-[120px] truncate ${
                      isActive ? "text-violet-300" : "text-slate-400 hover:text-white"
                    }`}
                    title={link.label}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="math-nav-indicator"
                        className="absolute inset-0 rounded-full bg-violet-500/12 border border-violet-500/25"
                        transition={{ type: "spring", duration: 0.4 }}
                      />
                    )}
                    <span className="relative z-10 truncate block">{link.label}</span>
                  </Link>
                );
              })}

              <div className="relative group ml-0.5">
                <span
                  className={`relative px-2.5 py-1.5 text-[11px] font-medium cursor-pointer rounded-full hover:bg-white/[0.04] flex items-center gap-1 ${
                    labLinks.slice(4).some((l) => location.pathname === l.path) ? "text-violet-300" : "text-slate-400 hover:text-white"
                  }`}
                >
                  +{isAr ? "فروع" : "more"} <ChevronDown className="w-3 h-3" />
                </span>
                <div className="absolute top-full end-0 mt-2 hidden group-hover:block rounded-xl border border-white/10 p-1.5 min-w-[200px] backdrop-blur-xl bg-black/95 shadow-2xl z-50">
                  {labLinks.slice(4).map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`block px-3 py-2 text-xs rounded-lg transition ${
                        location.pathname === link.path ? "text-violet-300 bg-violet-500/10" : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="relative group ml-1">
                <span
                  className={`relative px-2.5 py-1.5 text-[11px] font-medium cursor-pointer rounded-full hover:bg-white/[0.04] flex items-center gap-1 ${
                    toolsActive ? "text-fuchsia-300" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {isAr ? "أدوات" : "Tools"} <ChevronDown className="w-3 h-3" />
                </span>
                <div className="absolute top-full end-0 mt-2 hidden group-hover:block rounded-xl border border-white/10 p-1.5 min-w-[200px] backdrop-blur-xl bg-black/95 shadow-2xl z-50">
                  {toolRoutes.map((tl) => (
                    <Link
                      key={tl.path}
                      to={tl.path}
                      className={`block px-3 py-2 text-xs rounded-lg transition ${
                        location.pathname === tl.path ? "text-fuchsia-300 bg-fuchsia-500/10" : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
                      }`}
                    >
                      {tl.label}
                    </Link>
                  ))}
                </div>
              </div>

              {moreLinks.map((ml) => {
                const isActive = location.pathname === ml.path;
                return (
                  <Link
                    key={ml.path}
                    to={ml.path}
                    className={`relative px-2.5 py-1.5 text-[11px] font-medium transition-colors ${
                      isActive ? "text-violet-300" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="math-nav-more"
                        className="absolute inset-0 rounded-full bg-violet-500/12 border border-violet-500/25"
                        transition={{ type: "spring", duration: 0.4 }}
                      />
                    )}
                    <span className="relative z-10">{ml.label}</span>
                  </Link>
                );
              })}
            </div>

            <button
              className="lg:hidden p-2 hover:bg-white/[0.06] rounded-lg transition-colors flex-shrink-0"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5 text-slate-200" /> : <Menu className="w-5 h-5 text-slate-200" />}
            </button>
          </div>

          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden border-t border-white/[0.06] bg-black/95 overflow-hidden"
              >
                <div className="p-3 max-h-[75vh] overflow-y-auto space-y-1">
                  <Link
                    to="/mathematics"
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${isHub ? "text-violet-300 bg-violet-500/10" : "text-slate-300"}`}
                  >
                    {isAr ? "الرئيسية" : "Hub"}
                  </Link>
                  <p className="px-4 pt-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">{isAr ? "المختبرات" : "Labs"}</p>
                  {labLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
                        location.pathname === link.path ? "text-violet-300 bg-violet-500/10 border border-violet-500/20" : "text-slate-300 hover:bg-white/[0.04]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <p className="px-4 pt-3 text-[10px] text-slate-500 font-bold uppercase tracking-widest">{isAr ? "أدوات" : "Tools"}</p>
                  {toolRoutes.map((tl) => (
                    <Link
                      key={tl.path}
                      to={tl.path}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
                        location.pathname === tl.path ? "text-fuchsia-300 bg-fuchsia-500/10" : "text-slate-300 hover:bg-white/[0.04]"
                      }`}
                    >
                      {tl.label}
                    </Link>
                  ))}
                  {moreLinks.map((ml) => (
                    <Link
                      key={ml.path}
                      to={ml.path}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
                        location.pathname === ml.path ? "text-violet-300 bg-violet-500/10" : "text-slate-300 hover:bg-white/[0.04]"
                      }`}
                    >
                      {ml.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        <div className="h-12 sm:h-14" aria-hidden />

        <main className="w-full">
          <Outlet />
        </main>
      </div>
    </MathPortalPrefsProvider>
  );
}
