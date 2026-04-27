import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import VRLabsPage from "./pages/VRLabsPage.tsx";
import ChemistryIndex from "./pages/ChemistryIndex.tsx";
import PhysicsLayout from "./pages/PhysicsLayout.tsx";
import PhysicsIndexPage from "./pages/PhysicsIndexPage.tsx";
import BiologyPage from "./pages/BiologyPage.tsx";
import EarthSciencePage from "./pages/EarthSciencePage.tsx";
import GeneticsLab from "./pages/biology/GeneticsLab.tsx";
import AnatomyLab from "./pages/biology/AnatomyLab.tsx";
import MicrobiologyLab from "./pages/biology/MicrobiologyLab.tsx";
import EcologyLab from "./pages/biology/EcologyLab.tsx";
import CellBiologyLab from "./pages/biology/CellBiologyLab.tsx";
import NeuroscienceLab from "./pages/biology/NeuroscienceLab.tsx";
import MeteorologyLab from "./pages/earth/MeteorologyLab.tsx";
import VolcanologyLab from "./pages/earth/VolcanologyLab.tsx";
import GeologyLab from "./pages/earth/GeologyLab.tsx";
import HydrologyLab from "./pages/earth/HydrologyLab.tsx";
import ClimatologyLab from "./pages/earth/ClimatologyLab.tsx";
import CartographyLab from "./pages/earth/CartographyLab.tsx";
import NotFound from "./pages/NotFound.tsx";

// Physics Pages
import MechanicsPage from "./pages/physics/MechanicsPage.tsx";
import ElectromagnetismPage from "./pages/physics/ElectromagnetismPage.tsx";
import ThermodynamicsPage from "./pages/physics/ThermodynamicsPage.tsx";
import WavesPage from "./pages/physics/WavesPage.tsx";
import ModernPhysicsPage from "./pages/physics/ModernPhysicsPage.tsx";
import OpticsPage from "./pages/physics/OpticsPage.tsx";
import LibraryPage from "./pages/physics/LibraryPage.tsx";
import ChallengesPage from "./pages/physics/ChallengesPage.tsx";
import UnitConverterPage from "./pages/physics/UnitConverterPage.tsx";
import FormulaCalcPage from "./pages/physics/FormulaCalcPage.tsx";
import GlossaryPage from "./pages/physics/GlossaryPage.tsx";
import PhysicsNotFound from "./pages/physics/NotFound.tsx";

import { ChatProvider } from "@/components/chat/ChatContext";
import ChatWidget from "@/components/chat/ChatWidget";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ChatProvider>
        <BrowserRouter>
          <Navbar />
          <div className="flex flex-col min-h-screen w-full pt-14 relative">
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                {/* VR Labs Route */}
                <Route path="/vr-labs" element={<VRLabsPage />} />
                {/* Chemistry Routes */}
                <Route path="/chemistry" element={<ChemistryIndex />} />
                {/* Biology Route */}
                <Route path="/biology">
                  <Route index element={<BiologyPage />} />
                  <Route path="genetics" element={<GeneticsLab />} />
                  <Route path="anatomy" element={<AnatomyLab />} />
                  <Route path="microbiology" element={<MicrobiologyLab />} />
                  <Route path="ecology" element={<EcologyLab />} />
                  <Route path="cells" element={<CellBiologyLab />} />
                  <Route path="neuroscience" element={<NeuroscienceLab />} />
                </Route>
                {/* Earth Science Route */}
                <Route path="/earth-science">
                  <Route index element={<EarthSciencePage />} />
                  <Route path="geology" element={<GeologyLab />} />
                  <Route path="meteorology" element={<MeteorologyLab />} />
                  <Route path="volcanology" element={<VolcanologyLab />} />
                  <Route path="hydrology" element={<HydrologyLab />} />
                  <Route path="climatology" element={<ClimatologyLab />} />
                  <Route path="cartography" element={<CartographyLab />} />
                </Route>
                {/* Physics Routes */}
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
                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </div>
          <ChatWidget />
        </BrowserRouter>
      </ChatProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
