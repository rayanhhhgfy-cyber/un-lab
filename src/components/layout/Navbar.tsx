import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Atom, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const navLinks = [
    { path: "/", label: t("nav.home") },
    { path: "/chemistry", label: t("nav.chemistry") || t("global.navigation.chemistry") },
    { path: "/physics", label: t("nav.physics") || "Physics" },
    { path: "/biology", label: t("nav.biology") || "Biology" },
    { path: "/earth-science", label: t("nav.earth_science") || "Earth Science" },
  ];

  const toolLinks = [
    { path: "/physics/converter", label: t("nav.tools_menu.unitConverter") },
    { path: "/physics/calculator", label: t("nav.tools_menu.formulaCalc") },
    { path: "/physics/glossary", label: t("nav.tools_menu.glossary") },
  ];

  const isToolsActive = (pathname: string) =>
    ["/physics/converter", "/physics/calculator", "/physics/glossary"].some((p) => pathname === p);

  const isPathActive = (path: string, pathname: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/85 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="container flex items-center justify-between h-14">
        <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <Atom className="w-4 h-4 text-white" />
            <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 opacity-50 blur-md -z-10" />
          </div>
          <span className="text-sm sm:text-base font-bold tracking-tight bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent truncate max-w-[120px] xs:max-w-none">
            {t("physics.title")}
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const isActive = isPathActive(link.path, location.pathname);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive ? "text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="topnav-indicator"
                    className="absolute inset-0 rounded-full bg-white/[0.07] border border-white/10"
                    transition={{ type: "spring", duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}

          <div className="relative group ml-1">
            <span
              className={`relative px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors rounded-full hover:bg-white/[0.04] flex items-center gap-1 ${
                isToolsActive(location.pathname) ? "text-cyan-300" : "text-slate-400 hover:text-white"
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

        <div className="flex items-center gap-1 sm:gap-2">
          <LanguageSwitcher />
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/[0.06] transition-colors text-slate-200"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/[0.06] bg-black/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-3 py-3 space-y-1">
              {navLinks.map((link) => {
                const isActive = isPathActive(link.path, location.pathname);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-2.5 text-sm rounded-lg font-medium transition-colors ${
                      isActive
                        ? "text-white bg-white/[0.06] border border-white/10"
                        : "text-slate-300 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-2 border-t border-white/[0.06] mt-2">
                <p className="px-4 text-[10px] text-slate-500 font-bold mb-2 uppercase tracking-[0.25em]">
                  {t("nav.tools")}
                </p>
                {toolLinks.map((tl) => {
                  const isActive = location.pathname === tl.path;
                  return (
                    <Link
                      key={tl.path}
                      to={tl.path}
                      onClick={() => setOpen(false)}
                      className={`block px-4 py-2.5 text-sm rounded-lg font-medium transition-colors ${
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
  );
}
