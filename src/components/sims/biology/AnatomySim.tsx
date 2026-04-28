import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Heart, Activity } from "lucide-react";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";

export default function AnatomySim() {
  const [bpm, setBpm] = useState(70);
  const [resistance, setResistance] = useState(50);
  const [flow, setFlow] = useState(5.0);

  useEffect(() => {
    // Basic cardiac output calculation
    const output = (bpm * 70) / 1000; // Stroke volume ~70ml
    const actualFlow = output * (1 - (resistance / 200));
    setFlow(actualFlow);
  }, [bpm, resistance]);

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-6 w-full">
      <div className="glass rounded-[2rem] p-8 min-h-[400px] flex flex-col items-center justify-center bg-rose-950/10 border-rose-500/20">
        <motion.div 
          animate={{ scale: [1, 1.1 + (bpm/200), 1] }}
          transition={{ duration: 60/bpm, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <Heart className="w-40 h-40 text-rose-500 drop-shadow-[0_0_20px_rgba(244,63,94,0.5)]" fill="currentColor" />
          <motion.div 
            animate={{ opacity: [0, 0.5, 0], scale: [1, 1.5, 1] }}
            transition={{ duration: 60/bpm, repeat: Infinity }}
            className="absolute inset-0 bg-rose-500/20 rounded-full blur-2xl"
          />
        </motion.div>
        
        <div className="mt-12 w-full max-w-md h-24 bg-black/40 rounded-xl border border-white/5 overflow-hidden relative">
          {/* ECG Trace Simulation */}
          <svg className="w-full h-full" viewBox="0 0 400 100">
            <motion.path
              d="M 0 50 L 50 50 L 60 20 L 70 80 L 80 50 L 150 50"
              fill="none"
              stroke="#f43f5e"
              strokeWidth="2"
              animate={{ x: [-150, 400] }}
              transition={{ duration: 60/bpm * 2, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        </div>
      </div>

      <div className="space-y-4">
        <div className="glass rounded-[2rem] p-6 border-white/5 bg-white/[0.02]">
          <h3 className="text-sm font-black text-rose-400 uppercase tracking-widest mb-6">Vascular Controls</h3>
          <ParamSlider label="Heart Rate" value={bpm} min={40} max={180} step={1} unit="BPM" onChange={setBpm} />
          <ParamSlider label="Resistance" value={resistance} min={10} max={100} step={1} unit="%" onChange={setResistance} />
        </div>
        <div className="glass rounded-[2rem] p-6 border-white/5 bg-white/[0.02]">
          <h3 className="text-sm font-black text-rose-400 uppercase tracking-widest mb-4">Vitals Analysis</h3>
          <ResultDisplay items={[
            { label: "Cardiac Output", value: flow.toFixed(1), unit: "L/min" },
            { label: "Blood Pressure", value: `${Math.floor(80 + (bpm/2))}/${Math.floor(60 + (resistance/2))}`, unit: "mmHg" },
            { label: "Oxygen Sat", value: "98", unit: "%" },
          ]} />
        </div>
      </div>
    </div>
  );
}
