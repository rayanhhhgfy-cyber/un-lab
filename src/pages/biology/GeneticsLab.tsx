import { useState, Suspense, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Dna, Play, RefreshCcw, Info, Activity, Zap } from "lucide-react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Stars } from '@react-three/drei';
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";
import ExperimentTabs from "@/components/ui/ExperimentTabs";
import DnaHelix3D from "@/components/sims/biology/DnaHelix3D";
import LabShell from "@/components/layout/LabShell";
import { motion } from "framer-motion";
import { dominantOffspringCount, mendelianCross } from "@/lib/science/modelInvariants";

/* ── DNA Replication Sim ── */
function DnaReplicator() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [seqLen, setSeqLen] = useState(12);
  const [temp, setTemp] = useState(37);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sequence, setSequence] = useState<string[]>([]);
  const gen = useCallback(() => {
    const b = ['A','T','C','G']; setSequence(Array.from({length:seqLen},()=>b[Math.floor(Math.random()*4)])); setProgress(0); setRunning(false);
  }, [seqLen]);
  useEffect(()=>{ gen(); },[gen]);
  useEffect(()=>{ if(!running) return; const id=setInterval(()=>setProgress(p=>{if(p>=100){setRunning(false);return 100;} return p+(temp/10);}),100); return ()=>clearInterval(id); },[running,temp]);
  const comp = (b:string)=>({A:'T',T:'A',C:'G',G:'C'}[b]||'?');
  const col = (b:string)=> b==='A'?'border-cyan-500 text-cyan-400 bg-cyan-500/20':b==='T'?'border-orange-500 text-orange-400 bg-orange-500/20':b==='C'?'border-emerald-500 text-emerald-400 bg-emerald-500/20':'border-rose-500 text-rose-400 bg-rose-500/20';
  const colD = (b:string)=> b==='A'?'border-cyan-500/40 text-cyan-400/40':b==='T'?'border-orange-500/40 text-orange-400/40':b==='C'?'border-emerald-500/40 text-emerald-400/40':'border-rose-500/40 text-rose-400/40';
  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-8">
      <div className="glass rounded-[2.5rem] p-6 lg:p-10 min-h-[500px] flex flex-col items-center justify-center bg-black/40 border-emerald-500/20 relative overflow-hidden">
        <div className="absolute inset-0"><Canvas camera={{position:[0,0,8],fov:50}} dpr={[1, 1.75]} gl={{ antialias: true, powerPreference: 'high-performance' }} performance={{ min: 0.5 }}><ambientLight intensity={0.4}/><pointLight position={[5,5,5]} color="#10b981" intensity={2}/><Suspense fallback={null}><Float speed={2} rotationIntensity={0.3}><DnaHelix3D speed={running?3:1} baseCount={20}/></Float><Stars count={3000} fade/></Suspense><OrbitControls enableZoom={false} autoRotate autoRotateSpeed={running?3:1}/></Canvas></div>
        <div className="relative z-10 mt-auto w-full max-w-lg">
          <div className="flex gap-2 justify-center flex-wrap mb-6">{sequence.map((b,i)=>(
            <div key={i} className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-md flex items-center justify-center font-bold text-sm border-2 ${col(b)}`}>{b}</div>
              <div className="w-px h-4 bg-white/10"/>
              {progress>(i/sequence.length)*100 && <motion.div initial={{opacity:0,scale:0.5}} animate={{opacity:1,scale:1}} className={`w-8 h-8 rounded-md flex items-center justify-center font-bold text-sm border-2 border-dashed ${colD(comp(b))}`}>{comp(b)}</motion.div>}
            </div>
          ))}</div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden"><motion.div className="h-full bg-emerald-500" animate={{width:`${progress}%`}}/></div>
          <p className="text-center text-[10px] font-mono text-slate-500 mt-2 tracking-widest uppercase">
            {isArabic ? "التضاعف" : "Replication"} {Math.floor(progress)}%
          </p>
        </div>
      </div>
      <div className="space-y-5">
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-emerald-400 uppercase tracking-[0.2em] mb-6">{isArabic ? "تحكم الهيليكيز" : "Helicase Controls"}</h3>
          <ParamSlider label={isArabic ? "طول التسلسل" : "Sequence"} value={seqLen} min={4} max={16} step={1} unit={isArabic ? "زوج قواعد" : "bp"} onChange={setSeqLen}/>
          <ParamSlider label={isArabic ? "درجة الحرارة" : "Temperature"} value={temp} min={20} max={50} step={0.5} unit="°C" onChange={setTemp}/>
          <div className="flex gap-3 mt-8"><button onClick={()=>{setProgress(0);setRunning(true)}} className="flex-1 py-4 rounded-xl bg-emerald-500 text-white font-black active:scale-95 flex items-center justify-center gap-2"><Play size={16}/>{isArabic ? "بدء التضاعف" : "Replicate"}</button><button onClick={gen} className="p-4 rounded-xl bg-white/5 hover:bg-white/10"><RefreshCcw size={16}/></button></div>
        </div>
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-emerald-400 uppercase tracking-[0.2em] mb-5">{isArabic ? "مقاييس البوليميراز" : "Polymerase Metrics"}</h3>
          <ResultDisplay items={[{label:isArabic ? "أزواج القواعد" : "Base Pairs",value:seqLen.toString(),unit:""},{label:isArabic ? "معدل البناء" : "Synthesis Rate",value:(temp/5).toFixed(1),unit:isArabic ? "قاعدة/ث" : "kbp/s"},{label:isArabic ? "الدقة" : "Fidelity",value:temp>42?"99.8":"99.99",unit:"%"}]}/>
        </div>
      </div>
    </div>
  );
}

/* ── Mendelian Cross Sim ── */
function MendelianCross() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [parentA, setParentA] = useState<'AA'|'Aa'|'aa'>('Aa');
  const [parentB, setParentB] = useState<'AA'|'Aa'|'aa'>('Aa');
  const [offspring, setOffspring] = useState<string[]>([]);
  const cross = () => {
    setOffspring(mendelianCross(parentA, parentB));
  };
  useEffect(()=>{cross();},[parentA,parentB]);
  const phenotype = (g:string)=>g.includes('A')?'Dominant':'Recessive';
  const domCount = dominantOffspringCount(offspring);
  const recCount = offspring.length - domCount;
  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-8">
      <div className="glass rounded-[2.5rem] p-6 lg:p-10 min-h-[500px] bg-black/40 border-emerald-500/20 flex flex-col items-center justify-center">
        {/* Punnett Square */}
        <h3 className="text-sm font-black text-emerald-400 uppercase tracking-widest mb-8">{isArabic ? "مربع بانيت" : "Punnett Square"}</h3>
        <div className="grid grid-cols-3 gap-1 text-center w-full max-w-xs">
          <div/>
          <div className="p-3 rounded-lg bg-emerald-500/10 font-black text-emerald-400">{parentB[0]}</div>
          <div className="p-3 rounded-lg bg-emerald-500/10 font-black text-emerald-400">{parentB[1]}</div>
          <div className="p-3 rounded-lg bg-emerald-500/10 font-black text-emerald-400">{parentA[0]}</div>
          {offspring.slice(0,2).map((g,i)=><div key={i} className={`p-4 rounded-lg border font-black text-lg ${g.includes('A')?'border-emerald-500/30 bg-emerald-500/10 text-emerald-300':'border-orange-500/30 bg-orange-500/10 text-orange-300'}`}>{g}</div>)}
          <div className="p-3 rounded-lg bg-emerald-500/10 font-black text-emerald-400">{parentA[1]}</div>
          {offspring.slice(2,4).map((g,i)=><div key={i} className={`p-4 rounded-lg border font-black text-lg ${g.includes('A')?'border-emerald-500/30 bg-emerald-500/10 text-emerald-300':'border-orange-500/30 bg-orange-500/10 text-orange-300'}`}>{g}</div>)}
        </div>
        {/* Phenotype Ratio Bar */}
        <div className="mt-10 w-full max-w-xs">
          <div className="flex h-8 rounded-full overflow-hidden">
            <div className="bg-emerald-500/50 flex items-center justify-center text-xs font-black" style={{width:`${(domCount/4)*100}%`}}>{domCount}:4 {isArabic ? "سائد" : "Dom"}</div>
            {recCount>0 && <div className="bg-orange-500/50 flex items-center justify-center text-xs font-black" style={{width:`${(recCount/4)*100}%`}}>{recCount}:4 {isArabic ? "متنحي" : "Rec"}</div>}
          </div>
        </div>
      </div>
      <div className="space-y-5">
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-emerald-400 uppercase tracking-[0.2em] mb-6">{isArabic ? "التركيب الجيني للأبوين" : "Parent Genotypes"}</h3>
          <div className="space-y-4">
            <div><label className="text-xs text-slate-400 mb-2 block">{isArabic ? "الأب الأول" : "Parent A"}</label>
              <div className="flex gap-2">{(['AA','Aa','aa'] as const).map(g=><button key={g} onClick={()=>setParentA(g)} className={`flex-1 py-3 rounded-lg font-black text-sm ${parentA===g?'bg-emerald-500 text-white':'bg-white/5 text-slate-400 hover:bg-white/10'}`}>{g}</button>)}</div>
            </div>
            <div><label className="text-xs text-slate-400 mb-2 block">{isArabic ? "الأب الثاني" : "Parent B"}</label>
              <div className="flex gap-2">{(['AA','Aa','aa'] as const).map(g=><button key={g} onClick={()=>setParentB(g)} className={`flex-1 py-3 rounded-lg font-black text-sm ${parentB===g?'bg-emerald-500 text-white':'bg-white/5 text-slate-400 hover:bg-white/10'}`}>{g}</button>)}</div>
            </div>
          </div>
        </div>
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-emerald-400 uppercase tracking-[0.2em] mb-5">{isArabic ? "التنبؤ الجيني" : "Genetic Prediction"}</h3>
          <ResultDisplay items={[{label:isArabic ? "سائد" : "Dominant",value:`${(domCount/4*100).toFixed(0)}`,unit:"%"},{label:isArabic ? "متنحي" : "Recessive",value:`${(recCount/4*100).toFixed(0)}`,unit:"%"},{label:isArabic ? "حامل للصفة" : "Carriers",value:`${offspring.filter(g=>g==='Aa'||g==='aA').length}`,unit:"/4"}]}/>
        </div>
      </div>
    </div>
  );
}

/* ── Mutation Sim ── */
function MutationSim() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [seq, setSeq] = useState(['A','T','G','C','C','A','T','G','A','C','G','T']);
  const [mutated, setMutated] = useState<string[]>([]);
  const [mutRate, setMutRate] = useState(15);
  const [uvExposure, setUv] = useState(50);
  const mutate = () => {
    const result = seq.map(b => {
      if (Math.random()*100 < mutRate*(uvExposure/50)) {
        const opts = ['A','T','C','G'].filter(x=>x!==b);
        return opts[Math.floor(Math.random()*3)];
      }
      return b;
    });
    setMutated(result);
  };
  useEffect(()=>{mutate();},[mutRate,uvExposure]);
  const diffCount = mutated.length>0 ? seq.reduce((c,b,i)=>c+(b!==mutated[i]?1:0),0) : 0;
  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-8">
      <div className="glass rounded-[2.5rem] p-6 lg:p-10 min-h-[500px] bg-black/40 border-emerald-500/20 flex flex-col items-center justify-center">
        <h3 className="text-sm font-black text-emerald-400 uppercase tracking-widest mb-8">{isArabic ? "الطفرات المستحثة بالأشعة" : "UV-Induced Mutagenesis"}</h3>
        {/* Original vs Mutated */}
        <div className="space-y-6 w-full max-w-md">
          <div><p className="text-[10px] text-slate-500 font-mono tracking-widest mb-2 uppercase">{isArabic ? "السلسلة الأصلية" : "Original Strand"}</p>
            <div className="flex gap-1">{seq.map((b,i)=>{
              const col = b==='A'?'bg-cyan-500/20 text-cyan-400 border-cyan-500/50':b==='T'?'bg-orange-500/20 text-orange-400 border-orange-500/50':b==='C'?'bg-emerald-500/20 text-emerald-400 border-emerald-500/50':'bg-rose-500/20 text-rose-400 border-rose-500/50';
              return <div key={i} className={`flex-1 py-3 rounded-lg text-center font-black border ${col}`}>{b}</div>;
            })}</div>
          </div>
          <div className="flex justify-center"><div className="w-px h-8 bg-white/10"/></div>
          <div><p className="text-[10px] text-slate-500 font-mono tracking-widest mb-2 uppercase">{isArabic ? "السلسلة المتحولة" : "Mutated Strand"}</p>
            <div className="flex gap-1">{mutated.map((b,i)=>{
              const changed = b!==seq[i];
              const col = b==='A'?'bg-cyan-500/20 text-cyan-400 border-cyan-500/50':b==='T'?'bg-orange-500/20 text-orange-400 border-orange-500/50':b==='C'?'bg-emerald-500/20 text-emerald-400 border-emerald-500/50':'bg-rose-500/20 text-rose-400 border-rose-500/50';
              return <motion.div key={i} animate={changed?{scale:[1,1.3,1]}:{}} className={`flex-1 py-3 rounded-lg text-center font-black border ${col} ${changed?'ring-2 ring-red-500 ring-offset-2 ring-offset-black':''}`}>{b}</motion.div>;
            })}</div>
          </div>
        </div>
        <div className="mt-10 flex gap-4 items-center">
          <div className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest ${diffCount===0?'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20':'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
            {diffCount===0 ? (isArabic ? 'لم يتم رصد طفرات' : 'No Mutations Detected') : (isArabic ? `تم رصد ${diffCount} طفرات` : `${diffCount} Mutation${diffCount>1?'s':''} Detected`)}
          </div>
        </div>
      </div>
      <div className="space-y-5">
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-emerald-400 uppercase tracking-[0.2em] mb-6">{isArabic ? "إعدادات الطفرات" : "Mutagen Config"}</h3>
          <ParamSlider label={isArabic ? "معدل الطفرة" : "Mutation Rate"} value={mutRate} min={1} max={50} step={1} unit="%" onChange={setMutRate}/>
          <ParamSlider label={isArabic ? "التعرض للأشعة" : "UV Exposure"} value={uvExposure} min={10} max={100} step={1} unit="mJ/cm²" onChange={setUv}/>
          <button onClick={mutate} className="w-full mt-8 py-4 rounded-xl bg-emerald-500 text-white font-black active:scale-95 flex items-center justify-center gap-2"><Zap size={16}/>{isArabic ? "تعريض للأشعة" : "Irradiate"}</button>
        </div>
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-emerald-400 uppercase tracking-[0.2em] mb-5">{isArabic ? "تقرير الضرر" : "Damage Report"}</h3>
          <ResultDisplay items={[{label:isArabic ? "طفرات نقطية" : "Point Mutations",value:diffCount.toString(),unit:""},{label:isArabic ? "معدل الضرر" : "Damage Rate",value:(diffCount/seq.length*100).toFixed(1),unit:"%"},{label:isArabic ? "تأثير البروتين" : "Protein Impact",value:diffCount>2?(isArabic ? "حاد" : "Severe"):diffCount>0?(isArabic ? "متوسط" : "Mild"):(isArabic ? "لا يوجد" : "None"),unit:""}]}/>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function GeneticsLab() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const tabs = [
    { id: "replication", label: isArabic ? "تضاعف DNA" : "DNA Replication", icon: <Dna size={16}/> },
    { id: "mendel", label: isArabic ? "قوانين مندل" : "Mendelian Cross", icon: <Activity size={16}/> },
    { id: "mutation", label: isArabic ? "الطفرات" : "Mutations", icon: <Zap size={16}/> },
  ];
  const theories: Record<string,{en:string,ar:string}> = {
    replication: { 
      en: "Think of DNA replication like unzipping a jacket and using each side to build a brand new jacket! An enzyme called helicase acts as the zipper, splitting the DNA helix in half. Then, another enzyme called DNA Polymerase acts like a builder, reading the unzipped strands and matching up new building blocks (A with T, and C with G). It's incredibly fast and accurate, making very few mistakes—about one in a billion!", 
      ar: "تخيل أن تضاعف الحمض النووي (DNA) يشبه فتح سحاب سترة واستخدام كل جانب منها لبناء سترة جديدة تماماً! يعمل إنزيم 'الهيليكيز' مثل السحاب الذي يفصل شريطي الحمض النووي عن بعضهما. ثم يأتي إنزيم 'البوليميراز' ليعمل كالبنّاء، حيث يقرأ الأشرطة المفتوحة ويطابق أحجار البناء الجديدة (A مع T، و C مع G). إنها عملية سريعة ودقيقة للغاية، لدرجة أنها لا تخطئ إلا مرة واحدة تقريباً في كل مليار خطوة!" 
    },
    mendel: { 
      en: "Have you ever wondered why you have your mother's eyes or your father's hair? Gregor Mendel figured out the basic rules for this using pea plants! His First Law says that every parent has two copies of a gene for a trait, but they only pass one to their child. His Second Law says that getting one trait (like hair color) doesn't affect getting another trait (like height). We use a 'Punnett Square' as a simple grid to predict the chances of a child getting certain traits from their parents.", 
      ar: "هل تساءلت يوماً لماذا تملك عيني والدتك أو شعر والدك؟ لقد اكتشف جريجور مندل القواعد الأساسية لذلك باستخدام نباتات البازلاء! ينص قانونه الأول على أن كل أب أو أم يملك نسختين من جين لصفة معينة، لكنهما يمرران نسخة واحدة فقط للطفل. وينص قانونه الثاني على أن وراثة صفة معينة (مثل لون الشعر) لا تؤثر على وراثة صفة أخرى (مثل الطول). نحن نستخدم 'مربع بانيت' كشبكة بسيطة لنتوقع احتمالية وراثة الطفل لصفات معينة من والديه." 
    },
    mutation: { 
      en: "Mutations are simply typos in the DNA instruction manual. Sometimes a single letter gets swapped, added, or deleted. Things like UV light from the sun or certain chemicals can cause these typos. Our cells are pretty smart and have their own 'spell-checkers' to fix most of these errors. But if a typo goes unfixed, it can permanently change how a cell works. While some mutations are harmful, others can be harmless or even give living things a new, helpful trait over generations!", 
      ar: "الطفرات هي ببساطة 'أخطاء إملائية' في كتيب تعليمات الحمض النووي (DNA). أحياناً يتم تبديل حرف واحد، إضافته، أو حذفه. أشياء مثل الأشعة فوق البنفسجية من الشمس أو بعض المواد الكيميائية يمكن أن تسبب هذه الأخطاء. خلايانا ذكية جداً وتملك 'مدققاً إملائياً' خاصاً بها لإصلاح معظم هذه الأخطاء. لكن إذا بقي الخطأ دون إصلاح، فقد يغير طريقة عمل الخلية بشكل دائم. في حين أن بعض الطفرات ضارة، فإن بعضها الآخر قد يكون غير ضار أو حتى يمنح الكائنات الحية صفة جديدة مفيدة عبر الأجيال!" 
    },
  };
  const validityRanges: Record<string, { en: string; ar: string }> = {
    replication: {
      en: "Educational range: sequence length 4-16 bp and temperature 20-50 C. Reported fidelity and synthesis rates are conceptual teaching indicators.",
      ar: "نطاق تعليمي: طول التسلسل 4-16 زوج قواعد ودرجة الحرارة 20-50 م. قيم الدقة وسرعة البناء هنا مؤشرات تعليمية مفاهيمية.",
    },
    mendel: {
      en: "Educational range: single-gene Mendelian inheritance with dominant/recessive assumptions. Does not include linkage, polygenic traits, or penetrance effects.",
      ar: "نطاق تعليمي: وراثة مندلية لجين واحد مع افتراض السيادة/التنحي. لا يشمل الارتباط الجيني أو الصفات متعددة الجينات أو النفاذية.",
    },
    mutation: {
      en: "Educational range: stochastic UV mutation illustration only. Damage and protein-impact labels are qualitative and not clinical or genomic diagnostics.",
      ar: "نطاق تعليمي: محاكاة احتمالية لطفرات الأشعة فوق البنفسجية فقط. مؤشرات الضرر وتأثير البروتين وصفية وليست تشخيصًا جينيًا أو سريريًا.",
    },
  };
  return (
    <LabShell
      backHref="/biology"
      backLabelEn="Biology Hub"
      backLabelAr="مركز الأحياء"
      sectorEn="Sector · Genomics"
      sectorAr="القطاع · علم الجينوم"
      titleEn="Genetics Lab"
      titleAr="مختبر الجينات"
      descriptionEn="Decode the language of life — replicate strands, run Mendelian crosses, and observe how mutations rewrite biological possibility."
      descriptionAr="اكتشف لغة الحياة — ضاعف الأشرطة، أجرِ تهجينات مندلية، وشاهد كيف تعيد الطفرات كتابة الإمكانات البيولوجية."
      theme="emerald"
    >
      <ExperimentTabs tabs={tabs}>{(active)=>(
        <div className="flex flex-col gap-5 sm:gap-6">
          {active==="replication" && <DnaReplicator/>}
          {active==="mendel" && <MendelianCross/>}
          {active==="mutation" && <MutationSim/>}
          <div className="glass rounded-3xl p-6 sm:p-8 md:p-10 border-emerald-500/15 bg-emerald-500/[0.025]">
            <h2 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-3 text-emerald-300">
              <span className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center">
                <Info size={16}/>
              </span>
              {isArabic?"الإطار النظري":"Theoretical Framework"}
            </h2>
            <p className="text-slate-300/90 leading-relaxed text-sm sm:text-base">{isArabic ? theories[active].ar : theories[active].en}</p>
            <div className="mt-4 rounded-xl border border-amber-400/25 bg-amber-500/[0.08] p-3 sm:p-4">
              <p className="text-[11px] sm:text-xs text-amber-100/90 leading-relaxed">
                {isArabic ? validityRanges[active].ar : validityRanges[active].en}
              </p>
            </div>
          </div>
        </div>
      )}</ExperimentTabs>
    </LabShell>
  );
}
