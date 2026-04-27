import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Maximize2, Activity, Target, Aperture, Combine, Rainbow, Waves, Eye } from "lucide-react";
import ExperimentTabs from "@/components/ui/ExperimentTabs";

import OpticsReflectionSim from "@/components/sims/optics/OpticsReflectionSim";
import OpticsRefractionSim from "@/components/sims/optics/OpticsRefractionSim";
import OpticsLensesSim from "@/components/sims/optics/OpticsLensesSim";
import OpticsRainbowSim from "@/components/sims/optics/OpticsRainbowSim";
import OpticsFiberSim from "@/components/sims/optics/OpticsFiberSim";
import OpticsPolarizationSim from "@/components/sims/optics/OpticsPolarizationSim";
import OpticsColorMixingSim from "@/components/sims/optics/OpticsColorMixingSim";
import OpticsTelescopeSim from "@/components/sims/optics/OpticsTelescopeSim";
import OpticsLaserSandboxSim from "@/components/sims/optics/OpticsLaserSandboxSim";

export default function OpticsPage() {
  const { t } = useTranslation();

  const tabs = [
    { id: "reflection", label: t('physics.optics.tabs.reflection', 'الانعكاس والمرايا'), icon: <Target className="w-4 h-4" /> },
    { id: "refraction", label: t('physics.optics.tabs.refraction', 'الانكسار (Snell)'), icon: <Activity className="w-4 h-4" /> },
    { id: "lenses", label: t('physics.optics.tabs.lenses', 'العدسات وتكون الصور'), icon: <Maximize2 className="w-4 h-4" /> },
    { id: "rainbow", label: t('physics.optics.tabs.rainbow', 'قوس قزح'), icon: <Rainbow className="w-4 h-4" /> },
    { id: "fiber", label: t('physics.optics.tabs.fiber', 'الألياف البصرية'), icon: <Combine className="w-4 h-4" /> },
    { id: "polarization", label: t('physics.optics.tabs.polarization', 'الاستقطاب'), icon: <Aperture className="w-4 h-4" /> },
    { id: "colormixing", label: t('physics.optics.tabs.colormixing', 'مزج الألوان'), icon: <Eye className="w-4 h-4" /> },
    { id: "telescope", label: t('physics.optics.tabs.telescope', 'تلسكوب فلكي'), icon: <Maximize2 className="w-4 h-4" /> },
    { id: "sandbox", label: t('physics.optics.tabs.sandbox', 'مختبر الليزر'), icon: <Waves className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen w-full pt-16 lg:pt-20 pb-12 px-4 md:px-8 xl:px-12">
      <div className="w-full max-w-7xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium">
            <Lightbulb className="w-4 h-4" />
            <span>{t('physics.optics.badge', 'بصريات متقدمة')}</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
            {t('physics.optics.title', 'علم البصريات')}
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-3xl leading-relaxed">
            {t('physics.optics.description', 'استكشف عالم الضوء، المرايا بأنواعها، العدسات، ظواهر الانكسار والانعكاس من خلال محاكاة تفاعلية متقدمة ومبهرة بصرياً.')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ExperimentTabs tabs={tabs}>
            {(active) => (
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6"
                >
                  {active === "reflection" && <OpticsReflectionSim />}
                  {active === "refraction" && <OpticsRefractionSim />}
                  {active === "lenses" && <OpticsLensesSim />}
                  {active === "rainbow" && <OpticsRainbowSim />}
                  {active === "fiber" && <OpticsFiberSim />}
                  {active === "polarization" && <OpticsPolarizationSim />}
                  {active === "colormixing" && <OpticsColorMixingSim />}
                  {active === "telescope" && <OpticsTelescopeSim />}
                  {active === "sandbox" && <OpticsLaserSandboxSim />}
                  
                  <div className="mt-6 glass rounded-3xl p-6 sm:p-8 border-cyan-500/10 bg-gradient-to-br from-cyan-500/[0.02] to-violet-500/[0.02]">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-cyan-400">
                      <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-sm font-mono shadow-[0_0_15px_rgba(6,182,212,0.3)]">✨</span>
                      {t('physics.common.about_experiment', 'عن هذه التجربة')}
                    </h2>
                    <p className="text-base sm:text-lg leading-relaxed text-slate-300">
                      {active === "reflection" && t('physics.optics.desc.reflection')}
                      {active === "refraction" && t('physics.optics.desc.refraction')}
                      {active === "lenses" && t('physics.optics.desc.lenses')}
                      {active === "rainbow" && t('physics.optics.desc.rainbow')}
                      {active === "fiber" && t('physics.optics.desc.fiber')}
                      {active === "polarization" && t('physics.optics.desc.polarization')}
                      {active === "colormixing" && t('physics.optics.desc.colormixing')}
                      {active === "telescope" && t('physics.optics.desc.telescope')}
                      {active === "sandbox" && t('physics.optics.desc.sandbox')}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </ExperimentTabs>
        </motion.div>
      </div>
    </div>
  );
}
