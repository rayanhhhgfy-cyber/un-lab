import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer.tsx";
import RouteFallback from "@/components/layout/RouteFallback";

const LandingPage = lazy(() => import("./pages/LandingPage.tsx"));
const VRLabsPage = lazy(() => import("./pages/VRLabsPage.tsx"));
const ChemistryIndex = lazy(() => import("./pages/ChemistryIndex.tsx"));
const PhysicsLayout = lazy(() => import("./pages/PhysicsLayout.tsx"));
const PhysicsIndexPage = lazy(() => import("./pages/PhysicsIndexPage.tsx"));
const BiologyPage = lazy(() => import("./pages/BiologyPage.tsx"));
const MathematicsLayout = lazy(() => import("./pages/MathematicsLayout.tsx"));
const MathematicsPage = lazy(() => import("./pages/MathematicsPage.tsx"));
const EarthSciencePage = lazy(() => import("./pages/EarthSciencePage.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const HelpPage = lazy(() => import("./pages/HelpPage.tsx"));

const MathBranchLab = lazy(() => import("./pages/mathematics/MathBranchLab.tsx"));
const MathSolverPage = lazy(() => import("./pages/mathematics/MathSolverPage.tsx"));
const MathFormulasPage = lazy(() => import("./pages/mathematics/MathFormulasPage.tsx"));
const MathConverterPage = lazy(() => import("./pages/mathematics/MathConverterPage.tsx"));
const MathGlossaryPage = lazy(() => import("./pages/mathematics/MathGlossaryPage.tsx"));
const MathWorkspacePage = lazy(() => import("./pages/mathematics/MathWorkspacePage.tsx"));
const GeneticsLab = lazy(() => import("./pages/biology/GeneticsLab.tsx"));
const AnatomyLab = lazy(() => import("./pages/biology/AnatomyLab.tsx"));
const MicrobiologyLab = lazy(() => import("./pages/biology/MicrobiologyLab.tsx"));
const EcologyLab = lazy(() => import("./pages/biology/EcologyLab.tsx"));
const CellBiologyLab = lazy(() => import("./pages/biology/CellBiologyLab.tsx"));
const NeuroscienceLab = lazy(() => import("./pages/biology/NeuroscienceLab.tsx"));

const MeteorologyLab = lazy(() => import("./pages/earth/MeteorologyLab.tsx"));
const VolcanologyLab = lazy(() => import("./pages/earth/VolcanologyLab.tsx"));
const GeologyLab = lazy(() => import("./pages/earth/GeologyLab.tsx"));
const HydrologyLab = lazy(() => import("./pages/earth/HydrologyLab.tsx"));
const ClimatologyLab = lazy(() => import("./pages/earth/ClimatologyLab.tsx"));
const CartographyLab = lazy(() => import("./pages/earth/CartographyLab.tsx"));

const MechanicsPage = lazy(() => import("./pages/physics/MechanicsPage.tsx"));
const ElectromagnetismPage = lazy(() => import("./pages/physics/ElectromagnetismPage.tsx"));
const ThermodynamicsPage = lazy(() => import("./pages/physics/ThermodynamicsPage.tsx"));
const WavesPage = lazy(() => import("./pages/physics/WavesPage.tsx"));
const ModernPhysicsPage = lazy(() => import("./pages/physics/ModernPhysicsPage.tsx"));
const OpticsPage = lazy(() => import("./pages/physics/OpticsPage.tsx"));
const LibraryPage = lazy(() => import("./pages/physics/LibraryPage.tsx"));
const ChallengesPage = lazy(() => import("./pages/physics/ChallengesPage.tsx"));
const UnitConverterPage = lazy(() => import("./pages/physics/UnitConverterPage.tsx"));
const FormulaCalcPage = lazy(() => import("./pages/physics/FormulaCalcPage.tsx"));
const GlossaryPage = lazy(() => import("./pages/physics/GlossaryPage.tsx"));
const PhysicsNotFound = lazy(() => import("./pages/physics/NotFound.tsx"));

import { ChatProvider } from "@/components/chat/ChatContext";
import { SearchProvider } from "@/components/search/SearchContext";
import PwaInstallBanner from "@/components/pwa/PwaInstallBanner";
import OfflineIndicator from "@/components/pwa/OfflineIndicator";
const ChatWidget = lazy(() => import("@/components/chat/ChatWidget"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ChatProvider>
        <BrowserRouter>
          <SearchProvider>
          <Navbar />
          <div className="flex flex-col min-h-screen w-full pt-14 relative">
            <div className="flex-1">
              <Suspense fallback={<RouteFallback />}>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/help" element={<HelpPage />} />
                  <Route path="/vr-labs" element={<VRLabsPage />} />
                  <Route path="/chemistry" element={<ChemistryIndex />} />
                  <Route path="/biology">
                    <Route index element={<BiologyPage />} />
                    <Route path="genetics" element={<GeneticsLab />} />
                    <Route path="anatomy" element={<AnatomyLab />} />
                    <Route path="microbiology" element={<MicrobiologyLab />} />
                    <Route path="ecology" element={<EcologyLab />} />
                    <Route path="cells" element={<CellBiologyLab />} />
                    <Route path="neuroscience" element={<NeuroscienceLab />} />
                  </Route>
                  <Route path="/mathematics" element={<MathematicsLayout />}>
                    <Route index element={<MathematicsPage />} />
                    <Route path="workspace" element={<MathWorkspacePage />} />
                    <Route path="tools/solver" element={<MathSolverPage />} />
                    <Route path="tools/formulas" element={<MathFormulasPage />} />
                    <Route path="tools/converter" element={<MathConverterPage />} />
                    <Route path="glossary" element={<MathGlossaryPage />} />
                    <Route path=":branch" element={<MathBranchLab />} />
                  </Route>
                  <Route path="/earth-science">
                    <Route index element={<EarthSciencePage />} />
                    <Route path="geology" element={<GeologyLab />} />
                    <Route path="meteorology" element={<MeteorologyLab />} />
                    <Route path="volcanology" element={<VolcanologyLab />} />
                    <Route path="hydrology" element={<HydrologyLab />} />
                    <Route path="climatology" element={<ClimatologyLab />} />
                    <Route path="cartography" element={<CartographyLab />} />
                  </Route>
                  <Route path="/physics" element={<PhysicsLayout />}>
                    <Route index element={<PhysicsIndexPage />} />
                    <Route path="mechanics" element={<MechanicsPage />} />
                    <Route path="electromagnetism" element={<ElectromagnetismPage />} />
                    <Route path="thermodynamics" element={<ThermodynamicsPage />} />
                    <Route path="waves" element={<WavesPage />} />
                    <Route path="optics" element={<OpticsPage />} />
                    <Route path="modern" element={<ModernPhysicsPage />} />
                    <Route path="library" element={<LibraryPage />} />
                    <Route path="challenges" element={<ChallengesPage />} />
                    <Route path="converter" element={<UnitConverterPage />} />
                    <Route path="calculator" element={<FormulaCalcPage />} />
                    <Route path="glossary" element={<GlossaryPage />} />
                    <Route path="*" element={<PhysicsNotFound />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </div>
            <Footer />
          </div>
          <Suspense fallback={null}>
            <ChatWidget />
          </Suspense>
          <PwaInstallBanner />
          <OfflineIndicator />
          </SearchProvider>
        </BrowserRouter>
      </ChatProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
