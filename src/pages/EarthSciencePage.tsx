import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { 
  Mountain, 
  ArrowLeft, 
  ChevronRight,
  Activity,
  ArrowRight,
  X,
  Play,
  BookOpen,
  Loader2,
  CheckCircle2,
  Globe,
  Radio,
  Wind,
  Droplets,
  Thermometer,
  Compass,
  Cpu,
  ShieldCheck,
  Zap
} from "lucide-react";
import { earthScienceBranches } from "@/data/earthModules";

export default function EarthSciencePage() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const isArabic = i18n.language === 'ar';
  
  const isIndex = location.pathname === "/earth-science" || location.pathname === "/earth-science/";

  if (!isIndex) return null;

  return (
    <div className={`min-h-screen relative w-full bg-[#020205] text-white selection:bg-blue-500/30 overflow-x-hidden ${isArabic ? 'rtl font-arabic' : 'font-sans'}`}>
      {/* Planetary Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[900px] h-[900px] bg-blue-500/5 rounded-full blur-[180px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-sky-500/5 rounded-full blur-[180px] animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-25 brightness-50" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-20">
        {/* Navigation */}
        <Link to="/" className="inline-flex items-center gap-3 text-slate-500 hover:text-blue-400 mb-16 transition-all group">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500/10 border border-white/5">
            <ArrowLeft size={20} className={isArabic ? 'rotate-180' : ''} />
          </div>
          <span className="font-bold tracking-widest text-[10px] uppercase underline-offset-8 group-hover:underline">{isArabic ? "القيادة العالمية" : "Global Command"}</span>
        </Link>

        {/* Hero Header */}
        <div className="mb-24 relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-20 bg-blue-500/50" />
            <span className="text-blue-500 font-mono text-xs tracking-[0.6em] uppercase">{isArabic ? "القطاع 03: علوم الأرض والفضاء" : "Sector 03: Earth & Space Sciences"}</span>
          </div>
          <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter mb-8 bg-gradient-to-br from-white via-blue-50 to-blue-900/50 bg-clip-text text-transparent leading-[0.8]">
             {isArabic ? "علوم الأرض" : "Earth Science"}
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl leading-relaxed font-light">
             {isArabic 
               ? "نظام مراقبة وتحليل عالمي لدراسة العمليات الجيوفيزيائية والمناخية التي تشكل نظام دعم الحياة على كوكبنا."
               : "Global surveillance and analysis system for studying geophysical and climatic processes that shape our planet's life-support systems."}
          </p>
          
          {/* Status HUD */}
          <div className="mt-12 flex flex-wrap gap-8 items-center border-t border-white/5 pt-12">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{isArabic ? "رابط القمر الصناعي: آمن" : "Satellite Link: Secure"}</div>
            </div>
            <div className="flex items-center gap-3 text-slate-500">
              <Radio size={14} />
              <div className="text-[10px] font-bold uppercase tracking-widest">{isArabic ? "تيليميتري حي: مزامنة" : "Real-time Telemetry: Syncing"}</div>
            </div>
            <div className="flex items-center gap-3 text-slate-500">
              <Zap size={14} />
              <div className="text-[10px] font-bold uppercase tracking-widest">{isArabic ? "حساسية الزلازل: قصوى" : "Seismic Sensitivity: Max"}</div>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {earthScienceBranches.map((branch, i) => (
            <Link key={branch.path} to={branch.path} className="group h-full">
              <div className="relative h-full p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-blue-500/30 transition-all duration-500 overflow-hidden flex flex-col justify-between group-hover:-translate-y-2">
                {/* Branch Code */}
                <div className="absolute top-8 right-10 text-white/5 font-black text-6xl tracking-tighter select-none uppercase">
                  GEO-{i + 1}
                </div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-white/5 ${branch.color}`}>
                    <branch.icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-3xl font-black mb-4 group-hover:text-blue-400 transition-colors">
                    {isArabic ? branch.titleAr : branch.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm font-light line-clamp-3 mb-10">
                    {isArabic ? branch.detailsAr : branch.details}
                  </p>
                </div>

                <div className="relative z-10 pt-8 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-blue-500 transition-colors">
                    <span>{isArabic ? "مزامنة البيانات" : "Synchronize Data"}</span>
                    <ArrowRight size={14} className={`group-hover:translate-x-2 transition-transform ${isArabic ? 'rotate-180 group-hover:-translate-x-2' : ''}`} />
                  </div>
                  <Globe size={16} className="text-white/5 group-hover:text-blue-500/20" />
                </div>

                {/* Hover Glow */}
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Footer Branding */}
      <div className="relative z-10 py-12 px-6 border-t border-white/5 text-center">
        <div className="text-[10px] font-mono text-slate-600 tracking-[1em] uppercase">{isArabic ? "الأمم المتحدة - قسم الجيومكانية // 2026" : "UN - GEOSPATIAL DIVISION // 2026"}</div>
      </div>
    </div>
  );
}
