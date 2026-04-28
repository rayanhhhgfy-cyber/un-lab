import { useState } from 'react';
import { motion } from "framer-motion";
import { Mountain, MoveHorizontal } from "lucide-react";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";

export default function PlateTectonicsSim() {
  const [speed, setSpeed] = useState(5);
  const [type, setType] = useState<'convergent' | 'divergent'>('convergent');

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-6 w-full">
      <div className="glass rounded-[2rem] p-8 min-h-[400px] flex flex-col items-center justify-center bg-amber-950/10 border-amber-500/20 overflow-hidden">
        <div className="relative w-full h-40 flex items-center justify-center gap-1">
          {/* Left Plate */}
          <motion.div 
            animate={{ x: type === 'convergent' ? speed * 5 : -speed * 5 }}
            className="w-1/2 h-32 bg-stone-700 rounded-lg flex items-center justify-center relative z-20"
          >
            <div className="absolute top-0 left-0 w-full h-4 bg-green-900 rounded-t-lg" />
            <MoveHorizontal className="text-white/20" />
          </motion.div>
          
          {/* Right Plate */}
          <motion.div 
            animate={{ x: type === 'convergent' ? -speed * 5 : speed * 5 }}
            className="w-1/2 h-32 bg-stone-600 rounded-lg flex items-center justify-center relative z-10"
          >
            <div className="absolute top-0 left-0 w-full h-4 bg-green-800 rounded-t-lg" />
            <MoveHorizontal className="text-white/20" />
          </motion.div>

          {/* Mountains/Trench Effect */}
          <AnimatePresence>
            {type === 'convergent' && speed > 5 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: speed/5 }}
                className="absolute z-30"
              >
                <Mountain className="w-20 h-20 text-stone-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 flex gap-4">
          <button 
            onClick={() => setType('convergent')}
            className={`px-6 py-2 rounded-full font-bold transition-all ${type === 'convergent' ? 'bg-amber-500 text-white' : 'bg-white/5 text-slate-500'}`}
          >
            Convergent
          </button>
          <button 
            onClick={() => setType('divergent')}
            className={`px-6 py-2 rounded-full font-bold transition-all ${type === 'divergent' ? 'bg-amber-500 text-white' : 'bg-white/5 text-slate-500'}`}
          >
            Divergent
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="glass rounded-[2rem] p-6 border-white/5 bg-white/[0.02]">
          <h3 className="text-sm font-black text-amber-400 uppercase tracking-widest mb-6">Tectonic Controls</h3>
          <ParamSlider label="Drift Velocity" value={speed} min={1} max={20} step={1} unit="cm/yr" onChange={setSpeed} />
        </div>
        <div className="glass rounded-[2rem] p-6 border-white/5 bg-white/[0.02]">
          <h3 className="text-sm font-black text-amber-400 uppercase tracking-widest mb-4">Seismic Analysis</h3>
          <ResultDisplay items={[
            { label: "Stress Level", value: (speed * 1.5).toFixed(1), unit: "GPa" },
            { label: "Potential Mag", value: (speed / 2).toFixed(1), unit: "Mw" },
            { label: "Subduction", value: type === 'convergent' ? "Active" : "None", unit: "" },
          ]} />
        </div>
      </div>
    </div>
  );
}
