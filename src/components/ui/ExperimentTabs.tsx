import { ReactNode, useState } from "react";
import { motion } from "framer-motion";

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface ExperimentTabsProps {
  tabs: Tab[];
  children: (activeTab: string) => ReactNode;
}

export default function ExperimentTabs({ tabs, children }: ExperimentTabsProps) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");

  return (
    <div className="w-full">
      <div className="relative mb-5 sm:mb-7 md:mb-8">
        <div
          className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none p-1 sm:p-1.5 rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]"
          role="tablist"
        >
          {tabs.map((tab) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(tab.id)}
                className={`relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs md:text-sm font-semibold whitespace-nowrap flex-shrink-0 transition-colors duration-200 ${
                  isActive
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="exp-tab-active"
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.12] to-white/[0.04] border border-white/15 shadow-[0_4px_18px_-4px_rgba(255,255,255,0.18)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative flex items-center gap-1.5 sm:gap-2">
                  {tab.icon && <span className="opacity-90 shrink-0">{tab.icon}</span>}
                  <span>{tab.label}</span>
                </span>
              </button>
            );
          })}
        </div>
        {/* Subtle edge fades to hint at horizontal scroll on mobile */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-6 sm:hidden bg-gradient-to-r from-black to-transparent rounded-l-2xl" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-6 sm:hidden bg-gradient-to-l from-black to-transparent rounded-r-2xl" />
      </div>
      {children(active)}
    </div>
  );
}
