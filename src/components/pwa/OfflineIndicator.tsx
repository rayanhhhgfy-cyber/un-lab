import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";

export default function OfflineIndicator() {
  const [offline, setOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const goOffline = () => setOffline(true);
    const goOnline  = () => setOffline(false);
    window.addEventListener("offline", goOffline);
    window.addEventListener("online",  goOnline);
    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online",  goOnline);
    };
  }, []);

  if (!offline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-2.5 px-4 py-2.5 rounded-full text-sm font-semibold shadow-xl border border-yellow-500/40 bg-black/90 backdrop-blur-md text-yellow-300 animate-in slide-in-from-bottom-4 duration-300"
    >
      <WifiOff className="w-4 h-4 shrink-0" />
      <span>You're offline — app still works from cache</span>
    </div>
  );
}
