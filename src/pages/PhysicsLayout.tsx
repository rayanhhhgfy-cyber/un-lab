import { Link, useLocation, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function PhysicsLayout() {
  const { t } = useTranslation();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { path: "/physics/mechanics", label: t("physics.navigation.mechanics") },
    { path: "/physics/electromagnetism", label: t("physics.navigation.e_m") },
    { path: "/physics/thermodynamics", label: t("physics.navigation.thermo") },
    { path: "/physics/waves", label: t("physics.navigation.waves") },
    { path: "/physics/optics", label: t("physics.navigation.optics", "علم البصريات") },
    { path: "/physics/modern", label: t("physics.navigation.modern") },
    { path: "/physics/library", label: t("physics.navigation.library") },
    { path: "/physics/challenges", label: t("physics.navigation.challenges") },
  ];

  const toolLinks = [
    { path: "/physics/converter", label: t("physics.navigation.converter") },
    { path: "/physics/calculator", label: t("physics.navigation.calculator") },
    { path: "/physics/glossary", label: t("physics.navigation.glossary") },
  ];

  const toolsActive = toolLinks.some((tl) => location.pathname === tl.path);

  return (
    <div className="min-h-screen w-full bg-black">
      {/* Sticky physics sub-nav */}
      <nav className="fixed top-14 left-0 right-0 z-40 backdrop-blur-xl border-b border-white/[0.06] w-full bg-black/80">
        <div className="w-full flex items-center justify-between h-12 sm:h-14 px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Brand */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Link
              to="/"
              className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/[0.06] transition-colors flex-shrink-0"
              title="Home"
            >
              <Home className="w-4 h-4 text-slate-400 hover:text-white transition-colors" />
            </Link>
            <Link
              to="/physics"
              className="flex items-center gap-2 group flex-shrink-0 min-w-0"
            >
              <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <span className="text-white font-bold text-xs sm:text-sm">⚛</span>
                <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 opacity-50 blur-md -z-10" />
              </div>
              <span className="hidden sm:inline text-sm font-bold tracking-tight bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent truncate">
                {t("physics.page_title")}
              </span>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.slice(0, 6).map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-2.5 lg:px-3 py-1.5 text-xs font-medium transition-colors ${
                    isActive ? "text-cyan-300" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="phys-nav-indicator"
                      className="absolute inset-0 rounded-full bg-cyan-500/15 border border-cyan-500/30"
                      transition={{ type: "spring", duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}

            {/* Tools dropdown */}
            <div className="relative group ml-1">
              <span
                className={`relative px-2.5 lg:px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors rounded-full hover:bg-white/[0.04] flex items-center gap-1 ${
                  toolsActive ? "text-cyan-300" : "text-slate-400 hover:text-white"
                }`}
              >
                {t("nav.tools")} <ChevronDown className="w-3 h-3" />
              </span>
              <div className="absolute top-full right-0 mt-2 hidden group-hover:block rounded-xl border border-white/10 p-1.5 min-w-[160px] backdrop-blur-xl bg-black/95 shadow-2xl shadow-black/60">
                {toolLinks.map((tl) => (
                  <Link
                    key={tl.path}
                    to={tl.path}
                    className={`block px-3 py-2 text-xs rounded-lg transition ${
                      location.pathname === tl.path
                        ? "text-cyan-300 bg-cyan-500/10"
                        : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
                    }`}
                  >
                    {tl.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 hover:bg-white/[0.06] rounded-lg transition-colors flex-shrink-0"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5 text-slate-200" /> : <Menu className="w-5 h-5 text-slate-200" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/[0.06] backdrop-blur-xl bg-black/95 overflow-hidden"
            >
              <div className="p-3 sm:p-4 space-y-1 max-h-[70vh] overflow-y-auto">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                        isActive
                          ? "text-cyan-300 bg-cyan-500/10 border border-cyan-500/20"
                          : "text-slate-300 hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <div className="pt-3 border-t border-white/[0.06] mt-3">
                  <p className="px-4 text-[10px] text-slate-500 font-bold mb-2 uppercase tracking-[0.25em]">
                    {t("nav.tools")}
                  </p>
                  {toolLinks.map((tl) => {
                    const isActive = location.pathname === tl.path;
                    return (
                      <Link
                        key={tl.path}
                        to={tl.path}
                        onClick={() => setMobileOpen(false)}
                        className={`block px-4 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                          isActive
                            ? "text-cyan-300 bg-cyan-500/10 border border-cyan-500/20"
                            : "text-slate-300 hover:text-white hover:bg-white/[0.04]"
                        }`}
                      >
                        {tl.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer for sub-nav */}
      <div className="h-12 sm:h-14" />

      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}
