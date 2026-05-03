import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { type Reaction } from '@/data/reactions';
import { useEffect, useMemo, useState } from 'react';
import { useDeviceCapability } from '@/lib/useDeviceCapability';

interface Props {
  reaction: Reaction | null;
  reacting: boolean;
}

type Effect =
  | 'bubble'
  | 'fire'
  | 'smoke'
  | 'spark'
  | 'absorb'
  | 'crystal'
  | 'drop'
  | 'vapor'
  | 'glow'
  | 'wash';

const visualToEffect = (v: string): Effect => {
  if (['bubbles', 'gas-release', 'effervescence'].includes(v)) return 'bubble';
  if (['fire', 'melt', 'boil'].includes(v)) return 'fire';
  if (['smoke'].includes(v)) return 'smoke';
  if (['explosion', 'spark'].includes(v)) return 'spark';
  if (['absorb', 'hydride'].includes(v)) return 'absorb';
  if (['precipitate', 'crystallize', 'freeze'].includes(v)) return 'crystal';
  if (['dissolve', 'condense'].includes(v)) return 'drop';
  if (['vapor'].includes(v)) return 'vapor';
  if (['glow', 'luminescence'].includes(v)) return 'glow';
  if (['color-change'].includes(v)) return 'wash';
  return 'spark';
};

/* ─── Particle ─────────────────────────────────────────────────
 * Each particle uses ONLY framer-motion's animatable transform
 * properties (x, y, scale, rotate, opacity) so there is no
 * conflict with static `transform` overrides. Centering is done
 * via negative margins, and "depth" is faked via blur+size+opacity.
 * ─────────────────────────────────────────────────────────────── */
const Particle = ({
  effect,
  color,
  idx,
  total,
}: {
  effect: Effect;
  color: string;
  idx: number;
  total: number;
}) => {
  // Deterministic phase per particle (stable across re-renders)
  const angle = (idx / Math.max(total, 1)) * Math.PI * 2 + (idx % 3) * 0.4;
  const radius = 90 + ((idx * 23) % 60);
  const startX = Math.cos(angle) * radius;
  const startY = Math.sin(angle) * radius;
  const depth = (idx * 11) % 100; // 0..100 for fake depth
  const depthScale = 0.7 + depth / 200; // 0.7..1.2

  let anim: Variants[string] = {};
  let baseSize = 8;
  let bg: string;
  let radius_css: string = '50%';
  let glow = `0 0 12px ${color}, 0 0 6px ${color}88`;

  switch (effect) {
    case 'bubble':
      anim = {
        y: [60, -130 - (idx % 4) * 8],
        x: [startX * 0.25, startX * 0.25 + Math.sin(angle) * 25],
        scale: [0.3, 1.15, 1.4],
        opacity: [0, 0.9, 0],
      };
      bg = `radial-gradient(circle at 35% 30%, #ffffffd0 0%, ${color}90 60%, ${color}40 100%)`;
      glow = `inset -1px -2px 4px ${color}80, 0 0 8px ${color}50`;
      baseSize = 10;
      break;

    case 'fire':
      anim = {
        y: [50, -110 - (idx % 5) * 6],
        x: [startX * 0.15, startX * 0.4],
        scale: [1.2, 0.25],
        opacity: [1, 0],
      };
      bg = `radial-gradient(circle at 50% 30%, #ffe680 0%, ${color} 55%, transparent 100%)`;
      glow = `0 0 18px ${color}, 0 0 10px #ffd27d`;
      baseSize = 14;
      break;

    case 'smoke':
      anim = {
        y: [10, -110 - (idx % 4) * 6],
        x: [startX * 0.3, startX * 0.6 + Math.sin(angle) * 20],
        scale: [0.5, 2.6],
        opacity: [0.55, 0],
      };
      bg = `radial-gradient(circle, ${color}aa 0%, ${color}55 50%, transparent 80%)`;
      glow = 'none';
      baseSize = 18;
      break;

    case 'spark':
      anim = {
        x: [0, Math.cos(angle) * 220],
        y: [0, Math.sin(angle) * 220],
        scale: [1.4, 0.1],
        opacity: [1, 0],
        rotate: [0, 360],
      };
      bg = `radial-gradient(circle, #ffffff 0%, ${color} 60%, transparent 100%)`;
      glow = `0 0 14px ${color}, 0 0 6px #ffffff`;
      baseSize = 6;
      break;

    case 'absorb':
      anim = {
        x: [startX, 0],
        y: [startY, 0],
        scale: [0.4, 1, 0.2],
        opacity: [0, 1, 0],
      };
      bg = `radial-gradient(circle, #ffffff 0%, ${color} 70%, transparent 100%)`;
      glow = `0 0 14px ${color}, 0 0 5px #ffffffb0`;
      baseSize = 7;
      break;

    case 'crystal':
      anim = {
        x: [0, Math.cos(angle) * 100],
        y: [0, Math.sin(angle) * 100],
        scale: [0, 1.6, 0],
        opacity: [0, 1, 0],
        rotate: [0, 240],
      };
      bg = `linear-gradient(135deg, #ffffff 0%, ${color} 70%)`;
      glow = `0 0 12px #ffffffd0, 0 0 5px ${color}`;
      radius_css = '2px';
      baseSize = 6;
      break;

    case 'drop':
      anim = {
        y: [-30, 90],
        x: [startX * 0.4, startX * 0.4 + Math.sin(angle) * 10],
        scale: [0.4, 1.2],
        opacity: [0, 0.85, 0.3],
      };
      bg = `radial-gradient(circle at 35% 30%, #ffffff 0%, ${color}cc 60%, ${color}66 100%)`;
      glow = `0 0 8px ${color}80`;
      baseSize = 9;
      break;

    case 'vapor':
      anim = {
        y: [10, -120 - (idx % 4) * 5],
        x: [startX * 0.4, startX * 0.7],
        scale: [0.5, 2.0],
        opacity: [0.7, 0],
      };
      bg = `radial-gradient(circle, ${color}99 0%, ${color}44 60%, transparent 100%)`;
      glow = `0 0 10px ${color}50`;
      baseSize = 12;
      break;

    case 'glow':
      anim = {
        x: [startX, startX * 1.1, startX],
        y: [startY, startY * 1.1, startY],
        scale: [0.7, 1.4, 0.7],
        opacity: [0.3, 1, 0.3],
        rotate: [0, 180],
      };
      bg = `radial-gradient(circle, #ffffff 0%, ${color} 60%, transparent 100%)`;
      glow = `0 0 18px ${color}, 0 0 8px #ffffffaa`;
      baseSize = 8;
      break;

    case 'wash':
    default:
      anim = {
        x: [0, Math.cos(angle) * 60],
        y: [0, Math.sin(angle) * 60],
        scale: [0.6, 1.2, 0.6],
        opacity: [0, 0.8, 0],
      };
      bg = `radial-gradient(circle, ${color} 0%, transparent 80%)`;
      glow = `0 0 10px ${color}`;
      baseSize = 10;
  }

  // Apply fake depth (smaller/blurry/dim particles look further)
  const sz = Math.max(3, Math.round(baseSize * depthScale));
  const blur = depthScale < 0.85 ? '1px' : depthScale < 0.95 ? '0.5px' : '0';

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 pointer-events-none"
      style={{
        width: sz,
        height: sz,
        marginLeft: -sz / 2,
        marginTop: -sz / 2,
        background: bg,
        boxShadow: glow,
        borderRadius: radius_css,
        filter: `blur(${blur})`,
        opacity: 0.9,
      }}
      initial={{ opacity: 0 }}
      animate={anim}
      transition={{
        duration: 1.4 + ((idx * 7) % 70) / 100,
        delay: (idx % 14) * 0.08,
        repeat: Infinity,
        ease: effect === 'spark' ? 'easeOut' : 'easeInOut',
      }}
    />
  );
};

/* ─── Reaction Visualizer ───────────────────────────────────────
 * Premium glassmorphic chamber. Layered glow rings, central sphere
 * with specular highlight, depth particles, edge vignettes.
 * ─────────────────────────────────────────────────────────────── */
const ReactionVisualizer = ({ reaction, reacting }: Props) => {
  const [show, setShow] = useState(false);
  const { particleScale, prefersReducedMotion } = useDeviceCapability();

  useEffect(() => {
    if (reacting) {
      const t = setTimeout(() => setShow(true), 320);
      return () => clearTimeout(t);
    }
    setShow(false);
  }, [reacting]);

  const effect = useMemo(
    () => (reaction ? visualToEffect(reaction.visual) : 'spark'),
    [reaction]
  );

  if (!reaction || !reacting) return null;

  const baseCount =
    reaction.visual === 'explosion'
      ? 40
      : effect === 'absorb' || effect === 'crystal' || effect === 'glow'
      ? 28
      : effect === 'fire' || effect === 'bubble'
      ? 26
      : 22;
  const count = prefersReducedMotion
    ? Math.max(6, Math.round(baseCount * 0.25))
    : Math.max(8, Math.round(baseCount * particleScale));

  const isCore = effect === 'absorb' || effect === 'crystal' || effect === 'glow';
  const isExplosion = reaction.visual === 'explosion';
  const isFire = effect === 'fire';
  const isWash = effect === 'wash';

  return (
    <AnimatePresence>
      <motion.div
        key={reaction.id}
        className="relative w-full h-56 sm:h-72 lg:h-80 rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 130, damping: 18 }}
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, #0f0f1c 0%, #06060f 60%, #000 100%)',
        }}
      >
        {/* Reactive backdrop wash */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 55%, ${reaction.color}33 0%, ${reaction.color}11 35%, transparent 70%)`,
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Subtle dot grid (premium texture) */}
        <div
          className="absolute inset-0 opacity-[0.18] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />

        {/* Distant nebula gradient blobs */}
        <motion.div
          className="absolute -top-16 -left-16 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${reaction.color}30 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
          animate={{ x: [0, 30, 0], y: [0, 10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-20 -right-16 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${reaction.color}25 0%, transparent 70%)`,
            filter: 'blur(50px)',
          }}
          animate={{ x: [0, -30, 0], y: [0, -10, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floor reflection ellipse */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-2 sm:bottom-3 pointer-events-none"
          style={{
            width: 320,
            height: 80,
            borderRadius: '50%',
            background: `radial-gradient(ellipse at 50% 50%, ${reaction.color}55 0%, ${reaction.color}22 45%, transparent 80%)`,
            filter: 'blur(10px)',
          }}
        />

        {/* Visual type badge */}
        <motion.div
          className="absolute top-3 left-3 z-30 text-[10px] sm:text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white backdrop-blur-md tracking-[0.18em] uppercase"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            boxShadow: `0 0 20px ${reaction.color}40`,
          }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle"
            style={{
              background: reaction.color,
              boxShadow: `0 0 8px ${reaction.color}`,
            }}
          />
          {reaction.visual.replace('-', ' ')}
        </motion.div>

        {/* Equation pill */}
        <motion.div
          className="absolute top-3 right-3 z-30 text-[10px] sm:text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/90 backdrop-blur-md max-w-[60%] truncate"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
        >
          {reaction.eq}
        </motion.div>

        {/* Concentric energy rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`ring-${i}`}
              className="absolute rounded-full border"
              style={{
                width: 110 + i * 70,
                height: 110 + i * 70,
                borderColor: `${reaction.color}50`,
                borderWidth: i === 0 ? 1.5 : 1,
              }}
              animate={{
                scale: [0.96, 1.06, 0.96],
                opacity: [0.25, 0.55, 0.25],
                rotate: i === 1 ? [0, 360] : i === 2 ? [360, 0] : 0,
              }}
              transition={{
                scale: { duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 },
                opacity: { duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 },
                rotate: { duration: 30 + i * 10, repeat: Infinity, ease: 'linear' },
              }}
            />
          ))}
        </div>

        {/* Central 3D-feeling sphere (for core/fire effects) */}
        {(isCore || isFire) && (
          <div className="absolute left-1/2 top-1/2 pointer-events-none" style={{ transform: 'translate(-50%, -50%)' }}>
            {/* Outer halo */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 140,
                height: 140,
                marginLeft: -70,
                marginTop: -70,
                background: `radial-gradient(circle at 35% 35%, ${reaction.color}aa 0%, ${reaction.color}33 45%, transparent 75%)`,
                filter: 'blur(10px)',
              }}
              animate={{
                scale: [0.85, 1.15, 0.85],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Specular sphere */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 70,
                height: 70,
                marginLeft: -35,
                marginTop: -35,
                background: `
                  radial-gradient(circle at 30% 25%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.4) 12%, transparent 30%),
                  radial-gradient(circle at 50% 60%, ${reaction.color} 0%, ${reaction.color}cc 50%, ${reaction.color}66 100%)
                `,
                boxShadow: `
                  0 0 40px ${reaction.color},
                  inset 0 -10px 18px rgba(0,0,0,0.45),
                  inset 0 6px 14px ${reaction.color}cc
                `,
              }}
              animate={
                isCore
                  ? { scale: [0.95, 1.05, 0.95], rotate: [0, 360] }
                  : { scale: [0.92, 1.08, 0.92] }
              }
              transition={
                isCore
                  ? {
                      scale: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
                      rotate: { duration: 12, repeat: Infinity, ease: 'linear' },
                    }
                  : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
              }
            />
            {/* Inner shimmer (for crystal effects) */}
            {effect === 'crystal' && (
              <motion.div
                className="absolute rounded-sm"
                style={{
                  width: 26,
                  height: 26,
                  marginLeft: -13,
                  marginTop: -13,
                  background: `linear-gradient(135deg, #ffffff 0%, ${reaction.color} 70%)`,
                  boxShadow: `0 0 22px #ffffff80, 0 0 12px ${reaction.color}`,
                }}
                animate={{ rotate: [0, 180, 360], scale: [0.8, 1.1, 0.8] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />
            )}
          </div>
        )}

        {/* Particles */}
        <div className="absolute inset-0">
          {show &&
            Array.from({ length: count }).map((_, i) => (
              <Particle
                key={`${reaction.id}-p-${i}`}
                effect={effect}
                color={reaction.color}
                idx={i}
                total={count}
              />
            ))}
        </div>

        {/* Explosion shockwaves */}
        {isExplosion && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`shock-${i}`}
                className="absolute left-1/2 top-1/2 rounded-full pointer-events-none"
                style={{
                  width: 60,
                  height: 60,
                  marginLeft: -30,
                  marginTop: -30,
                  border: `2px solid ${reaction.color}`,
                  boxShadow: `0 0 30px ${reaction.color}`,
                }}
                animate={{ scale: [0, 4.5], opacity: [1, 0] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: 'easeOut',
                }}
              />
            ))}
            <motion.div
              className="absolute left-1/2 top-1/2 rounded-full pointer-events-none"
              style={{
                width: 50,
                height: 50,
                marginLeft: -25,
                marginTop: -25,
                background: `radial-gradient(circle, #ffffff 0%, ${reaction.color} 50%, transparent 90%)`,
                filter: 'blur(3px)',
              }}
              animate={{ scale: [0.6, 2.2, 0.6], opacity: [0.9, 0.2, 0.9] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
            />
          </>
        )}

        {/* Color-change wash */}
        {isWash && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              background: `linear-gradient(to top, ${reaction.color}cc 0%, ${reaction.color}66 50%, transparent 100%)`,
            }}
            initial={{ height: '0%' }}
            animate={{ height: ['25%', '70%', '40%', '75%', '50%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Edge vignettes */}
        <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/85 to-transparent pointer-events-none" />

        {/* Inner glow border (reactive) */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            boxShadow: `inset 0 0 70px ${reaction.color}40, inset 0 0 20px ${reaction.color}30`,
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Premium gradient frame highlight */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.04) 100%)',
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default ReactionVisualizer;
