import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Compass } from "lucide-react";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-black overflow-hidden px-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[180px]"
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[180px]"
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 text-center max-w-lg"
      >
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 shadow-2xl shadow-cyan-500/40 mb-8"
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Compass className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
        </motion.div>

        <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter mb-4">
          <span className="bg-gradient-to-br from-white via-cyan-100 to-blue-700/60 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            404
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 font-bold mb-2">
          Lost in the cosmos
        </p>
        <p className="text-sm text-slate-500 mb-8 max-w-sm mx-auto">
          The page you're looking for has drifted into another dimension. Let's get you back home.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 text-white font-bold text-sm shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-500/60 transition-shadow"
        >
          <Home size={16} />
          <span>Return Home</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
