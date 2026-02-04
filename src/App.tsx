import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import HomePage from "./pages/HomePage";
import HiringPage from "./pages/HiringPage";
import EmployeesPage from "./pages/EmployeesPage";
import PerformancePage from "./pages/PerformancePage";
import KnowledgePage from "./pages/KnowledgePage";
import LearningPage from "./pages/LearningPage";
import GovernancePage from "./pages/GovernancePage";
import DashboardsPage from "./pages/DashboardsPage";
import GenePage from "./pages/GenePage";
import CoachPage from "./pages/CoachPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hiring" element={<HiringPage />} />
            <Route path="/hiring/:id" element={<HiringPage />} />
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/employees/:id" element={<EmployeesPage />} />
            <Route path="/performance" element={<PerformancePage />} />
            <Route path="/knowledge" element={<KnowledgePage />} />
            <Route path="/learning" element={<LearningPage />} />
            <Route path="/governance" element={<GovernancePage />} />
            <Route path="/dashboards" element={<DashboardsPage />} />
            <Route path="/gene" element={<GenePage />} />
            <Route path="/coach" element={<CoachPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
