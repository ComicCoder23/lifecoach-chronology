import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Dashboard from "./pages/Dashboard";
import LaunchMode from "./pages/LaunchMode";
import Disciplines from "./pages/Disciplines";
import Timeline from "./pages/Timeline";
import QuickCapture from "./pages/QuickCapture";
import CalendarView from "./pages/CalendarView";
import EvidenceView from "./pages/EvidenceView";
import ADPVault from "./pages/ADPVault";
import PromiseTracker from "./pages/PromiseTracker";
import FamilyView from "./pages/FamilyView";
import MealCapture from "./pages/MealCapture";
import DebtTracker from "./pages/DebtTracker";
import PostMail from "./pages/PostMail";
import LifeAdmin from "./pages/LifeAdmin";
import Scrapbook from "./pages/Scrapbook";
import WeeklyReport from "./pages/WeeklyReport";
import MoreMenu from "./pages/MoreMenu";
import PositiveFlow from "./pages/PositiveFlow";
import ContentEngine from "./pages/ContentEngine";
import TrustedSources from "./pages/TrustedSources";
import MomentumRescue from "./pages/MomentumRescue";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/launch" element={<LaunchMode />} />
            <Route path="/disciplines" element={<Disciplines />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/capture" element={<QuickCapture />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/evidence" element={<EvidenceView />} />
            <Route path="/adp-vault" element={<ADPVault />} />
            <Route path="/promises" element={<PromiseTracker />} />
            <Route path="/family" element={<FamilyView />} />
            <Route path="/meals" element={<MealCapture />} />
            <Route path="/debt" element={<DebtTracker />} />
            <Route path="/mail" element={<PostMail />} />
            <Route path="/admin" element={<LifeAdmin />} />
            <Route path="/scrapbook" element={<Scrapbook />} />
            <Route path="/weekly" element={<WeeklyReport />} />
            <Route path="/flow" element={<PositiveFlow />} />
            <Route path="/content" element={<ContentEngine />} />
            <Route path="/sources" element={<TrustedSources />} />
            <Route path="/rescue" element={<MomentumRescue />} />
            <Route path="/more" element={<MoreMenu />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </AppLayout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
