import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Trash2 } from "lucide-react";

type Mirror = { id: number; x: number; y: number; angle: number; L: number };
type Laser = { x: number; y: number; angle: number };

export default function OpticsLaserSandboxSim() {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [mirrors, setMirrors] = useState<Mirror[]>([
    { id: 1, x: 300, y: 150, angle: Math.PI / 4, L: 100 },
    { id: 2, x: 500, y: 300, angle: -Math.PI / 4, L: 100 }
  ]);
  const [laser, setLaser] = useState<Laser>({ x: 50, y: 150, angle: 0 });
  const [targetPos, setTargetPos] = useState({ x: 700, y: 150 });

  const [dragState, setDragState] = useState<{
    type: 'mirror_center' | 'mirror_end' | 'laser_center' | 'laser_end' | 'target' | null;
    id?: number;
    endIdx?: 0 | 1;
    startX?: number;
    startY?: number;
    initialMirrors?: Mirror[];
    initialLaser?: Laser;
    initialTarget?: {x: number, y: number};
  }>({ type: null });

  const getMirrorEnds = (m: Mirror) => {
    const dx = (m.L / 2) * Math.cos(m.angle);
    const dy = (m.L / 2) * Math.sin(m.angle);
    return [{ x: m.x - dx, y: m.y - dy }, { x: m.x + dx, y: m.y + dy }];
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    
    // Draw high-tech grid
    ctx.strokeStyle = "rgba(244, 63, 94, 0.03)";
    ctx.lineWidth = 1;
    for (let i = 0; i < w; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke(); }
    for (let i = 0; i < h; i += 40) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke(); }
    for (let i = 0; i < w; i += 200) { ctx.strokeStyle = "rgba(244, 63, 94, 0.08)"; ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke(); }
    for (let i = 0; i < h; i += 200) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke(); }

    let currentP = { x: laser.x, y: laser.y };
    let currentD = { x: Math.cos(laser.angle), y: Math.sin(laser.angle) };
    const maxBounces = 50;
    
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#f43f5e";
    ctx.shadowColor = "#f43f5e";
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.moveTo(currentP.x, currentP.y);

    let isTargetHit = false;

    for (let bounce = 0; bounce < maxBounces; bounce++) {
      let closestT = Infinity;
      let hitP = null;
      let hitNormal = null;
      let hitType: 'mirror' | 'target' | null = null;

      // Check mirrors
      mirrors.forEach(m => {
        const [A, B] = getMirrorEnds(m);
        const Vx = B.x - A.x;
        const Vy = B.y - A.y;
        
        const cross = currentD.x * Vy - currentD.y * Vx;
        if (Math.abs(cross) > 1e-6) {
          const t_hit = ((A.x - currentP.x) * Vy - (A.y - currentP.y) * Vx) / cross;
          const u = ((A.x - currentP.x) * currentD.y - (A.y - currentP.y) * currentD.x) / cross;
          
          if (t_hit > 0.001 && u >= 0 && u <= 1) {
            if (t_hit < closestT) {
              closestT = t_hit;
              hitP = { x: currentP.x + t_hit * currentD.x, y: currentP.y + t_hit * currentD.y };
              hitNormal = { x: -Math.sin(m.angle), y: Math.cos(m.angle) };
              if (currentD.x * hitNormal.x + currentD.y * hitNormal.y > 0) {
                hitNormal = { x: -hitNormal.x, y: -hitNormal.y };
              }
              hitType = 'mirror';
            }
          }
        }
      });

      // Check Target (Circle intersection)
      const fx = currentP.x - targetPos.x;
      const fy = currentP.y - targetPos.y;
      const a = currentD.x * currentD.x + currentD.y * currentD.y; // Should be 1
      const b = 2 * (fx * currentD.x + fy * currentD.y);
      const c = (fx * fx + fy * fy) - 20 * 20; // 20 is target radius
      const discriminant = b * b - 4 * a * c;

      if (discriminant >= 0) {
        const t_target = (-b - Math.sqrt(discriminant)) / (2 * a);
        if (t_target > 0.001 && t_target < closestT) {
          closestT = t_target;
          hitP = { x: currentP.x + t_target * currentD.x, y: currentP.y + t_target * currentD.y };
          hitType = 'target';
        }
      }

      if (hitP) {
        ctx.lineTo(hitP.x, hitP.y);
        
        if (hitType === 'target') {
          isTargetHit = true;
          break; // Laser stops at target
        }

        // Reflect off mirror
        if (hitNormal) {
          const dot = currentD.x * hitNormal.x + currentD.y * hitNormal.y;
          currentD = {
            x: currentD.x - 2 * dot * hitNormal.x,
            y: currentD.y - 2 * dot * hitNormal.y
          };
          currentP = hitP;
        }
      } else {
        const rayLen = Math.max(w, h) * 2;
        ctx.lineTo(currentP.x + currentD.x * rayLen, currentP.y + currentD.y * rayLen);
        break;
      }
    }
    
    ctx.stroke();
    ctx.shadowBlur = 0;
    
    // Draw core of laser for extra glow
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#fff";
    ctx.stroke();

    // Draw Target
    ctx.shadowColor = isTargetHit ? "#22c55e" : "#fbbf24";
    ctx.shadowBlur = isTargetHit ? 25 : 10;
    ctx.fillStyle = isTargetHit ? "#22c55e" : "#fbbf24";
    ctx.beginPath();
    ctx.arc(targetPos.x, targetPos.y, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(targetPos.x, targetPos.y, isTargetHit ? 10 : 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    
    // Draw Laser Source (High-tech box)
    ctx.save();
    ctx.translate(laser.x, laser.y);
    ctx.rotate(laser.angle);
    ctx.fillStyle = "#1e293b";
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(-20, -15, 40, 30, 5);
    ctx.fill();
    ctx.stroke();
    // Laser nozzle
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(20, -5, 10, 10);
    ctx.fillStyle = "#f43f5e";
    ctx.shadowColor = "#f43f5e";
    ctx.shadowBlur = 10;
    ctx.fillRect(28, -2, 4, 4);
    ctx.restore();

    // Rotation Handle for Laser
    const le = { x: laser.x + 50 * Math.cos(laser.angle), y: laser.y + 50 * Math.sin(laser.angle) };
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.beginPath(); ctx.arc(le.x, le.y, 5, 0, Math.PI * 2); ctx.fill();

    // Draw Mirrors (Luxurious glass look)
    mirrors.forEach(m => {
      const [A, B] = getMirrorEnds(m);
      
      // Silver backing
      ctx.lineWidth = 8;
      ctx.strokeStyle = "#475569";
      ctx.beginPath();
      ctx.moveTo(A.x, A.y);
      ctx.lineTo(B.x, B.y);
      ctx.stroke();

      // Glass front
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#38bdf8";
      ctx.beginPath();
      // Offset slightly to front
      const nx = -Math.sin(m.angle) * 3;
      const ny = Math.cos(m.angle) * 3;
      ctx.moveTo(A.x + nx, A.y + ny);
      ctx.lineTo(B.x + nx, B.y + ny);
      ctx.stroke();

      // Handles
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(m.x, m.y, 4, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(A.x, A.y, 6, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(B.x, B.y, 6, 0, Math.PI * 2); ctx.fill();
    });

  }, [mirrors, laser, targetPos]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      draw();
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [draw]);

  useEffect(() => {
    draw();
  }, [draw]);

  const handlePointerDown = (e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const hitThreshold = 20;

    // Target
    if (Math.hypot(x - targetPos.x, y - targetPos.y) < hitThreshold + 10) {
      setDragState({ type: 'target', initialTarget: { ...targetPos }, startX: x, startY: y });
      return;
    }

    // Laser
    const le = { x: laser.x + 50 * Math.cos(laser.angle), y: laser.y + 50 * Math.sin(laser.angle) };
    if (Math.hypot(x - le.x, y - le.y) < hitThreshold) {
      setDragState({ type: 'laser_end', initialLaser: { ...laser } });
      return;
    }
    if (Math.hypot(x - laser.x, y - laser.y) < hitThreshold + 10) {
      setDragState({ type: 'laser_center', initialLaser: { ...laser }, startX: x, startY: y });
      return;
    }

    for (const m of mirrors) {
      if (Math.hypot(x - m.x, y - m.y) < hitThreshold) {
        setDragState({ type: 'mirror_center', id: m.id, initialMirrors: JSON.parse(JSON.stringify(mirrors)), startX: x, startY: y });
        return;
      }
      const [A, B] = getMirrorEnds(m);
      if (Math.hypot(x - A.x, y - A.y) < hitThreshold) {
        setDragState({ type: 'mirror_end', id: m.id, endIdx: 0, initialMirrors: JSON.parse(JSON.stringify(mirrors)) });
        return;
      }
      if (Math.hypot(x - B.x, y - B.y) < hitThreshold) {
        setDragState({ type: 'mirror_end', id: m.id, endIdx: 1, initialMirrors: JSON.parse(JSON.stringify(mirrors)) });
        return;
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragState.type) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (dragState.type === 'target' && dragState.initialTarget) {
      const dx = x - dragState.startX!;
      const dy = y - dragState.startY!;
      setTargetPos({ x: dragState.initialTarget.x + dx, y: dragState.initialTarget.y + dy });
    } else if (dragState.type === 'laser_center' && dragState.initialLaser) {
      const dx = x - dragState.startX!;
      const dy = y - dragState.startY!;
      setLaser({ ...laser, x: dragState.initialLaser.x + dx, y: dragState.initialLaser.y + dy });
    } else if (dragState.type === 'laser_end') {
      const angle = Math.atan2(y - laser.y, x - laser.x);
      setLaser({ ...laser, angle });
    } else if (dragState.type === 'mirror_center' && dragState.initialMirrors) {
      const dx = x - dragState.startX!;
      const dy = y - dragState.startY!;
      setMirrors(mirrors.map(m => m.id === dragState.id ? {
        ...m,
        x: dragState.initialMirrors!.find(im => im.id === m.id)!.x + dx,
        y: dragState.initialMirrors!.find(im => im.id === m.id)!.y + dy
      } : m));
    } else if (dragState.type === 'mirror_end') {
      setMirrors(mirrors.map(m => {
        if (m.id === dragState.id) {
          const angle = Math.atan2(y - m.y, x - m.x);
          return { ...m, angle: dragState.endIdx === 1 ? angle : angle + Math.PI };
        }
        return m;
      }));
    }
  };

  const handlePointerUp = () => {
    setDragState({ type: null });
  };

  const addMirror = () => {
    const canvas = canvasRef.current;
    const w = canvas ? canvas.width : 500;
    const h = canvas ? canvas.height : 500;
    setMirrors([...mirrors, { id: Date.now(), x: w / 2, y: h / 2, angle: 0, L: 100 }]);
  };

  const clearMirrors = () => setMirrors([]);

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-4 md:gap-5 w-full">
      <div className="glass rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-video relative w-full border border-rose-500/20">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full touch-none cursor-crosshair"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        />
        
        <div className="absolute top-4 left-4 pointer-events-none">
          <div className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700 backdrop-blur-md text-xs font-mono text-slate-300">
            LASER LAB V2.0
          </div>
        </div>
      </div>
      <div className="space-y-4 w-full">
        <div className="glass rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-rose-400 uppercase tracking-wider">{t('physics.optics.sandbox_controls', 'مختبر الليزر')}</h3>
          
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3">
            <p className="text-xs text-rose-200 leading-relaxed">
              {t('physics.optics.drag_instruction', 'اسحب المرايا، الليزر، أو الهدف لنقلهم. اسحب أطراف المرآة للتدوير. قم بتوجيه الليزر لإضاءة الهدف!')}
            </p>
          </div>

          <button onClick={addMirror} className="w-full py-3 rounded-xl bg-slate-800/50 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 font-medium transition-all flex items-center justify-center gap-2 border border-rose-500/10">
            <Plus className="w-4 h-4" />
            {t('physics.optics.add_mirror', 'إضافة مرآة مستوية')}
          </button>
          
          <button onClick={clearMirrors} className="w-full py-3 rounded-xl bg-slate-800/50 hover:bg-red-500/20 text-slate-300 hover:text-red-400 font-medium transition-all flex items-center justify-center gap-2 border border-red-500/10">
            <Trash2 className="w-4 h-4" />
            {t('physics.optics.clear_mirrors', 'مسح الكل')}
          </button>
        </div>
      </div>
    </div>
  );
}
