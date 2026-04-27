import { motion } from "framer-motion";

interface ResultDisplayProps {
  items: { label: string; value: string; unit: string }[];
}

export default function ResultDisplay({ items }: ResultDisplayProps) {
  return (
    <div className="space-y-1.5 sm:space-y-2">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04, duration: 0.25 }}
          className="group flex items-center justify-between gap-3 px-3 py-2 sm:py-2.5 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04] transition-colors"
        >
          <span className="text-[11px] sm:text-xs text-slate-400 font-medium truncate">
            {item.label}
          </span>
          <span className="font-mono text-xs sm:text-sm font-semibold text-white whitespace-nowrap flex items-baseline gap-1">
            <span>{item.value}</span>
            {item.unit && (
              <span className="text-[10px] sm:text-[11px] font-normal text-slate-500">
                {item.unit}
              </span>
            )}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
