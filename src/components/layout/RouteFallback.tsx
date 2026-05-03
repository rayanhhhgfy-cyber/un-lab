const RouteFallback = () => (
  <div
    role="status"
    aria-live="polite"
    aria-busy="true"
    className="flex flex-col items-center justify-center min-h-[60vh] w-full px-4"
  >
    <div className="relative flex items-center justify-center">
      <div className="absolute h-20 w-20 rounded-full bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-violet-500/30 blur-2xl animate-pulse" />
      <div className="relative h-12 w-12 rounded-full border-2 border-white/15 border-t-cyan-400 animate-spin" />
    </div>
    <p className="mt-5 text-xs font-mono uppercase tracking-[0.3em] text-slate-400">
      Loading
    </p>
  </div>
);

export default RouteFallback;
