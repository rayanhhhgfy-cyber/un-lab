import { CSSProperties } from "react";

type Accent = "primary" | "emerald" | "rose" | "sky" | "amber" | "violet" | "cyan";

interface ParamSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit: string;
  onChange: (v: number) => void;
  accent?: Accent;
}

const accentClass: Record<Accent, string> = {
  primary: "",
  emerald: "range-slider-emerald",
  rose: "range-slider-rose",
  sky: "range-slider-sky",
  amber: "range-slider-amber",
  violet: "range-slider-violet",
  cyan: "range-slider-cyan",
};

const chipClass: Record<Accent, string> = {
  primary: "text-white border-white/15 bg-white/[0.06]",
  emerald: "text-emerald-300 border-emerald-400/25 bg-emerald-500/[0.08]",
  rose: "text-rose-300 border-rose-400/25 bg-rose-500/[0.08]",
  sky: "text-sky-300 border-sky-400/25 bg-sky-500/[0.08]",
  amber: "text-amber-300 border-amber-400/25 bg-amber-500/[0.08]",
  violet: "text-violet-300 border-violet-400/25 bg-violet-500/[0.08]",
  cyan: "text-cyan-300 border-cyan-400/25 bg-cyan-500/[0.08]",
};

export default function ParamSlider({
  label,
  value,
  min,
  max,
  step = 0.1,
  unit,
  onChange,
  accent = "primary",
}: ParamSliderProps) {
  const pct = ((value - min) / Math.max(max - min, 1e-6)) * 100;
  const fillStyle = { ["--rs-fill" as never]: `${pct}%` } as CSSProperties;

  return (
    <div className="space-y-2 sm:space-y-2.5 py-1.5">
      <div className="flex items-center justify-between gap-2 text-xs sm:text-[13px]">
        <span className="text-slate-300/90 font-medium truncate">{label}</span>
        <span
          className={`font-mono text-[11px] sm:text-xs px-2 py-0.5 rounded-md border ${chipClass[accent]} flex-shrink-0`}
        >
          {value.toFixed(step < 1 ? 1 : 0)}
          <span className="opacity-60 ml-1">{unit}</span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={fillStyle}
        className={`range-slider ${accentClass[accent]}`}
        aria-label={label}
      />
    </div>
  );
}
