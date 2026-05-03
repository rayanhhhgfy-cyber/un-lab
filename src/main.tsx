import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/space-grotesk";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from 'react-i18next';
import { registerSW } from "virtual:pwa-register";
import i18n from './i18n/i18n';
import App from "./App.tsx";
import "./index.css";
import { toast } from "sonner";
import { PwaInstallPromptProvider } from "@/components/pwa/PwaInstallPromptContext";

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Missing #root element");
}

createRoot(rootEl).render(
  <I18nextProvider i18n={i18n}>
    <PwaInstallPromptProvider>
      <App />
    </PwaInstallPromptProvider>
  </I18nextProvider>
);

let updateApp: (reloadPage?: boolean) => Promise<void> = async () => {};
try {
  updateApp = registerSW({
    onNeedRefresh() {
      toast(i18n.t("pwa.update_available"), {
        duration: 60_000,
        action: {
          label: i18n.t("pwa.reload"),
          onClick: () => {
            void updateApp(true);
          },
        },
      });
    },
    onOfflineReady() {
      toast.success(i18n.t("pwa.offline_ready"));
    },
    onRegisterError(error) {
      console.warn("[PWA] Service worker registration failed:", error);
    },
  });
} catch (e) {
  console.warn("[PWA] registerSW failed:", e);
} 
