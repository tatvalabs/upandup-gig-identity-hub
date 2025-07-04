import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"
import Index from "@/pages/Index";
import PartnerOnboardingPage from "@/pages/PartnerOnboarding";
import PartnerDashboardPage from "@/pages/PartnerDashboard";
import Documentation from "@/pages/Documentation";
import NotFound from "@/pages/NotFound";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/partner-onboarding" element={<PartnerOnboardingPage />} />
          <Route path="/partner-dashboard" element={<PartnerDashboardPage />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
};

export default App;
